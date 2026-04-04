import { render, screen } from "@testing-library/react";
import { ArticlesClient } from "@/components/ArticlesClient";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";

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
