import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import { ReactComponent as moreIcon } from "../../../img/dailyLog/more.svg";

import { ReactComponent as editIcon } from "../../../img/dailyLog/edit.svg";
import { ReactComponent as deleteIcon } from "../../../img/dailyLog/delete.svg";
import { ReactComponent as memoBullet } from "../../../img/bullet/memo-5.svg";

import BulletSwitchList from "./BulletSwitchList";

const BulletTodoCard = ({ dailyLogs }) => {
  console.log("데일리로그 할일", dailyLogs);
  const [showSelectBox, setShowSelectBox] = useState(false);
  const [showTodoMemo, setShowTodoMemo] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const memoViewHandler = (e) => {
    if (showTodoMemo.find((id) => id === Number(e.target.id)) === undefined) {
      setShowTodoMemo([...showTodoMemo, Number(e.target.id)]);
    } else {
      setShowTodoMemo(showTodoMemo.filter((id) => id !== Number(e.target.id)));
    }
  };
  const SelectOptionHandler = () => {
    setShowSelectBox(!showSelectBox);
  };
  const selectDeleteHandler = () => {
    setShowSelectBox(!showSelectBox);
    setShowDeleteModal(!showDeleteModal);
  };
  const deleteButtonHandler = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const cancelButtonHandler = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  let num = 0;
  return (
    <Container>
      {dailyLogs.map((dailyLog) => (
        <CardContainer key={num++}>
          <MainBulletTodo>
            <TodoBodyDiv>
              <span>
                <BulletSwitchList bulletName={dailyLog.todoBulletName} />
              </span>
              <span>{dailyLog.todoContent}</span>
            </TodoBodyDiv>
            <TodoMoreViewDiv>
              <TodoMoreViewButton
                id={dailyLog.todoId}
                onClick={memoViewHandler}
              >
                {showTodoMemo.find((id) => id === dailyLog.todoId) !==
                undefined ? (
                  <OnlyTitleIcon />
                ) : (
                  <MoreIcon />
                )}
              </TodoMoreViewButton>
            </TodoMoreViewDiv>
            <OptionSelectDiv>
              <OptionButton onClick={SelectOptionHandler}>
                <OptionIcon />
              </OptionButton>
              {showSelectBox ? (
                <SelectDiv>
                  <div
                    value="editTodo"
                    onClick={() => alert("수정하기페이지 이동")}
                  >
                    수정하기 <EditIcon />
                  </div>
                  <SelectLine></SelectLine>
                  <div value="deleteTodo" onClick={selectDeleteHandler}>
                    <span>삭제하기</span>
                    <span>
                      <DeleteIcon />
                    </span>
                  </div>
                </SelectDiv>
              ) : null}
            </OptionSelectDiv>
          </MainBulletTodo>
          {showTodoMemo.find((id) => id === dailyLog.todoId) !== undefined
            ? dailyLog.todoMemos.map((memo) => (
                <TodoMemoDiv key={num++} id={memo.todoMemoId}>
                  <MemoContent>
                    <span>
                      <MemoBullet />
                    </span>
                    <span>{memo.todoMemoContent}</span>
                  </MemoContent>
                </TodoMemoDiv>
              ))
            : null}
        </CardContainer>
      ))}

      {showDeleteModal ? (
        <ModalContainer>
          <ModalContent>
            <DeleteMsg>
              <span>
                <DeleteIcon />
              </span>
              <span>삭제하시겠습니까?</span>
            </DeleteMsg>
            <SelectLine></SelectLine>
            <ModalButtonGroup>
              <DeleteButton onClick={deleteButtonHandler}>삭제</DeleteButton>
              <CancelButton onClick={cancelButtonHandler}>취소</CancelButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalContainer>
      ) : null}
    </Container>
  );
};

export default BulletTodoCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: var(--color-default);
  /* border: 1px solid rgba(240, 161, 59, 0.2); */
  /* box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1); */
  padding: 12px;
  border-radius: 8px;
`;
const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ModalContent = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em 0;
  width: 200px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-default);
  border-radius: 8px;
  font-size: 14px;
`;
const DeleteMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: var(--color-gray);
  gap: 10px;
`;
const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > div {
    cursor: pointer;
  }
`;
const DeleteButton = styled.div`
  font-size: 14px;
  color: var(--color-main);
`;
const CancelButton = styled.div`
  font-size: 14px;
`;
const MainBulletTodo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  & > input {
    width: 90%;
    padding: 0;
    margin: 0;
  }
`;
const TodoBodyDiv = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  font-size: 14px;
  font-weight: 600;
  gap: 10px;
`;
const TodoMemoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
  background-color: inherit;
  padding: 8px 0;
`;
const MemoContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 5px;
`;
const TodoMoreViewDiv = styled.div``;
const TodoMoreViewButton = styled.button`
  position: relative;
  border: 0;
  background-color: inherit;
`;
const OptionSelectDiv = styled.div`
  position: relative;
`;

const OptionButton = styled.button`
  background-color: transparent;
  border: 0;
`;
const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 35vw;
  left: -28vw;
  top: 5vh;
  gap: 3px;
  padding: 5px 14px;
  position: absolute;
  /* top: -12.5vh;
  left: -28vw; */
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
    &:hover {
      color: var(--color-main);
    }
  }
`;
const SelectLine = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #ebebeb;
  margin: 2px 0;
`;
const EditIcon = styled(editIcon)``;
const DeleteIcon = styled(deleteIcon)``;
const OptionIcon = styled(moreIcon)`
  width: 24px;
  height: 24px;
`;
const MoreIcon = styled(IoIosArrowDown)`
  width: 24px;
  height: 24px;
  pointer-events: none;
`;
const OnlyTitleIcon = styled(IoIosArrowUp)`
  width: 24px;
  height: 24px;
  pointer-events: none;
`;

const MemoBullet = styled(memoBullet)`
  width: 24px;
  height: 18px;
`;