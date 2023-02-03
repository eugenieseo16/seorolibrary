import { Divider } from 'antd';
import React, { useState, useRef } from 'react';

import { RiEdit2Line } from 'react-icons/ri';

import './EditProfile.styles.scss';
function EditProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(
    'https://blog.kakaocdn.net/dn/NcsyV/btrv0P9o3Es/HsfydQmtQzsT00IRSsyoLK/img.jpg',
  );
  const [profileNickname, setProfileNickname] = useState('나미리선생님');

  return (
    <div>
      <div className="edit-profile-container">
        <div className="profile-container">
          <img src={profileImage} />
          <div className="profile-item">
            <h2>{profileNickname}</h2>
            <p>@username</p>
          </div>
        </div>
        <button onClick={() => setEditProfile(!editProfile)}>
          프로필 변경
        </button>
      </div>

      {editProfile ? (
        <div className="edit-profile-dropdown-container">
          <h1>사진 수정</h1>
          {/* <img src={profileImage} alt="" /> */}
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            //   onChange={onChange}
            //   ref={fileInput}
          />
          <h1>닉네임 수정</h1>
          <p>{profileNickname}</p>
          <input type="submit" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EditProfile;
