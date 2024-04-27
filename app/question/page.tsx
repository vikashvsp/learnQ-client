"use client";
import React, { Suspense } from "react";
import Question from "./Question";

const page = () => {
  return (
    <Suspense>
      <Question />
    </Suspense>
  );
};

export default page;
