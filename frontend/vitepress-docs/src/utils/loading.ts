import { Loading } from '@vcomp/ui';

/* start 将同一时刻的请求合并。*/
const loadingInstance = Loading;
let needLoadingRequestCount = 0;
const startLoading = () => loadingInstance.show();
const endLoading = () => loadingInstance.close();

export const showFullScreenLoading = () => {
  needLoadingRequestCount++ === 0 && startLoading();
};

export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  --needLoadingRequestCount === 0 && endLoading();
};
/* end 将同一时刻的请求合并。*/
