import React from "react";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import NewsItem from "./NewsItem";
import axios from "axios";

describe("News Item Component", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("render News Item data", async () => {
    const fakeNews = {
      title: "Fake News Title",
      author: "Fake Author",
      image: "https://picsum.photos/200",
      createdDate: "26/4/2021",
      shortDescription: "This is fake news description. Click to view more",
      content: "Fake News Content",
    };

    act(() => {
      render(<NewsItem data={fakeNews} />, container);
    });

    expect(container.querySelector("h3").textContent).toBe(fakeNews.title);
    expect(container.querySelector("p").textContent).toBe(
      fakeNews.shortDescription
    );
  });
});
