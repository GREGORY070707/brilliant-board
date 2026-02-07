import { Task } from '@/types/kanban';
import { CategoryBadge } from './CategoryBadge';
import { PriorityBadge } from './PriorityBadge';
import { Progress } from '@/components/ui/progress';
import { MoreHorizontal, Paperclip, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanCardProps {
  task: Task;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export function KanbanCard({ task, onDragStart, onDragEnd, isDragging }: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(task.id);
      }}
      onDragEnd={onDragEnd}
      className={cn(
        'group cursor-grab rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
        'active:cursor-grabbing',
        isDragging && 'opacity-40 scale-95 rotate-1'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <CategoryBadge category={task.category} />
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-sm text-card-foreground mb-1">{task.title}</h3>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-3">
        <Progress value={task.progress} className="h-1.5 flex-1" />
        <span className="text-xs font-medium text-muted-foreground">{task.progress}%</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Avatars placeholder */}
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full border-2 border-card bg-primary/20"
              style={{ backgroundColor: `hsl(${258 + i * 40} 50% ${60 + i * 8}%)` }}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs">
            <Paperclip className="h-3 w-3" /> 6
          </span>
          <span className="flex items-center gap-1 text-xs">
            <MessageCircle className="h-3 w-3" /> 4
          </span>
        </div>
      </div>
    </div>
  );
}
