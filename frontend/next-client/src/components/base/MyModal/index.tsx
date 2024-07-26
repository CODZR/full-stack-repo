import type { ModalProps } from '@chakra-ui/react';
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react';

interface Props extends ModalProps {
	children: JSX.Element;
}

const MyModal = (props: Props) => {
	const { isOpen, onClose, children } = props;

	return (
		<Modal {...props} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxW="min(90%, 1024px)">
				<ModalHeader>Create your account</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>{children}</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3}>
						Save
					</Button>
					<Button onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default MyModal;
