import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        const userdata = res.data;
        setData(userdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Calculate the indices for the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {currentItems.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(data.length / itemsPerPage) },
          (_, index) => (
            <button
              className={currentPage === index + 1 ? "active" : ""}
              key={index + 1}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
