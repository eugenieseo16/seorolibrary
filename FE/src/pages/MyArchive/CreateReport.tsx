import React from 'react';

import Header from '@components/Header/Header';
import Report from '@components/MyArchive/Report';

import'./CreateReport.styles.scss';

function CreateReport () {
  return(
    <div className="create-report-container">
      <Header text={"기록하기"}/>
      <Report />

    </div>
  );
}

export default CreateReport;