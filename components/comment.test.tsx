import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Comment from "./comment"

describe("Comment", () => {
  it("should render comment", () => {
    render(<Comment />)
    expect(screen.getAllByTestId("giscus-comment")).toBeDefined()
  })
})
