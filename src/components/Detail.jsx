import React, { useState } from "react";
import { Content } from "styles/theme";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, updateMessage } from "../redux/reducer";

const Detail = () => {
  const { state } = useLocation();
  const [editContext, setEditContext] = useState(state.context);
  const [modalOpen, setModalOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const sendModify = () => {
    setModalOpen(true);
  };

  const editSubmit = () => {
    dispatch(
      updateMessage({
        ...state, // state 안에 있는 모든 데이터를 updatedData로 복사
        context: editContext, // context만 새로운 값으로 덮어쓰기
      })
    );
    setModalOpen(false);
  };

  const handleEdit = (e) => {
    setEditContext(e.target.value);
  };

  const sendDelete = () => {
    const confirmation = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmation) {
      dispatch(deleteMessage(state.id));
      window.location.href = "/"; // 홈 페이지로 이동
    }
  };

  return (
    <>
      <Content>
        <CardBox>
          <h3>to. {state.selectBox}</h3>
          <p>{editContext}</p>
          <span>
            {new Date(state.createdAt).toLocaleDateString("ko", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <Nickname>{state.nickname}</Nickname>
          <BackButton
            onClick={() => {
              window.location.href = "/";
            }}
          >
            뒤로가기
          </BackButton>
          {auth.userId === state.userId && (
            <div>
              <CardButton onClick={sendModify}>수정</CardButton>
              <CardButton onClick={sendDelete}>삭제</CardButton>
            </div>
          )}
        </CardBox>
      </Content>

      {modalOpen && (
        <ModalBackGround onSubmit={editSubmit}>
          <ModalContent>
            <textarea value={editContext} onChange={handleEdit} />
            <CardButton type="submit">수정하기</CardButton>
          </ModalContent>
        </ModalBackGround>
      )}
    </>
  );
};

export default Detail;

export const CardBox = styled.section`
  width: 80%;
  height: 80%;
  position: relative;
  background-color: #3b1d20;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 2rem auto;
  padding: 2rem;
  > h3 {
    font-family: "Cedarville Cursive", cursive;
    font-size: 3rem;
    margin: 1rem 0 0 0;
  }
  > p {
    font-size: 1.5rem;
    padding: 5rem 10rem 2rem;
  }
  > span {
    display: inline-block;
    margin: 2rem 0 5rem;
  }
  > div {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    > button {
      width: 20%;
    }
  }
`;
export const Nickname = styled.strong`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;
export const ModalBackGround = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContent = styled.div`
  position: absolute;
  right: 15%;
  top: 50%;
  transform: translateY(-40%);
  display: flex;
  justify-content: space-between;
  width: 25rem;
  height: 25rem;
  flex-direction: column;
  background-color: #dadada;
  border-radius: 10px;
  > textarea {
    box-sizing: border-box;
    height: 50%;
    resize: none;
    font-size: 1.5rem;
    font-family: "GmarketSansMedium";
  }
`;

export const CardButton = styled.button`
  background-color: #f8eeae;
  border-radius: 10px;
  padding: 0.5rem;
  font-family: "GmarketSansMedium";
  border: none;
  margin: 3px;
  &:hover {
    background-color: #6f6629;
    transition: all 1s;
    color: white;
  }
`;
export const BackButton = styled.strong`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
`;
