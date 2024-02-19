import styled from "styled-components";

export const HeaderBox = styled.header`
  position: relative;
  background-color: #2a1215;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  font-size: 1.5rem;
  color: white;
`;
export const FooterBox = styled.footer`
  background-color: #2a1215;
  color: white;
  padding: 1rem;
`;
export const FlexAllbox = styled.div`
  display: flex;
`;

export const Article = styled.article`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const Content = styled.div`
  flex: 1;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 허용 */
  padding: 1rem;
`;

// img.jsx파일
export const ImgWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  /* 이미지가 부모 요소를 벗어나는 것을 방지합니다. */
`;

export const ImgFile = styled.img`
  width: auto;
  height: 100vh;
  object-fit: cover;
`;

// Home.jsx파일
export const SendForm = styled.form`
  padding: 1rem 2rem;
  background-color: whitesmoke;
`;
