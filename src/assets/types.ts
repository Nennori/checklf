/* eslint-disable no-unused-vars */
import { User } from './interfaces';

export type UserAction = {
  type: string;
  payload: Record<string, unknown> | null;
};

export type UserState = {
  user: User;
};

export type DispatchType = (args: UserAction) => UserAction;
