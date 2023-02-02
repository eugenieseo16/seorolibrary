import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input, InputNumber } from 'antd';

import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import './BookClubGenerate.styles.scss';
import { useForm, Controller } from 'react-hook-form';

const renderTitle = (title: string) => (
  <span>
    {title}
    <a
      style={{ float: 'right' }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle('Libraries'),
    options: [
      renderItem('AntDesign', 10000),
      renderItem('AntDesign UI', 10600),
    ],
  },
  {
    label: renderTitle('Solutions'),
    options: [
      renderItem('AntDesign UI FAQ', 60100),
      renderItem('AntDesign FAQ', 30010),
    ],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];

function BookClubGenerate() {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register('lastName');
    register('category');
    register('num');
    register('desc');
  }, [register, setValue]);

  const getChangeHandlerWithValue = (name: any) => (value: any) => {
    setValue(name, value);
  };
  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div
      className="book-club-generate-container"
      style={{ position: 'relative' }}
    >
      <SearchHeader text="독서모임 생성" search={false} />
      <form onSubmit={handleSubmit(onValid)}>
        <div>사진첨부</div>
        <div>
          모임이름
          <Input placeholder="Basic usage" />
        </div>
        <div>
          카테고리
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={250}
            style={{ width: 250 }}
            options={options}
            onChange={getChangeHandlerWithValue('category')}
          >
            <Input.Search size="large" placeholder="input here" />
          </AutoComplete>
        </div>
        <div>
          모임정원{' '}
          <InputNumber min={1} onChange={getChangeHandlerWithValue('num')} />
        </div>
        <div>
          모임장소
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={250}
            style={{ width: 250 }}
            options={options}
          >
            <Input.Search size="large" placeholder="input here" />
          </AutoComplete>
        </div>
        <div>
          모임일정
          <Input
            placeholder="Basic usage"
            onChange={getChangeHandlerWithEvent('lastName')}
          />
        </div>

        <div>
          모임소개
          <Input.TextArea
            onChange={getChangeHandlerWithEvent('desc')}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
      </form>
      <FixedBottomButton text="모임 생성하기" onClick={handleSubmit(onValid)} />
    </div>
  );
}

export default BookClubGenerate;
