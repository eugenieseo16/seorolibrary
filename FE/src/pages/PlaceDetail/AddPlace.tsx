import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Input, InputNumber } from 'antd';
import { useForm } from 'react-hook-form';
import Slider from 'react-slick';
import { scroller, Element } from 'react-scroll';
import { MdOutlineClose } from 'react-icons/md';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';

import { checkValid } from '@src/utils/arrUtils';
import { autoCompleteFilter } from '@src/utils/utils';
import AddPlaceHeader from '@components/MyPlace/AddPlaceHeader';
import './AddPlace.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';
import MyImageUpload from '@components/MyImageUpload/MyImageUpload';

function AddPlace() {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  const dongCode = useMyQuery('/dongcode.json');
  const categoriesRes = useMyQuery('/categories.json');

  const { handleSubmit, register, setValue, getValues } = useForm();

  const getChangeHandlerWithValue = (name: string) => (value: any) => {
    setValue(name, value);
  };
  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  // const keyDownHandler = (e: any) => {
  //   if (e.key !== 'Enter') return;
  //   addCategories(category);
  // };

  const addCategories = (checkValue: string) => {
    const mustInArr = categoriesRes?.map((el: any) => el.value);
    const mustNotArr = categories;
    if (!checkValid({ checkValue, mustInArr, mustNotArr })) return;
    setCategories([checkValue, ...categories]);
    setCategory('');
  };

  const focusScroll = (name: string) => () => {
    scroller.scrollTo(name, { duration: 300, smooth: true });
  };

  // const deleteCategory = (name: string) => () => {
  //   const newCategories = categories.filter(category => category !== name);
  //   setCategories(newCategories);
  // };

  const onValid = (data: any) => {
    console.log(data, categories);
  };
  // const handleNumButton = (e: any) => {
  //   const num = +getValues('num');
  //   if (e.target.innerHTML === '+') setValue('num', num + 1);
  //   else setValue('num', num - 1);
  // };

  useEffect(() => {
    if (!categoriesRes) return;
    setCategoriesOptions(
      categoriesRes.filter((el: any) => !categories.includes(el.value)),
    );
  }, [categories, categoriesRes]);

  return (
    <>
      <div
        className="book-club-generate-container"
        style={{ position: 'relative' }}
      >
        <AddPlaceHeader />
        <form
          onSubmit={handleSubmit(onValid)}
          className="book-club-generate-form"
        >
          <div>
            <h3>장소 사진첨부</h3>
            <MyImageUpload />
          </div>
          <div>
            <h3>장소 이름</h3>
            <Input
              placeholder="Basic usage"
              onChange={getChangeHandlerWithEvent('title')}
            />
          </div>

          <Element name="location">
            <h3>장소 선택</h3>
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              options={dongCode}
              onChange={getChangeHandlerWithValue('location')}
              filterOption={autoCompleteFilter}
              onFocus={focusScroll('location')}
            >
              <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
          </Element>

          <Element name="description">
            <h3>장소 소개</h3>
            <Input.TextArea
              onChange={getChangeHandlerWithEvent('desc')}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
              onFocus={focusScroll('description')}
            />
          </Element>
        </form>
      </div>
      <FixedBottomButton text="장소 추가하기" onClick={handleSubmit(onValid)} />
    </>
  );
}

export default AddPlace;
