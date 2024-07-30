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
  useEffect(()=>{
    window.addEventListener("wheel",(e)=>{
      e.stopPropagation()
    })
  },[])
  return (
    <ChapterWrapper>
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
