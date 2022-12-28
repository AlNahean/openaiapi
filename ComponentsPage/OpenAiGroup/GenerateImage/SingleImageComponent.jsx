import React, { useRef } from "react";
import { MdOutlineDownload } from "react-icons/md";
// import { saveAs } from "file-saver";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";
const SingleImageComponent = ({
  item,
  formData,
  setFormData,
  index,
  inputRef,
  handleItemDelete,
}) => {
  const imgRef = useRef(null);

  return (
    <div className="card w-100 mb-3 ">
      <div className=" card-header d-flex align-items-center justify-content-between">
        <p className=" m-0"> {moment(item.createdAt).format("LLL")}</p>
        <div className=" center">
          <p className=" m-0 me-3">{item.size}</p>
          <div
            className=" icon-wrapper text-danger center"
            onClick={(e) => {
              handleItemDelete(item.createdAt);
            }}
          >
            <AiFillDelete />
          </div>
        </div>
      </div>
      <div className=" card-body center flex-column">
        <div
          className=" mb-3 cursor-pointer align-self-start"
          onClick={() => {
            setFormData({ ...formData, prompt: item.prompt });
            window.scrollTo(0, 0);
            inputRef.current.focus();
          }}
        >
          <span className=" text-primary h3">Prompt:</span>{" "}
          <span className=" h4 capitalize-first">{item.prompt}</span>
        </div>
        <a href={item.url} target="_blank">
          <img
            src={item.url}
            className=" "
            ref={imgRef}
            // crossorigin="anonymous"
          />
        </a>
      </div>
      <div
        onClick={() => {
          // saveAs("https://httpbin.org/image", "image.jpg");
          //   fetchFile(item.data[0].url);
          //   let data = imgRef.current.src;
          //   console.log(data);
          //   var canvas = document.createElement("CANVAS");
          //   var context = canvas.getContext("2d");
          //   context.drawImage(imgRef.current, 0, 0);
          //   console.log(canvas);
          //   let urldata = canvas.toDataURL();
          //   saveAs(url, "my.jpg");
          //   console.log(urldata);
        }}
        className=" card-footer w-100 d-flex justify-content-end link-undecorated"
      >
        {/* <div className=" btn btn-primary  p-2 center">
          <DownloadLink
            label="Promise to Save"
            filename="myfile.txt"
            exportFile={() => Promise.resolve(item.data[0].url)}
          />
          <h4 className=" mb-1 mt-0 me-2">Save</h4>
          <div className=" icon-wrapper center">
            <MdOutlineDownload />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SingleImageComponent;
