/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useNavigate } from 'react-router-dom';
import { CheckListItem } from '../../../assets/interfaces';
import ChecklistList from '../../organisms/ChecklistList';
import Header from '../../organisms/Header';
import { addChecklist, deleteChecklist, updateChecklist, refresh } from '../../../redux/actions';
import SCREENS from '../../../routes/endpoints';
import { authAccessHeader } from '../../../redux/header';

interface ListTemplateProps {
  initialList: CheckListItem[];
}

const ListTemplate: React.FC<ListTemplateProps> = ({ initialList }: ListTemplateProps) => {
  const navigate = useNavigate();

  const listReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'REMOVE_ITEM':
        return { ...state, list: state.list.filter((item: CheckListItem) => item.id !== action.id) };
      case 'CREATE_ITEM':
        return {
          ...state,
          list: state.list.concat({ id: action.id, name: action.name }),
        };
      case 'UPDATE_ITEM': {
        const newList = state.list.map((item: CheckListItem) => {
          if (item.id === action.id) {
            const updatedItem = {
              ...item,
              name: action.name,
            };

            return updatedItem;
          }

          return item;
        });

        return { ...state, list: newList };
      }
      default:
        throw new Error();
    }
  };

  const [listData, dispatchListData] = React.useReducer(listReducer, {
    isShowList: true,
    list: initialList,
  });

  const [newChecklistItem, setNewChecklistItem] = useState(false);

  const handleRemove = (id: number) => {
    deleteChecklist({ id })
      .then(() => {
        dispatchListData({ type: 'REMOVE_ITEM', id });
      })
      .catch((error) => {
        if (error.toString().includes('401') || error.toString().includes('403')) {
          refresh()
            .then(() => {
              deleteChecklist({ id })
                .then(() => {
                  dispatchListData({ type: 'REMOVE_ITEM', id });
                })
                .catch();
            })
            .catch(() => {
              navigate(SCREENS.SCREEN_LOGIN);
            });
        }
      });
  };

  // useEffect(() => {

  // });

  const handleCreate = (id: number, name: string) => {
    addChecklist({ name })
      .then(() => {
        // dispatchListData({ type: 'CREATE_ITEM', id: data.id, name: data.name });
        // setNewChecklistItem(false);
      })
      .catch((error) => {
        if (error.toString().includes('401') || error.toString().includes('403')) {
          refresh()
            .then(() => {
              addChecklist({ name })
                .then((data) => {
                  // dispatchListData({ type: 'CREATE_ITEM', id: data.id, name: data.name });
                  // setNewChecklistItem(false);
                })
                .catch();
            })
            .catch(() => {
              navigate(SCREENS.SCREEN_LOGIN);
            });
        }
      });
  };

  const handleUpdate = (id: number, name: string) => {
    updateChecklist({ id, name })
      .then((data) => {
        dispatchListData({ type: 'UPDATE_ITEM', id: data.id, name: data.name });
        setNewChecklistItem(false);
      })
      .catch((error) => {
        if (error.toString().includes('401') || error.toString().includes('403')) {
          refresh()
            .then(() => {
              updateChecklist({ id, name })
                .then((data) => {
                  dispatchListData({ type: 'UPDATE_ITEM', id: data.id, name: data.name });
                  setNewChecklistItem(false);
                })
                .catch();
            })
            .catch(() => {
              navigate(SCREENS.SCREEN_LOGIN);
            });
        }
      });
  };
  let channel = window.pusher.subscribe('checklist1');
  channel.bind(`App\\Events\\ChecklistCreatedEvent`, (data: any) => {
    console.log('hi');
    // ({ type: 'CREATE_ITEM', id: data.checklist.id, name: data.checklist.name });
    // setNewChecklistItem(false);
    // add new price into the APPL widget
  });

  const handleCreateButtonClick = () => {
    setNewChecklistItem(true);
  };

  const handleCancel = () => {
    setNewChecklistItem(false);
  };

  const handleShow = (id: number) => {
    navigate(`/checklist/${id}`);
  };

  if (!listData.isShowList) {
    return null;
  }

  return (
    <>
      <Header />
      <ChecklistList
        list={listData.list}
        onRemove={handleRemove}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
        onCreateButtonClick={handleCreateButtonClick}
        newChecklistItem={newChecklistItem}
        onShow={handleShow}
      />
    </>
  );
};

export default ListTemplate;
