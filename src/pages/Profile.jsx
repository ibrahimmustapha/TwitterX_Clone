import Layout from "../components/Layout";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CarOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import PersonalTweets from "../components/Tweets/PersonalTweets";

const Profile = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const uid = localStorage.getItem("uid");
  const accountToken = localStorage.getItem("account_token");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "user"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const tempUser = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tempUser.push(data);
        });
        setUser(tempUser);
      } catch (error) {
        console.log("Error fetching user: ", error);
      }
    });
  }, [uid]);

  if (accountToken === null) {
    return <Navigate replace to="/signin" />;
  }
  return (
    <Layout>
      <div className="md:border-x-[1px] border-slate-600 h-full pb-20">
        <div
          className="flex items-center gap-10 p-5"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined className=" text-xl" />
          <div className=" text-xl font-medium">{name}</div>
        </div>
        <div className="w-full bg-black h-44"></div>
        <div className=" border-b-[1px] border-slate-500 pb-2">
          {user.map((data) => (
            <div>
              <img
                className=" w-24 rounded-full mx-5 -mt-12 border-4 border-slate-800"
                src={data?.avatar}
                alt="profile"
              />
              <div className="m-5 ">
                <div className="font-bold text-white text-lg">{data.name}</div>
                <div className=" text-slate-500 mb-5">@{data.username}</div>
                <div>
                  Software Developer🐢• Student && Technical writer → Become a
                  better developer through my tweets | DMs are open
                </div>
                <div className="flex md:gap-10 gap-5 items-end my-3 flex-wrap">
                  <div className="flex gap-3 items-end text-slate-500">
                    <CarOutlined className="text-xl" />
                    Accra, Ghana
                  </div>
                  <div className="flex gap-4 items-end text-slate-500">
                    <LinkOutlined className="text-xl" />
                    <Link to={`https://spotify.com`} className="text-blue-400">
                      spotify.com
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-4 items-end text-slate-500">
                    <CalendarOutlined className="text-xl" />
                    <div>
                      {data.joined?.toDate().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="flex gap-2 items-center">
                    <div>500</div>
                    <div className="text-slate-500">Following</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>22.4k</div>
                    <div className="text-slate-500">Followers</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <PersonalTweets />
      </div>
    </Layout>
  );
};

export default Profile;
