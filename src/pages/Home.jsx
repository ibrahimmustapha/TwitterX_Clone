import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import MiddleBar from "../components/MiddleBar";

const Home = () => {
  const accountToken = localStorage.getItem("account_token");
  if (accountToken === null) {
    return <Navigate replace to="/signin" />;
  } 
  return (
    <Layout>
      <MiddleBar />
    </Layout>
  );
};

export default Home;
