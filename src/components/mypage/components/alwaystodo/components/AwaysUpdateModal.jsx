import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../../../common/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as memoBullet } from "../../../../../img/myPage/memo-5.svg";
import { ReactComponent as todoBullet } from "../../../../../img/myPage/todo-1.svg";
import { ReactComponent as addIcon } from "../../../../../img/myPage/add.svg";
import { ReactComponent as closeIcon } from "../../../../../img/myPage/close.svg";

import { __putFavorite } from "../../../../../redux/modules/favoriteSlice";

const AlwaysUpdateModal = ({ onClose, favoriteId, content, memo }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector(
    (state) => state?.category?.category?.categories
  );

  const [favoriteContent, setFavoriteContent] = useState(content);

  const [favoriteMemos, setFavoriteMemos] = useState(memo);
  const [favoriteMemosCopy, setFavoriteMemosCopy] = useState(memo);
  const [newFavoriteMemos, setNewFavoriteMemos] = useState([
    { id: 0, favoriteMemoContent: "" },
  ]);
  const [plusId, setPlusId] = useState(1);

  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  const onMemoAddHandler = () => {
    const input = { id: plusId, favoriteMemoContent: "" };
    setNewFavoriteMemos([...newFavoriteMemos, input]);
    setPlusId(plusId + 1);
  };

  const onDeleteHandler = (id) => {
    setFavoriteMemosCopy(
      favoriteMemosCopy.filter((value) => value.favoriteMemoId !== id)
    );

    setFavoriteMemos(
      favoriteMemos.map((value) => {
        if (value.favoriteMemoId === id) {
          return { ...value, favoriteMemoContent: null };
        } else {
          return value;
        }
      })
    );
  };

  const newDeleteHandler = (index) => {
    setNewFavoriteMemos(newFavoriteMemos.filter((value) => value.id !== index));
  };

  const onChaneTodoHandler = (e) => {
    setFavoriteContent(e.target.value);
  };

  const onChaneMemoHandler = (e, index) => {
    let favoriteMemosCopy = [];
    favoriteMemos.forEach((device, index) => {
      favoriteMemosCopy[index] = { ...device };
    });
    favoriteMemosCopy[index].favoriteMemoContent = e.target.value;
    setFavoriteMemos(favoriteMemosCopy);
  };

  const onChaneNewMemoHandler = (e, index) => {
    let newFavoriteMemosCopy = [...newFavoriteMemos];
    newFavoriteMemosCopy[index].favoriteMemoContent = e.target.value;
    setNewFavoriteMemos(newFavoriteMemosCopy);
  };

  const onCategoryHandler = (e) => {
    setCategoryId(e.categoryId);
    setCategoryName(e.categoryName);
    setCategoryColor(e.categoryColor);
  };

  const onAddFavoriteHandler = () => {
    const newFavoriteMemo = newFavoriteMemos.map((value) => {
      if (delete value.id) {
        return value;
      }
    });
    const favoriteMemo = [...favoriteMemos, ...newFavoriteMemo];
    const favoriteInfo = {
      favoriteId,
      favoriteContent: favoriteContent,
      favoriteMemos: favoriteMemo,
      categoryId: categoryId,
      categoryName: categoryName,
      categoryColor: categoryColor,
    };
    dispatch(__putFavorite(favoriteInfo));
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose}>
        <TodoBodyDiv>
          <TodoTitle>
            <TodoBullet />
            <AlwaysTodoInput
              value={favoriteContent}
              onChange={(e) => {
                onChaneTodoHandler(e);
              }}
            ></AlwaysTodoInput>
          </TodoTitle>
          <TodoMemoDiv>
            {favoriteMemosCopy.map((value, index) => (
              <MemoContent key={index}>
                <MemoBullet />
                <AlwaysMemoInput
                  type="text"
                  placeholder={value.favoriteMemoContent}
                  onChange={(e) => onChaneMemoHandler(e, index)}
                ></AlwaysMemoInput>
                <DeleteButton
                  onClick={() => onDeleteHandler(value.favoriteMemoId)}
                >
                  <DeleteIcon />
                </DeleteButton>
              </MemoContent>
            ))}
            {newFavoriteMemos.map((value, index) => (
              <MemoContent key={index}>
                <MemoBullet />
                <AlwaysMemoInput
                  type="text"
                  placeholder="메모를 작성해주세요"
                  onChange={(e) => onChaneNewMemoHandler(e, index)}
                ></AlwaysMemoInput>
                <DeleteButton onClick={() => newDeleteHandler(value.id)}>
                  <DeleteIcon />
                </DeleteButton>
              </MemoContent>
            ))}
          </TodoMemoDiv>
          <IconDiv>
            <AddButton onClick={onMemoAddHandler}>
              <AddIcon />
            </AddButton>
          </IconDiv>
          <CategoryBtnContainer>
            {categoryList && categoryList.length === 0 ? (
              <CategoryPtag>카테고리를 추가해보세요.</CategoryPtag>
            ) : (
              categoryList?.map((val) => {
                return (
                  <SelectBtn
                    key={val.categoryId}
                    backgroundColor={val.categoryColor}
                    value={val.categoryName}
                    onClick={() => {
                      onCategoryHandler(val);
                    }}
                  >
                    {val.categoryName}
                  </SelectBtn>
                );
              })
            )}
          </CategoryBtnContainer>
        </TodoBodyDiv>

        <BtnContainer>
          <AddModalBtn
            onClick={() => {
              onAddFavoriteHandler();
            }}
          >
            추가
          </AddModalBtn>
          <AddModalBtn onClick={onClose}>취소</AddModalBtn>
        </BtnContainer>
      </Modal>
    </>
  );
};

export default AlwaysUpdateModal;

const TodoBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  height: 30vh;
  overflow: auto;
`;

const TodoTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;
const TodoMemoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const MemoContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 5px;
  margin-top: 1.5%;
`;

const AddModalBtn = styled.button`
  width: 47.4%;
  height: 7vh;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 700;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10%;
`;

const CategoryBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 15vh;
  padding-top: 3%;
`;

const SelectBtn = styled.button`
  width: 6.5rem;
  height: 2.5rem;
  margin: 2%;
  font-size: 12px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  &:active,
  &:hover {
    border: 5px solid white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.8);
  }
`;

const MemoBullet = styled(memoBullet)`
  width: 24px;
  height: 18px;
`;

const TodoBullet = styled(todoBullet)`
  width: 24px;
  height: 18px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 8px;
`;
const AddButton = styled.button`
  width: 1.8rem;
  height: 2.6vh;
  border: none;
  background-color: transparent;
`;
const AddIcon = styled(addIcon)`
  fill: var(--color-gray);
  width: 1.5rem;
  height: 2.5vh;
`;

const DeleteButton = styled.button`
  width: 1.5rem;
  height: 2.6vh;
  border: none;
  background-color: transparent;
`;
const DeleteIcon = styled(closeIcon)`
  fill: var(--color-gray);
  width: 1.5rem;
  height: 2.5vh;
`;

const AlwaysTodoInput = styled.input`
  border: none;
`;

const AlwaysMemoInput = styled.input`
  border: none;
  width: 65%;
`;

const CategoryPtag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 16px;
`;
