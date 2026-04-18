export const fetchArticles = async (query = "AI") => {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
  );
  const data = await res.json();
  console.log(data);
  return data.articles
    .filter((a) => a.url)
    .map((article) => ({
      id: article.url,
      title: article.title || "No title",
      source: article.source?.name || "Unknown",
      publishedAt: article.publishedAt,
      summary: article.description || "No summary available",
      tags: ["AI"],
    }));
};
