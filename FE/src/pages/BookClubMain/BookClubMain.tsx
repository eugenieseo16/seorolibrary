import ClubBottomNav from '@components/BottomNav/ClubBottomNav';
import { useMyQuery } from '@src/hooks/useMyQuery';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function BookClubMain() {
  const [filter, setFilter] = useState<any>('a');
  const { id } = useParams();
  const detailData: any = useMyQuery(`/clubDetail.json`);

  const handleFilter = (e: any) => setFilter(e);
  console.log('FILTER', filter);
  return (
    <>
      <div>main container</div>
      <ClubBottomNav onChange={handleFilter} />
    </>
  );
}

export default BookClubMain;
