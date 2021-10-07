jest.mock("fs/promises")
import { readdir, stat } from "fs/promises"
const mockReaddir = readdir as jest.Mock
const mockStat = stat as jest.Mock

import { getPagePaths } from "./getPagePaths"

describe("getPagePaths", () => {
    const isFolder = (is: boolean) => ({ isDirectory: () => is })
    mockStat
        .mockResolvedValueOnce(isFolder(false)) // file1.mdx
        .mockResolvedValueOnce(isFolder(true)) // a-folder
        .mockResolvedValueOnce(isFolder(false)) // file3.mdx
        .mockResolvedValueOnce(isFolder(false)) // file4.md
        .mockResolvedValueOnce(isFolder(true)) // sub-folder
        .mockResolvedValueOnce(isFolder(false)) // file2.md

    mockReaddir
        .mockResolvedValueOnce(["file1.mdx", "a-folder", "file2.md"])
        .mockResolvedValueOnce(["file3.mdx", "file4.md", "sub-folder"])
        .mockResolvedValueOnce([])

    test("should return valid paths", async () => {
        const result = await getPagePaths("root")

        expect(result).toEqual([
            "file1.mdx",
            "a-folder/file3.mdx",
            "a-folder/file4.md",
            "file2.md",
        ])

        expect(mockReaddir).toHaveBeenCalledWith("root")
        expect(mockReaddir).toHaveBeenCalledWith("root/a-folder")
        expect(mockReaddir).toHaveBeenCalledWith("root/a-folder/sub-folder")
    })
})
