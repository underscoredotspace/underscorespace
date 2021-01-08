import { readFile, readdir } from "fs/promises"
import path from "path"
import matter from "gray-matter"
import _glob from "glob"
import { promisify } from "util"
const glob = promisify(_glob)
import renderToString from "next-mdx-remote/render-to-string"

const CONTENT_PATH = path.join(process.cwd(), "content")

export async function getContentFiles(): Promise<string[]> {
    return readdir(CONTENT_PATH).then((paths) =>
        paths
            .map((path) => path.replace(/\..+$/, ""))
            .filter((path) => !path.startsWith("__"))
    )
}

interface Content {
    data: Record<string, string>
    content: string
}

export async function getContentFile(slug: string): Promise<Content> {
    const [filepath] = await glob(`${CONTENT_PATH}/${slug}.md?(x)`)
    const fileContents = await readFile(filepath, "utf8")

    const { data, content: mdx } = matter(fileContents)
    const content = await renderToString(mdx)

    return { data, content }
}
