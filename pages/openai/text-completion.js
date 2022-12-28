import React from "react";
import TextCompletionComponent from "../../ComponentsPage/OpenAiGroup/TextCompletion/TextCompletionComponent";
import { TextCompletionProvider } from "../../ComponentsPage/OpenAiGroup/TextCompletion/Context";
import Head from "next/head";
const TextCompletion = () => {
  return (
    <>
      <Head>
        <title>Create Text Completion</title>
        <meta name="description" content="Generate answer with text prompt" />
      </Head>
      <TextCompletionProvider>
        <TextCompletionComponent />
      </TextCompletionProvider>
    </>
  );
};

export default TextCompletion;
