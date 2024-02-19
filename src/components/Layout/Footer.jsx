import React from "react";
import { FooterBox } from "styles/theme";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterBox>
      <FooterUl>
        <FooterLi>1집</FooterLi>
        <FooterLi>1.5집</FooterLi>
        <FooterLi>2집</FooterLi>
        <FooterLi>3집</FooterLi>
      </FooterUl>
      <FooterArticle>
        <h4>주식회사 홍길동</h4>
        <p>주소: (012345) 서울시 00구 00동</p>
        <p>대표이사: 누가할래</p>
      </FooterArticle>
    </FooterBox>
  );
};

export default Footer;

export const FooterUl = styled.ul`
  display: flex;
`;
export const FooterLi = styled.li`
  margin-right: 2rem;
  padding: 0 1rem;
  border-right: 1px solid whitesmoke;
`;

export const FooterArticle = styled.article`
  margin-top: 0.5rem;
  h4,
  p {
    margin-top: 0.5rem;
  }
`;
