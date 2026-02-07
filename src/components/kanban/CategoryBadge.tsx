import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  Design: 'bg-[hsl(var(--category-design))]',
  Development: 'bg-[hsl(var(--category-dev))]',
  Mobile: 'bg-[hsl(var(--category-mobile))]',
  Dashboard: 'bg-[hsl(var(--category-dashboard))]',
  Marketing: 'bg-[hsl(var(--category-marketing))]',
};

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-0.5 text-xs font-medium text-white',
        categoryColors[category] ?? 'bg-primary'
      )}
    >
      {category}
    </span>
  );
}
