import React from "react";

import { useRouter } from "next/router";

const PostItem = () => {
  const router = useRouter();
  return <div>{router.query.postItem}</div>;
};

export default PostItem;
