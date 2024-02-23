export function useDisableClickEvent() {
	return useCallback((e: NewClickEvent, disabled: boolean, callbackFn: rcClickFn) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			callbackFn && callbackFn(e);
		}
	}, []);
}
