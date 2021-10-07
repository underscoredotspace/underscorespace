import { readFile } from "fs/promises"
import _glob from "glob"
import { promisify } from "util"
const glob = promisify(_glob)
import matter from "gray-matter"
import renderToString from "next-mdx-remote/render-to-string"
import { CONTENT_PATH, MDX_OPTIONS } from "../constants"

export const getPage = async (path: string): Promise<any> => {
    const [filepath] = await glob(`${CONTENT_PATH}/${path}.md?(x)`)
    const fileContents = await readFile(filepath, "utf8")

    const { content: mdx } = matter(fileContents)

    const content = await renderToString(mdx, MDX_OPTIONS)

    return content
}
