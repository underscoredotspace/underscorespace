import { readFile, readdir } from "fs/promises"
import path from "path"
import matter from "gray-matter"
import _glob from "glob"
import { promisify } from "util"
const glob = promisify(_glob)
import renderToString from "next-mdx-remote/render-to-string"
import prism from "@mapbox/rehype-prism"

const CONTENT_PATH = path.join(process.cwd(), "content")

interface Content {
    meta: Record<string, string>
    content: string
}

export interface ContentFile {
    slug: string
    meta: Content["meta"]
}

export async function getContentPaths(): Promise<ContentFile[]> {
    return readdir(CONTENT_PATH).then(
        async (paths) =>
            await Promise.all(
                paths
                    .filter((path) => !path.startsWith("__"))
                    .map(async (path) => {
                        const slug = path.replace(/\..+$/, "")
                        const meta = await getMeta(slug)

                        return { slug, meta }
                    })
            )
    )
}

async function getMeta(slug: string): Promise<Content["meta"]> {
    const [filepath] = await glob(`${CONTENT_PATH}/${slug}.md?(x)`)
    const fileContents = await readFile(filepath, "utf8")

    const { data } = matter(fileContents)

    return data
}

export async function getContentFile(slug: string): Promise<Content> {
    const [filepath] = await glob(`${CONTENT_PATH}/${slug}.md?(x)`)
    const fileContents = await readFile(filepath, "utf8")

    const { data: meta, content: mdx } = matter(fileContents)
    const content = await renderToString(mdx, {
        mdxOptions: { rehypePlugins: [prism] },
    })

    return { meta, content }
}
