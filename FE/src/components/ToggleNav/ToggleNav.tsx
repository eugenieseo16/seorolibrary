import React from 'react';
import './ToggleNav.styles.scss';
interface item {
  text: string;
  id: string;
}
interface IToggleNavProps {
  selectedId: string;
  setSelectedId: ({ target }: any) => void;
  items: item[];
}

function ToggleNav({ selectedId, setSelectedId, items }: IToggleNavProps) {
  const setId = ({ target }: any) => setSelectedId(target.id);

  return (
    <div className="recommend-nav" onClick={setId}>
      {items.map((item, i) => (
        <div
          key={i}
          id={item.id}
          className={selectedId === item.id ? 'selected' : ''}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default ToggleNav;
