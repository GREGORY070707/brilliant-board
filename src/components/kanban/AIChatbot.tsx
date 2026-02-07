import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/kanban';

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! 👋 I'm your Kanban assistant. Ask me anything about your tasks or project management!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        "Great question! I'd suggest breaking that task into smaller subtasks for better tracking.",
        "You could try prioritizing your high-priority items first and tackling them in focused sprints.",
        "Consider moving tasks that are blocked to a 'Waiting' state so your In Progress column stays clean.",
        "That's a good approach! Remember to update the progress percentages as you complete milestones.",
        "I recommend reviewing your board weekly to ensure nothing falls through the cracks.",
      ];
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat panel */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 w-[380px] rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300',
          open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-primary px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-foreground">AI Assistant</h3>
              <p className="text-xs text-primary-foreground/70">Always here to help</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex flex-col gap-3 p-4 h-[350px] overflow-y-auto kanban-scroll">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground rounded-br-md'
                  : 'mr-auto bg-secondary text-secondary-foreground rounded-bl-md'
              )}
            >
              {msg.content}
            </div>
          ))}
          {isTyping && (
            <div className="mr-auto bg-secondary text-secondary-foreground rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
              <span className="inline-flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>·</span>
              </span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-xl border-muted bg-secondary/50"
            />
            <Button type="submit" size="icon" className="h-10 w-10 rounded-xl shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
