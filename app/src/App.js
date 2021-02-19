import "./App.css";
import Book from "./Compents/Book";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from "./Compents/Search";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/search-book">
            <Search />
          </Route>
          <Router path="/add-book">
            <Book />
          </Router>
          <Route path="/">
            <div className="firstpage">
              <Link to="/add-book">
                <Button className="btn" variant="outlined" color="primary">
                  Add Book
                </Button>
              </Link>
              <Link to="/search-book">
                <Button className="btn" variant="outlined" color="primary">
                  Search Book
                </Button>
              </Link>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
