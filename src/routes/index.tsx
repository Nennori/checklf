import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import AuthTemplate from '../components/templates/AuthTemplate';
import ChecklistPage from '../components/pages/ChecklistPage';
import ListPage from '../components/pages/ListPage';
import SCREENS from './endpoints';

const AllRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={SCREENS.SCREEN_LOGIN} caseSensitive={false} element={<AuthTemplate type="login" />} />
        <Route path={SCREENS.SCREEN_REGISTER} caseSensitive={false} element={<AuthTemplate type="register" />} />
        <Route path={SCREENS.SCREEN_LIST} caseSensitive={false} element={<ChecklistPage />} />
        <Route path={SCREENS.SCREEN_MAIN} caseSensitive={false} element={<ListPage />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
