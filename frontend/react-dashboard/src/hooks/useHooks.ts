export { useStableNavigate } from './useStableNavigate';

export function useMountedState() {
	const mountedRef = useRef(false);
	const get = useCallback(function () {
		return mountedRef.current;
	}, []);
	useEffect(function () {
		mountedRef.current = true;
		return function () {
			mountedRef.current = false;
		};
	}, []);
	return get;
}

export function usePromise() {
	const isMounted = useMountedState();

	return useCallback(
		function (promise: () => Promise<any>) {
			return new Promise<any>(function (resolve, reject) {
				const onValue = function (value: any) {
					isMounted() && resolve(value);
				};
				const onError = function (error: any) {
					isMounted() && reject(error);
				};
				promise().then(onValue, onError);
			});
		},
		[isMounted]
	);
}

/**
 *  只在组件挂载时执行一次
 */
export function useOnceEffect(effect) {
	useEffect(() => {
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
