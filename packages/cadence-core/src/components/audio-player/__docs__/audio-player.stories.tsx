import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AudioPlayer } from '../index'
import { Flex } from '../../flex'
import { PlayerButton } from '../player-button'

const meta: Meta<typeof AudioPlayer> = {
	title: 'Cadence / Components / AudioPlayer',
	component: AudioPlayer,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
An audio player component with full playback controls, progress bar, and volume control. Supports single and multiple tracks.

## Features

- Play/pause, rewind, fast-forward controls
- Previous/next track navigation (when multiple tracks)
- Volume control with mute toggle
- Progress bar with time display
- Generic Track interface (pass any audio URL)

## Track Interface

\`\`\`ts
interface Track {
  id: string | number
  title?: string
  artist?: string
  src: string  // resolved audio URL
}
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AudioPlayer>

const sampleTracks = [
	{
		id: '1',
		title: 'Sample Track',
		artist: 'Sample Artist',
		src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
	},
]

const multiTracks = [
	{
		id: '1',
		title: 'Track One',
		artist: 'Artist A',
		src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
	},
	{
		id: '2',
		title: 'Track Two',
		artist: 'Artist B',
		src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
	},
]

export const SingleTrack: Story = {
	render: () => (
		<AudioPlayer
			tracks={sampleTracks}
			showTitle={true}
			showArtist={true}
		/>
	),
}

export const MultipleTracks: Story = {
	render: () => (
		<AudioPlayer
			tracks={multiTracks}
			showTitle={true}
			showArtist={true}
		/>
	),
	parameters: {
		docs: {
			description: {
				story: 'When multiple tracks are provided, previous/next navigation buttons appear.',
			},
		},
	},
}

export const TitleOnly: Story = {
	render: () => (
		<AudioPlayer
			tracks={sampleTracks}
			showTitle={true}
			showArtist={false}
		/>
	),
}

export const PlayerButtonVariants: Story = {
	render: () => (
		<Flex direction="row" gap="small" alignItems="center">
			{(
				[
					'play',
					'pause',
					'rewind',
					'fast-forward',
					'previous',
					'next',
					'volume',
					'volume-mute',
					'volume-quiet',
				] as const
			).map((type) => (
				<PlayerButton
					key={type}
					type={type}
					ariaLabel={type}
					onClick={() => {}}
					size="medium"
				/>
			))}
		</Flex>
	),
	parameters: {
		docs: {
			description: {
				story: 'All available PlayerButton icon types.',
			},
		},
	},
}
