import React from "react";
import { useState } from "react";
import { Content } from "styles/theme";
import styled from "styled-components";
import { login } from "../../redux/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const [isLogined, setIsLogined] = useState(true);
  const dispatch = useDispatch();
  const [signUpFormData, setSignUpFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const togglePage = () => {
    setIsLogined(!isLogined);
  };
  const handleChange = (e) => {
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogined) {
        const response = await axios.post(
          "https://moneyfulpublicpolicy.co.kr/login",
          {
            id: signUpFormData.id,
            password: signUpFormData.password,
          }
        );
        console.log("로그인 성공", response.data);
        dispatch(login(response.data));
        setIsLogined(true);
        toast.success("로그인에 성공하셨습니다");
        setSignUpFormData("");
      } else {
        const response = await axios.post(
          "https://moneyfulpublicpolicy.co.kr/register",
          signUpFormData
        );
        console.log("성공", response.data);
      }
    } catch (error) {
      if (isLogined) {
        toast.error("로그인 실패", error.message); // 실패 시 에러 메시지 출력
      } else {
        console.error("회원가입 실패", error.message); // 실패 시 에러 메시지 출력
      }
    }
  };
  return (
    <Content>
      <SignBox>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>{isLogined ? "login" : "Register"}</h3>
            <input
              type="text"
              placeholder="아이디(4~10글자)"
              name="id"
              value={signUpFormData.id || ""}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              placeholder="비밀번호(4~10글자)"
              name="password"
              value={signUpFormData.password || ""}
              onChange={handleChange}
            />
            <br />
            {!isLogined && (
              <input
                type="text"
                placeholder="닉네임(4~10글자)"
                name="nickname"
                value={signUpFormData.nickname}
                onChange={handleChange}
              />
            )}
            <br />
            {isLogined ? (
              <button type="submit">로그인</button>
            ) : (
              <button type="submit">회원가입</button>
            )}

            <br />
            {isLogined ? (
              <span onClick={togglePage}>회원가입으로</span>
            ) : (
              <span onClick={togglePage}>로그인으로</span>
            )}
          </div>
        </form>
      </SignBox>
    </Content>
  );
};

export default Login;

export const SignBox = styled.div`
  padding: 2rem;
  /* background-color: red; */
  input {
    border: none;
    border-bottom: 1px solid black;
    width: 100%;
    padding: 0.5rem 0;
    margin: 0.5rem 0;
  }
  button {
    width: 100%;
    padding: 1rem 0;
    margin: 1rem 0;
  }
  span {
    display: block;
    text-align: center;
    &:hover {
      color: #ff5e00;
    }
  }
`;
