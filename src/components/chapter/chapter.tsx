import { useEffect } from "react";
import { ChapterWrapper } from "./chapter.style";

const Chapter = ({
  chapternumber,
  setChapterNumber,
}: {
  chapternumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setChapterNumber: any;
}) => {
  function handlePopupScroll(event: { stopPropagation: () => void; }) {
    event.stopPropagation(); // Prevent the event from reaching the scene
    // Your popup scroll logic here
  }
  return (
    <ChapterWrapper onScroll={handlePopupScroll} onWheel={handlePopupScroll} onClick={handlePopupScroll}>
      <div className="content">
        <div className="scrollable"></div>
        <button onClick={() => setChapterNumber(0)}>
          close {chapternumber}
        </button>
      </div>
    </ChapterWrapper>
  );
};

export default Chapter;
