import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checklist from '../../organisms/CheckList';
import Header from '../../organisms/Header';
import { CheckList, Task } from '../../../assets/interfaces';
import { addTask, deleteTask, updateTask, refresh } from '../../../redux/actions';
import SCREENS from '../../../routes/endpoints';

interface ChecklistTemplateProps {
  list: CheckList | null;
}

const ChecklistTemplate: React.FC<ChecklistTemplateProps> = ({ list }: ChecklistTemplateProps) => {
  const navigate = useNavigate();
  const tasklistReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'REMOVE_ITEM':
        return { ...state, tasklist: state.tasklist.filter((item: Task) => item.id !== action.id) };
      case 'CREATE_ITEM':
        return {
          ...state,
          tasklist: state.tasklist.concat({ id: action.id, content: action.content, checked: action.checked }),
        };
      case 'UPDATE_ITEM': {
        const newList = state.tasklist.map((item: Task) => {
          if (item.id === action.id) {
            const updatedItem = {
              ...item,
              content: action.content,
              checked: action.checked,
            };

            return updatedItem;
          }

          return item;
        });

        return { ...state, tasklist: newList };
      }
      default:
        throw new Error();
    }
  };

  const [tasklistData, dispatchTasklistData] = React.useReducer(tasklistReducer, {
    isShowChecklist: true,
    tasklist: list ? list.tasks : null,
  });

  const [newTaskItem, setNewTaskItem] = useState(false);

  const handleRemove = (id: number) => {
    deleteTask(id)
      .then(() => {
        dispatchTasklistData({ type: 'REMOVE_ITEM', id });
      })
      .catch((error) => {
        if (error.toString().includes('401') || error.toString().includes('403')) {
          refresh()
            .then(() => {
              deleteTask(id)
                .then(() => {
                  dispatchTasklistData({ type: 'REMOVE_ITEM', id });
                })
                .catch();
            })
            .catch(() => {
              navigate(SCREENS.SCREEN_LOGIN);
            });
        }
      });
  };

  const handleCreate = (id: number, content: string, checked: boolean) => {
    addTask({ id: list ? list.id : 0, task: { content, checked } })
      .then((data) => {
        dispatchTasklistData({ type: 'CREATE_ITEM', id: data, content: data.content, checked: data.checked });
        setNewTaskItem(false);
      })
      .catch((error) => {
        if (error.toString().includes('401') || error.toString().includes('403')) {
          refresh()
            .then(() => {
              addTask({ id: list ? list.id : 0, task: { content, checked } })
                .then((data) => {
                  dispatchTasklistData({ type: 'CREATE_ITEM', id: data, content: data.content, checked: data.checked });
                  setNewTaskItem(false);
                })
                .catch();
            })
            .catch(() => {
              navigate(SCREENS.SCREEN_LOGIN);
            });
        }
      });
  };

  const handleUpdate = (id: number, content: string, checked: boolean) => {
    updateTask({ id, content, checked })
      .then((data) => {
        dispatchTasklistData({ type: 'UPDATE_ITEM', id: data.id, content: data.content, checked: data.done });
      })
      .catch((error) => {
        if (error.toString().includes('401') || error.toString().includes('403')) {
          refresh()
            .then(() => {
              updateTask({ id, content, checked })
                .then((data) => {
                  dispatchTasklistData({ type: 'UPDATE_ITEM', id: data.id, content: data.content, checked: data.done });
                })
                .catch();
            })
            .catch(() => {
              navigate(SCREENS.SCREEN_LOGIN);
            });
        }
      });
  };

  const handleCreateButtonClick = () => {
    setNewTaskItem(true);
  };

  const handleCancel = () => {
    setNewTaskItem(false);
  };

  if (!tasklistData.isShowChecklist) {
    return null;
  }
  return (
    <>
      <Header />
      <Checklist
        id={list ? list.id : 0}
        name={list ? list.name : ''}
        list={tasklistData.tasklist}
        onRemove={handleRemove}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        newTaskItem={newTaskItem}
        onCreateButtonClick={handleCreateButtonClick}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ChecklistTemplate;
