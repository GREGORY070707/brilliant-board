import { Home, Users, MessageSquare, Clock, FileText, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Users, label: 'Team' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: Clock, label: 'Activity' },
  { icon: FileText, label: 'Files' },
  { icon: Settings, label: 'Settings' },
];

export function KanbanSidebar() {
  return (
    <aside className="flex h-screen w-[72px] flex-col items-center bg-[hsl(var(--sidebar-background))] py-6">
      {/* Logo */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--sidebar-primary))]">
        <span className="text-lg font-bold text-[hsl(var(--sidebar-primary-foreground))]">K</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={label}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl transition-colors',
              active
                ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]'
                : 'text-[hsl(var(--sidebar-foreground)/0.6)] hover:bg-[hsl(var(--sidebar-accent)/0.5)] hover:text-[hsl(var(--sidebar-accent-foreground))]'
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        title="Logout"
        className="flex h-11 w-11 items-center justify-center rounded-xl text-[hsl(var(--sidebar-foreground)/0.6)] hover:bg-[hsl(var(--sidebar-accent)/0.5)] hover:text-[hsl(var(--sidebar-accent-foreground))] transition-colors"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </aside>
  );
}
