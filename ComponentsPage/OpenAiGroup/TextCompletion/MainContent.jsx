import React, { useState, useRef } from "react";
import { useTextCompletionContext } from "./Context";
import { API } from "../../../lib/axios/axios";
const MainContent = () => {
  const {
    test,
    dataArray,
    setDataArray,
    isGeneratingText,
    setIsGeneratingText,
    formData,
    setFormData,
    inputRef,
  } = useTextCompletionContext();

  const handleInputChange = (e) => {
    setFormData({ ...formData, prompt: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!formData.prompt) {
        return;
      }
      setIsGeneratingText(true);
      const { data } = await API.post("/api/openai/createcompletion", formData);

      let cachedArray = dataArray;

      cachedArray.unshift(data);

      localStorage.setItem("textCompletionArray", JSON.stringify(cachedArray));

      setDataArray([...cachedArray]);
      setIsGeneratingText(false);
      setFormData({ prompt: "" });
    } catch (error) {
      setIsGeneratingText(false);
      console.log(error);
    }
  };

  return (
    <div className=" container">
      <div className=" w-100 center mt-4">
        <h1 className=" hero-text text-primary">Text Completion</h1>
      </div>
      <div className=" form-wrapper">
        <form
          className=" text-completion-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className=" input-group">
            <input
              ref={inputRef}
              value={formData.prompt}
              type="text"
              className=" form-control"
              placeholder="Enter your text here"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <div className=" d-flex justify-content-end mt-2">
            <button className=" btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainContent;
