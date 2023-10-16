import React, { useState } from "react";

interface draggableWrapperProps extends React.PropsWithChildren {}

const DraggableWrapper = (props: draggableWrapperProps) => {
  //   const [originPos, setOriginPos] = useState({ x: 0, y: 0 });
  const [clientPos, setClientPos] = useState({ x: 0, y: 0 });
  const [listContainerPos, setListContainerPos] = useState({
    diffX: 0,
    diffY: 0,
  });

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    // e.preventDefault();
    // e.stopPropagation();

    const posX = e.clientX;
    const posY = e.clientY;

    // setOriginPos({ x: originalX, y: originalY });
    setClientPos({ x: posX, y: posY });
  };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const diffX = e.currentTarget.offsetLeft + e.clientX - clientPos.x;
    const diffY = e.currentTarget.offsetTop + e.clientY - clientPos.y;
    setListContainerPos({ diffX, diffY });

    setClientPos({ x: e.clientX, y: e.clientY });
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const diffX = e.currentTarget.offsetLeft + e.clientX - clientPos.x;
    const diffY = e.currentTarget.offsetTop + e.clientY - clientPos.y;

    console.log(diffX, diffY);
    setListContainerPos({ diffX, diffY });
  };

  return (
    <div
      className="absolute z-0"
      draggable={true}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDrag={dragHandler}
      onDragOver={dragOverHandler}
      style={{ left: listContainerPos.diffX, top: listContainerPos.diffY }}
    >
      {props.children}
    </div>
  );
};

export default DraggableWrapper;
