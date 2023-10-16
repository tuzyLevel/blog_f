import React from "react";

interface PostingListContainerProps extends React.PropsWithChildren {
  list: Posting[];
  setSelectedPosting: (posting: Posting | null) => void;
}

const PostingListContainer = (props: PostingListContainerProps) => {
  const postingList = props.list;
  const setSelectedPosting = props.setSelectedPosting;

  const postingClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = parseInt(e.currentTarget.value);
    const selectedPosting = postingList.filter((p) => p.id === value)[0];
    setSelectedPosting(selectedPosting);
  };

  return (
    <div className="min-w-[600px] max-w-full h-full grid grid-cols-3 gap-[10px] overflow-scroll max-h-full justify-items-center items-start">
      {postingList.map((p) => {
        return (
          <div key={p.id} className="border border-red-200 w-[200px] h-[200px]">
            <button
              className="w-full h-full"
              value={p.id}
              onClick={postingClickHandler}
            >
              {p.title}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PostingListContainer;
