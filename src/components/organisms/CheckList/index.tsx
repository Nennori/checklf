/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Routes, Link, Route, useParams, useNavigate } from 'react-router-dom';
import { Task } from '../../../assets/interfaces';
import TaskItem from '../../molecules/TaskItem';
import Title from '../../atoms/Title';
import ButtonCreate from '../../molecules/ButtonCreate';
import ButtonS from '../../molecules/ButtonS';
import ArrowIcon from '../../../assets/images/left-arrow.svg';
import SCREENS from '../../../routes/endpoints';

interface CheckListProps {
  id: number;
  name: string;
  list: Task[];
  onCreate: (id: number, content: string, checked: boolean) => void;
  onUpdate: (id: number, content: string, checked: boolean) => void;
  onRemove: (id: number) => void;
  onCancel: () => void;
  newTaskItem: boolean;
  onCreateButtonClick: () => void;
}

const Checklist: React.FC<CheckListProps> = ({
  id,
  name,
  list,
  onRemove,
  onUpdate,
  onCreate,
  newTaskItem = false,
  onCreateButtonClick,
  onCancel,
}: CheckListProps) => {
  const i: number = list.length === 0 ? 0 : list[list.length - 1].id + 1;
  let content;
  const navigate = useNavigate();
  const onBackClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // navigate(-1);
    navigate(SCREENS.SCREEN_MAIN);
  };
  if (list.length !== 0) {
    content = (
      <ul className="checklist__list">
        {list.map((item: Task) => (
          <TaskItem key={item.id} task={item} onRemove={onRemove} onUpdateOrCreate={onUpdate} />
        ))}
        {newTaskItem && (
          <TaskItem
            key={i}
            task={{ id: i, content: '', checked: false }}
            onRemove={onRemove}
            view={false}
            onUpdateOrCreate={onCreate}
            onCancel={onCancel}
          />
        )}
      </ul>
    );
  } else if (newTaskItem) {
    content = (
      <TaskItem
        key={i}
        task={{ id: i, content: '', checked: false }}
        onRemove={onRemove}
        view={false}
        onUpdateOrCreate={onCreate}
        onCancel={onCancel}
      />
    );
  } else {
    content = (
      <div className="checklist__empty-content">
        <p>Checklist is empty</p>
      </div>
    );
  }
  return (
    <div className="checklist" id={`${id}`}>
      <ButtonS
        className="button--s"
        onClick={(e) => {
          onBackClick(e);
        }}
        src={ArrowIcon}
      >
        BACK
      </ButtonS>
      <Title header="h3">{name}</Title>
      {content}
      <ButtonCreate onClick={onCreateButtonClick} />
    </div>
  );
};

export default Checklist;
