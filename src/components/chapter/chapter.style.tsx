import styled from "styled-components";

export const ChapterWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
  background-color: #444444da;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  color: wheat;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2em;
  .content{
    height: 200vh;
    width: 100%;

  }
`;
