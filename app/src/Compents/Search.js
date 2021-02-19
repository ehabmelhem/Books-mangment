import React, { useState } from "react";
import "./Search.css";
import BookResult from "./BookResult";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";
function Search() {
  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [validition, setValid] = useState(false);
  const [typeValid, setTypeValid] = useState("success");
  const [progress, setProg] = useState(false);
  const [progress1, setProg1] = useState(false);
  const [allres, setAll] = useState([]);
  const submitName_handler = async (e) => {
    e.preventDefault();
    setProg(true);

    await fetch("/books/serach-by-name", {
      method: "POST",
      body: JSON.stringify({
        name: book,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.index === 1) {
          setTypeValid("success");
          setAll([...data.data]);
        } else {
          setTypeValid("error");
        }
      });
    setProg(false);
    setValid(true);
    setTimeout(() => {
      setValid(false);
    }, 3000);
  };
  const submitByauthor = async (e) => {
    e.preventDefault();
    setProg1(true);

    await fetch("/books/search-by-author", {
      method: "POST",
      body: JSON.stringify({
        author: author,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.index === 1) {
          setTypeValid("success");
          setAll([...data.data]);
        } else {
          setTypeValid("error");
        }
      });
    setProg1(false);
    setValid(true);
    setTimeout(() => {
      setValid(false);
    }, 3000);
  };
  return (
    <div className="results">
      {validition && (
        <Alert className="searchvalid" variant="filled" severity={typeValid}>
          {typeValid === "success"
            ? "The search has been good"
            : "The search has been bad"}
        </Alert>
      )}
      <div className="search">
        <form className="form">
          <TextField
            value={book}
            onChange={(e) => {
              setBook(e.target.value);
            }}
            autoComplete="off"
            id="outlined-basic"
            label="Book name"
            variant="outlined"
          />
          <br />
          <br />
          {progress ? (
            <CircularProgress />
          ) : (
            <Button
              disabled={!book}
              onClick={submitName_handler}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
          )}
        </form>
        <form className="form">
          <TextField
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            autoComplete="off"
            id="outlined-basic"
            label="Author name"
            variant="outlined"
          />
          <br />
          <br />
          {progress1 ? (
            <CircularProgress />
          ) : (
            <Button
              disabled={!author}
              onClick={submitByauthor}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
          )}
        </form>
      </div>
      <div className="books_result">
        {allres.map((book, index) => {
          return (
            <BookResult
              key={index}
              name={book.name}
              author={book.author_name}
              year={book.year}
              id={book._id}
              setAll={setAll}
              all={allres}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Search;
