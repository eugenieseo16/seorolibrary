import React, { useState, useRef } from 'react';

import Modal from './Modal';
import { createRoot } from 'react-dom/client';

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
        <Modal />
      </div>
    </div>
  );
}

export default EditProfile;
