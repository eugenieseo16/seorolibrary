import { useMyQuery } from '@src/hooks/useMyQuery';
import { libraryAPIUrls } from './apiUrls';

export const libraryDataAPI = ({ me, you }: { me?: number; you?: number }) => {
  if (!me || !you) return;
  const data = useMyQuery(
    `${libraryAPIUrls.libraryData}/${you}?memberId=${me}`,
  );
  return data;
};
