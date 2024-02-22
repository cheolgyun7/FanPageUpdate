import React from "react";
import { SendForm } from "styles/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __addLetter, newMessage } from "../redux/reducer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const SendPage = () => {
  const { userId, avatar, nickname } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const context = e.target.context.value;
    const selectBox = e.target.select.value;
    if (!title && !context && !selectBox) {
      alert("닉네임을 입력하세요");
      return;
    }
    if (!title) {
      alert("닉네임을 입력하세요");
      return;
    }
    if (!context) {
      alert("내용을 입력하세요");
      return;
    }
    if (!selectBox) {
      alert("수신인을 선택하세요");
      return;
    }
    const newLetter = {
      id: uuidv4(),
      nickname,
      title,
      context,
      selectBox,
      userId,
      avatar,
      createAt: new Date().toISOString(),
    };
    e.target.reset();
    dispatch(__addLetter(newLetter));
  };
  return (
    <>
      <SendForm onSubmit={formSubmit}>
        <Section>
          <Label>제목 : </Label>
          <input
            type="text"
            name="title"
            style={{
              width: "50%",
              padding: "0.5rem",
            }}
          />
        </Section>
        <Section>
          <Label>내용 : </Label>
          <Textarea name="context" />
        </Section>
        <Section>
          <Label>수신인 : </Label>
          <select name="select">
            <option value="">선택</option>
            <option value="Karina">카리나</option>
            <option value="Winter">윈터</option>
            <option value="Giselle">지젤</option>
            <option value="Ningning">닝닝</option>
          </select>
          <button type="submit">보내기</button>
        </Section>
      </SendForm>
    </>
  );
};

export default SendPage;

export const Section = styled.section`
  display: flex;
  margin-bottom: 1rem;
`;
export const Label = styled.label`
  width: 5rem;
  display: flex;
  align-items: center;
`;
export const Textarea = styled.textarea`
  padding: 0.5rem;
  width: 50%;
  height: 6rem;
  resize: none;
`;
