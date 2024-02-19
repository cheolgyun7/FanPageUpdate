import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Img from "./Img";
import { FlexAllbox, Article } from "styles/theme";

const Layout = ({ children }) => {
  return (
    <FlexAllbox>
      <Img />
      <Article>
        <Header />
        {children}
        <Footer />
      </Article>
    </FlexAllbox>
  );
};

export default Layout;
