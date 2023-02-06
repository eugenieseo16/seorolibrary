import React, { useEffect, useState, useRef } from 'react';
import './ClubBottomNav.styles.scss';
import { useSpring, animated } from '@react-spring/web';

function Button({ text, value, selected }: any) {
  return (
    <button className={selected == value ? 'selected' : ''} value={value}>
      {text}
    </button>
  );
}

function ClubBottomNav() {
  const [value, setValue] = useState<string>('posts');
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef(0);
  const { opacity, transform } = useSpring({
    opacity: visible ? 1 : 0,
    transform: `translateY(${visible ? 0 : 180}px)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    const scrollHandler = () => {
      if (scrollRef.current < window.pageYOffset) {
        if (visible) setVisible(false);
      } else {
        if (!visible) setVisible(true);
      }
      scrollRef.current = window.pageYOffset;
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [visible]);

  return (
    <animated.div style={{ opacity, transform }} className="club-bottom-nav">
      <div onClick={(e: any) => setValue(e.target.value)}>
        <Button text="게시판" value="posts" selected={value} />
        <Button text="일정" value="plan" selected={value} />
        <Button text="읽은책" value="readBooks" selected={value} />
      </div>
    </animated.div>
  );
}

export default ClubBottomNav;
