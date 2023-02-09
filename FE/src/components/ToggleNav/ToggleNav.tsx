import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

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

function NavItem({ id, text, selectedId, ...rest }: any) {
  const { color } = useSpring({
    color: selectedId === id ? '#583f31' : '#baaf92',
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <animated.div
      id={id}
      className={selectedId === id ? 'selected' : ''}
      style={{ color }}
      {...rest}
    >
      {text}
    </animated.div>
  );
}

function ToggleNav({ selectedId, setSelectedId, items }: IToggleNavProps) {
  const setId = ({ target }: any) => setSelectedId(target.id);
  const [index, setIndex] = useState(
    items.findIndex(item => item.id === selectedId),
  );

  const { left } = useSpring({
    left: `${index * (100 / items.length)}%`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="recommend-nav" onClick={setId}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <NavItem
            onClick={() => setIndex(i)}
            text={item.text}
            id={item.id}
            selectedId={selectedId}
          />
          <animated.p
            key={i}
            id={item.id}
            style={{
              width: `${100 / items.length}%`,
              left,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default ToggleNav;
