import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

import { baseURLApiV1 } from "../../../core/api";

import NavigationMenu from "../../../layout/footer/components/NavigationMenu";

import SelectCategory from "../../common/SelectCategory";
import BulletDiv from "../components/BulletDiv";
import BulletSwitchList from "../../dailyLog/components/BulletSwitchList";

import BulletCalendar from "../../common/calendar/Calendar";

const MainContainer = () => {
  const [date, setDate] = useState(new Date());
  const [todoList, setTodoList] = useState([]);
  const [selectDate, setSelectDate] = useState("");
  console.log(selectDate);
  console.log(todoList);
  const bulletList = useSelector((state) => state.bullet_main.bulletList);
  console.log("리듀서 상태 저장 값", bulletList);

  const loadMainPage = async () => {
    try {
      const data = await baseURLApiV1.get("/main");
      if (data.data.httpStatusCode === 200) {
        return setTodoList(data.data.data.daily);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToday = () => {
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    const today = `${String(new Date().getFullYear()).substr(2, 2)}/${
      new Date().getMonth() + 1
    }/${new Date().getDate()}(${day[new Date().getDay()]})`;
    setSelectDate(today);
  };
  useEffect(() => {
    loadMainPage();
    getToday();
  }, []);

  let num = 0;
  return (
    <Container>
      <CalendarDiv>
        <SelectDiv>Today</SelectDiv>
        <BulletCalendar
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          setTodoList={setTodoList}
        />
      </CalendarDiv>
      <TodoDiv>
        <DateTitle>{selectDate}</DateTitle>
        <DailyTodoDiv>
          {todoList.length === 0 ? (
            <DailyTodoList>
              <TodoTitle>할일을 추가해주세요.</TodoTitle>
            </DailyTodoList>
          ) : (
            todoList.map((todo) => (
              <DailyTodoList key={num++}>
                <BulletSwitchList bulletName={todo.todoBulletName} />
                <TodoTitle>{todo.todoContent}</TodoTitle>
              </DailyTodoList>
            ))
          )}
        </DailyTodoDiv>
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
  height: 315px;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;
const SelectDiv = styled.div`
  position: absolute;
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
  height: 32vh;
  padding: 15px;
  border-radius: 16px;
  background-color: var(--color-default);
`;
const DateTitle = styled.h2`
  text-align: center;
`;
const DailyTodoDiv = styled.div`
  overflow: auto;
`;
const DailyTodoList = styled.div`
  display: flex;
  justify-content: center;
`;
const TodoTitle = styled.div`
  font-size: 14px;
`;
