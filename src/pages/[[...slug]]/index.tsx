import { ContentFile, getContentFile, getContentPaths } from "getPage"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import hydrate from "next-mdx-remote/hydrate"
import RouteLink from "components/RouteLink"
import SocialCard from "components/SocialCard"

interface PageProps extends ContentFile {
    content: string
    paths: ContentFile[]
}

const Page: React.FC<PageProps> = ({ content, paths, meta }) => (
    <div className="flex flex-col max-w-3xl mx-auto h-full">
        <header className="flex items-center justify-center fixed h-16 w-full max-w-3xl border-b-4 mb-4 px-3 text-lg text-center bg-white">
            <Head>
                <title>
                    underscore.space{meta.title && ` - ${meta.title}`}
                </title>
                <SocialCard title={meta.title} />
            </Head>
            <h1 className="text-3xl font-serif font-black tracking-widest">
                underscore.space
            </h1>
        </header>
        <nav className="border-b-2 px-2 pb-4 mt-16">
            <ul className="mb-2 mt-4">
                <li>
                    <RouteLink href="/">Home</RouteLink>
                </li>
                {paths &&
                    paths
                        .filter((p) => p.slug !== "index")
                        .map(({ slug: s, meta }) => (
                            <li key={`page-path-${s}`}>
                                <RouteLink href={`/${s}`}>
                                    {meta.title}
                                </RouteLink>
                            </li>
                        ))}
            </ul>
            {/* <details open>
                    <summary>Blog</summary>
                    <ul className="list-disc list-inside ml-4">
                        <li>
                            <RouteLink href="/async-await">
                                A nice <code>async/await</code> error catching
                                pattern
                            </RouteLink>
                        </li>
                    </ul>
                </details> */}
        </nav>
        <main className="px-2 mb-4 max-w-full">
            <article className="prose max-w-none">
                <base target="_blank" />
                {meta.title && <h2>{meta.title}</h2>}
                {hydrate(content)}
            </article>
        </main>
    </div>
)

export const getStaticProps: GetStaticProps<
    PageProps,
    { slug: string[] }
> = async ({ params }) => {
    const slug = params?.slug?.toString() ?? "index"
    const { content, meta } = await getContentFile(slug)

    const paths = await getContentPaths()
    const props = { paths, content, slug, meta }

    return { props }
}

export const getStaticPaths: GetStaticPaths<{ slug: string[] }> = async () => {
    const contentFiles = await getContentPaths()

    const paths = {
        paths: contentFiles.map(({ slug }) => ({
            params: { slug: [slug === "index" ? "" : slug] },
        })),
        fallback: false,
    }

    return paths
}

export default Page
