export type GetTasksDto = {
  skip: number;
  limit: number;
  sort: string;
  search?: string;
  userId?: number;
};
