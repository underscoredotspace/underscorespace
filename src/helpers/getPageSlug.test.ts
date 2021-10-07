import { getPageSlug } from "./getPageSlug"

describe("getPageSlug", () => {
    test("should return page slug", () => {
        expect(getPageSlug("blog/archive/old-post.md")).toEqual([
            "blog",
            "archive",
            "old-post",
        ])
    })
})
