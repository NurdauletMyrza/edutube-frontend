export interface Course {
  id: number;
  title: string;
  description: string;
  created_at: string;
  author: number;
  modules: Module[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  created_at: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  order: number;
  created_at: string;
}

export interface DetailedLesson {
  id: number;
  title: string;
  content: string;
  order: number;
  created_at: string;
  module: {
    id: number;
    title: string;
    course: {
      id: number;
      title: string;
      author: number;
    };
  };
}

export interface createModuleInput {
  course: number;
  title: string;
  description: string;
  order: number;
}

export interface createLessonInput {
  module: number;
  title: string;
  content: string;
  order: number;
}
