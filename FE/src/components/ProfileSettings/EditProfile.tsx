import React, { useState, useRef } from 'react';

import Modal from './Modal';
import { BiMap } from 'react-icons/bi';

import './EditProfile.styles.scss';
import { useUser } from '@src/hooks/useUser';
function EditProfile() {
  const user = useUser();

  return (
    <div>
      <div className="edit-profile-container">
        <div className="profile-container">
          <img src={user?.memberProfile} />

          <div className="profile-item">
            <div className="user-info-item">
              <h2>{user?.memberName}</h2>
            </div>

            <div className="location-item">
              <BiMap />
              <span>{user?.memberDongCode}</span>
            </div>
          </div>
        </div>
        <Modal />
      </div>
    </div>
  );
}

export default EditProfile;
