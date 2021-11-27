/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import ButtonS from '../ButtonS';
import { Task } from '../../../assets/interfaces';
import ButtonTrash from '../ButtonTrash';
import Checkbox from '../../atoms/Checkbox';

interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  view?: boolean;
  onUpdateOrCreate: (id: number, content: string, checked: boolean) => void;
  onCancel?: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onRemove,
  view = true,
  onUpdateOrCreate,
  onCancel,
}: TaskItemProps) => {
  const [toggle, setToggle] = useState(view);
  const [currentContent, setCurrentContent] = useState(task.content);
  const [checked, setChecked] = useState(task.checked);
  const onOkButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setToggle(true);
    onUpdateOrCreate(task.id, currentContent, checked);
  };
  const onCancelButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCancel) {
      onCancel();
    } else {
      setToggle(!toggle);
      setCurrentContent(task.content);
    }
  };
  const onCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (toggle) {
      e.preventDefault();
      e.stopPropagation();
      onUpdateOrCreate(task.id, currentContent, !checked);
      setChecked(!checked);
    } else {
      e.preventDefault();
      e.stopPropagation();
      setChecked(!checked);
    }
  };
  const onCheckboxDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Space') {
      setChecked(!checked);
      e.preventDefault();
      e.stopPropagation();
    }
  };
  return (
    <li className="task-item">
      <form className="task-item__container">
        <Checkbox id={task.id} checked={checked} onCheckboxClick={onCheckboxClick} onCheckboxDown={onCheckboxDown} />
        {toggle ? (
          <p
            className="task-item__content"
            onDoubleClick={() => {
              setToggle(false);
            }}
          >
            {task.content}
          </p>
        ) : (
          <div className="task-item__content-container">
            <textarea
              className="task-item__content-text"
              onChange={(e) => {
                setCurrentContent(e.target.value);
              }}
            >
              {currentContent}
            </textarea>
            <div className="task-item__button-container">
              <ButtonS onClick={onOkButtonClick} className="button--t">
                SAVE
              </ButtonS>
              <ButtonS onClick={onCancelButtonClick} className="button--t-white">
                CANCEL
              </ButtonS>
            </div>
          </div>
        )}
      </form>
      <ButtonTrash
        onClick={() => {
          onRemove(task.id);
        }}
      />
    </li>
  );
};

export default TaskItem;
