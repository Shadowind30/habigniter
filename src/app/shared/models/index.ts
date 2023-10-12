interface IActivityItem {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  createdAt: string;
  streak: number;
}

export { IActivityItem };
