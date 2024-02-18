import { describe, expect, test } from "vitest";
import { cn } from "./utils";

describe('cn', () => {
    test('should return tailwind-merge', () => {
        const sortedPostsData = cn()
        expect(sortedPostsData).toBeDefined()
    })
})