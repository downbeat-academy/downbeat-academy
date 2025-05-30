import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY

const elevenLabsClient = new ElevenLabsClient({
	apiKey: ELEVEN_LABS_API_KEY,
})

export const createAudioStreamFromText = async (
	text: string,
	voiceId?: string,
	modelId?: string,
	voiceSettings?: {
		stability: number
		similarityBoost: number
		useSpeakerBoost: boolean
		speed: number
	}
): Promise<Buffer> => {
	const audioStream = await elevenLabsClient.textToSpeech.stream(
		voiceId || 'raMcNf2S8wCmuaBcyI6E',
		{
			modelId: modelId || 'eleven_multilingual_v2',
			text,
			outputFormat: 'mp3_44100_128',
			voiceSettings: {
				stability: voiceSettings?.stability || 0,
				similarityBoost: voiceSettings?.similarityBoost || 1.0,
				useSpeakerBoost: voiceSettings?.useSpeakerBoost || true,
				speed: voiceSettings?.speed || 1.0,
			},
		}
	)
	const chunks: Buffer[] = []
	for await (const chunk of audioStream) {
		chunks.push(chunk)
	}
	const content = Buffer.concat(chunks)
	return content
}
