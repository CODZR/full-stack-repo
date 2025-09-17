const frameStyle = {
	width: '100%',
	height: '100%',
	minHeight: '700px'
};

const HomePage = () => {
	return (
		<div>
			<iframe
				allow="microphone"
				src="https://udify.app/chatbot/itba5kXfcGThrFzY"
				style={frameStyle}
				title="Chatbot"
			/>
		</div>
	);
};

export default HomePage;
