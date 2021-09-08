import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ListPage from "./pages/ListPage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import UserPage from "./pages/UserPage";

const styles = {
  link: {
    marginLeft: "20px",
    color: "white",
  },
};

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar>
          <Toolbar>
            <Link to="/user" style={styles.link}>
              Add new user
            </Link>
            <Link to="/" style={styles.link}>
              User List
            </Link>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/user">
            <UserPage></UserPage>
          </Route>
          <Route path="/">
            <ListPage></ListPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
