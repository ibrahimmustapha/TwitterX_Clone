import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

const App = () => {
  const accountToken = localStorage.getItem("account_token");
  console.log("Account Token: " + accountToken);
  return (
    <Router>
      <Routes>
        <Route path="/" exact index Component={Home} />
        <Route path="/signin" Component={SignUp} />
      </Routes>
    </Router>
  );
};

export default App;
