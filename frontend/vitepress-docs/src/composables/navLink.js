import { computed } from 'vue';
import { isExternal as isExternalCheck } from '@/utils/layout';
export function useNavLink(item) {
  item = item.value || item;
  const route = useRoute();
  const isExternal = isExternalCheck(item.link);
  const props = computed(() => {
    const routePath = normalizePath(`/${route.data?.path}`);
    let active = false;
    if (item.activeMatch) {
      active = new RegExp(item.activeMatch).test(routePath);
    } else {
      const itemPath = normalizePath(item.link);
      active =
        itemPath === '/'
          ? itemPath === routePath
          : routePath.startsWith(itemPath);
    }
    return {
      class: {
        active,
        isExternal
      },
      href: isExternal ? item.link : withBase(item.link),
      target: item.target || (isExternal ? '_blank' : null),
      rel: item.rel || (isExternal ? 'noopener noreferrer' : null),
      'aria-label': item.ariaLabel
    };
  });
  return {
    props,
    isExternal
  };
}
function normalizePath(path) {
  if (path === undefined) return;
  return path
    .replace(/#.*$/, '')
    .replace(/\?.*$/, '')
    .replace(/\.(html|md)$/, '')
    .replace(/\/index$/, '/');
}
