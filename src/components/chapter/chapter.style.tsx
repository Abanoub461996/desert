import styled from "styled-components";

export const ChapterWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
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
