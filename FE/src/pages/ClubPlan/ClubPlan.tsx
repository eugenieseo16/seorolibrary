import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar } from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';
import { PlusOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
dayjs.extend(dayLocaleData);
import './ClubPlan.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import useScroll from '@src/hooks/useScroll';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate, useParams } from 'react-router-dom';
import { clubPlanListAPI } from '@src/API/clubAPI';

interface IPlan {
  groupScheduleContent: string;
  groupScheduleId: number;
  groupScheduleTime: string;
  groupScheduleTitle: string;
}

const ClubPlan: React.FC = () => {
  const direction = useScroll();
  const navigate = useNavigate();
  const [dayObj, setDayObj] = useState(dayjs());
  const [visiblePlan, setVisiblePlan] = useState<IPlan[]>([]);
  const onChange = (value: Dayjs) => setDayObj(value);
  // const plans: IPlan[] = useMyQuery('/plan.json');

  const { id: groupId } = useParams();
  const plans: IPlan[] = clubPlanListAPI(groupId ? +groupId : undefined);

  const { opacity, transform } = useSpring({
    opacity: direction !== 'down' ? 1 : 0.4,
    transform: `scale(${direction !== 'down' ? 1 : 0.7}) translateY(${
      direction !== 'down' ? 0 : 80
    }px)`,
    config: { mass: 5, tension: 500, friction: 80, duration: 150 },
  });
  console.log(plans);
  useEffect(() => {
    const currentPlan = plans?.filter(el => {
      return (
        dayObj.year() == dayjs(el.groupScheduleTime).year() &&
        dayObj.month() == dayjs(el.groupScheduleTime).month() &&
        dayObj.date() == dayjs(el.groupScheduleTime).date()
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
              date.month() == dayjs(el.groupScheduleTime).month() &&
              date.date() == dayjs(el.groupScheduleTime).date()
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
        <div key={plan.groupScheduleId} className="plan-item-container">
          <div className="date-container">
            <h3>05</h3>
            <h4>일요일</h4>
          </div>
          <div className="content">
            <h2>{plan.groupScheduleTitle}</h2>
            <p>{plan.groupScheduleContent}</p>
          </div>
        </div>
      ))}
      <animated.div
        onClick={() => navigate('./generate')}
        className="float-button"
        style={{ opacity, transform }}
      >
        <PlusOutlined />
      </animated.div>
    </div>
  );
};

export default ClubPlan;
