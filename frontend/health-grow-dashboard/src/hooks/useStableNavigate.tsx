import { createContext, MutableRefObject, useContext, useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const StableNavigateContext = createContext<MutableRefObject<NavigateFunction> | null>(null);

const StableNavigateContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const navigateRef = useRef(navigate);

	return <StableNavigateContext.Provider value={navigateRef}>{children}</StableNavigateContext.Provider>;
};

const useStableNavigate = (): NavigateFunction => {
	const navigateRef = useContext(StableNavigateContext);
	const navigate = useNavigate();

	if (navigateRef?.current === null) throw new Error('StableNavigate context is not initialized');

	return navigateRef?.current || navigate;
};

export { StableNavigateContext, StableNavigateContextProvider, useStableNavigate };
