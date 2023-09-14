import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import RightBar from "../components/RightBar";

const Trends = () => {
  const accountToken = localStorage.getItem("account_token");

  if (accountToken === null) {
    return <Navigate replace to="/signin" />;
  } 

  return (
    <Layout>
      <RightBar />
    </Layout>
  );
};

export default Trends;
