import { useEffect, useState } from "react";
import TopicList from "./components/TopicList";
import TopicItem from "./components/TopicItem";
import TopicInfo from "./components/TopicInfo";
import TopicTitle from "./components/TopicTitle";
import TopicStats from "./components/TopicStats";
import TopicStat from "./components/TopicStat";
import TopicDate from "./components/TopicDate";
import TopicPosters from "./components/TopicPosters";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Loading from "./components/Loading";

const forumUrl = "https://forum.freecodecamp.com";
const apiUrl = "https://forum-proxy.freecodecamp.rocks/latest";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [y, setY] = useState(window.scrollY);
  const [menuVisible, setMenuVisible] = useState(false);

  const fetchData = async () => {
    setIsLoaded(false);
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    setData(jsonData);
    setIsLoaded(true);
  };

  const handleScroll = () => {
    setY(window.scrollY);
    if (window.scrollY > y) {
      setMenuVisible(false);
    } else {
      setMenuVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [y]);

  useEffect(() => {
    fetchData();
  }, []);

  const getUserFromUserId = (userId) => {
    const user = data["users"].find((user) => userId === user.id);
    return user;
  };

  const getLastPoster = (topic) => {
    const poster = topic.posters.find((poster) =>
      poster.extras?.includes("latest")
    ).user_id;
    return getUserFromUserId(poster);
  };

  let topicList = [];
  if (isLoaded) {
    topicList = data["topic_list"]["topics"].map((topic) => (
      <TopicItem key={topic.id}>
        <TopicInfo>
          <TopicTitle>
            <a href={`${forumUrl}/t/${topic.slug}/${topic.id}`}>
              {topic.title}
            </a>
          </TopicTitle>
          <TopicStats>
            <TopicStat>
              <div>👁 Views</div>
              <div>{topic.views}</div>
            </TopicStat>
            <TopicStat>
              <div>❤ Likes</div>
              <div>{topic.like_count}</div>
            </TopicStat>
            <TopicStat>
              <div>🗨 Replies</div>
              <div>{topic.reply_count}</div>
            </TopicStat>
          </TopicStats>
        </TopicInfo>
        <TopicDate topic={topic}></TopicDate>
        <TopicPosters
          forumUrl={forumUrl}
          topic={topic}
          getLastPoster={getLastPoster}
          getUserFromUserId={getUserFromUserId}
        ></TopicPosters>
      </TopicItem>
    ));
  }

  return (
    <>
      <Header></Header>
      {isLoaded ? (
        <TopicList>
          {topicList}
          <p>
            <a href={forumUrl}>See more on FreeCodeCamp Forum</a>
          </p>
        </TopicList>
      ) : (
        <Loading></Loading>
      )}
      <Menu
        refresh={fetchData}
        visible={menuVisible}
        ontop={y < 1 ? true : false}
        isLoaded={isLoaded}
      ></Menu>
      <footer style={{ textAlign: "center", padding: "10px" }}>
        <a style={{ color: "#e6e2ff" }} href="">
          Source
        </a>
      </footer>
    </>
  );
};

export default App;
