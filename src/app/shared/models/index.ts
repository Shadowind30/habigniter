interface IActivityItem {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  createdAt: string;
  streak: number;
  tasks?: ITask[];
}

interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export { IActivityItem, ITask };
