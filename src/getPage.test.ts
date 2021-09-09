import * as getPage from "./getPage"

const mockGetMeta = jest.fn((slug: string) => {
    console.log("mockGetMeta", slug)
    return Promise.resolve({})
})

describe("getContentPaths", () => {
    const getContentPaths = getPage._getContentPaths(mockGetMeta)

    test("should idk", async () => {
        const paths = await getContentPaths()

        expect(paths).toMatchObject([
            {
                slug: ["about-me"],
                meta: expect.any(Object),
            },
            {
                meta: expect.any(Object),
                slug: ["blog", "async-await"],
            },
            {
                meta: expect.any(Object),
                slug: ["index"],
            },
        ])
        expect(mockGetMeta).toBeCalledTimes(3)
    })
})
