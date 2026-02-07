import { useState, useCallback, useEffect } from 'react';
import { Task, ColumnId } from '@/types/kanban';
import { supabase } from '@/integrations/supabase/client';
import { sampleTasks } from '@/data/sample-tasks';

export function useKanban() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load tasks from DB on mount
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Failed to load tasks:', error);
        setTasks(sampleTasks);
      } else if (data && data.length > 0) {
        setTasks(
          data.map((r) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            priority: r.priority as Task['priority'],
            date: r.date,
            progress: r.progress,
            category: r.category,
            columnId: r.column_id as ColumnId,
          }))
        );
      } else {
        // Seed sample tasks into DB
        const inserts = sampleTasks.map((t) => ({
          id: t.id.length > 8 ? t.id : undefined,
          title: t.title,
          description: t.description,
          priority: t.priority,
          date: t.date,
          progress: t.progress,
          category: t.category,
          column_id: t.columnId,
        }));
        const { data: seeded, error: seedErr } = await supabase
          .from('tasks')
          .insert(inserts)
          .select();
        if (seedErr) {
          console.error('Seed error:', seedErr);
          setTasks(sampleTasks);
        } else if (seeded) {
          setTasks(
            seeded.map((r) => ({
              id: r.id,
              title: r.title,
              description: r.description,
              priority: r.priority as Task['priority'],
              date: r.date,
              progress: r.progress,
              category: r.category,
              columnId: r.column_id as ColumnId,
            }))
          );
        }
      }
      setLoaded(true);
    };
    load();
  }, []);

  const getColumnTasks = useCallback(
    (columnId: ColumnId) => tasks.filter((t) => t.columnId === columnId),
    [tasks]
  );

  const moveTask = useCallback(async (taskId: string, targetColumn: ColumnId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, columnId: targetColumn } : t))
    );
    await supabase.from('tasks').update({ column_id: targetColumn }).eq('id', taskId);
  }, []);

  const addTask = useCallback(async (task: Omit<Task, 'id'>) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: task.title,
        description: task.description,
        priority: task.priority,
        date: task.date,
        progress: task.progress,
        category: task.category,
        column_id: task.columnId,
      })
      .select()
      .single();

    if (error) {
      console.error('Add task error:', error);
      return;
    }
    if (data) {
      const newTask: Task = {
        id: data.id,
        title: data.title,
        description: data.description,
        priority: data.priority as Task['priority'],
        date: data.date,
        progress: data.progress,
        category: data.category,
        columnId: data.column_id as ColumnId,
      };
      setTasks((prev) => [...prev, newTask]);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    await supabase.from('tasks').delete().eq('id', taskId);
  }, []);

  const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );
    const dbUpdates: Record<string, unknown> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
    if (updates.progress !== undefined) dbUpdates.progress = updates.progress;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.columnId !== undefined) dbUpdates.column_id = updates.columnId;
    if (updates.date !== undefined) dbUpdates.date = updates.date;
    if (Object.keys(dbUpdates).length > 0) {
      await supabase.from('tasks').update(dbUpdates).eq('id', taskId);
    }
  }, []);

  return {
    tasks,
    loaded,
    draggedTaskId,
    setDraggedTaskId,
    getColumnTasks,
    moveTask,
    addTask,
    deleteTask,
    updateTask,
  };
}
