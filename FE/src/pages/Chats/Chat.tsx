import { getUserProfileAPI } from '@src/API/authAPI';
import { useUser } from '@src/hooks/useUser';
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

import { GrSend } from 'react-icons/gr';
import './Chat.styles.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Avatar } from 'antd';
// Add a new document in collection "cities"

function Chat() {
  const params = useParams();
  const user = useUser();
  const targetUser = getUserProfileAPI(params.id ? params.id : '');
  const { register, handleSubmit, reset } = useForm({ mode: 'onChange' });

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any>([]);
  const [chatId, setChatId] = useState();

  const chatRoom = useRef(``);

  useEffect(() => {
    if (!user || !targetUser) return;
    chatRoom.current = `${user?.memberId + ''}-${targetUser.memberId + ''}`;
    (async function () {
      const q = await query(collection(firebaseDB, chatRoom.current));
      const empty = await (await getDocs(q)).empty;
      if (empty) {
        chatRoom.current = `${targetUser.memberId + ''}-${user?.memberId + ''}`;
        const q = await query(
          collection(
            firebaseDB,
            `${targetUser.memberId + ''}-${user?.memberId + ''}`,
          ),
        );
        const empty = await (await getDocs(q)).empty;
        if (empty) {
          // 첫대화일때
          console.log('첫대화!');

          updateDoc(doc(firebaseDB, user?.memberId + '', 'chats-list'), {
            chatIds: arrayUnion(
              `${targetUser.memberId + ''}-${user?.memberId + ''}`,
            ),
          });

          updateDoc(
            doc(firebaseDB, `${targetUser.memberId + ''}`, 'chats-list'),
            {
              chatIds: arrayUnion(
                `${targetUser.memberId + ''}-${user?.memberId + ''}`,
              ),
            },
          );

          addDoc(
            collection(
              firebaseDB,
              `${targetUser.memberId + ''}-${user?.memberId + ''}`,
            ),
            {},
          );
        }
      }
      setLoading(false);
    })();
  }, [user, targetUser]);

  useEffect(() => {
    if (loading) return;
    const q = query(
      collection(firebaseDB, chatRoom.current),
      orderBy('createdAt'),
      limit(15),
    );

    const unSubscribe = onSnapshot(q, snapshot => {
      const messagesList = snapshot.docs.map(snap => {
        if (snap.data().username != user?.memberId + '') {
          updateDoc(doc(firebaseDB, chatRoom.current, snap.id), {
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
    addDoc(collection(firebaseDB, chatRoom.current), {
      username: user?.memberId + '',
      memberName: user?.memberName,
      message: data.message,
      isRead: false,
      createdAt: Date.now(),
    });
    reset();
  };
  console.log(messages);
  console.log(user?.memberName);
  return loading ? (
    <span>loading...</span>
  ) : (
    <div
      className="chat-container with-nav-layout-container"
      style={{ width: '425px' }}
    >
      <div className="menu">
        <a href="#" className="back">
          <img src={targetUser.memberProfile} draggable="false" />
        </a>
        <div className="name">{targetUser.memberName}</div>
        <div className="members"></div>
      </div>
      <ol className={'chat'}>
        {messages.map((message: any, i: number) => {
          const isMe = message.username == user?.memberId;
          return (
            <li className={isMe ? 'self' : 'other'}>
              <div className="msg">
                <p>{message.message}</p>
                <time>20:18</time>
              </div>
            </li>
          );
        })}
      </ol>

      <form className={'my-form'} onSubmit={handleSubmit(sendMessage)}>
        <div style={{ width: '100%', position: 'relative' }}>
          <input
            style={{
              padding: '10px 4rem 10px 1rem',
              fontSize: '1rem',
              width: '100%',
            }}
            type="text"
            {...register('message')}
          />
          <button
            style={{ position: 'absolute', right: 0, top: 0, width: '3rem' }}
            type="submit"
          >
            <GrSend />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
