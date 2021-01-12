import { readFile, readdir } from "fs/promises"
import path from "path"
import matter from "gray-matter"
import _glob from "glob"
import { promisify } from "util"
const glob = promisify(_glob)
import renderToString from "next-mdx-remote/render-to-string"
import prism from "@mapbox/rehype-prism"

const MDX_OPTIONS = { mdxOptions: { rehypePlugins: [prism] } }
const CONTENT_PATH = path.join(process.cwd(), "content")

interface Content {
    meta: Record<string, string>
    content: any
}

export interface ContentFile {
    slug: string
    meta: Content["meta"]
}

export const getContentPaths = async (
    dir = CONTENT_PATH
): Promise<ContentFile[]> => {
    const allPaths = await readdir(dir)
    const paths =
        process.env["NODE_ENV"] === "development"
            ? allPaths
            : allPaths.filter((path) => !path.startsWith("__"))

    return Promise.all(
        paths.map(async (p) => {
            const slug = p.replace(/\..+$/, "")
            const meta = await getMeta(slug)

            return { slug, meta }
        })
    )
}

async function getMeta(slug: string): Promise<Content["meta"]> {
    const [filepath] = await glob(`${CONTENT_PATH}/${slug}.md?(x)`)
    const fileContents = await readFile(filepath, "utf8")

    const { data } = matter(fileContents)

    return {
        ...data,
        titleHtml: data.title
            ? await renderToString(data.title, MDX_OPTIONS)
            : null,
    }
}

export async function getContentFile(slug: string): Promise<Content> {
    const [filepath] = await glob(`${CONTENT_PATH}/${slug}.md?(x)`)
    const fileContents = await readFile(filepath, "utf8")

    const { data: meta, content: mdx } = matter(fileContents)
    const content = await renderToString(mdx, MDX_OPTIONS)

    return { meta, content }
}
