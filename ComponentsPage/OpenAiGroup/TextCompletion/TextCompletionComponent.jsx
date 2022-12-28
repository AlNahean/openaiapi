import React from "react";
import Header from "../Shared/Header";
import MainContent from "./MainContent";
import { useTextCompletionContext } from "./Context";
import { AiFillDelete } from "react-icons/ai";

const TextCompletionComponent = () => {
  const {
    dataArray,
    isGeneratingText,
    formData,
    setFormData,
    inputRef,
    handleItemDelete,
  } = useTextCompletionContext();
  return (
    <div className=" text-completion-page">
      <Header
        navigation={{ name: "Generate Image", link: "/openai/generate-image" }}
      />
      <MainContent />
      <div className=" container">
        {dataArray.map((item, index) => {
          return (
            <div
              key={index}
              className=" card mt-4   "
              style={{ marginBottom: `${index === 0 ? "20vh" : "0rem"}` }}
            >
              <div className=" card-header d-flex justify-content-between align-items-center">
                <h5
                  className=" text-primary cursor-pointer"
                  onClick={(e) => {
                    setFormData({ ...formData, prompt: item.prompt });
                    inputRef.current.focus();
                    window.scrollTo(0, 0);
                  }}
                >
                  {item.prompt}
                </h5>

                <div
                  className=" icon-wrapper text-danger center"
                  onClick={(e) => {
                    handleItemDelete(item.createdAt);
                  }}
                >
                  <AiFillDelete />
                </div>
              </div>
              <div className=" card-body">
                <p>{`${item.answer}`}</p>
              </div>
            </div>
          );
        })}
      </div>
      {isGeneratingText && (
        <div className=" loading-overlay center">
          <div className=" spinner s"></div>
        </div>
      )}
    </div>
  );
};

export default TextCompletionComponent;
