import React from 'react';

import UserProfile from '@components/UserSection/UserProfile';
import BookTab from '@components/UserLibrary/BookTab';

function UserLibrary() {
  return (
    <div>
      {/* user profile section */}
      <UserProfile />

      {/* book shelf tab */}
      <BookTab />
    </div>
  );
}

export default UserLibrary;
