import React from 'react'
import { describe, expect, it, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AudioPlayer } from '../audio-player'
import { PlayerButton } from '../player-button'

const mockTracks = [
	{
		id: '1',
		title: 'Track One',
		artist: 'Artist A',
		src: 'https://example.com/audio1.mp3',
	},
	{
		id: '2',
		title: 'Track Two',
		artist: 'Artist B',
		src: 'https://example.com/audio2.mp3',
	},
]

beforeAll(() => {
	vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(
		() => Promise.resolve()
	)
	vi.spyOn(
		window.HTMLMediaElement.prototype,
		'pause'
	).mockImplementation(() => {})
})

describe('PlayerButton component', () => {
	it('renders a button with the correct aria-label', () => {
		render(
			<PlayerButton type="play" ariaLabel="Play" onClick={() => {}} />
		)
		expect(screen.getByLabelText('Play')).toBeInstanceOf(
			HTMLButtonElement
		)
	})

	it('calls onClick when clicked', () => {
		const handleClick = vi.fn()

		render(
			<PlayerButton
				type="play"
				ariaLabel="Play"
				onClick={handleClick}
			/>
		)

		fireEvent.click(screen.getByLabelText('Play'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})
})

describe('AudioPlayer component', () => {
	it('renders without crashing', () => {
		render(<AudioPlayer tracks={mockTracks} />)
	})

	it('renders play button', () => {
		render(<AudioPlayer tracks={mockTracks} />)
		expect(screen.getByLabelText('Play')).toBeInstanceOf(
			HTMLButtonElement
		)
	})

	it('renders navigation buttons for multiple tracks', () => {
		render(<AudioPlayer tracks={mockTracks} />)
		expect(screen.getByLabelText('Previous')).toBeInstanceOf(
			HTMLButtonElement
		)
		expect(screen.getByLabelText('Next')).toBeInstanceOf(
			HTMLButtonElement
		)
	})

	it('renders rewind and fast-forward buttons', () => {
		render(<AudioPlayer tracks={mockTracks} />)
		expect(screen.getByLabelText('Rewind')).toBeInstanceOf(
			HTMLButtonElement
		)
		expect(screen.getByLabelText('Fast Forward')).toBeInstanceOf(
			HTMLButtonElement
		)
	})

	it('does not render previous/next for single track', () => {
		render(<AudioPlayer tracks={[mockTracks[0]]} />)
		expect(screen.queryByLabelText('Previous')).toBeNull()
		expect(screen.queryByLabelText('Next')).toBeNull()
	})
})
