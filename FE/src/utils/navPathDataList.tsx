import { MdHome, MdOutlineHome } from 'react-icons/md';
import {
  RiBook3Line,
  RiBook3Fill,
  RiUser3Line,
  RiUser3Fill,
} from 'react-icons/ri';
import { HiUsers, HiOutlineUsers, HiOutlineMap, HiMap } from 'react-icons/hi';
export const navPathDataList = [
  {
    href: '',
    title: '홈',
    icon: { default: <MdOutlineHome />, selected: <MdHome /> },
  },
  {
    href: 'meeting',
    title: '독서모임',
    icon: { default: <HiOutlineUsers />, selected: <HiUsers /> },
  },
  {
    href: 'near',
    title: '근처도서',
    icon: { default: <RiBook3Line />, selected: <RiBook3Fill /> },
  },
  {
    href: 'recommend',
    title: '장소추천',
    icon: { default: <HiOutlineMap />, selected: <HiMap /> },
  },
  {
    href: 'profile',
    title: '나의도서관',
    icon: { default: <RiUser3Line />, selected: <RiUser3Fill /> },
  },
];
