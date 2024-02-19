import React from "react";
import { Content } from "styles/theme";
import SendPage from "./SendPage";
import SendList from "./SendList";
import MemberList from "./MemberList";

const Home = () => {
  return (
    <Content>
      <MemberList />
      <SendPage />
      <SendList />
    </Content>
  );
};

export default Home;
