import React, { useState } from 'react';
import { Upload, Input } from 'antd';
import { useForm } from 'react-hook-form';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

function Report() {
  // 사진 첨부
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    // uid: "-1",
    // name: "image.png",
    // status: "done",
    // url:
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1VKJ9TuJRqTAxVsaSzRzQff2TE3vub0ygrcIafQoCQ6mzk8HwpgWMGHfFko0k1MNFTo&usqp=CAU"
    // }
  ]);

  const { handleSubmit, register, setValue, getValues } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
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

  return (
    <div className="report-container">
      <div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="create-book-report-form"
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>

          <h3>제목</h3>
          <Input
            placeholder="Basic usage"
            onChange={getChangeHandlerWithEvent('title')}
          />
          <h3>내용</h3>
          <Input.TextArea
            onChange={getChangeHandlerWithEvent('desc')}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </form>
      </div>
      <button onClick={handleSubmit(onValid)} type="submit">
        submit
      </button>
    </div>
  );
}

export default Report;
