import React from "react";

interface ReadPostingContainerProps extends React.PropsWithChildren {
  posting: Posting | null;
}

const ReadPostingContainer = (props: ReadPostingContainerProps) => {
  const posting = props.posting;
  return (
    <>
      {posting ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          {/* <div > */}
          <div className="text-center text-4xl mb-10">{posting.title}</div>
          <div dangerouslySetInnerHTML={{ __html: posting.content }}></div>
          {/* </div> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ReadPostingContainer;
