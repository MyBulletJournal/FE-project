import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  __getCalendarTodoCount,
  __getMainTodo,
} from "../../../redux/modules/mainSlice";

import { baseURLApiV1 } from "../../../core/api";

import NavigationMenu from "../../../layout/footer/components/NavigationMenu";

import SelectCategory from "../../common/SelectCategory";
import BulletDiv from "../components/BulletDiv";
import BulletSwitchList from "../../dailyLog/components/BulletSwitchList";

import BulletCalendar from "../../common/calendar/Calendar";

const MainContainer = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [todoList, setTodoList] = useState([]);
  const [selectDateTitle, setSelectDateTitle] = useState("");
  console.log("선택된 날짜타이틀", selectDateTitle);
  const [nowMonthView, setNowMonthView] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  console.log("선택된 달력 날짜", nowMonthView);
  useSelector((state) => console.log(state?.mainTodo));
  const mainTodoList = useSelector((state) => state?.mainTodo?.mainTodo?.daily);
  console.log("메인 셀럭터 값", mainTodoList);

  const getToday = () => {
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    const today = `${String(new Date().getFullYear()).substr(2, 2)}/${
      new Date().getMonth() + 1
    }/${new Date().getDate()}(${day[new Date().getDay()]})`;
    setSelectDateTitle(today);
  };
  useEffect(() => {
    dispatch(__getMainTodo());
    dispatch(__getCalendarTodoCount(nowMonthView));
    getToday();
  }, [dispatch]);

  let num = 0;
  return (
    <Container>
      <CalendarDiv>
        <SelectTodayButton>Today</SelectTodayButton>
        <BulletCalendar
          nowMonthView={nowMonthView.month}
          selectDateTitle={selectDateTitle}
          setSelectDateTitle={setSelectDateTitle}
          setTodoList={setTodoList}
        />
      </CalendarDiv>
      <TodoDiv>
        <DateTitle>{selectDateTitle}</DateTitle>
        {mainTodoList && (
          <DailyTodoDiv>
            {mainTodoList.length === 0 ? (
              <DailyTodoList>
                <TodoTitle>할일을 추가해주세요.</TodoTitle>
              </DailyTodoList>
            ) : (
              mainTodoList.map((todo) => (
                <DailyTodoList key={num++}>
                  <BulletSwitchList bulletName={todo.todoBulletName} />
                  <TodoTitle>{todo.todoContent}</TodoTitle>
                </DailyTodoList>
              ))
            )}
          </DailyTodoDiv>
        )}
      </TodoDiv>
    </Container>
  );
};

export default MainContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CalendarDiv = styled.div`
  position: relative;
  height: 360px;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;
const SelectTodayButton = styled.button`
  position: absolute;
  border: 0;
  background-color: transparent;
  font-weight: 700;
  top: 3%;
  left: 88%;
  align-items: center;
  padding: 5px 0;
  font-weight: bold;
`;
const TodoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  min-height: 300px;
  padding: 15px;
  border-radius: 16px;
  background-color: var(--color-default);
  margin-top: 15px;
  overflow: visible;
`;
const DateTitle = styled.h2`
  text-align: center;
`;
const DailyTodoDiv = styled.div``;
const DailyTodoList = styled.div`
  display: flex;
  justify-content: center;
`;
const TodoTitle = styled.div`
  font-size: 14px;
`;
