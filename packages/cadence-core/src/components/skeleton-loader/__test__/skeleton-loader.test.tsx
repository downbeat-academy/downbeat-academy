import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { SkeletonLoader } from '../skeleton-loader'

describe('SkeletonLoader component', () => {
	it('renders without crashing', () => {
		const { container } = render(<SkeletonLoader count={1} />)
		expect(container.querySelector('.react-loading-skeleton')).toBeTruthy()
	})

	it('renders the specified number of skeleton elements', () => {
		const { container } = render(<SkeletonLoader count={3} />)
		const skeletons = container.querySelectorAll('.react-loading-skeleton')
		expect(skeletons.length).toBe(3)
	})

	it('applies custom className', () => {
		const { container } = render(
			<SkeletonLoader count={1} className="custom-skeleton" />
		)
		expect(
			container.querySelector('.custom-skeleton')
		).toBeTruthy()
	})
})
