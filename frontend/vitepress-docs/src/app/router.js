import { reactive, inject, markRaw, nextTick, readonly } from 'vue';
import { inBrowser } from './utils';
export const RouterSymbol = Symbol();
// we are just using URL to parse the pathname and hash - the base doesn't
// matter and is only passed to support same-host hrefs.
const fakeHost = 'http://a.com';
const getDefaultRoute = () => ({
  path: '/',
  component: null,
  // this will be set upon initial page load, which is before
  // the app is mounted, so it's guaranteed to be available in
  // components. We just need enough data for 404 pages to render.
  data: { frontmatter: {} }
});
export function createRouter(loadPageModule, fallbackComponent) {
  const route = reactive(getDefaultRoute());
  function go(href = inBrowser ? location.href : '/') {
    // ensure correct deep link so page refresh lands on correct files.
    const url = new URL(href, fakeHost);
    if (!url.pathname.endsWith('/') && !url.pathname.endsWith('.html')) {
      url.pathname += '.html';
      href = url.pathname + url.search + url.hash;
    }
    if (inBrowser) {
      // save scroll position before changing url
      history.replaceState({ scrollPosition: window.scrollY }, document.title);
      history.pushState(null, '', href);
    }
    return loadPage(href);
  }
  let latestPendingPath = null;
  async function loadPage(href, scrollPosition = 0) {
    const targetLoc = new URL(href, fakeHost);
    const pendingPath = (latestPendingPath = targetLoc.pathname);
    try {
      let page = loadPageModule(pendingPath);
      // only await if it returns a Promise - this allows sync resolution
      // on initial render in SSR.
      if ('then' in page && typeof page.then === 'function') {
        page = await page;
      }
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        const { default: comp, __pageData } = page;
        if (!comp) {
          throw new Error(`Invalid route component: ${comp}`);
        }
        route.path = pendingPath;
        route.component = markRaw(comp);
        route.data = import.meta.env.PROD
          ? markRaw(JSON.parse(__pageData))
          : readonly(JSON.parse(__pageData));
        if (inBrowser) {
          nextTick(() => {
            if (targetLoc.hash && !scrollPosition) {
              let target = null;
              try {
                target = document.querySelector(decodeURIComponent(targetLoc.hash));
              }
              catch (e) {
                console.warn(e);
              }
              if (target) {
                scrollTo(target, targetLoc.hash);
                return;
              }
            }
            window.scrollTo(0, scrollPosition);
          });
        }
      }
    }
    catch (err) {
      if (!err.message.match(/fetch/)) {
        console.error(err);
      }
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        route.path = pendingPath;
        route.component = fallbackComponent ? markRaw(fallbackComponent) : null;
      }
    }
  }
  if (inBrowser) {
    window.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        const { href, protocol, hostname, pathname, hash, target } = link;
        const currentUrl = window.location;
        const extMatch = pathname.match(/\.\w+$/);
        // only intercept inbound links
        if (!e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey &&
                    !e.metaKey &&
                    target !== '_blank' &&
                    protocol === currentUrl.protocol &&
                    hostname === currentUrl.hostname &&
                    !(extMatch && extMatch[0] !== '.html')) {
          e.preventDefault();
          if (pathname === currentUrl.pathname) {
            // scroll between hash anchors in the same page
            if (hash && hash !== currentUrl.hash) {
              history.pushState(null, '', hash);
              // still emit the event so we can listen to it in themes
              window.dispatchEvent(new Event('hashchange'));
              // use smooth scroll when clicking on header anchor links
              scrollTo(link, hash, link.classList.contains('header-anchor'));
            }
          }
          else {
            go(href);
          }
        }
      }
    }, { capture: true });
    window.addEventListener('popstate', (e) => {
      loadPage(location.href, (e.state && e.state.scrollPosition) || 0);
    });
    window.addEventListener('hashchange', (e) => {
      e.preventDefault();
    });
  }
  return {
    route,
    go
  };
}
export function useRouter() {
  const router = inject(RouterSymbol);
  if (!router) {
    throw new Error('useRouter() is called without provider.');
  }
  // @ts-ignore
  return router;
}
export function useRoute() {
  return useRouter().route;
}
function scrollTo(el, hash, smooth = false) {
  let target = null;
  try {
    target = el.classList.contains('.header-anchor')
      ? el
      : document.querySelector(decodeURIComponent(hash));
  }
  catch (e) {
    console.warn(e);
  }
  if (target) {
    const targetTop = target.offsetTop;
    // only smooth scroll if distance is smaller than screen height.
    if (!smooth || Math.abs(targetTop - window.scrollY) > window.innerHeight) {
      window.scrollTo(0, targetTop);
    }
    else {
      window.scrollTo({
        left: 0,
        top: targetTop,
        behavior: 'smooth'
      });
    }
  }
}
