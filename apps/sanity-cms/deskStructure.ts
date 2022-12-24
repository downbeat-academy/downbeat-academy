import {
    BiCog,
    BiFile,
    BiMicrophone,
    BiPen,
    BiGlobe,
    BiError
} from 'react-icons/bi'

export const deskStructure = (S: any) =>
    S.list()
        .title('Site content')
        .items([
            S.listItem()
                .title('Settings')
                .icon(BiCog)
                .child(
                    S.editor()
                        .schemaType('settings')
                        .documentId('settings')
                ),
            S.listItem()
                .title('Navigation')
                .icon(BiGlobe)
                .child(
                    S.documentList()
                        .schemaType('navigation')
                        .title('Navigation Elements')
                        .filter(
                            '_type == "navigation"'
                        )
                ),
            S.listItem()
                .title('Banners')
                .icon()
                .child(
                    S.documentList()
                        .schemaType('banner')
                        .title('Banners')
                        .filter(
                            '_type == "banner"'
                        )
                ),
            S.listItem()
                .title('Error pages')
                .icon(BiError)
                .child(
                    S.documentList()
                        .schemaType('errorPage')
                        .title('Error pages')
                        .filter(
                            '_type == "errorPage"'
                        )
                ),
            S.divider(),
            S.listItem()
                .title('Pages')
                .icon(BiFile)
                .child(
                    S.documentList()
                        .schemaType('page')
                        .title('Pages')
                        .filter(
                            '_type == "page"'
                        )
                ),
            S.listItem()
                .title('Articles')
                .icon(BiPen)
                .child(
                    S.documentList()
                        .schemaType('article')
                        .title('Articles')
                        .filter(
                            '_type == "article"'
                        )
                ),
            S.listItem()
                .title('Resources')
                .icon(BiPen)
                .child(
                    S.documentList()
                        .schemaType('resource')
                        .title('Resources')
                        .filter(
                            '_type == "resource"'
                        )
                ),
            S.listItem()
                .title('Landing pages')
                .icon(BiPen)
                .child(
                    S.documentList()
                        .schemaType('landingPage')
                        .title('Landing pages')
                        .filter(
                            '_type == "landingPage"'
                        )
                ),
            S.listItem()
                .title('Podcasts')
                .icon(BiMicrophone)
                .child(
                    S.documentList()
                        .schemaType('podcast')
                        .title('Podcasts')
                        .filter(
                            '_type == "podcast"'
                        )
                ),
        ])