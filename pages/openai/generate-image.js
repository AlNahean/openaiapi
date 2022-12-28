import React from "react";
import GenerateImageComponent from "../../ComponentsPage/OpenAiGroup/GenerateImage/GenerateImageComponent";
import Head from "next/head";
const GenerateImage = () => {
  return (
    <>
      <Head>
        <title>Generate Image</title>
        <meta name="description" content="Generate image with text prompt" />
      </Head>
      <GenerateImageComponent />
    </>
  );
};

export default GenerateImage;
