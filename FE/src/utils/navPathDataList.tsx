import {
  RiHome2Fill,
  RiHome2Line,
  RiGroupLine,
  RiGroupFill,
  RiBook3Line,
  RiBook3Fill,
  RiMap2Line,
  RiMapFill,
  RiUser3Line,
  RiUser3Fill,
} from 'react-icons/ri';

export const navPathDataList = [
  {
    href: '',
    title: '홈',
    icon: { default: <RiHome2Line />, selected: <RiHome2Fill /> },
  },
  {
    href: 'book-club',
    title: '독서모임',
    icon: { default: <RiGroupLine />, selected: <RiGroupFill /> },
  },
  {
    href: 'near',
    title: '근처도서',
    icon: { default: <RiBook3Line />, selected: <RiBook3Fill /> },
  },
  {
    href: 'recommend',
    title: '장소추천',
    icon: { default: <RiMap2Line />, selected: <RiMapFill /> },
  },
  {
    href: 'profile',
    title: '나의도서관',
    icon: { default: <RiUser3Line />, selected: <RiUser3Fill /> },
  },
];
