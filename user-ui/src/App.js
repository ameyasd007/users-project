import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/user">User here</Route>
          <Route path="/">
            <ListPage></ListPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
