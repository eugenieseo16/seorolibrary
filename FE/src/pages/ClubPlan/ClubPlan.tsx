import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar } from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';
import { FloatButton } from 'antd';
import { PlusOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
dayjs.extend(dayLocaleData);
import './ClubPlan.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import useScroll from '@src/hooks/useScroll';
import { useSpring, animated } from '@react-spring/web';

interface IPlan {
  title: string;
  content: string;
  date: string;
  id: string;
}

const ClubPlan: React.FC = () => {
  const direction = useScroll();
  const [dayObj, setDayObj] = useState(dayjs());
  const [visiblePlan, setVisiblePlan] = useState<IPlan[]>([]);
  const onChange = (value: Dayjs) => setDayObj(value);
  const plans: IPlan[] = useMyQuery('/plan.json');

  const { opacity, transform } = useSpring({
    opacity: direction === 'up' ? 1 : 0.4,
    transform: `scale(${direction === 'up' ? 1 : 0.7}) translateY(${
      direction === 'up' ? 0 : 80
    }px)`,
    config: { mass: 5, tension: 500, friction: 80, duration: 150 },
  });

  useEffect(() => {
    const currentPlan = plans?.filter(el => {
      return (
        dayObj.year() == dayjs(el.date).year() &&
        dayObj.month() == dayjs(el.date).month() &&
        dayObj.date() == dayjs(el.date).date()
      );
    });
    setVisiblePlan(currentPlan);
  }, [dayObj]);

  return (
    <div className="club-plan-container">
      <SearchHeader text={'멀캠으로 모여랏'} search={false} />
      <Calendar
        fullscreen={false}
        locale={locale}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const year = value.year();
          const month = value.month();
          const display = `${month == 0 ? year - 1 : year}년 ${month + 1}월`;
          return (
            <div className="calendar-header">
              <span onClick={() => onChange(value.clone().month(month - 1))}>
                <LeftOutlined />
              </span>
              <h1>{display}</h1>
              <span onClick={() => onChange(value.clone().month(month + 1))}>
                <RightOutlined />
              </span>
            </div>
          );
        }}
        defaultValue={dayjs()}
        onChange={onChange}
        dateFullCellRender={date => {
          const currentFullDate = dayObj.format('YYYY/MM/DD');
          const currentMonth = dayObj.month();
          const day = date.day();
          const selected = currentFullDate == date.format('YYYY/MM/DD');

          const color = selected
            ? '#fff'
            : day === 0
            ? 'tomato'
            : day === 6
            ? '#00009C'
            : '#000000';
          const backgroundColor = selected ? 'black' : 'white';
          const opacity = date.month() != currentMonth ? 0.3 : 1;
          const currentPlan = plans?.filter(el => {
            return (
              date.month() == dayjs(el.date).month() &&
              date.date() == dayjs(el.date).date()
            );
          });
          const circle = currentPlan?.length > 0;

          return (
            <div
              style={{
                color,
                backgroundColor,
                opacity,
                aspectRatio: 1,
                fontFamily: 'NEXON',
                fontWeight: '600',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px',
              }}
            >
              <span>{date.date()}</span>
              {circle && (
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    background: 'tomato',
                    borderRadius: '50%',
                  }}
                />
              )}
            </div>
          );
        }}
      />
      {visiblePlan?.map(plan => (
        <div key={plan.id} className="plan-item-container">
          <div className="date-container">
            <h3>05</h3>
            <h4>일요일</h4>
          </div>
          <div className="content">
            <h2>{plan.title}</h2>
            <p>{plan.content}</p>
          </div>
        </div>
      ))}
      <animated.div
        onClick={() => {}}
        className="float-button"
        style={{ opacity, transform }}
      >
        <PlusOutlined />
      </animated.div>
    </div>
  );
};

export default ClubPlan;
