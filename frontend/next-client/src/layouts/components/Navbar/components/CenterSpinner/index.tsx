import { Flex, Spinner } from '@chakra-ui/react';

const CenterSpinner = () => {
	return (
		<Flex
			align="center"
			bg="rgba(255, 255, 255, 0.8)" // 可选：添加背景色
			bottom="0"
			justify="center"
			left="0"
			position="fixed"
			right="0"
			top="0"
			zIndex="9999" // 确保 Spinner 在最上层
		>
			<Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
		</Flex>
	);
};

export default CenterSpinner;
