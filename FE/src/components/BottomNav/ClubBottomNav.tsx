import React, { useEffect, useState } from 'react';
import './ClubBottomNav.styles.scss';

function Button({ text, value, selected }: any) {
  return (
    <button className={selected == value ? 'selected' : ''} value={value}>
      {text}
    </button>
  );
}

function ClubBottomNav({ onChange }: any) {
  const [value, setValue] = useState<string>('posts');

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="club-bottom-nav">
      <div onClick={(e: any) => setValue(e.target.value)}>
        <Button text="게시판" value="posts" selected={value} />
        <Button text="일정" value="plan" selected={value} />
        <Button text="읽은책" value="readBooks" selected={value} />
      </div>
    </div>
  );
}

export default ClubBottomNav;
