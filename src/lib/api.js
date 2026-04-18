export const fetchArticles = async (query = "AI") => {
  const res = await fetch(`/api/articles?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  console.log("API RESPONSE:", data);

  return (data.data?.articles || [])
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
