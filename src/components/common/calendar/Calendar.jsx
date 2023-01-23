import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const BulletCalendar = () => {
  // const [value, onChange] = useState(new Date());

  const dateChangeHandler = (e) => {
    console.log(e);
  };

  return (
    <Calendarcontainer>
      <Calendar
        calendarType="US"
        onChange={dateChangeHandler}
        nextLabel={<NextIcon />}
        prevLabel={<PrevIcon />}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
      />
    </Calendarcontainer>
  );
};

export default BulletCalendar;

const Calendarcontainer = styled.div`
  .react-calendar {
    width: 95%;
    max-width: 100%;
    background: transparent;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    margin-left: 3%;
  }
  .eUWrDx .react-calendar__navigation {
    margin: 0.2rem;
  }
  .react-calendar__navigation {
    display: flex;
    padding-left: 40px;
    width: 100%;
  }
  .react-calendar__navigation__label > span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100% !important;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-main);
    margin-bottom: 5%;
  }
  .react-calendar__month-view__weekdays {
    height: 25px !important;
  }
  .react-calendar__month-view__weekdays__weekday {
    background-color: white !important;
    /* border-top: 1px solid rgba(240, 161, 59, 0.5);
    border-left: 1px solid rgba(240, 161, 59, 0.5); */
    /* box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1); */
    padding: 5px 4px !important;
    font-size: 12px;
  }
  .react-calendar__month-view__days {
    margin-top: 5px !important;
    & > :active,
    & > :hover {
      color: black;
      border: 0 !important;
      /* background-color: var(--color-main); */
    }
  }
  .react-calendar__month-view__days__day {
    display: flex !important;
    align-items: flex-start !important;
    height: 48px !important;
    padding-top: 10px;
    font-size: 10px;
    font-weight: bold;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    margin: 1rem;
  }
  .react-calendar__navigation button {
    min-width: 24px;
    background: none;
    font-size: 1rem;
    font-weight: bold;
  }
  .react-calendar__navigation button:disabled {
    /* background-color: #f0f0f0; */
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    /* background-color: #e6e6e6; */
  }
  .react-calendar__month-view__weekdays {
    font-weight: bold;
    font-size: 0.75rem;
    width: 88%;
    height: 40px;
    color: var(--color-gray);
  }

  .react-calendar__month-view__weekdays__weekday {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2%;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin: 1%;
  }
  .react-calendar__month-view__weekdays__weekday--weekend {
    color: var(--color-main);
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #e6e6e6;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    height: 45px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
  }
  .react-calendar__tile:disabled {
    background-color: #e6e6e6;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    border-radius: 5px;
    border: 3px solid #e6e6e6;
    background-color: var(--color-main);
    color: white;
  }

  .react-calendar__tile--now {
    background-color: #e6e6e6;
    border-radius: 5px;
    border: 3px solid #e6e6e6;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: var(--color-main);
    border-radius: 5px;
    border: 1px solid var(--color-main);
    color: white;
  }
  .react-calendar__tile--hasActive {
    background: white;
    border-radius: 5px;
    border: 3px solid #e6e6e6;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: white;
    border-radius: 5px;
    border: 3px solid #e6e6e6;
  }
  .react-calendar__tile--active {
    background: white;
    border-radius: 5px;
    border: 1px solid var(--color-main);
    background-color: var(--color-main);
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    border: 3px solid #e6e6e6;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;

const NextIcon = styled(IoIosArrowForward)`
  width: 2rem;
  height: 2.5vh;
  margin-right: 28vw;
  margin-left: 1vw;
  color: var(--color-main);
`;
const PrevIcon = styled(IoIosArrowBack)`
  width: 2rem;
  height: 2.5vh;
  margin-left: 3vw;
  margin-right: 1vw;
  color: var(--color-main);
`;
