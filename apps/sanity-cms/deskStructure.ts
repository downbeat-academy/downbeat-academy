import {
	BiCog,
	BiFile,
	BiMicrophone,
	BiPen,
	BiPencil,
	BiGlobe,
	BiError,
	BiWindow,
	BiBrush,
	BiCut,
	BiBookmarkAlt,
	BiBook,
	BiCollection,
	BiNews,
	BiPurchaseTag,
	BiTachometer,
	BiAlbum,
	BiUserCircle,
	BiMusic,
	BiBookBookmark,
} from 'react-icons/bi'

export const deskStructure = (S: any) =>
	S.list()
		.title('Site content')
		.items([
			S.listItem()
				.title('General settings')
				.child(
					S.list()
						.title('General settings')
						.items([
							S.listItem()
								.title('Settings')
								.icon(BiCog)
								.child(
									S.editor().schemaType('settings').documentId('settings')
								),
							S.listItem()
								.title('Brand assets')
								.icon(BiBrush)
								.child(
									S.documentList()
										.schemaType('brandAsset')
										.title('Brand assets')
										.filter('_type == "brandAsset"')
								),
							S.listItem()
								.title('Navigation')
								.icon(BiGlobe)
								.child(
									S.documentList()
										.schemaType('navigation')
										.title('Navigation Elements')
										.filter('_type == "navigation"')
								),
							S.listItem()
								.title('Banners')
								.icon(BiWindow)
								.child(
									S.documentList()
										.schemaType('banner')
										.title('Banners')
										.filter('_type == "banner"')
								),
						])
				),
			S.listItem()
				.title('Page content')
				.child(
					S.list()
						.title('Page Content')
						.items([
							S.listItem()
								.title('Pages')
								.icon(BiFile)
								.child(
									S.documentList()
										.schemaType('page')
										.title('Pages')
										.filter('_type == "page"')
								),
							S.listItem()
								.title('Error pages')
								.icon(BiError)
								.child(
									S.documentList()
										.schemaType('errorPage')
										.title('Error pages')
										.filter('_type == "errorPage"')
								),
						])
				),
			S.listItem()
				.title('Educational content')
				.child(
					S.list()
						.title('Educational content')
						.items([
							S.listItem()
								.title('Articles')
								.icon(BiPencil)
								.child(
									S.documentList()
										.schemaType('article')
										.title('Articles')
										.filter('_type == "article"')
								),
							S.listItem()
								.title('Resources')
								.icon(BiPen)
								.child(
									S.documentList()
										.schemaType('resource')
										.title('Resources')
										.filter('_type == "resource"')
								),
							S.listItem()
								.title('Snippets')
								.icon(BiCut)
								.child(
									S.documentList()
										.schemaType('snippet')
										.title('Snippets')
										.filter('_type == "snippet"')
								),
							S.listItem()
								.title('Podcasts')
								.icon(BiMicrophone)
								.child(
									S.documentList()
										.schemaType('podcast')
										.title('Podcasts')
										.filter('_type == "podcast"')
								),
							S.listItem()
								.title('Almanac')
								.icon(BiBookBookmark)
								.child(
									S.documentList()
										.schemaType('almanac')
										.title('Almanac')
										.filter('_type == "almanac"')
								),
							S.divider(),
							S.listItem()
								.title('Lessons')
								.icon(BiBookmarkAlt)
								.child(
									S.documentList()
										.schemaType('lesson')
										.title('Lessons')
										.filter('_type == "lesson"')
								),
							S.listItem()
								.title('Courses')
								.icon(BiBook)
								.child(
									S.documentList()
										.schemaType('course')
										.title('Courses')
										.filter('_type == "course"')
								),
							S.listItem()
								.title('Curricula')
								.icon(BiCollection)
								.child(
									S.documentList()
										.schemaType('curriculum')
										.title('Curricula')
										.filter('_type == "curriculum"')
								),
						])
				),
			S.listItem()
				.title('Marketing')
				.child(
					S.list()
						.title('Marketing')
						.items([
							S.listItem()
								.title('Landing pages')
								.icon(BiFile)
								.child(
									S.documentList()
										.schemaType('landingPage')
										.title('Landing pages')
										.filter('_type == "landingPage"')
								),
							S.listItem()
								.title('Newsletters')
								.icon(BiNews)
								.child(
									S.documentList()
										.schemaType('newsletter')
										.title('Newsletters')
										.filter('_type == "newsletter"')
								),
						])
				),
			S.listItem()
				.title('Meta content')
				.child(
					S.list()
						.title('Meta content')
						.items([
							S.listItem()
								.title('Categories')
								.icon(BiPurchaseTag)
								.child(
									S.documentList()
										.schemaType('category')
										.title('Categories')
										.filter('_type == "category"')
								),
							S.listItem()
								.title('Difficulties')
								.icon(BiTachometer)
								.child(
									S.documentList()
										.schemaType('difficulty')
										.title('Difficulties')
										.filter('_type == "difficulty"')
								),
							S.listItem()
								.title('Genres')
								.icon(BiAlbum)
								.child(
									S.documentList()
										.schemaType('genre')
										.title('Genres')
										.filter('_type == "genre"')
								),
							S.listItem()
								.title('Instruments')
								.icon(BiMusic)
								.child(
									S.documentList()
										.schemaType('instrument')
										.title('Instruments')
										.filter('_type == "instrument"')
								),
							S.listItem()
								.title('People')
								.icon(BiUserCircle)
								.child(
									S.documentList()
										.schemaType('person')
										.title('People')
										.filter('_type == "person"')
								),
						])
				),
		])
