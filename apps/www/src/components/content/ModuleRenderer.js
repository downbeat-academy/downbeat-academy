import React from 'react';
import { GridWrapper, GridInner } from '@components/layout';

// Modules
import { RichText } from './rich-text/RichText';
import { Video } from './Video';
import { Audio } from './Audio';
import { MusicNotation } from './music-notation';
import { DocumentUpload } from './DocumentUpload';
import { FormRender } from './FormRender';
import { PageTitle } from './PageTitle';

export const ModuleRenderer = ({ modules }) => {
	const renderModule = modules.map((m) => {
		switch (m._type) {
			case 'richText':
				return (
					<GridInner key={m._key}>
						<RichText value={m.content} />
					</GridInner>
				);
			case 'video':
				return <Video input={m} key={m._key} />;
			case 'audio':
				return <Audio input={m} key={m._key} />;
			case 'musicNotation':
				return <MusicNotation input={m} key={m._key} />;
			case 'documentUpload':
				return <DocumentUpload input={m} key={m._key} />;
			case 'form':
				return <FormRender input={m} key={m._key} />;
			case 'pageTitle':
				return <PageTitle input={m} key={m._key} />;
			default:
				return 'There was an error rendering the module.';
		}
	});

	return <GridWrapper key={modules[0]._key}>{renderModule}</GridWrapper>;
};
