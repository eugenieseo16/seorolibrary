import React from 'react';
import './ToggleNav.styles.scss';
interface IToggleNavProps {
  selectedId: string;
  setSelectedId: ({ target }: any) => void;
  items: string[];
}

function ToggleNav({ selectedId, setSelectedId, items }: IToggleNavProps) {
  const setId = ({ target }: any) => setSelectedId(target.id);

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
