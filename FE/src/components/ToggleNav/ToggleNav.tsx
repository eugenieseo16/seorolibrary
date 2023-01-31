import React from 'react';
import './ToggleNav.styles.scss';
interface IToggleNavProps {
  selectedId: string;
  setId: ({ target }: any) => void;
  items: string[];
}

function ToggleNav({ selectedId, setId, items }: IToggleNavProps) {
  return (
    <div className="recommend-nav" onClick={setId}>
      {items.map((item, i) => (
        <div
          key={i}
          id={i + ''}
          className={selectedId === i + '' ? 'selected' : ''}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default ToggleNav;
