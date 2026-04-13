import { render, screen } from "@testing-library/react";
import { ArticlesClient } from "@/components/ArticlesClient";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
import { userEvent } from "@testing-library/user-event";
import { fetchArticles } from "@/lib/api";

jest.mock("../lib/api", () => ({
  fetchArticles: jest.fn(
    () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: "1",
                title: "Test Article",
                source: "Test Source",
                publishedAt: "2024",
                summary: "Test summary",
                tags: ["AI"],
              },
            ]),
          200,
        ),
      ),
  ),
}));

test("renders search input", () => {
  render(
    <SavedArticlesContext.Provider
      value={{ savedArticles: [], setSavedArticles: jest.fn() }}
    >
      <ArticlesClient />
    </SavedArticlesContext.Provider>,
  );
  const input = screen.getByPlaceholderText("Search by title or source");
  expect(input).toBeInTheDocument();
});

test("clicking search button shows loading text", async () => {
  render(
    <SavedArticlesContext.Provider
      value={{ savedArticles: [], setSavedArticles: jest.fn() }}
    >
      <ArticlesClient />
    </SavedArticlesContext.Provider>,
  );
  const input = screen.getByPlaceholderText("Search by title or source");
  await userEvent.type(input, "react");
  const button = screen.getByText("Search Article");
  await userEvent.click(button);
  const loadingText = await screen.findByText("Searching...");
  expect(loadingText).toBeInTheDocument();
});

test("checking if articles appear on search", async () => {
  render(
    <SavedArticlesContext.Provider
      value={{ savedArticles: [], setSavedArticles: jest.fn() }}
    >
      <ArticlesClient />
    </SavedArticlesContext.Provider>,
  );
  const input = screen.getByPlaceholderText("Search by title or source");
  await userEvent.type(input, "react");
  const button = screen.getByText("Search Article");
  await userEvent.click(button);
  const article = await screen.findByText("Test Article");
  expect(article).toBeInTheDocument;
});

import { fetchArticles } from "@/lib/api";

test("shows empty state when no articles found", async () => {
  fetchArticles.mockResolvedValueOnce([]); // override mock
  render(
    <SavedArticlesContext.Provider
      value={{ savedArticles: [], setSavedArticles: jest.fn() }}
    >
      <ArticlesClient />
    </SavedArticlesContext.Provider>,
  );
  const input = screen.getByPlaceholderText("Search by title or source");
  await userEvent.type(input, "react");
  const button = screen.getByText("Search Article");
  await userEvent.click(button);
  const emptyText = await screen.findByText(/No results/i);
  expect(emptyText).toBeInTheDocument();
});

test("clicking save adds the article to savedArticles", async () => {
  const setSavedArticles = jest.fn();

  render(
    <SavedArticlesContext.Provider
      value={{ savedArticles: [], setSavedArticles }}
    >
      <ArticlesClient />
    </SavedArticlesContext.Provider>,
  );
  const input = screen.getByPlaceholderText("Search by title or source");
  await userEvent.type(input, "react");
  const button = screen.getByText("Search Article");
  await userEvent.click(button);
  const article = await screen.findByText("Test Article");
  const saveButtons = await screen.findAllByText("Save");
  await userEvent.click(saveButtons[0]);
  expect(setSavedArticles).toHaveBeenCalledTimes(1);
});
