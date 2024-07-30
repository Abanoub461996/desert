import { ChapterWrapper } from "./chapter.style";

const Chapter = ({
  chapternumber,
  setChapterNumber,
}: {
  chapternumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setChapterNumber: any;
}) => {
  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent the event from reaching the scene
    setChapterNumber(0);
  };
  return (
    <ChapterWrapper onClick={(e)=>{e.preventDefault()}}>
      <button onClick={(e) => handleCloseModal(e)}>close {chapternumber}</button>
      <div className="content"></div>
    </ChapterWrapper>
  );
};

export default Chapter;
