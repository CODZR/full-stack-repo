import { Button } from '@nextui-org/button';
import type { ModalProps } from '@nextui-org/modal';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';

interface Props extends ModalProps {
	open: boolean;
	onOk?: () => void;
	children: JSX.Element;
}

const MyModal = ({ open, children, onOk }: Props) => {
	const { onOpenChange } = useDisclosure();

	return (
		<Modal isOpen={open} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>
							<p>Create your account</p>
						</ModalHeader>
						<ModalBody>{children}</ModalBody>
						<ModalFooter>
							<Button onClick={onClose}>Cancel</Button>
							<Button color="primary" onClick={onOk}>
								Save
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default MyModal;
