import React, { useEffect, useState } from "react";

import Carousel from "@/components/Carousel/Carousel";

type Notice = {
  id: number;
  title: string;
  content: string;
};

interface NoticeProps extends React.PropsWithChildren {
  content: string;
}

export default function NoticeBoard(props: NoticeProps) {
  return (
    <div className="h-48 md:h-96 flex flex-col box-border border-8 border-amber-950 w-full mx-auto  bg-green-700">
      <div className="text-white border w-full h-full flex justify-center items-center">
        {/* <div className="relative min-w-[250px] max-w-[250px] h-full">
          <Carousel></Carousel>
        </div> */}
        <div className="">
          <span className="lg:text-9xl md:text-6xl">No pain No gain</span>
        </div>
      </div>
    </div>
  );
}
