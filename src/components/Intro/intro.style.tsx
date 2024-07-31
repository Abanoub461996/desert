import styled from "styled-components";
export const IntroWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #000;
  color: #f1e14d;
  direction: rtl;
  .header__content {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    .scroll__down {
      position: absolute;
      bottom: 2em;
      right: 50%;
      transform: translate(50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .scroll_order {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
      }
    }
  }
`;
