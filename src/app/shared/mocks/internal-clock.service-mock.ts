import { IActivityItem } from '@shared/models';
import { Subject } from 'rxjs';

const mockSubject = new Subject<number>;
const MOCK_ACTIVITIES: IActivityItem[] = [
  {
    title: 'local',
    status: 'completed',
    createdAt: '2023-11-12',
    streak: 2,
    id: '6071d872-c53d-496b-9ddb-12535d9c89c3'
  }
];

export const InternalClockServiceMock = {
  onUpdateActivity: mockSubject,
  updateActivitiesState: (activities: IActivityItem[]): IActivityItem[] => MOCK_ACTIVITIES,
  initialize: () => {
    return;
  }
};
