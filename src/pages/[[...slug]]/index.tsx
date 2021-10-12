import { GetStaticPaths, GetStaticProps } from "next"
import hydrate from "next-mdx-remote/hydrate"
import RouteLink from "components/RouteLink"

import { FC } from "react"
import { getPagePaths } from "helpers/getPagePaths"
import { getPageSlug } from "helpers/getPageSlug"
import { BlogPageProps } from "types"
import { CONTENT_PATH, MDX_OPTIONS } from "../../constants"
import { getPage } from "helpers/getPage"
import { getPageMeta } from "helpers/getPageMeta"
import renderToString from "next-mdx-remote/render-to-string"

const Page: FC<BlogPageProps> = ({ content, menuPaths }) => (
    <div className="flex flex-col max-w-3xl mx-auto h-full">
        <header className="flex items-center justify-center fixed h-16 w-full max-w-3xl border-b-4 mb-4 px-3 text-lg text-center bg-white">
            <h1 className="text-3xl font-serif font-black tracking-widest">
                underscore.space
            </h1>
        </header>
        <nav className="border-b-2 px-2 pb-4 mt-16">
            <ul className="mb-2 mt-4 flex flex-col">
                {menuPaths.map(({ path, current, titleHtml }) => {
                    const LinkOrBold: React.FC = current
                        ? ({ children }) => <b>{children}</b>
                        : ({ children }) => (
                              <RouteLink
                                  href={`/${path === "index" ? "" : path}`}
                              >
                                  {children}
                              </RouteLink>
                          )

                    return (
                        <li
                            key={`page-path-${path}`}
                            className={
                                path === "index" ? "order-first" : undefined
                            }
                        >
                            <LinkOrBold>{hydrate(titleHtml)}</LinkOrBold>
                        </li>
                    )
                })}
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

export const getStaticProps: GetStaticProps<
    BlogPageProps,
    { slug?: string[] }
> = async ({ params }) => {
    const pagePath = params.slug?.join("/") ?? "index"
    const content = await getPage(pagePath)
    const paths = await getPagePaths(CONTENT_PATH)
    const menuPaths = await Promise.all(
        paths.map(async (path) => {
            const meta = await getPageMeta(path)
            const titleHtml = await renderToString(meta.title, MDX_OPTIONS)
            console.log({ path, pagePath })
            return {
                path,
                titleHtml,
                current: path === pagePath,
            }
        })
    )

    const meta = await getPageMeta(pagePath)

    const props = {
        menuPaths,
        content,
        meta,
    }

    return { props }
}

export const getStaticPaths: GetStaticPaths<{ slug: string[] }> = async () => {
    const paths = await getPagePaths(CONTENT_PATH)
    const slugs = paths.map(getPageSlug)

    return {
        paths: slugs.map((slug) => ({
            params: {
                slug: slug[0] === "index" ? [""] : slug,
            },
        })),
        fallback: false,
    }
}

export default Page
