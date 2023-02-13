import React, { useState, useRef } from 'react';

import Modal from './Modal';
import { BiMap } from 'react-icons/bi';

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
            <div className="user-info-item">
              <h2>{profileNickname}</h2>
              <p>@username</p>
            </div>

            <div className="location-item">
              <BiMap />
              <span>역삼동</span>
            </div>
          </div>
        </div>
        <Modal />
      </div>
    </div>
  );
}

export default EditProfile;
