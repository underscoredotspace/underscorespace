import { readdir, stat } from "fs/promises"
import path from "path"

const pathsForEnv = (paths: string[]): string[] =>
    process.env["NODE_ENV"] !== "production"
        ? paths
        : paths.filter((path) => !path.startsWith("__"))

export const getPagePaths = async (
    root: string,
    folder = ""
): Promise<string[]> => {
    const fullFolder = path.join(root, folder)
    const folderContents = await readdir(fullFolder)

    return pathsForEnv(folderContents).reduce(async (acc, item) => {
        const paths = await acc
        const fullPath = path.join(fullFolder, item)

        const pathStat = await stat(fullPath)
        if (pathStat.isDirectory()) {
            return paths.concat(
                await getPagePaths(root, path.join(folder, item))
            )
        }

        return [...paths, path.join(folder, item.replace(/\..+$/, ""))]
    }, Promise.resolve([]))
}
