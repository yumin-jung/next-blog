import { describe, expect, test } from "vitest"
import { getSortedPostsData, getAllPostIds, getPostData } from "./posts"

describe("getSortedPostsData", () => {
  test("should return sorted posts data", () => {
    const sortedPostsData = getSortedPostsData()
    expect(sortedPostsData).toBeDefined()
  })
})

describe("getAllPostIds", () => {
  test("should return all post ids", () => {
    const allPostIds = getAllPostIds()
    expect(allPostIds).toBeDefined()
  })
})

describe("getPostData", () => {
  test("should return post data for a specific id", async () => {
    const postId = "blog-dev-process"
    const postData = await getPostData(postId)
    expect(postData).toBeDefined()
  })
})
