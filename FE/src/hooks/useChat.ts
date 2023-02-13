import { firebaseDB } from '@src/utils/fireBase';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';

export const getChatList = ({ user1, user2 }: any) => {
  useEffect(() => {
    let chatId = `${user1}-${user2}`;

    (async function () {
      const q = await query(collection(firebaseDB, chatId));
      const empty = await (await getDocs(q)).empty;
      if (empty) {
        chatId = `${user2}-${user1}`;
        const q = await query(collection(firebaseDB, chatId));
        const empty = await (await getDocs(q)).empty;
        if (empty) {
          // 첫대화일때
          updateDoc(doc(firebaseDB, user1, 'chats-list'), {
            chatIds: arrayUnion(chatId),
          });

          updateDoc(doc(firebaseDB, user2, 'chats-list'), {
            chatIds: arrayUnion(chatId),
          });

          addDoc(collection(firebaseDB, chatId), {});
        }
      }
    })();
  }, []);
};

export const useChatList = async ({ user }: any) => {
  const [chatList, setChatList] = useState<any>([]);
  const [temp, setTemp] = useState<any>();
  const docRef = doc(firebaseDB, user, 'chats-list');
  const docSnap: any = await getDoc(docRef);

  if (!docSnap.data()) return;
  docSnap.data().chatIds.forEach(async (id: string) => {
    const sizeQuery = query(
      collection(firebaseDB, id),
      where('isRead', '==', false),
    );
    const unreadSize = await (await getDocs(sizeQuery)).size;

    const previewQuery = query(
      collection(firebaseDB, id),
      orderBy('createdAt', 'desc'),
      limit(1),
    );
    const previewSnapshot = await getDocs(previewQuery);

    previewSnapshot.forEach(doc => {
      const chatData = {
        chatId: id,
        preview: doc.data().message,
        createdAt: doc.data().createdAt,
        username: doc.data().username,
        unreadSize,
      };
      setChatList([...chatList, chatData]);
      console.log('LOOP', chatData);
    });
  });

  return chatList;
};
