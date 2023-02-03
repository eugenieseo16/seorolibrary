import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Input, InputNumber } from 'antd';
import { useForm } from 'react-hook-form';
import Slider from 'react-slick';
import { scroller, Element } from 'react-scroll';
import { MdOutlineClose } from 'react-icons/md';

import { checkValid } from '@src/utils/arrUtils';
import { autoCompleteFilter } from '@src/utils/utils';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import './BookClubGenerate.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';
import DragDropUpload from '@components/DragDropUpload/DragDropUpload';

function BookClubGenerate() {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  const [num, setNum] = useState<any>(1);

  const dongCode = useMyQuery('/dongcode.json');
  const categoriesRes = useMyQuery('/categories.json');

  const { handleSubmit, register, setValue, getValues } = useForm();

  const getChangeHandlerWithValue = (name: string) => (value: any) => {
    setValue(name, value);
  };
  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  const keyDownHandler = (e: any) => {
    if (e.key !== 'Enter') return;
    addCategories(category);
  };

  const addCategories = (checkValue: string) => {
    const mustInArr = categoriesRes?.data.map((el: any) => el.value);
    const mustNotArr = categories;
    if (!checkValid({ checkValue, mustInArr, mustNotArr })) return;
    setCategories([checkValue, ...categories]);
    setCategory('');
  };

  const focusScroll = (name: string) => () => {
    scroller.scrollTo(name, { duration: 300, smooth: true });
  };

  const deleteCategory = (name: string) => () => {
    const newCategories = categories.filter(category => category !== name);
    setCategories(newCategories);
  };

  const onValid = (data: any) => {
    console.log(data, categories);
  };
  const handleNumButton = (e: any) => {
    const num = +getValues('num');
    if (e.target.innerHTML === '+') setValue('num', num + 1);
    else setValue('num', num - 1);
  };

  useEffect(() => {
    if (!categoriesRes) return;
    setCategoriesOptions(
      categoriesRes.data.filter((el: any) => !categories.includes(el.value)),
    );
  }, [categories, categoriesRes]);

  return (
    <>
      <div
        className="book-club-generate-container"
        style={{ position: 'relative' }}
      >
        <SearchHeader text="독서모임 생성" search={false} />
        <form
          onSubmit={handleSubmit(onValid)}
          className="book-club-generate-form"
        >
          <div>
            <h3>사진첨부</h3>
            <DragDropUpload />
          </div>
          <div>
            <h3>모임이름</h3>
            <Input
              placeholder="Basic usage"
              onChange={getChangeHandlerWithEvent('title')}
            />
          </div>
          <Element name="category">
            <h3>카테고리</h3>
            <div className="categories-container">
              {categories?.length > 0 ? (
                <Slider
                  swipeToSlide
                  slidesToShow={3}
                  infinite={false}
                  className="my-slider"
                >
                  {categories.map((category, i) => (
                    <div key={i} style={{ paddingRight: '1rem' }}>
                      <p>
                        <span>{category}</span>
                        <MdOutlineClose
                          size={'1.2rem'}
                          onClick={deleteCategory(category)}
                        />
                      </p>
                    </div>
                  ))}
                </Slider>
              ) : (
                '카테고리를 선택해주세요'
              )}
            </div>
            <AutoComplete
              options={categoriesOptions}
              filterOption={autoCompleteFilter}
              popupClassName="certain-category-search-dropdown"
              value={category}
              onFocus={focusScroll('category')}
              onChange={e => setCategory(e)}
              onKeyDown={keyDownHandler}
              onSelect={addCategories}
            >
              <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
          </Element>
          <Element name="people" className="people">
            <h3>모임정원</h3>
            <div className="num-container">
              <Button onClick={handleNumButton}>-</Button>
              <InputNumber
                {...register('num')}
                min={1}
                max={100}
                onChange={getChangeHandlerWithValue('num')}
                onFocus={focusScroll('people')}
              />
              <Button onClick={handleNumButton}>+</Button>
            </div>
          </Element>
          <Element name="location">
            <h3>모임장소</h3>
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              options={dongCode?.data}
              onChange={getChangeHandlerWithValue('location')}
              filterOption={autoCompleteFilter}
              onFocus={focusScroll('location')}
            >
              <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
          </Element>
          {/* <div>
            <h3>모임일정</h3>
            <Input
              placeholder="Basic usage"
              onChange={getChangeHandlerWithEvent('meetingDate')}
            />
          </div> */}

          <Element name="description">
            <h3>모임소개</h3>
            <Input.TextArea
              onChange={getChangeHandlerWithEvent('desc')}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
              onFocus={focusScroll('description')}
            />
          </Element>
        </form>
      </div>
      <FixedBottomButton text="모임 생성하기" onClick={handleSubmit(onValid)} />
    </>
  );
}

export default BookClubGenerate;
