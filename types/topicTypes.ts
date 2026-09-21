export type TopicCreateInput = {
  name: string;
  completed?: boolean;
  courseId: number;
  studentId: number;
};

export type TopicDeleteType = {
  topicId: number;
  courseId: number;
  studentId: number;
};

export type TopicUpdateInput = {
  topicId: number;
  name?: string;
  completed?: boolean;
  courseId: number;
  studentId: number;
};
