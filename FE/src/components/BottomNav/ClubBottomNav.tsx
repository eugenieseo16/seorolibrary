import React, { useEffect, useState, useRef } from 'react';
import './ClubBottomNav.styles.scss';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate, useParams } from 'react-router-dom';
import { useLastPathname } from '@src/hooks/usePathname';
import useScroll from '@src/hooks/useScroll';

function Button({ text, value, selected }: any) {
  const navigate = useNavigate();
  const url = value == 'main' ? '' : value;
  const path = useLastPathname();
  const params = useParams();

  const { color } = useSpring({
    color: selected ? '#fffbf1' : '#583f31',
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <animated.button
      onClick={() =>
        navigate(`/book-club/${params.id}/${url}`, { replace: true })
      }
      className={path == url ? 'selected' : ''}
      value={value}
      style={{ color, zIndex: 1 }}
    >
      <span style={{ zIndex: 99 }}>{text}</span>
    </animated.button>
  );
}

function ClubBottomNav() {
  const path = useLastPathname();
  const index = path == 'plan' ? 1 : path == 'books' ? 2 : 0;
  const direction = useScroll();

  const { opacity, transform, left } = useSpring({
    opacity: direction === 'down' ? 0 : 1,
    transform: `translateY(${direction === 'down' ? 180 : 0}px)`,
    left: `${index * (100 / 2)}%`,
    config: { mass: 5, tension: 500, friction: 80, duration: 150 },
  });

  return (
    <animated.div style={{ opacity, transform }} className="club-bottom-nav">
      <div style={{ position: 'relative' }}>
        <Button text="게시판" value="main" selected={index == 0} />
        <Button text="일정" value="plan" selected={index == 1} />
        {/* <Button text="읽은책" value="books" selected={index == 2} /> */}
        <animated.div style={{ left }} />
        <div className="background" />
      </div>
    </animated.div>
  );
}

export default ClubBottomNav;
