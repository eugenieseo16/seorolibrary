import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';

function BookReport() {
  const data = useMyQuery('https://63df9b7d59bccf35dab61d9d.mockapi.io/api/v1/bookReport');

  return (
    <div>
      {data?.map((report: any, i: number) => (
        <div className="report-item" key={i}>
          <h1>{report.title}</h1>
          <h1>{report.Content}</h1>

        </div>
      ))}
    </div>
  );
}

export default BookReport;