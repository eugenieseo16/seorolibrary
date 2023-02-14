import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUser } from '@src/types/types';
export const useUser = () => {
  const navigate = useNavigate();
  const user: IUser = useSelector((state: any) => state.user);
  if (!user) {
    navigate('/');
    return;
  }
  return user;
};
