import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMember } from "../redux/reducer";
import styled from "styled-components";

const members = ["", "Karina", "Winter", "Giselle", "Ningning"];
const MemberList = () => {
  const selectedMember = useSelector((state) => state.letter.selectedMember);
  const dispatch = useDispatch();
  const handleMemberClick = (memberName) => {
    dispatch(selectMember(memberName));
  };
  return (
    <div>
      <ListUl>
        {members.map((member) => (
          <ListLi
            key={member}
            onClick={() => handleMemberClick(member)}
            className={selectedMember === member ? "selected" : ""}
          >
            {member || "All"}
          </ListLi>
        ))}
      </ListUl>
    </div>
  );
};

export default MemberList;

export const ListUl = styled.ul`
  display: flex;
  background-color: beige;
`;
export const ListLi = styled.li`
  width: 20%;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  &.selected {
    background-color: #ccc;
  }
`;
