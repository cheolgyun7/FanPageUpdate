import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getTodos, selectMember } from "../redux/reducer";

const SendList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, letterList, selectedMember } = useSelector(
    (state) => state.letter
  );

  // useEffect를 사용하여 초기 데이터를 불러옴
  useEffect(() => {
    dispatch(__getTodos());
  }, []);
  if (isLoading) {
    return <div>로딩중.........</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  // letterList가 비어있는 경우 스팬 태그 반환
  if (letterList.length === 0) {
    return <span>letterList가 비어 있습니다.</span>;
  }

  const filteredList = selectedMember
    ? letterList.filter((item) => item.selectBox === selectedMember)
    : letterList;

  const handleDetail = (list) => {
    console.log(list);
    navigate(`/detail/${list.id}`, { state: list });
  };
  return (
    <>
      <CardBox>
        {filteredList.length > 0 ? (
          filteredList.map((list) => {
            return (
              <Card onClick={() => handleDetail(list)} key={list.id}>
                <Nickname>{`제목 : ${list.title}`}</Nickname>
                <CardContext>{`내용 : ${list.context}`}</CardContext>
                <CardDate>
                  {`등록시간 : ${new Date(list.createdAt).toLocaleDateString(
                    "ko",
                    {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}`}
                </CardDate>
                <SelectBox>{`수신인: ${list.selectBox}`}</SelectBox>
              </Card>
            );
          })
        ) : (
          <span>등록된 팬 레터가 없습니다. 등록해주세요</span>
        )}
      </CardBox>
    </>
  );
};
export default SendList;

export const CardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #2a1215;
  > span {
    color: white;
    padding: 2rem;
  }
`;
export const Card = styled.section`
  width: 28%;
  margin: 2%;
  padding: 0.5%;
  background-color: #de875f;
  border-radius: 1rem;
  color: white;
  cursor: pointer;
  text-align: center;
  &:hover {
    transition: all 0.4s;
    transform: scale(1.1);
    border: 1px solid black;
  }
`;

export const Nickname = styled.h4``;

export const CardContext = styled.p`
  margin: 1rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SelectBox = styled.span``;
export const CardDate = styled.div``;
