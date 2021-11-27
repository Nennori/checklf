/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '../../atoms/Button';
import { CheckListItem } from '../../../assets/interfaces';
import ButtonTrash from '../ButtonTrash';
import Checkbox from '../../atoms/Checkbox';
import ConfirmIcon from '../../../assets/images/check.svg';
import CancelIcon from '../../../assets/images/cross.svg';

interface ChecklistItemProps {
  checklist: CheckListItem;
  onRemove: (id: number) => void;
  onUpdateOrCreate: (id: number, name: string) => void;
  onCancel?: () => void;
  onShow: (id: number) => void;
  view?: boolean;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  checklist,
  onRemove,
  onUpdateOrCreate,
  onCancel,
  onShow,
  view = true,
}: ChecklistItemProps) => {
  const [toggle, setToggle] = useState(view);
  const [currentContent, setCurrentContent] = useState(checklist.name);
  const onOkButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setToggle(true);
    onUpdateOrCreate(checklist.id, currentContent);
  };
  const onCancelButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCancel) {
      onCancel();
    } else {
      setToggle(!toggle);
      setCurrentContent(checklist.name);
    }
  };
  return (
    <li className="checklist-item">
      <div
        className="checklist-item__fake-container"
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          onShow(checklist.id);
        }}
      />
      {toggle ? (
        <h3
          className="checklist-item__title"
          onDoubleClick={() => {
            setToggle(false);
          }}
        >
          {checklist.name}
        </h3>
      ) : (
        <div className="checklist-item__content-container">
          <input
            className="checklist-item__fake-content-text"
            onChange={(e) => {
              setCurrentContent(e.target.value);
            }}
            value={currentContent}
          />

          <div className="checklist-item__button-container">
            <Button onClick={onOkButtonClick} className="button-checklist">
              <img src={ConfirmIcon} alt="confirm" />
            </Button>
            <Button onClick={onCancelButtonClick} className="button-checklist">
              <img src={CancelIcon} alt="confirm" />
            </Button>
          </div>
        </div>
      )}
      {checklist.task && (
        <div className="checklist-item__content">
          <Checkbox
            onCheckboxClick={() => {
              return undefined;
            }}
            onCheckboxDown={() => {
              return undefined;
            }}
            checked={checklist.task.checked}
            id={checklist.task.id}
          />
          <p>{checklist.task.content}</p>
        </div>
      )}
      <ButtonTrash
        onClick={(e) => {
          e.preventDefault();
          onRemove(checklist.id);
        }}
      />
    </li>
  );
};

export default ChecklistItem;
