import { describe, expect, it } from 'vitest'
import { formatTime } from '../format-time'

describe('formatTime', () => {
	it('formats zero seconds with a zero-padded seconds field', () => {
		expect(formatTime(0)).toEqual({
			minutes: 0,
			totalSeconds: 0,
			seconds: 0,
			remainingSeconds: 0,
			totalTime: '0:00',
			totalTimeToString: '0-00',
		})
	})

	it('zero-pads single-digit seconds', () => {
		expect(formatTime(65)).toEqual({
			minutes: 1,
			totalSeconds: 65,
			seconds: 5,
			remainingSeconds: 5,
			totalTime: '1:05',
			totalTimeToString: '1-05',
		})
	})

	it('formats exact minute boundaries', () => {
		expect(formatTime(60).totalTime).toBe('1:00')
		expect(formatTime(600).totalTime).toBe('10:00')
	})

	it('formats the seconds boundary around 10 and 60', () => {
		expect(formatTime(59).totalTime).toBe('0:59')
		expect(formatTime(61).totalTime).toBe('1:01')
		expect(formatTime(9).totalTime).toBe('0:09')
		expect(formatTime(10).totalTime).toBe('0:10')
	})

	it('exposes remainingSeconds equal to seconds (the field carries no extra padding)', () => {
		// Documents the dead `remainingSeconds` computation: `0 + (s % 60)` is a no-op,
		// so padding is applied only inside the template literal, not this field.
		expect(formatTime(5).remainingSeconds).toBe(5)
		expect(formatTime(5).seconds).toBe(5)
	})
})
