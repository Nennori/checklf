import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    pusher: Pusher;
    Echo: Echo;
  }
}

export default function createSocketConnection(token: string) {
  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: 'socket.io',
      transports: ['websocket', 'polling', 'flashsocket'],
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }
}
