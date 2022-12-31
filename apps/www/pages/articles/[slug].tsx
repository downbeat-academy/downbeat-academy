import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { GET_ALL_ARTICLES, GET_ARTICLE_PATHS } from "@lib/queries"

export default function Article({ data, preview }) {
    console.log(data)

    const router = useRouter()

    const { data: article } = usePreviewSubscription(GET_ALL_ARTICLES, {
        params: { slug: data.article?.slug },
        initialData: data.article,
        enabled: preview && data.article?.slug,
    });

    if (!router.isFallback && !data.article?.slug) {
        return <Error statusCode={404} />;
    }

    return (<h1>{data.article.title}</h1>)
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
    const article = await getClient(preview).fetch(GET_ALL_ARTICLES, {
        slug: params.slug,
    });

    return {
        props: {
            preview,
            data: { article },
        },
        revalidate: 10,
    };
}

export const getStaticPaths: GetStaticPaths = async (preview) => {
    const paths = await getClient(preview).fetch(GET_ARTICLE_PATHS);

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false,
    };
}