import { RichText } from "@components/content-modules/rich-text";

const ModuleRenderer = ({ modules }) => {
	const renderModule = modules.map((m) => {
		switch (m._type) {
			case 'richText':
				return <RichText value={m.content} key={m._key} />
			// case 'video':
			// 	return <Video input={m} key={m._key} />;
			// case 'audio':
			// 	return <Audio input={m} key={m._key} />;
			// case 'musicNotation':
			// 	return <MusicNotation input={m} key={m._key} />;
			// case 'documentUpload':
			// 	return <DocumentUpload input={m} key={m._key} />;
			// case 'form':
			// 	return <FormRender input={m} key={m._key} />;
			// case 'pageTitle':
			// 	return <PageTitle input={m} key={m._key} />;
			default:
				return 'There was an error rendering the module.';
		}
	})

	return renderModule
}

export { ModuleRenderer }