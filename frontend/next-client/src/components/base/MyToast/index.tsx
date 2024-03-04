import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast: chakraToast } = createStandaloneToast();

export default ToastContainer;

export const toast = {
	success: (content: string, duration?: number) => {
		chakraToast({
			status: 'success',
			title: content,
			position: 'top',
			duration: duration,
			isClosable: true
		});
	},
	error: (content: string, duration?: number) => {
		chakraToast({
			status: 'error',
			title: content,
			position: 'top',
			duration: duration,
			isClosable: true
		});
	},
	info: (content: string, duration?: number) => {
		chakraToast({
			status: 'info',
			title: content,
			position: 'top',
			duration: duration,
			isClosable: true
		});
	},
	warning: (content: string, duration?: number) => {
		chakraToast({
			status: 'warning',
			title: content,
			position: 'top',
			duration: duration,
			isClosable: true
		});
	}
};
