import React, { useState } from "react";
import "./BookResult.css";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
function BookResult({ name, author, year, setAll, all, id }) {
  const [progress, setProg] = useState(false);

  const delete_handler = async (e) => {
    setProg(true);
    await fetch("/books/remove-book", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        author_name: author,
        year: year,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
    setProg(false);
    setAll(
      all.filter((book) => {
        if (book._id !== id) return book;
      })
    );
  };
  return (
    <div className="result">
      <h3>name: {name}</h3>
      <h3>author: {author}</h3>
      <h3>year: {year}</h3>

      {progress ? (
        <CircularProgress color="secondary" />
      ) : (
        <IconButton onClick={delete_handler} color="secondary">
          <DeleteForeverIcon />
        </IconButton>
      )}
    </div>
  );
}

export default BookResult;
