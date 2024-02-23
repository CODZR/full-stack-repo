import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

export default ToastContainer;

export const Message = {
	success: (content: string, duration?: number) => {
		toast({
			status: 'success',
			title: content,
			position: 'top',
			duration: duration,
			isClosable: true
		});
	},
	error: (content: string, duration?: number) => {
		toast({
			status: 'error',
			title: content,
			position: 'top',
			duration: duration,
			isClosable: true
		});
	},
	info: (content: string, duration?: number) => {
		toast({
			status: 'info',
			title: content,
			position: 'top',
			duration: duration,
			isClosable: true
		});
	},
	warning: (content: string, duration?: number) => {
		toast({
			status: 'warning',
			title: content,
			position: 'top',
			duration: duration,
			isClosable: true
		});
	}
};
