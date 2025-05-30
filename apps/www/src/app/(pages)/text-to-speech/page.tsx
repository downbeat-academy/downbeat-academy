import { createAudioStreamFromText } from '@/components/text-to-speech/text-to-speech'

export default async function TextToSpeechPage() {
	const audioBuffer = await createAudioStreamFromText(
		'Hello, how are you? This is a test of the text to speech converter.'
	)

	const audioUrl = `data:audio/mp3;base64,${audioBuffer.toString('base64')}`

	return (
		<div>
			<audio src={audioUrl} controls />
		</div>
	)
}
