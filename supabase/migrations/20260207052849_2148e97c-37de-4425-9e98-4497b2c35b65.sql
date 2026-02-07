
-- Create tasks table for kanban board persistence
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  priority TEXT NOT NULL DEFAULT 'medium',
  date TEXT NOT NULL DEFAULT '',
  progress INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'Design',
  column_id TEXT NOT NULL DEFAULT 'todo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- For now, make tasks publicly accessible (no auth required)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tasks are publicly readable" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Tasks are publicly insertable" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Tasks are publicly updatable" ON public.tasks FOR UPDATE USING (true);
CREATE POLICY "Tasks are publicly deletable" ON public.tasks FOR DELETE USING (true);
