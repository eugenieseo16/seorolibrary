import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Badge, List, message } from 'antd';
import './ChatsList.styles.scss';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firebaseDB } from '@src/utils/fireBase';
import { useSelector } from 'react-redux';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useChatList } from '@src/hooks/useChat';

function ChatItem({ data }: any) {
  const user = useSelector((state: any) => state.user);
  // const userData = useMyQuery(
  //   `http://i8a209.p.ssafy.io:8080/members/${data.username}`,
  // );
  const navigate = useNavigate();
  const opponent = data.chatId
    .split('-')
    .filter((id: string) => id !== user.username)[0];

  return (
    <List.Item
      key={data.username}
      onClick={() => navigate(`/chat/${opponent}`)}
    >
      <List.Item.Meta
        avatar={<Avatar src={''} />}
        title={<a>{opponent}</a>}
        description={<p className="message-preview">{data.preview}</p>}
      />
      {opponent == data.username && data.unreadSize > 0 && (
        <div style={{ paddingLeft: '1rem' }}>
          <Badge count={data.unreadSize} overflowCount={99} />
        </div>
      )}
    </List.Item>
  );
}
function ChatsList() {
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);
  const [chatList, setChatList] = useState<any[]>([]);
  const chats = useRef<any>([]);
  useEffect(() => {
    if (!user) return;

    (async function () {
      const docRef = doc(firebaseDB, user.username, 'chats-list');
      const docSnap: any = await getDoc(docRef);
      if (!docSnap.data()) return;
      docSnap.data().chatIds.forEach(async (id: string) => {
        let chatData;

        const sizeQuery = await query(
          await collection(firebaseDB, id),
          await where('isRead', '==', false),
        );
        const unreadSize = await (await getDocs(sizeQuery)).size;

        const previewQuery = await query(
          collection(firebaseDB, id),
          orderBy('createdAt', 'desc'),
          limit(1),
        );
        const previewSnapshot = await getDocs(previewQuery);
        await previewSnapshot.forEach(async doc => {
          chatData = {
            chatId: id,
            preview: await doc.data().message,
            createdAt: await doc.data().createdAt,
            username: await doc.data().username,
            unreadSize,
          };
          chats.current.push(chatData);
          setLoading(false);
        });
      });
    })();
  }, [user]);

  useEffect(() => {
    setChatList(chats.current);
  }, [chats.current, loading]);

  return (
    <>
      <SearchHeader text="채팅" />
      <div className="chats-list-container">
        <List>
          {chatList.map((chatData, i) => {
            return <ChatItem key={i} data={chatData} />;
          })}
        </List>
      </div>
    </>
  );
}

export default ChatsList;
