/* eslint-disable no-unused-vars */
import React from 'react';
import { CheckListItem } from '../../../assets/interfaces';
import ButtonS from '../../molecules/ButtonS';
import ChecklistItem from '../../molecules/ChecklistItem';
import CreateIcon from '../../../assets/images/create-button-white.svg';

interface ChecklistListProps {
  list: CheckListItem[];
  onRemove: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  onCreate: (id: number, name: string) => void;
  onCancel?: () => void;
  onShow: (id: number) => void;
  newChecklistItem: boolean;
  onCreateButtonClick: () => void;
}

const ChecklistList: React.FC<ChecklistListProps> = ({
  list,
  onRemove,
  onCreate,
  onUpdate,
  onCancel,
  newChecklistItem = false,
  onCreateButtonClick,
  onShow,
}: ChecklistListProps) => {
  const i: number = list.length === 0 ? 0 : list[list.length - 1].id + 1;
  let content;
  if (list.length !== 0) {
    content = (
      <ul className="checklist-list__content">
        {newChecklistItem && (
          <ChecklistItem
            key={i}
            checklist={{ id: i, name: ' ' }}
            onRemove={onRemove}
            onUpdateOrCreate={onCreate}
            onCancel={onCancel}
            view={false}
            onShow={onShow}
          />
        )}
        {list
          .slice(0)
          .reverse()
          .map((item: CheckListItem) => (
            <ChecklistItem
              key={item.id}
              checklist={item}
              onRemove={onRemove}
              onUpdateOrCreate={onUpdate}
              onShow={onShow}
            />
          ))}
      </ul>
    );
  } else if (newChecklistItem) {
    content = (
      <ChecklistItem
        key={i}
        checklist={{ id: i, name: ' ' }}
        onRemove={onRemove}
        onUpdateOrCreate={onCreate}
        onCancel={onCancel}
        view={false}
        onShow={onShow}
      />
    );
  } else {
    content = (
      <div className="checklist-list__empty-content">
        <p>There is no checklists yet</p>
      </div>
    );
  }

  return (
    <div className="checklist-list">
      <div className="checklist-list__button-container">
        <ButtonS
          className="button--s"
          src={CreateIcon}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCreateButtonClick();
          }}
        >
          NEW...
        </ButtonS>
      </div>
      {content}
    </div>
  );
};

export default ChecklistList;
