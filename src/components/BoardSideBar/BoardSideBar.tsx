import React from "react";

import axios from "axios";

interface sideBarProps extends React.PropsWithChildren {}

const BoardSideBar = () => {
  return (
    <div></div>
    // <ul>
    //   {boardList.map((pBoard: parentBoard) => {
    //     <li key={pBoard.name}>
    //       <ul>
    //         {/* {pBoard.children.map(board => <li key={pBoard.name+board.name}>{board.name}</li>} */}
    //       </ul>
    //     </li>;
    //   })}
    // </ul>
  );
};

export default BoardSideBar;
