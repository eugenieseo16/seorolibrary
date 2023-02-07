import React, { useEffect, useState, useRef } from 'react';
import './ClubBottomNav.styles.scss';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { useLastPathname } from '@src/hooks/usePathname';

function Button({ text, value }: any) {
  const navigate = useNavigate();
  const url = value == 'main' ? '' : value;
  const path = useLastPathname();
  const selected = path == url;

  const { color } = useSpring({
    color: selected ? '#fffbf1' : '#583f31',
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <animated.button
      onClick={() => navigate(`/book-club/${1}/${url}`)}
      className={path == url ? 'selected' : ''}
      value={value}
      style={{ color, zIndex: 1 }}
    >
      <span style={{ zIndex: 99 }}>{text}</span>
    </animated.button>
  );
}

function ClubBottomNav() {
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef(0);
  const path = useLastPathname();
  const index = path == '' ? 0 : path == 'plan' ? 1 : 2;

  const { opacity, transform, left } = useSpring({
    opacity: visible ? 1 : 0,
    transform: `translateY(${visible ? 0 : 180}px)`,
    left: `${index * (100 / 3)}%`,
    config: { mass: 5, tension: 500, friction: 80, duration: 150 },
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
      <div style={{ position: 'relative' }}>
        <Button text="게시판" value="main" />
        <Button text="일정" value="plan" />
        <Button text="읽은책" value="books" />
        <animated.div style={{ left }} />
        <div className="background" />
      </div>
    </animated.div>
  );
}

export default ClubBottomNav;
