import * as getPage from "./getPage"

const mockGetMeta = jest.fn((slug: string) => Promise.resolve({ slug }))

describe("getContentPaths", () => {
    const getContentPaths = getPage._getContentPaths(mockGetMeta)

    test("should idk", async () => {
        const paths = await getContentPaths()

        expect(paths).toMatchObject([
            {
                slug: ["about-me"],
                meta: { slug: "about-me" },
            },
            {
                meta: { slug: "blog/async-await" },
                slug: ["blog", "async-await"],
            },
            {
                meta: { slug: "index" },
                slug: ["index"],
            },
        ])
        expect(mockGetMeta).toBeCalledTimes(3)
    })
})
