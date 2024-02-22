import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Content } from "styles/theme";
import { updateProfile } from "../../redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Mypage = () => {
  const dispatch = useDispatch();
  const { avatar, nickname } = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(avatar);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNickname, setUpdatedNickname] = useState("");

  const fileSelect = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile.size > 1024 * 1024) {
      return toast.warn("최대 1MB까지 업로드 가능");
    }
    //프리뷰 구현
    //File -> Url형식으로 변환
    const imgUrl = URL.createObjectURL(imgFile); //blob형태로 변환
    setSelectedFile(imgUrl);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedNickname(nickname);
  };
  const handleEditComplete = async () => {
    if (window.confirm("수정하시겠습니까?")) {
      try {
        const updatedData = {
          nickname: updatedNickname,
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
        toast.success("프로필 변경이 완료되었습니다.");
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
        <label>
          <img size="large" src={selectedFile || avatar} alt="Avatar Preview" />
          <input type="file" onChange={fileSelect} accept="image/*" />
        </label>
        <br />
        <label htmlFor="nickname">닉네임 :</label>
        <MypageBoxInput
          type="text"
          id="nickname"
          defaultValue={nickname}
          minLength="4"
          maxLength="10"
          onChange={(e) => setUpdatedNickname(e.target.value)}
          readOnly={!isEditing}
        />
        <br />
        {isEditing ? (
          <>
            <button
              onClick={handleEditComplete}
              disabled={!updatedNickname && selectedFile === avatar}
              //파일을 업로드하거나 닉네임에 변화가 있을시 disabled제거
            >
              수정 완료
            </button>
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
export const MypageBox = styled.div`
  & > label > input {
    display: none;
  }
`;
export const MypageBoxInput = styled.input`
  padding-left: 0.5rem;
  margin-left: 1rem;
`;
