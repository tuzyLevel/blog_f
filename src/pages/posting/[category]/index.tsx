import React from "react";

import { useRouter } from "next/router";

const ContentCategory = () => {
  const router = useRouter();

  return <div>{router.query.category}</div>;
};

export default ContentCategory;
