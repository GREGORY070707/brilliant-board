import { useState, useCallback } from 'react';
import { Task, ColumnId } from '@/types/kanban';
import { sampleTasks } from '@/data/sample-tasks';

export function useKanban() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const getColumnTasks = useCallback(
    (columnId: ColumnId) => tasks.filter((t) => t.columnId === columnId),
    [tasks]
  );

  const moveTask = useCallback((taskId: string, targetColumn: ColumnId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, columnId: targetColumn } : t))
    );
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: crypto.randomUUID() };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );
  }, []);

  return {
    tasks,
    setTasks,
    draggedTaskId,
    setDraggedTaskId,
    getColumnTasks,
    moveTask,
    addTask,
    deleteTask,
    updateTask,
  };
}
