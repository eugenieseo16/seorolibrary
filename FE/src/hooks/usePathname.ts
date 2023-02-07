import { useLocation } from 'react-router-dom';

export default function usePathname() {
  const { pathname } = useLocation();
  return pathname.split('/');
}

export const useLastPathname = () => {
  const { pathname } = useLocation();
  const urls = pathname.split('/');
  const length = urls.length;
  return urls[length - 1];
};
