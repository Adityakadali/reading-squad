import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Dashboard = () => {
  const API_URI = "https://www.googleapis.com/books/v1/volumes?";
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [booksdata, setBooksdata] = useState("");
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });
  const fetchbooks = async () => {
    const { data } = await axios({
      url: API_URI,
      method: "get",
      params: {
        q: query,
        fields:
          "kind,totalItems,items(id,selfLink,volumeInfo(title,authors,description,pageCount,averageRating,imageLinks))",
        startIndex: page * 20,
        maxResults: 20,
      },
    });
    setBooksdata(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchbooks();
  };

  useEffect(() => {
    if (page != 1) fetchbooks();
  }, [page]);

  // TODO Need to style element

  return (
    <div className="container mx-auto mt-4">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          className="rounded-sm border px-3 py-2 focus:ring-2"
          type="search"
          placeholder="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="rounded-sm bg-black px-3 py-2 font-bold text-white">
          Find book
        </button>
      </form>

      {booksdata ? (
        <div className="mt-4">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>author</th>
                <th>rating</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {booksdata.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.volumeInfo?.title}</td>
                  <td>{formatter.format(item.volumeInfo?.authors)}</td>
                  <td>{item.volumeInfo?.averageRating}</td>
                  <td>
                    <button className="bg-black px-3 py-2 font-bold text-white">
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="gont-bold bg-cyan-900 px-3 py-2 text-white"
            onClick={(e) => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
