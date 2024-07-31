import { useRef } from "react";
import { ChapterWrapper } from "./chapter.style";
import { IoMdClose } from "react-icons/io";
import { chapters } from "./chapters";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Chapter = ({
  chapterNumber,
  setChapterNumber,
}: {
  chapterNumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setChapterNumber: any;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(useGSAP);
  useGSAP(
    () => {
      if (contentRef.current) {
        const tl = gsap.timeline({ duration: 1 });
        tl.from(
          contentRef.current.querySelector(".content__label"),
          {
            opacity: 0,
            x: -200,
            ease: "power2.out",
          },
          3
        )
          .from(
            contentRef.current.querySelector(".content__title"),
            {
              opacity: 0,

              x: -200,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .from(
            contentRef.current.querySelector(".content__text"),
            {
              opacity: 0,

              x: -200,
              ease: "power2.out",
            },
            "-=0.3"
          );
      }
    },
    { scope: contentRef }
  );

  function handlePopupScroll(event: { stopPropagation: () => void }) {
    event.stopPropagation(); // Prevent the event from reaching the scene
    // Your popup scroll logic here
  }

  return (
    <ChapterWrapper
      onScroll={handlePopupScroll}
      onWheel={handlePopupScroll}
      onClick={handlePopupScroll}
    >
      <div className="content" ref={contentRef}>
        <IoMdClose
          className="close_chapter__btn"
          onClick={() => setChapterNumber(0)}
        />
        <div className="scrollable">
          <h3 className="content__label">
            {chapters[chapterNumber - 1].label}
          </h3>
          <h1 className="content__title">
            {chapters[chapterNumber - 1].title}
          </h1>
          <div className="content__text">
            {chapters[chapterNumber - 1].content}
          </div>
        </div>
      </div>
    </ChapterWrapper>
  );
};

export default Chapter;
