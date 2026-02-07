import { useState } from 'react';
import { Task, ColumnId } from '@/types/kanban';
import { KanbanCard } from './KanbanCard';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  id: ColumnId;
  title: string;
  tasks: Task[];
  draggedTaskId: string | null;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onDrop: (columnId: ColumnId) => void;
  onAddTask: (columnId: ColumnId) => void;
  accentColor: string;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  draggedTaskId,
  onDragStart,
  onDragEnd,
  onDrop,
  onAddTask,
  accentColor,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col min-w-[320px] w-[360px] rounded-2xl transition-colors duration-200',
        isOver && 'bg-accent/40'
      )}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={() => {
        setIsOver(false);
        onDrop(id);
      }}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          <span
            className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold text-white"
            style={{ backgroundColor: accentColor }}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(id)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 kanban-scroll overflow-y-auto pr-1 pb-2" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggedTaskId === task.id}
          />
        ))}

        {/* Drop placeholder */}
        {isOver && (
          <div className="h-20 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-center">
            <span className="text-xs text-primary font-medium">Drop here</span>
          </div>
        )}
      </div>
    </div>
  );
}
