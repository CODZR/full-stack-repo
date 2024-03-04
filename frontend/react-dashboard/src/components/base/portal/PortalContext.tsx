import { createContext } from 'react';

const PortalContext = createContext({
	container: document.body
} as {
	container: HTMLElement;
});

const { Provider, Consumer } = PortalContext;

export { Consumer as PortalConsumer, PortalContext, Provider as PortalProvider };
