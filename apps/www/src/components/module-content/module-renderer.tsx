import { RichText } from '@components/rich-text'
import { ModuleItem } from '@components/module-content'
import s from './module-renderer.module.css'

const ModuleRenderer = ({ modules }) => {
	const renderModules = modules.map((m) => {
		switch (m._type) {
			case 'richText':
				return (
					<ModuleItem
						gridArea="center"
						paddingY="x-large"
						paddingX="medium"
						key={m._key}
					>
						<RichText value={m.content} />
					</ModuleItem>
				)
			default:
				return 'There was an error rendering the module'
		}
	})

	return <section className={s.root}>{renderModules}</section>
}

export { ModuleRenderer }
