import _glob from "glob"
import { promisify } from "util"
const glob = promisify(_glob)
import path from "path"
import { readFile } from "fs/promises"
import matter from "gray-matter"
import { CONTENT_PATH } from "../constants"

type PageMeta = Record<string, string>

export const getPageMeta = async (file: string): Promise<PageMeta> => {
    const fullPath = path.join(CONTENT_PATH, file)

    const [filepath] = await glob(`${fullPath}.md?(x)`)
    if (!filepath) {
        return Promise.reject(`[getPageMeta] file <${fullPath}> not found`)
    }

    const fileContents = await readFile(filepath, "utf8")
    const { data } = matter(fileContents)

    return data
}
