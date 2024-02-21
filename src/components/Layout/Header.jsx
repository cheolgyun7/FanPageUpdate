import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderBox } from "styles/theme";

const Header = () => {
  const navigate = useNavigate();
  const movingHome = () => {
    navigate("/");
  };
  return (
    <HeaderBox>
      <p onClick={movingHome}>AESPA FAN PAGE</p>
      <p>NEXT LEVEL</p>
    </HeaderBox>
  );
};

export default Header;
