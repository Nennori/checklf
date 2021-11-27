import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChecklists, refresh } from '../../../redux/actions';
import SCREENS from '../../../routes/endpoints';
import { CheckListItem } from '../../../assets/interfaces';
import ListTemplate from '../../templates/ListTemplate';

const ListPage: React.FC = () => {
  let initList: CheckListItem[] = [];
  const [list, setList] = useState(initList);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getChecklists()
      .then((data) => {
        data.forEach((item: CheckListItem) => {
          initList = initList.concat(item);
        });
        setList(initList);
        setLoading(false);
      })
      .catch((error) => {
        if (error.toString().includes('401') || error.toString().includes('403')) {
          refresh()
            .then(() => {
              getChecklists()
                .then((data) => {
                  data.forEach((item: CheckListItem) => {
                    initList = initList.concat(item);
                  });
                  setList(initList);
                  setLoading(false);
                })
                .catch();
            })
            .catch(() => {
              navigate(SCREENS.SCREEN_LOGIN);
            });
        }
      });
  }, []);
  return loading ? <p>Loading...</p> : <ListTemplate initialList={list} />;
};

export default ListPage;
