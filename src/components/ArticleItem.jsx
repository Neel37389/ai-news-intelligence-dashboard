export const ArticleItem = ({ item, savedIds, toggleSave }) => {
  return (
    <li>
      <div>
        <h1>{item.title}</h1>
        <p>{item.source}</p>
      </div>
      <button onClick={() => toggleSave(item.id)}>
        {savedIds.includes(item.id) ? "Saved" : "Save"}
      </button>
    </li>
  );
};
