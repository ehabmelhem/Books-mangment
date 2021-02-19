import React, { useState } from "react";
import "./Book.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";

function Book() {
  const [validition, setValid] = useState(false);
  const [typeValid, setTypeValid] = useState("success");
  const [progress, setProg] = useState(false);

  const [b_name, setBname] = useState("");
  const [author_name, setAuthor] = useState("");
  const [year, setYear] = useState(0);
  const submmit_handler = async (e) => {
    e.preventDefault(b_name, author_name, year);
    setProg(true);

    await fetch("/books/add-book", {
      method: "POST",
      body: JSON.stringify({
        book_name: b_name,
        author_name: author_name,
        year: year,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.index === 1) {
          setTypeValid("success");
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
  return (
    <div className="book">
      {validition && (
        <Alert className="valadition" variant="filled" severity={typeValid}>
          {typeValid === "success"
            ? "the book has been add success full"
            : "the book is in the db"}
        </Alert>
      )}
      <form className="flex">
        <TextField
          value={b_name}
          onChange={(e) => {
            setBname(e.target.value);
          }}
          autoComplete="off"
          id="outlined-basic"
          label="Book name"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          value={author_name}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          autoComplete="off"
          id="outlined-basic"
          label="author name"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          autoFocus={true}
          autoComplete="off"
          id="outlined-basic"
          type="number"
          label="year"
          variant="outlined"
        />
        <br />
        <br />
        {progress ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={submmit_handler}
            type="submit"
            disabled={!b_name || !author_name || !year}
            variant="outlined"
            color="primary"
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}

export default Book;
