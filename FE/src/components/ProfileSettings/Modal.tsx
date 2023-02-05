import React, { useState } from 'react';
    import './Modal.styles.scss';
    import { Button, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>
        프로필 변경
      </Button>
      <Modal
        open={open}
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={handleOk}>
            제출
          </Button>
        ]}
      >
        <div className="modal-container">

          <div>
          <img src="https://blog.kakaocdn.net/dn/NcsyV/btrv0P9o3Es/HsfydQmtQzsT00IRSsyoLK/img.jpg" alt="" />

          </div>
          <div>
            <p>닉네임 수정:</p>
            <input type="text" placeholder="나미리선생님" />
          </div>
        </div>
        
      </Modal>
    </>
  );
};

export default App;