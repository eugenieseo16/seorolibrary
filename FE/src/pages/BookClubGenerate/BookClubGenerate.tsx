import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, InputNumber } from 'antd';
import { useForm } from 'react-hook-form';

import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import './BookClubGenerate.styles.scss';
import { useQuery } from 'react-query';
import axios from 'axios';

interface checkValidProps {
  checkValue: string;
  mustInArr: string[];
  mustNotArr: string[];
}
const checkValid = ({ checkValue, mustInArr, mustNotArr }: checkValidProps) => {
  const mustIn = mustInArr.includes(checkValue);
  const mustNot = mustNotArr.includes(checkValue);
  console.log(mustIn && !mustNot);
  return mustIn && !mustNot;
};
const autoCompleteFilter = (inputValue: string, option: any) =>
  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
const fetchData = (url: string) => async () => await axios(url);

function BookClubGenerate() {
  const [categories, setCategories] = useState(['경제']);
  const [category, setCategory] = useState('');
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  const { data: dongCode } = useQuery(
    '/dongcode.json',
    fetchData('/dongcode.json'),
  );
  const { data: categoriesRes } = useQuery(
    '/categories.json',
    fetchData('/categories.json'),
  );

  const { handleSubmit, setValue } = useForm();

  const getChangeHandlerWithValue = (name: string) => (value: any) => {
    setValue(name, value);
  };
  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  const keyDownHandler = (e: any) => {
    if (e.key !== 'Enter') return;
    addCategories(category);
  };

  const selectHandler = (data: any) => {
    addCategories(data);
  };

  const addCategories = (checkValue: string) => {
    const mustInArr = categoriesRes?.data.map((el: any) => el.value);
    const mustNotArr = categories;
    if (!checkValid({ checkValue, mustInArr, mustNotArr })) return;
    setCategories([...categories, checkValue]);
    setCategory('');
  };

  const onValid = (data: any) => {
    console.log(data, categories);
  };

  useEffect(() => {
    if (!categoriesRes) return;
    setCategoriesOptions(
      categoriesRes.data.filter((el: any) => !categories.includes(el.value)),
    );
  }, [categories, categoriesRes]);

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
          <Input
            placeholder="Basic usage"
            onChange={getChangeHandlerWithEvent('title')}
          />
        </div>
        <div>
          카테고리
          {categories.length > 0
            ? categories.map((category, i) => (
                <span
                  key={i}
                  style={{ padding: '1rem', backgroundColor: 'tomato' }}
                >
                  {category}
                </span>
              ))
            : '카테고리가 없습니다'}
          <AutoComplete
            options={categoriesOptions}
            filterOption={autoCompleteFilter}
            popupClassName="certain-category-search-dropdown"
            value={category}
            onChange={e => setCategory(e)}
            onKeyDown={keyDownHandler}
            onSelect={selectHandler}
          >
            <Input.Search size="large" placeholder="input here" />
          </AutoComplete>
        </div>
        <div>
          모임정원
          <InputNumber min={1} onChange={getChangeHandlerWithValue('num')} />
        </div>
        <div>
          모임장소
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            options={dongCode?.data}
            onChange={getChangeHandlerWithValue('location')}
            filterOption={autoCompleteFilter}
          >
            <Input.Search size="large" placeholder="input here" />
          </AutoComplete>
        </div>
        <div>
          모임일정
          <Input
            placeholder="Basic usage"
            onChange={getChangeHandlerWithEvent('meetingDate')}
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
