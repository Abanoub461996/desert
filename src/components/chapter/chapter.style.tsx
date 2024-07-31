import styled from "styled-components";

export const ChapterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0%;
  color: wheat;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .content {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow-y: auto;
    background-color: #000000;
    animation: slide-in 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    display: flex;
    justify-content: center;
    align-items: center;
    .scrollable {
      .album-web {
        text-align: center;
      }

      .page {
        box-shadow: 0 1.5em 3em -1em rgb(70, 69, 69);
        background-color: rgb(251, 225, 139);
        width: 50%;
        color: black;
      }

      .cover {
        background-color: rgb(251, 225, 139);
        box-shadow: 0 1.5em 3em -1em rgb(70, 69, 69);
      }

      .btn,
      .form-control {
        padding: 0;
        border: 0;
        border-radius: 0;
        color: inherit;
        appearance: none;
        font-size: 1em;
        line-height: 1.2;
        border-width: 2px;
        border-style: solid;
      }
      .btn {
        background-color: aquamarine;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0 1.2em;
        border-color: transparent;
      }
      .form-control {
        padding: 0 0.5em;
      }

      input {
        text-align: center;
      }

      .formContainer {
        align-items: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .close_chapter__btn {
      position: absolute;
      right: 2em;
      top: 2em;
      color: red;
      padding: 0.5em;
      cursor: pointer;
      z-index: 999999;
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateZ(800px);
      border-radius: 24% 76% 35% 65% / 31% 49% 51% 69%;
      width: 50%;
      height: 300px;
      margin: auto;
      overflow: hidden;
      opacity: 0;
    }

    10% {
      transform: translateZ(800px);
      border-radius: 34% 66% 8% 92% / 72% 28% 72% 28%;
      width: 50%;
      height: 400px;
      margin: auto;
      overflow: hidden;
      opacity: 0.1;
    }

    20% {
      transform: translateZ(800px);
      border-radius: 34% 66% 83% 17% / 72% 32% 68% 28%;
      width: 55%;
      height: 420px;
      margin: auto;
      overflow: hidden;
      opacity: 0.2;
    }

    30% {
      transform: translateZ(800px);
      border-radius: 79% 21% 42% 58% / 40% 32% 68% 60%;
      width: 60%;
      height: 440px;
      margin: auto;
      overflow: hidden;
      opacity: 0.3;
    }

    40% {
      transform: translateZ(800px);
      border-radius: 44% 56% 51% 49% / 40% 86% 14% 60%;
      width: 65%;
      height: 460px;
      margin: auto;
      overflow: hidden;
      opacity: 0.4;
    }

    50% {
      transform: translateZ(400px);
      border-radius: 78% 22% 100% 0% / 80% 52% 48% 20%;
      margin: auto;
      width: 70%;
      height: 480px;
      overflow: hidden;
      opacity: 0.5;
    }

    60% {
      transform: translateZ(400px);
      border-radius: 78% 22% 100% 0% / 32% 52% 48% 68%;
      margin: auto;
      width: 75%;
      height: 500px;
      overflow: hidden;
      opacity: 0.6;
    }

    70% {
      transform: translateZ(400px);
      border-radius: 56% 44% 100% 0% / 29% 78% 22% 71%;
      margin: auto;
      width: 80%;
      height: 520px;
      overflow: hidden;
      opacity: 0.65;
    }

    80% {
      transform: translateZ(400px);
      border-radius: 79% 21% 100% 0% / 29% 95% 5% 71%;
      margin: auto;
      width: 85%;
      height: 540px;
      overflow: hidden;
      opacity: 0.7;
    }

    90% {
      transform: translateZ(400px);
      border-radius: 79% 21% 100% 0% / 4% 85% 15% 96%;
      margin: auto;
      width: 90%;
      height: 560px;
      overflow: hidden;
      opacity: 0.75;
    }

    100% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      opacity: 0.8;
    }
  }
`;
