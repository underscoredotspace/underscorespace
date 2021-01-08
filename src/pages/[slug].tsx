import { getContentFile, getContentFiles } from "getPage"
import { GetStaticPaths, GetStaticProps } from "next"
import hydrate from "next-mdx-remote/hydrate"
import RouteLink from "components/RouteLink"

interface PageProps {
    content: string
    paths: string[]
}

const Page: React.FC<PageProps> = ({ content, paths }) => {
    console.log("paths", paths)

    return (
        <div className="flex flex-col max-w-3xl mx-auto h-full">
            <header className="flex items-center justify-center fixed h-16 w-full max-w-3xl border-b-4 mb-4 px-3 text-lg text-center bg-white">
                <h1 className="text-3xl font-serif font-black tracking-widest">
                    underscore.space
                </h1>
            </header>
            <nav className="border-b-2 px-2 pb-4 mt-16">
                <ul className="mb-2 mt-4">
                    <li>
                        <RouteLink href="/">Home</RouteLink>
                    </li>
                    {paths.map((path) => (
                        <li key={`page-path-${path}`}>
                            <RouteLink href={`/${path}`}>{path}</RouteLink>
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
                    {hydrate(content)}
                </article>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { content } = await getContentFile(`${params.slug}`)
    const paths = await getContentFiles()
    return {
        props: { paths, content },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getContentFiles()

    return {
        paths: paths.map((path) => ({ params: { slug: path } })),
        fallback: false,
    }
}

export default Page
