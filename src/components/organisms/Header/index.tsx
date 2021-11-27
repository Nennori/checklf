/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../../atoms/Title';
import { logout } from '../../../redux/actions';
import SCREENS from '../../../routes/endpoints';
import store from '../../../redux/store';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    logout();
    navigate(SCREENS.SCREEN_LOGIN);
  };
  const { user } = store.getState();
  return (
    <header className="header">
      <div className="header__container">
        <Title header="h2">CheckList</Title>
        <div className="header__button-container">
          {user !== null && <Title header="h4">{user.name}</Title>}
          <button
            type="button"
            className="header__button-logout"
            onClick={(e) => {
              handleLogout(e);
            }}
          >
            <Title header="h4">LOGOUT</Title>
          </button>
        </div>
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Header);
