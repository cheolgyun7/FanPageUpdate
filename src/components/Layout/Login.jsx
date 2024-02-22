import React from "react";
import { useState } from "react";
import { Content } from "styles/theme";
import styled from "styled-components";
import { login } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useForm from "hooks/useForm";
import { authApi } from "api";

const Login = () => {
  const [isLogined, setIsLogined] = useState(true);
  const dispatch = useDispatch();

  const { formState, handleChange, resetForm } = useForm({
    id: "",
    password: "",
    nickname: "",
  });
  const { id, password, nickname } = formState;
  const togglePage = () => {
    setIsLogined(!isLogined);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogined) {
        const { data } = await authApi.post("/login", {
          id,
          password,
        });
        const { accessToken, avatar, nickname, userId } = data;
        if (data.success) {
          dispatch(login({ accessToken, avatar, nickname, userId }));
          setIsLogined(true);
          toast.success("로그인에 성공하셨습니다");
          resetForm();
        }
      } else {
        const { data } = await authApi.post("/register", {
          id,
          password,
          nickname,
        });
        if (data.success) {
          resetForm();
          toast.success("회원가입성공");
        }
      }
    } catch (error) {
      if (isLogined) {
        toast.error("로그인 실패", error.message); // 실패 시 에러 메시지 출력
      } else {
        toast.error("회원가입 실패", error.message); // 실패 시 에러 메시지 출력
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
              value={formState.id || ""}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              placeholder="비밀번호(4~10글자)"
              name="password"
              value={formState.password || ""}
              onChange={handleChange}
            />
            <br />
            {!isLogined && (
              <input
                type="text"
                placeholder="닉네임(4~10글자)"
                name="nickname"
                value={formState.nickname}
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
