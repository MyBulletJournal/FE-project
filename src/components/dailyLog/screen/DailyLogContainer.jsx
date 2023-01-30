import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __getDailyTodo,
  __getFavoritesTodo,
} from "../../../redux/modules/dailysSlice";

import CategorySelector from "../components/CategorySelector";
import AllTodoShow from "../components/AllTodoShow";
import SelectCategoryTodoShow from "../components/SelectCategoryTodoShow";
import ModalFavoriteTodo from "../components/ModalFavoriteTodo";
import CalendarModal from "../components/CalendarModal";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import { ReactComponent as oftenTodo } from "../../../img/dailyLog/often.svg";
import { ReactComponent as newTodo } from "../../../img/dailyLog/new.svg";

const DailyLogContainer = () => {
  const dispatch = useDispatch();
  const [showSelectBox, setShowSelectBox] = useState(false);
  const [dailyLogs, setDailyLogs] = useState([]);
  const [isSelectedCategory, isSetSelectedCategory] = useState(false);
  const [selectedCategoryId, setSlectedCategoryId] = useState("");
  const [showFavoritesTodo, setShowFavoritesTodo] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const navigate = useNavigate();
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const today = `${String(new Date().getFullYear()).substr(2, 2)}/${
    new Date().getMonth() + 1
  }/${new Date().getDate()}(${day[new Date().getDay()]})`;
  const showAddTodoSelect = () => {
    setShowSelectBox(!showSelectBox);
  };
  const state = useSelector((state) => state);
  console.log("전역 상태값", state);
  const todoList = useSelector((state) => state?.dailyTodo?.dailyTodo?.daily);
  const categoryList = useSelector(
    (state) => state?.dailyTodo?.dailyTodo?.categories
  );
  const favoritesTodoList = useSelector(
    (state) => state?.dailyTodo?.favorite?.favorites
  );
  const favoritesTodoHandler = () => {
    console.log("자주쓰는 할일 추가 핸들러", favoritesTodoList);
    setShowSelectBox(false);
    setShowFavoritesTodo(true);
  };
  const dateChangeHandler = () => {
    setShowCalendar(!showCalendar);
  };
  useEffect(() => {
    dispatch(__getDailyTodo());
    dispatch(__getFavoritesTodo());
  }, [dispatch]);

  let num = 0;
  return (
    <Container>
      <DateAndSelectDiv>
        <div></div>
        <DateButtonDiv>
          <DateButton onClick={dateChangeHandler}>{today}</DateButton>
          <SelectDateButton onClick={dateChangeHandler}>
            {showCalendar ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </SelectDateButton>
        </DateButtonDiv>
        <CategorySelector
          categoryList={categoryList}
          isSetSelectedCategory={isSetSelectedCategory}
          setSlectedCategoryId={setSlectedCategoryId}
        />
      </DateAndSelectDiv>
      <CalendarDiv>
        {showCalendar ? (
          <CalendarModal setShowCalendar={setShowCalendar} />
        ) : null}
      </CalendarDiv>
      <TodoBulletDiv>
        {todoList && todoList?.length === 0 ? (
          <NoneTodo>할일을 추가해주세요.</NoneTodo>
        ) : isSelectedCategory ? (
          <SelectCategoryTodoShow
            todoList={todoList}
            dailyLogs={dailyLogs}
            setDailyLogs={setDailyLogs}
            selectedCategoryId={selectedCategoryId}
          />
        ) : (
          <AllTodoShow
            todoList={todoList}
            dailyLogs={dailyLogs}
            setDailyLogs={setDailyLogs}
          />
        )}
        <AddTodoDiv>
          <AddTodoButton type="button" onClick={showAddTodoSelect}>
            <AddTodoIcon />
          </AddTodoButton>
          {showSelectBox ? (
            <AddSelectDiv>
              <div value="favoriteTodo" onClick={favoritesTodoHandler}>
                자주쓰는할일 <OftenTodo />
              </div>
              <SelectLine></SelectLine>
              <div value="newTodo" onClick={() => navigate("/dailys/add")}>
                <span>새 일정 추가</span>
                <span>
                  <NewTodo />
                </span>
              </div>
            </AddSelectDiv>
          ) : null}
        </AddTodoDiv>
      </TodoBulletDiv>
      {showFavoritesTodo ? (
        <ModalFavoriteTodo
          favoritesTodoList={favoritesTodoList}
          setShowFavoritesTodo={setShowFavoritesTodo}
        />
      ) : null}
    </Container>
  );
};

export default DailyLogContainer;

const Container = styled.div`
  font-family: cursive;
`;
const DateAndSelectDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const DateButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const CalendarDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 360px;
  z-index: 999;
`;
const DateButton = styled.button`
  padding: 3px 0;
  margin-left: 20%;
  color: var(--color-main);
  font-size: 14px;
  font-weight: bold;
  background-color: white;
  border: 0;
`;
const SelectDateButton = styled.button`
  border: 0;
  background-color: inherit;
  margin-top: 3px;
  & > svg {
    width: 18px;
    height: 18px;
    fill: var(--color-main);
    pointer-events: none;
  }
`;
const TodoBulletDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 71vh;
  gap: 10px;
`;
const NoneTodo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin-top: 2em;
  color: var(--color-gray);
`;
const AddTodoDiv = styled.div`
  /* position: absolute; */
`;
const AddTodoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: white;
  border-radius: 50%;
  margin-left: 82%;
`;
const AddTodoIcon = styled(BsFillPlusCircleFill)`
  fill: var(--color-main);
  width: 40px;
  height: 40px;
`;
const AddSelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 42%;
  gap: 3px;
  padding: 5px 14px;
  margin: -40px 0 0 132px;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--color-default);
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: var(--color-gray);
    padding: 5px 0;
  }
`;
const SelectLine = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #ebebeb;
  margin: 2px 0;
`;
const NewTodo = styled(newTodo)`
  width: 20px;
  height: 20px;
`;
const OftenTodo = styled(oftenTodo)`
  width: 20px;
  height: 20px;
`;

const BulletMemo = styled.div`
  display: flex;
  justify-content: flex-end;
  & > input {
    width: 80%;
    margin-right: 9%;
  }
`;
