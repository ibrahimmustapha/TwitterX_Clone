import Layout from "../components/Layout";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CarOutlined,
  ConsoleSqlOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import PersonalTweets from "../components/Tweets/PersonalTweets";

const Profile = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const uid = localStorage.getItem("uid");
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

  console.log(user);
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
        <img
          className="w-full"
          src="https://pbs.twimg.com/profile_banners/1412524873319129100/1655071263/600x200"
          alt="cover"
        />
        <div className=" border-b-[1px] border-slate-500 pb-5">
          {user.map((data) => (
            <div>
              <img
                className=" w-32 rounded-full mx-5 -mt-16 border-4 border-transparent"
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
                <div className="flex gap-10 items-end my-3">
                  <div className="flex gap-4 items-end text-slate-500">
                    <CarOutlined className="text-xl" />
                    Accra, Ghana
                  </div>
                  <div className="flex gap-4 items-end text-slate-500">
                    <LinkOutlined className="text-xl" />
                    <Link to={`spotify.com`}>spotify.com</Link>
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
