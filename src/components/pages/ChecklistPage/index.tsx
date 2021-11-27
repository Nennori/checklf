import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChecklist, refresh } from '../../../redux/actions';
import SCREENS from '../../../routes/endpoints';
import { CheckList } from '../../../assets/interfaces';
import ChecklistTemplate from '../../templates/ChecklistTemplate';

const ChecklistPage: React.FC = () => {
  const initList: CheckList | null = null;
  const [list, setList] = useState(initList);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getChecklist({ id: id ? parseInt(id) : 0 })
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.toString().includes('401') || error.toString().includes('403')) {
          refresh()
            .then(() => {
              getChecklist({ id: id ? parseInt(id) : 0 })
                .then((data) => {
                  setList(data);
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
  return loading ? <p>Loading...</p> : <ChecklistTemplate list={list} />;
};

export default ChecklistPage;
