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
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    height: 90vh;
    width: 100%;
    overflow-y: auto;
    background-color: #3d3fbb16;
    .scrollable {
      height: 200vh;
    }
  }
`;
