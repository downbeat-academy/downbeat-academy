import S from '@sanity/desk-tool/structure-builder';
import {
	BiFile,
	BiCog,
	BiBrush,
	BiPurchaseTag,
	BiUserCircle,
	BiPencil,
	BiWindow,
	BiMicrophone,
	BiBook,
	BiTestTube,
	BiNavigation,
	BiCollection,
	BiTachometer,
	BiErrorCircle,
	BiMusic,
	BiAlbum,
	BiPen,
	BiNews,
	BiCut,
} from 'react-icons/bi';

export default () =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title(`Navigation`)
				.icon(BiNavigation)
				.child(S.documentTypeList(`navigation`).title(`Navigation`)),
			S.listItem()
				.title(`Settings`)
				.icon(BiCog)
				.child(S.editor().schemaType(`settings`)),
			S.listItem()
				.title(`Brand Assets`)
				.icon(BiBrush)
				.child(S.documentTypeList(`brandAsset`).title(`Brand Assets`)),
			S.divider(),
			S.listItem()
				.title(`Banners`)
				.icon(BiWindow)
				.child(S.documentTypeList(`banner`).title(`Banners`)),
			S.listItem()
				.title(`People`)
				.icon(BiUserCircle)
				.child(S.documentTypeList(`person`).title(`People`)),
			S.divider(),
			S.listItem()
				.title(`Categories`)
				.icon(BiPurchaseTag)
				.child(S.documentTypeList(`category`).title(`Categories`)),
			S.listItem()
				.title(`Difficulty Levels`)
				.icon(BiTachometer)
				.child(
					S.documentTypeList(`difficulty`).title(`Difficulty Levels`)
				),
			S.listItem()
				.title('Instruments')
				.icon(BiMusic)
				.child(S.documentTypeList('instrument').title('Instruments')),
			S.listItem()
				.title('Genres')
				.icon(BiAlbum)
				.child(S.documentTypeList('genre').title('Genres')),
			S.divider(),
			S.listItem()
				.title(`Pages`)
				.icon(BiFile)
				.child(S.documentTypeList(`page`).title(`Pages`)),
			S.listItem()
				.title(`Error Pages`)
				.icon(BiErrorCircle)
				.child(S.documentTypeList(`errorPage`).title(`Error Pages`)),
			S.listItem()
				.title(`Articles`)
				.icon(BiPencil)
				.child(S.documentTypeList(`article`).title(`Articles`)),
			S.listItem()
				.title('Resources')
				.icon(BiPen)
				.child(S.documentTypeList('resource').title('Resources')),
			S.listItem()
				.title(`Podcasts`)
				.icon(BiMicrophone)
				.child(S.documentTypeList(`podcast`).title(`Podcasts`)),
			S.listItem()
				.title(`Landing Pages`)
				.icon(BiTestTube)
				.child(
					S.documentTypeList(`landingPage`).title(`Landing Pages`)
				),
			S.listItem()
				.title(`Courses`)
				.icon(BiBook)
				.child(S.documentTypeList(`course`).title(`Courses`)),
			S.listItem()
				.title(`Curricula`)
				.icon(BiCollection)
				.child(S.documentTypeList(`curriculum`).title(`Curricula`)),
			S.listItem()
				.title('Newsletters')
				.icon(BiNews)
				.child(S.documentTypeList('newsletter').title('Newsletters')),
			S.listItem()
				.title('Snippets')
				.icon(BiCut)
				.child(S.documentTypeList('snippet').title('Snippets')),
		]);
