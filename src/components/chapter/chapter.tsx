import { forwardRef, useEffect, useRef } from "react";
import { ChapterWrapper } from "./chapter.style";
import { IoMdClose } from "react-icons/io";
import { chapters } from "./chapters";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import HTMLFlipBook from "react-pageflip";
import React from "react";

const Chapter = ({
  chapterNumber,
  setChapterNumber,
}: {
  chapterNumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setChapterNumber: any;
}) => {
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const contentRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(useGSAP);
  function handlePopupScroll(event: { stopPropagation: () => void }) {
    event.stopPropagation();
  }
  useEffect(() => {
    function handleWindowResize() {
      windowWidth.current = window.innerWidth;
      windowHeight.current = window.innerHeight;
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };

  }, []);
  useGSAP(
    () => {
      if (contentRef.current) {
        const tl = gsap.timeline({ duration: 1 });
        tl.from(
          contentRef.current.querySelector(".scrollable"),
          {
            opacity: 0,
            y: -200,
            ease: "power2.inOut",
          },
          3
        )
      }
    },
    { scope: contentRef }
  );
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
        <div className="scrollable" style={{ flex: 1 }}>
          <HTMLFlipBook
            width={(windowWidth.current * 0.9) / 2}
            height={windowHeight.current * 0.9}
            flippingTime={1500}
            style={{ margin: "0 auto", width: "100%" }}
            maxShadowOpacity={0.5}
            className="album-web"
            startPage={0}
            size="fixed"
            drawShadow={false}
            usePortrait={false}
            minWidth={300}
            maxWidth={1080}
            minHeight={400}
            maxHeight={1920}
            startZIndex={1} 
            autoSize={true}
            showCover={false}
            mobileScrollSupport={true}
          >
            <Page number="1">
              <hr></hr>
            </Page>
            <Page number="2">
              <hr></hr>
              <p>ssssss</p>
            </Page>
            <Page number="3">
              <hr></hr>
            </Page>
            <Page number="4">
              <hr></hr>
            </Page>
          </HTMLFlipBook>
        </div>
      </div>
    </ChapterWrapper>
  );
};
interface PageProps {
  number?: string;
  children?: React.ReactNode;
}
const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <h1>Page Header</h1>
      <p>{props.children}</p>
      <p>{props.number}</p>
    </div>
  );
});
export default Chapter;
