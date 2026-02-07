export type Priority = 'low' | 'medium' | 'high';
export type ColumnId = 'todo' | 'in-progress';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  date: string;
  progress: number;
  category: string;
  columnId: ColumnId;
}

export interface Column {
  id: ColumnId;
  title: string;
  tasks: Task[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
