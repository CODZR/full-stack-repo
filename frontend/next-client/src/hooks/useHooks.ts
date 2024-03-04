import { useCallback, useEffect, useRef } from 'react';

/**
 *  延迟fetch，数据库可能反应不过来
 *
 *  因使用了batch暂时只提供给dispatch的fetch使用
 */
// export async function delayFetch(effect, delay = 500) {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			setTimeout(() => {
// 				batch(() => {
// 					resolve(effect());
// 				});
// 			}, delay);
// 		} catch (err) {
// 			reject(err);
// 		}
// 	});
// }

/**
 *  只在组件挂载时执行一次
 */
export function useOnceEffect(effect) {
	useEffect(() => {
		const cleanupEffect = effect();

		return () => {
			cleanupEffect && cleanupEffect();
		};
		// eslint-disable-next-line @wogns3623/better-exhaustive-deps/exhaustive-deps
	}, []);
}

/**
 *  useCallback空依赖项，省去eslint-disable
 */
export function useEmptyCallback(effect) {
	return useCallback(() => {
		effect();
		// eslint-disable-next-line @wogns3623/better-exhaustive-deps/exhaustive-deps
	}, []);
}

/* Start useWhyDidYouUpdate */
export type IProps = Record<string, any>;

export const useWhyDidYouUpdate = (componentName: string, props: IProps) => {
	const prevProps = useRef<IProps>({});

	useEffect(() => {
		if (prevProps.current) {
			const allKeys = Object.keys({ ...prevProps.current, ...props });
			const changedProps: IProps = {};

			allKeys.forEach((key) => {
				if (!Object.is(prevProps.current[key], props[key])) {
					changedProps[key] = {
						from: prevProps.current[key],
						to: props[key]
					};
				}
			});

			if (Object.keys(changedProps).length) {
				console.log('[why-did-you-update]', componentName, changedProps);
			}
		}

		prevProps.current = props;
	});
};

/* End useWhyDidYouUpdate */
