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
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useUser } from '@src/hooks/useUser';
import { apiBaseUrl } from '@src/API/apiUrls';

function ChatItem({ data }: any) {
  const user = useUser();
  const navigate = useNavigate();
  const opponent = data.chatId
    .split('-')
    .filter((id: string) => id !== user?.memberId + '')[0];
  const targetUser = useMyQuery(
    `${apiBaseUrl}/members/search?memberId=${opponent}`,
  );
  console.log(targetUser);

  return (
    <List.Item
      key={data.username}
      onClick={() => navigate(`/chat/${targetUser?.memberName}`)}
    >
      <List.Item.Meta
        avatar={<Avatar src={targetUser?.memberProfile} />}
        title={<a>{targetUser?.memberName}</a>}
        description={<p className="message-preview"></p>}
      />
      {data.unreadSize > 0 && (
        <div style={{ paddingLeft: '1rem' }}>
          <Badge count={data.unreadSize} overflowCount={99} />
        </div>
      )}
    </List.Item>
  );
}
function ChatsList() {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [chatList, setChatList] = useState<any[]>([]);
  const chats = useRef<any>([]);
  useEffect(() => {
    if (!user) return;

    (async function () {
      const docRef = doc(firebaseDB, user.memberId + '', 'chats-list');
      const docSnap: any = await getDoc(docRef);
      if (!docSnap.data()) return;
      docSnap.data().chatIds.forEach(async (id: string) => {
        let chatData;

        const sizeQuery = await query(
          await collection(firebaseDB, id),
          await where('isRead', '==', false),
        );
        const unreadSize = await (await getDocs(sizeQuery)).size;

        chatData = {
          chatId: id,
          unreadSize,
        };
        chats.current.push(chatData);
        setLoading(false);
      });
    })();
  }, [user]);

  useEffect(() => {
    setChatList(chats.current);
  }, [chats.current, loading]);

  return (
    <>
      <SearchHeader text="채팅" search={false} />
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
