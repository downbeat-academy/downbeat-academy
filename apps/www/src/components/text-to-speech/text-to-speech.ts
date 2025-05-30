import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

// Use the server-side environment variable
const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY

console.log('API Key exists:', !!ELEVEN_LABS_API_KEY)
console.log('API Key length:', ELEVEN_LABS_API_KEY?.length)

const elevenLabsClient = new ElevenLabsClient({
	apiKey: ELEVEN_LABS_API_KEY || '',
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
	try {
		const audioStream = await elevenLabsClient.textToSpeech.stream(
			voiceId || 'raMcNf2S8wCmuaBcyI6E',
			{
				text,
				modelId: modelId || 'eleven_multilingual_v2',
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
	} catch (error) {
		console.error('ElevenLabs API Error:', error)
		return Buffer.from('')
	}
}
