import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Header from '@components/Header/Header';
import RegisterDetail from '@components/BookRegister/RegisterDetail';

import './BookRegister.styles.scss';
import { bookSearchByTitle } from '@src/API/bookAPI';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import axios from 'axios';

function BookRegister() {
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [bookResults, setBookResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const title = location.state?.title;
  const author = location.state?.author;

  const onSearch = async (value: string, open: boolean) => {
    if (loading) return;
    setLoading(true);
    if (open) setIsModalOpen(true);
    const data = await bookSearchByTitle(value);
    setBookResults(data);
    setLoading(false);
  };
  const submitBook = async () => {
    if (loading) return;
    setLoading(true);
    // axios.post()
    setLoading(false);
  };

  return (
    <>
      <div className="book-register-container">
        <Header text="도서 등록" />

        <Input.Search
          size="large"
          placeholder="보유하고 있는 책을 선택해주세요"
          onSearch={value => onSearch(value, true)}
          enterButton
          style={{ marginBottom: '1rem' }}
        />
        <RegisterDetail />
        {selectedBook && <Book bookInfo={selectedBook} />}
        <Modal
          style={{
            top: '0',
            width: '100vw',
            maxWidth: '100vw',
            margin: 0,
          }}
          title={
            <div
              style={{
                position: 'fixed',
                top: 0,
                width: '100vw',
                left: 0,
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                background: 'tomato',
              }}
            >
              <button style={{ padding: '1rem' }}>취소</button>
              <Input.Search
                size="large"
                placeholder="input search text"
                onSearch={value => onSearch(value, false)}
                enterButton
              />
            </div>
          }
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <div style={{ padding: '3rem 0' }}>
            {bookResults?.map(bookInfo => (
              <div
                className="book-item-container"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBook(bookInfo);
                }}
              >
                <img src={bookInfo.thumbnail} alt="" />
                <div>
                  <h2>{bookInfo.title}</h2>
                  <div>
                    <p>{bookInfo.authors[0]}</p>
                    <p>{bookInfo.publisher}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
      <FixedBottomButton
        style={{ opacity: loading ? 0.3 : 1 }}
        text="도서등록"
        onClick={submitBook}
      />
    </>
  );
}

export default BookRegister;

const Book = ({ bookInfo }: any) => {
  return (
    <div className="book-item-container">
      <img src={bookInfo.thumbnail} alt="" />
      <div style={{ justifyContent: 'flex-start', padding: '1rem 8px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          {bookInfo.title}
        </h2>
        <div>
          <p style={{ marginBottom: 4 }}>{bookInfo.authors[0]}</p>
          <p>{bookInfo.publisher}</p>
        </div>
      </div>
    </div>
  );
};
