import { render, screen } from "@testing-library/react";
import SavedPage from "@/app/dashboard/saved/page";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
// import { userEvent } from "@testing-library/user-event";

test("shows empty state when no saved articles", () => {
  render(
    <SavedArticlesContext.Provider
      value={{ savedArticles: [], setSavedArticles: jest.fn() }}
    >
      <SavedPage />
    </SavedArticlesContext.Provider>,
  );
  const emptyText = screen.getByText("No saved articles yet");
  expect(emptyText).toBeInTheDocument();
});

test("renders saved articles", () => {
  const mockArticle = [
    {
      id: "1",
      title: "Saved Article",
      source: "Test Source",
      publishedAt: "2024",
      summary: "Test Summary",
      tags: ["AI"],
    },
  ];
  render(
    <SavedArticlesContext.Provider
      value={{ savedArticles: mockArticle, setSavedArticles: jest.fn() }}
    >
      <SavedPage />
    </SavedArticlesContext.Provider>,
  );

  const article = screen.getByText("Saved Article");
  expect(article).toBeInTheDocument;
});
