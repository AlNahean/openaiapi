import React, { useState } from "react";
import { API } from "../../../lib/axios/axios";
import axios from "axios";

const dropdownMenuData = [
  { id: 1, name: "Large" },
  { id: 2, name: "Medium" },
  { id: 3, name: "Small" },
];

const MainContainer = ({
  isGeneratingImage,
  setIsGeneratingImage,
  dataArray,
  setDataArray,
  formData,
  setFormData,
  inputRef,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //check if there is no text
      if (!formData.prompt) {
        return;
      }

      // show loading screen
      setIsGeneratingImage(true);

      // api req to backend
      let response = await API.post("/api/openai/generateimage", formData);

      //destructuring nested object
      let {
        data: { data: data },
      } = response;

      const cacheArray = dataArray;
      cacheArray.unshift(data);

      // to set the image at localstorage
      await localStorage.setItem(
        "generatedImagesArray",
        JSON.stringify(cacheArray)
      );

      setDataArray(cacheArray);

      await setTimeout(() => {}, 2000);
      setIsGeneratingImage(false);
      setFormData({ ...formData, prompt: "" });
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setIsGeneratingImage(false);
    }
  };

  const getImage = async () => {
    // let data = await axios.get(
    //   "https://oaidalleapiprodscus.blob.core.windows.net/private/org-eEV6W2Prbm0AJdVJS89o9z0d/user-Uyn4FNNmYhj7FHkuj8XE0zi2/img-ZFY5V6JZyTwVwxEwKqvNLxUU.png?st=2022-12-24T08%3A55%3A10Z&se=2022-12-24T10%3A55%3A10Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-24T05%3A00%3A41Z&ske=2022-12-25T05%3A00%3A41Z&sks=b&skv=2021-08-06&sig=KN1grNnnSzwBpFhCKy5oMwdm8BACBPWsSEzQEuyGP0g%3D",
    //   {
    //     onDownloadProgress: (progressEvent) => {
    //       // const total = parseFloat(
    //       //   progressEvent.currentTarget.responseHeaders["Content-Length"]
    //       // );
    //       // const current = progressEvent.currentTarget.response.length;

    //       // let percentCompleted = Math.floor((current / total) * 100);
    //       console.log("completed: ", progressEvent);
    //     },
    //   }
    // );

    // $progress = document.querySelector("#progress");

    var url =
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-eEV6W2Prbm0AJdVJS89o9z0d/user-Uyn4FNNmYhj7FHkuj8XE0zi2/img-ZFY5V6JZyTwVwxEwKqvNLxUU.png?st=2022-12-24T08%3A55%3A10Z&se=2022-12-24T10%3A55%3A10Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-24T05%3A00%3A41Z&ske=2022-12-25T05%3A00%3A41Z&sks=b&skv=2021-08-06&sig=KN1grNnnSzwBpFhCKy5oMwdm8BACBPWsSEzQEuyGP0g%3D";

    var request = new XMLHttpRequest();
    request.onprogress = onProgress;
    request.onload = onComplete;
    request.onerror = onError;
    request.open("GET", url, true);

    request.overrideMimeType("text/plain; charset=x-user-defined");
    request.send(null);

    function onProgress(event) {
      if (!event.lengthComputable) {
        return;
      }
      var loaded = event.loaded;
      var total = event.total;
      var progress = (loaded / total).toFixed(2);

      // $progress.textContent = "Loading... " + parseInt(progress * 100) + " %";

      console.log(progress);
    }

    function onComplete(event) {
      // var $img = document.createElement("img");
      // $img.setAttribute("src", url);
      // $progress.appendChild($img);
      // console.log("complete", url);

      console.log(event);
    }

    function onError(event) {
      console.log("error");
    }

    // $progress.addEventListener("click", function () {
    //   request.open("GET", url, true);
    //   request.overrideMimeType("text/plain; charset=x-user-defined");
    //   request.send(null);
    // });
  };
  return (
    <div className=" ig-main-content container">
      <div className=" form-wrapper">
        <form
          className=" d-flex flex-column mt-4 "
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h1
            className=" w-100 text-center hero-text text-primary"
            onClick={() => {
              getImage();
            }}
          >
            Generate Image
          </h1>
          <div className=" input-group">
            <input
              ref={inputRef}
              value={formData.prompt}
              type="text"
              className=" form-control"
              placeholder="Input your text to generate image"
              onChange={(e) => {
                setFormData({ ...formData, prompt: e.target.value });
              }}
            />
          </div>
          <div className=" d-flex justify-content-end mt-2">
            <div className="dropdown me-2">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={() => {
                  setShowDropDown(!showDropDown);
                }}
              >
                {formData.size}
              </button>
              <div className={`dropdown-menu ${showDropDown ? "show" : ""}`}>
                {dropdownMenuData.map((item) => {
                  return (
                    <div
                      className="dropdown-item cursor-pointer"
                      onClick={() => {
                        setFormData({ ...formData, size: item.name });
                        setShowDropDown(false);
                      }}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <button type="submit" className=" btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainContainer;
