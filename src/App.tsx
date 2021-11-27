import React, { useEffect } from 'react';
import './assets/styles/App.sass';
// import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import AllRoutes from './routes';
// import { authAccessHeader } from './redux/header';
// import ChecklistTemplate from './components/templates/ChecklistTemplate';
// import ListTemplate from './components/templates/ListTemplate';
// import AuthTemplate from './components/templates/AuthTemplate';

function App() {
  useEffect(() => {
    Pusher.logToConsole = true;
    window.pusher = new Pusher('8eac3a2c951a0e66a5c6', {
      cluster: 'eu',
      forceTLS: true,
    });
    // window.Echo = new Echo({
    //   broadcaster: 'pusher',
    //   key: '8eac3a2c951a0e66a5c6',
    //   cluster: 'eu',
    //   forceTLS: true,
    //   encrypted: true,
    //   authEndpoint: 'http://localhost:80/broadcasting/auth',
    //   auth: {
    //     headers: {
    //       Authorization: `Bearer ${authAccessHeader()}`,
    //       Accept: 'application/json',
    //     },
    //   },
    // });
  }, []);

  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
