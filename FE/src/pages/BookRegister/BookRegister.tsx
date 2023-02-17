import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Header from '@components/Header/Header';
import RegisterDetail from '@components/BookRegister/RegisterDetail';

import './BookRegister.styles.scss';
import {
  bookSearchByTitle,
  IRegisterBook,
  registerBookAPI,
} from '@src/API/bookAPI';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import { useUser } from '@src/hooks/useUser';
import { useMobile } from '@src/hooks/useMobile';

function BookRegister() {
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [bookResults, setBookResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUser();
  const [form] = Form.useForm();

  const onSearch = async (value: string, open: boolean) => {
    if (loading) return;
    setLoading(true);
    if (open) setIsModalOpen(true);
    const data = await bookSearchByTitle(value);
    setBookResults(data);
    setLoading(false);
  };

  const submitBook = async (value: any) => {
    if (loading) return;
    if (!selectedBook) {
      setErr('책을 선택해 주세요');
      return;
    }
    setLoading(true);
    console.log(value);

    const obj: IRegisterBook = {
      bookImage: selectedBook.thumbnail,
      bookTitle: selectedBook.title,
      author: selectedBook?.authors[0],
      bookDescrib: selectedBook.contents,
      isbn: selectedBook.isbn.split(' ')[1],
      memberId: user!.memberId,
      ownComment: value.ownComment,
    };
    const response = await registerBookAPI(obj);
    setLoading(false);
    navigate(`/profile`);
  };
  const mobile = useMobile();

  return (
    <>
      <div className="book-register-container">
        <Header text="도서 등록" />

        <Input.Search
          size="large"
          placeholder="등록할 도서 제목을 입력해주세요"
          onSearch={value => onSearch(value, true)}
          enterButton
          style={{ marginBottom: '1rem' }}
        />
        {err && <h3 style={{ color: 'tomato', marginBottom: 16 }}>{err}</h3>}
        <RegisterDetail />
        {selectedBook && <Book bookInfo={selectedBook} />}
        <Form
          form={form}
          name="control-hooks"
          onFinish={submitBook}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="ownComment"
            label={
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>
                한줄평
              </h3>
            }
            rules={[{ required: true, message: '한줄평을 입력해 주세요' }]}
          >
            <Input />
          </Form.Item>
        </Form>

        <Modal
          style={{
            top: '0',
            width: '100vw',
            maxWidth: '425px',
            margin: 0,
          }}
          title={
            <div
              style={{
                position: 'fixed',
                top: 0,
                width: '100vw',
                right: 'calc(15vw + 1rem)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                maxWidth: '425px',
                ...(mobile && {
                  right: '15vw !important',
                }),
              }}
            >
              <Input.Search
                size="large"
                placeholder="input search text"
                onSearch={value => onSearch(value, false)}
                enterButton
              />
              <button></button>
            </div>
          }
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <div style={{ padding: '3rem 0' }}>
            {bookResults?.map((bookInfo, i) => (
              <div
                key={i}
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
        onClick={() => form.submit()}
      />
    </>
  );
}

export default BookRegister;

const Book = ({ bookInfo }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
    </div>
  );
};
