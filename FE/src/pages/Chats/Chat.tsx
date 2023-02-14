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

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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
                {message.memberName}
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
