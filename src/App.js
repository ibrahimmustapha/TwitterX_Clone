import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Trends from "./pages/Trends";
import FullTweet from "./pages/FullTweet";

const App = () => {
  const accountToken = localStorage.getItem("account_token");
  // console.log("Account Token: " + accountToken);
  return (
    <Router>
      <Routes>
        <Route path="/" exact index Component={Home} />
        <Route path="/trends" Component={Trends} />
        <Route path="/:username/status/:uid" Component={FullTweet} />
        <Route path="/signin" Component={SignUp} />
      </Routes>
    </Router>
  );
};

export default App;
