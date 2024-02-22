import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Content } from "styles/theme";
import { updateProfile } from "../../redux/authSlice";
import axios from "axios";

const Mypage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNickname, setUpdatedNickname] = useState(auth.nickname);
  const [updatedUserId, setUpdatedUserId] = useState(auth.userId);

  const fileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedNickname(auth.nickname);
    setUpdatedUserId(auth.userId);
  };

  const handleEditComplete = async () => {
    if (window.confirm("수정하시겠습니까?")) {
      try {
        const updatedData = {
          nickname: updatedNickname,
          userId: updatedUserId,
        };
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.patch(
          "https://moneyfulpublicpolicy.co.kr/profile",
          updatedData,
          config
        );
        dispatch(updateProfile(response));
        localStorage.setItem("nickname", updatedNickname);
        localStorage.setItem("userId", updatedUserId);
      } catch (error) {
        console.error("프로필 업데이트에 실패했습니다.", error);
      }
    }
    setIsEditing(false);
  };

  return (
    <Content>
      <h3>마이페이지</h3>
      <MypageBox>
        <p>
          <img src={selectedFile || auth.avatar} alt="Avatar Preview" />
          <input type="file" onChange={fileSelect} />
        </p>
        <label htmlFor="nickname">닉네임 :</label>
        <MypageBoxInput
          type="text"
          id="nickname"
          value={isEditing ? updatedNickname : auth.nickname}
          minLength="4"
          maxLength="10"
          onChange={(e) => setUpdatedNickname(e.target.value)}
          readOnly={!isEditing}
        />
        <br />
        <label htmlFor="userId">유저ID :</label>
        <MypageBoxInput
          type="text"
          id="userId"
          value={isEditing ? updatedUserId : auth.userId}
          minLength="4"
          maxLength="10"
          onChange={(e) => setUpdatedUserId(e.target.value)}
          readOnly={!isEditing}
        />
        <br />
        {isEditing ? (
          <>
            <button onClick={handleEditComplete}>수정 완료</button>
            <button onClick={handleCancelEdit}>취소</button>
          </>
        ) : (
          <button onClick={handleEdit}>수정</button>
        )}
      </MypageBox>
    </Content>
  );
};

export default Mypage;
export const MypageBox = styled.div``;
export const MypageBoxInput = styled.input`
  padding-left: 0.5rem;
  margin-left: 1rem;
`;
