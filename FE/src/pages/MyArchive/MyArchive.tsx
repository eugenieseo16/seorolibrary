import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';

import ArchiveHeader from '@components/MyArchive/ArchiveHeader';
import BookReport from '@components/MyArchive/BookReport';
import './MyArchive.styles.scss'

function MyArchive () {
  const data = useMyQuery('https://63df9b7d59bccf35dab61d9d.mockapi.io/api/v1/bookReport');

  return(
    <div className="my-archive-container">
      <ArchiveHeader/>
      <div>
        {!data ? (
          <div>
            <h1>
              기록을 등록해주세요
            </h1>
          </div>
        ) : (
          <div className="report-container">
            {data?.map((report: any, i: number) => (
              <div className="report-item" key={i}>
                <div className="report-item-image">
                  <img src={report.upload} alt="" />
                </div>

                <div className="report-item-text">
                  <h1>{report.title}</h1>
                  <h2>{report.content}</h2>
                </div>

              </div>
                
            ))}
          </div>
        )}
    
    </div>

    </div>
  );
}

export default MyArchive;