import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';

import ArchiveHeader from '@components/MyArchive/ArchiveHeader';
import './MyArchive.styles.scss'

function MyArchive () {
  const data = useMyQuery('https://run.mocky.io/v3/33369776-b88c-40cf-be9c-32d8aac21e44');

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