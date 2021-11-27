export interface Task {
  id: number;
  content: string;
  checked: boolean;
}

export interface CheckList {
  id: number;
  name: string;
  tasks: Task[];
}

export interface CheckListItem {
  id: number;
  name: string;
  task?: Task;
}

export interface User {
  name: string;
}
