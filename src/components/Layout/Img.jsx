import React from "react";
import aespa1 from "assets/aespa1.png";
import { ImgFile } from "styles/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Img = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isLogin = auth.logging;
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleMypage = () => {
    navigate("/mypage");
  };
  return (
    <ImgFileBox>
      <ImgFile src={aespa1} alt="앨범1" />
      {isLogin ? (
        <p>
          <span onClick={handleMypage}>마이페이지 /</span>
          <span onClick={handleLogout}> 로그아웃</span>
          <br />
          <strong>{auth.nickname} 님 환영합니다</strong>
        </p>
      ) : (
        <p>
          <span>로그인</span>
          <span>/</span>
          <span>회원가입</span>
        </p>
      )}
    </ImgFileBox>
  );
};

export default Img;

export const ImgFileBox = styled.div`
  position: relative;
  p {
    position: absolute;
    right: 0;
    top: 0;
    color: white;
    padding: 0.5rem;
    span {
      &:first-of-type {
        &:hover {
          color: #ffff1d;
          cursor: pointer;
        }
      }
      &:last-of-type {
        &:hover {
          color: red;
          cursor: pointer;
        }
      }
    }
  }
`;
