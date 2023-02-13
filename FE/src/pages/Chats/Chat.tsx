import { firebaseDB } from '@src/utils/fireBase';
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  doc,
  orderBy,
  limit,
  updateDoc,
  serverTimestamp,
  setDoc,
  getDoc,
  getDocs,
  arrayUnion,
} from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Add a new document in collection "cities"

function Chat() {
  const params = useParams();
  const user = useSelector((state: any) => state.user);
  const { register, handleSubmit, reset } = useForm({ mode: 'onChange' });

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any>([]);
  const [chatId, setChatId] = useState(`${user.username}-${params.id}`);

  useEffect(() => {
    (async function () {
      const q = await query(collection(firebaseDB, chatId));
      const empty = await (await getDocs(q)).empty;
      if (empty) {
        setChatId(`${params.id}-${user.username}`);
        const q = await query(
          collection(firebaseDB, `${params.id}-${user.username}`),
        );
        const empty = await (await getDocs(q)).empty;
        if (empty) {
          // 첫대화일때
          console.log('첫대화!');

          updateDoc(doc(firebaseDB, user.username, 'chats-list'), {
            chatIds: arrayUnion(`${params.id}-${user.username}`),
          });

          updateDoc(doc(firebaseDB, `${params.id}`, 'chats-list'), {
            chatIds: arrayUnion(`${params.id}-${user.username}`),
          });

          addDoc(collection(firebaseDB, `${params.id}-${user.username}`), {});
        }
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) return;
    const q = query(
      collection(firebaseDB, chatId),
      orderBy('createdAt'),
      limit(15),
    );

    const unSubscribe = onSnapshot(q, snapshot => {
      const messagesList = snapshot.docs.map(snap => {
        if (snap.data().username != user.username) {
          updateDoc(doc(firebaseDB, chatId, snap.id), {
            isRead: true,
          });
        }
        return snap.data();
      });
      setMessages(messagesList);
    });

    return () => unSubscribe();
  }, [loading]);

  const sendMessage = async (data: any) => {
    addDoc(collection(firebaseDB, chatId), {
      username: user.username,
      message: data.message,
      isRead: false,
      createdAt: Date.now(),
    });
    reset();
  };

  return loading ? (
    <span>loading...</span>
  ) : (
    <div className={'chat-container'}>
      <div className={'chat-box'}>
        {messages.map((message: any, i: number) => (
          <div
            style={{
              flexDirection: message.username == true ? 'row-reverse' : 'row',
            }}
            className={'chat-item'}
            key={i}
          >
            {/* eslint-disable-next-line  */}
            <img src={message.photoURL} alt="" />
            <div>
              <h1
                style={{
                  flexDirection:
                    message.username == true ? 'row-reverse' : 'row',
                }}
              >
                {message.username}
              </h1>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form className={'my-form'} onSubmit={handleSubmit(sendMessage)}>
        <div>
          <input type="text" {...register('message')} />
          <button type="submit">보내기</button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
