import { useState } from 'react';
import { useKanban } from '@/hooks/useKanban';
import { KanbanColumn } from './KanbanColumn';
import { KanbanSidebar } from './KanbanSidebar';
import { AIChatbot } from './AIChatbot';
import { AddTaskDialog } from './AddTaskDialog';
import { ColumnId } from '@/types/kanban';
import { Search, Bell, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function KanbanBoard() {
  const {
    draggedTaskId,
    setDraggedTaskId,
    getColumnTasks,
    moveTask,
    addTask,
  } = useKanban();

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addColumnId, setAddColumnId] = useState<ColumnId>('todo');

  const handleDrop = (columnId: ColumnId) => {
    if (draggedTaskId) {
      moveTask(draggedTaskId, columnId);
      setDraggedTaskId(null);
    }
  };

  const handleAddTask = (columnId: ColumnId) => {
    setAddColumnId(columnId);
    setAddDialogOpen(true);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <KanbanSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-border px-8 py-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-10 rounded-xl bg-secondary/50 border-muted" />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--kanban-high))] text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary" />
          </div>
        </header>

        {/* Page header */}
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Track and manage your tasks</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="rounded-xl" onClick={() => handleAddTask('todo')}>
              Create Task
            </Button>
          </div>
        </div>

        {/* Columns */}
        <div className="flex flex-1 gap-6 overflow-x-auto px-8 pb-6">
          <KanbanColumn
            id="todo"
            title="To Do"
            tasks={getColumnTasks('todo')}
            draggedTaskId={draggedTaskId}
            onDragStart={setDraggedTaskId}
            onDragEnd={() => setDraggedTaskId(null)}
            onDrop={handleDrop}
            onAddTask={handleAddTask}
            accentColor="hsl(var(--kanban-todo))"
          />
          <KanbanColumn
            id="in-progress"
            title="In Progress"
            tasks={getColumnTasks('in-progress')}
            draggedTaskId={draggedTaskId}
            onDragStart={setDraggedTaskId}
            onDragEnd={() => setDraggedTaskId(null)}
            onDrop={handleDrop}
            onAddTask={handleAddTask}
            accentColor="hsl(var(--kanban-progress))"
          />
        </div>
      </div>

      <AIChatbot />

      <AddTaskDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        columnId={addColumnId}
        onAdd={addTask}
      />
    </div>
  );
}
