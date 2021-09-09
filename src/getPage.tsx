import { readFile, readdir, stat } from "fs/promises"
import path from "path"
import matter from "gray-matter"
import renderToString from "next-mdx-remote/render-to-string"
import _glob from "glob"
import { promisify } from "util"
const glob = promisify(_glob)
import prism from "@mapbox/rehype-prism"

const MDX_OPTIONS = { mdxOptions: { rehypePlugins: [prism] } }
const CONTENT_PATH = path.join(process.cwd(), "content")

interface Content {
    meta: Record<string, string>
    content: any
}

export interface ContentFile {
    slug: string[]
    meta: Content["meta"]
}

export const _getContentPaths =
    (getMeta: typeof _getMeta) =>
    async (dir?: string): Promise<ContentFile[]> => {
        const fullDir = path.join(CONTENT_PATH, dir ?? "")
        const allPaths = await readdir(fullDir)

        const paths =
            process.env["NODE_ENV"] === "development"
                ? allPaths
                : allPaths.filter((path) => !path.startsWith("__"))

        const contentPaths = paths.reduce(async (acc, p) => {
            const pStat = await stat(path.join(fullDir, p))
            if (pStat.isDirectory()) {
                return (await acc).concat(await _getContentPaths(getMeta)(p))
            }

            const slugPath = path.join(dir ?? "", p).replace(/\..+$/, "") // drop everything after the last point

            const meta = await getMeta(slugPath)
            ;(await acc).push({ slug: slugPath.split("/"), meta })

            return acc
        }, Promise.resolve([]))

        return contentPaths
    }

export const _getMeta = async (slug: string): Promise<Content["meta"]> => {
    console.log({ getMeta: slug })
    const [filepath] = await glob(`${path.join(CONTENT_PATH, slug)}.md?(x)`)
    if (!filepath) {
        throw `[getMeta] Bad filepath <${slug}>`
    }

    const fileContents = await readFile(filepath, "utf8")
    const { data } = matter(fileContents)

    return {
        ...data,
        titleHtml: data.title
            ? await renderToString(data.title, MDX_OPTIONS)
            : null,
    }
}

export const getContentPaths = _getContentPaths(_getMeta)

export async function getContentFile(slug: string): Promise<Content> {
    const [filepath] = await glob(`${CONTENT_PATH}/${slug}.md?(x)`)
    const fileContents = await readFile(filepath, "utf8")

    const { data, content: mdx } = matter(fileContents)

    if (!data) {
        return Promise.reject(`Missing metadata in <${filepath}>`)
    }

    const content = await renderToString(mdx, MDX_OPTIONS)

    return { meta: data, content }
}
