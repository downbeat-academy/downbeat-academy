import React from 'react'

const BannerContent = ({ children }: { children: React.ReactNode }) => {
	return <section>{children}</section>
}

BannerContent.displayName = 'BannerContent'

const Content = BannerContent

export { BannerContent, Content }