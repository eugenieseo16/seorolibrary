import React, { useState } from "react";
import { Upload, Input } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

function Report () {
  // 사진 첨부
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1VKJ9TuJRqTAxVsaSzRzQff2TE3vub0ygrcIafQoCQ6mzk8HwpgWMGHfFko0k1MNFTo&usqp=CAU"
    }
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return(
    <div className="report-container">
      <h1>제목</h1>
      <input type="text" />
      <Input placeholder="Basic usage" />
      
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
    >
      {fileList.length < 5 && "+ Upload"}
    </Upload>
    <h1>내용</h1>
      <textarea name="" id=""></textarea>
      <br />
      <button type="submit">제출</button>
    </div>
  );
}

export default Report;