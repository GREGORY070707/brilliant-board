import { cn } from '@/lib/utils';
import { Priority } from '@/types/kanban';

const config: Record<Priority, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-[hsl(var(--kanban-high)/0.12)] text-[hsl(var(--kanban-high))]' },
  medium: { label: 'Medium', className: 'bg-[hsl(var(--kanban-medium)/0.12)] text-[hsl(var(--kanban-medium))]' },
  low: { label: 'Low', className: 'bg-[hsl(var(--kanban-low)/0.12)] text-[hsl(var(--kanban-low))]' },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = config[priority];
  return (
    <span className={cn('rounded-md px-2 py-0.5 text-xs font-semibold', className)}>
      {label}
    </span>
  );
}
