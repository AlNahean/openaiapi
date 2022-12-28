import React, { useState, useLayoutEffect, useRef } from "react";
import Header from "../Shared/Header";
import MainContainer from "./MainContainer";
// import DownloadLink from "react-download-link";
// import { MdOutlineDownload } from "react-icons/md";

import axios from "axios";

// import { saveAs } from "file-saver";
import SingleImageComponent from "./SingleImageComponent";
// const fetchFile = async (url) => {
//   axios({
//     url: url,
//     method: "GET",
//     // headers: headers,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//     responseType: "blob", // important
//   }).then((response) => {
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute(
//       "download",
//       `${this.props.file.name}.${this.props.file.mime}`
//     );
//     document.body.appendChild(link);
//     link.click();

//     // Clean up and remove the link
//     link.parentNode.removeChild(link);
//   });
// };

const GenerateImageComponent = () => {
  const [dataArray, setDataArray] = useState([]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [formData, setFormData] = useState({ prompt: "", size: "Small" });
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    let value = localStorage.getItem("generatedImagesArray");
    let myArray = JSON.parse(value);

    if (!myArray) {
      return;
    }

    setDataArray(myArray);

    return () => {};
  }, []);

  const handleItemDelete = async (id) => {
    let cachedData = dataArray;

    let finalData = cachedData.filter((item) => id !== item.createdAt);

    await localStorage.setItem(
      "generatedImagesArray",
      JSON.stringify(finalData)
    );

    setDataArray(finalData);
  };

  return (
    <div className=" generate-image-page position-relative">
      <Header
        navigation={{
          name: "Text Completion",
          link: "/openai/text-completion",
        }}
      />
      <MainContainer
        isGeneratingImage={isGeneratingImage}
        setIsGeneratingImage={setIsGeneratingImage}
        setDataArray={setDataArray}
        dataArray={dataArray}
        formData={formData}
        setFormData={setFormData}
        inputRef={inputRef}
      />

      <div className=" container mt-4">
        {dataArray.map((item, index) => {
          //   let date = new Date(item.created).toLocaleTimeString();

          //   console.log(item.created, date);
          return (
            <div key={index}>
              <SingleImageComponent
                index={index}
                item={item}
                formData={formData}
                setFormData={setFormData}
                inputRef={inputRef}
                handleItemDelete={handleItemDelete}
              />
            </div>
          );
        })}
      </div>
      {isGeneratingImage && (
        <div className=" loading-overlay center">
          <div className=" spinner s"></div>
        </div>
      )}
      <div className=" w-100 mt-4 opacity-0 ">a</div>
      {/* <div className=" loading-overlay"></div> */}
    </div>
  );
};

export default GenerateImageComponent;
