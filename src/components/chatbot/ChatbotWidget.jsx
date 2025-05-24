import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { 
          sender: 'bot', 
          text: "Hello! I'm Ved's AI assistant. How can I help you find the perfect stationery today? You can ask me about products, prices, or categories.",
          id: Date.now()
        }
      ]);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = { sender: 'user', text: inputValue.trim(), id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('product-chatbot', {
        body: JSON.stringify({ query: userMessage.text }),
      });

      if (error) {
        throw new Error(error.message || 'Failed to get response from chatbot.');
      }

      const botMessage = { 
        sender: 'bot', 
        text: data.response, 
        products: data.products,
        id: Date.now() + 1 
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      toast({
        title: 'Chatbot Error',
        description: err.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later.", id: Date.now() + 1 }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };
  
  const handleQuickReply = (text) => {
    setInputValue(text);
    inputRef.current?.focus();
  };

  const quickReplies = [
    "What notebooks do you have?",
    "Price of Gel Pens",
    "Are art pencils in stock?",
    "Tell me about discounts",
  ];

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      >
        <Button
          size="icon"
          className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-br from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Chatbot"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'message'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[70vh] max-h-[600px] rounded-xl shadow-2xl overflow-hidden flex flex-col",
              theme === 'dark' ? 'bg-slate-900 border border-slate-700' : 'bg-white border'
            )}
          >
            <header className={cn(
              "p-4 flex items-center justify-between border-b",
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'
            )}>
              <div className="flex items-center gap-2">
                <Bot className="text-primary h-6 w-6" />
                <h3 className="font-semibold text-lg text-foreground">Ved Stationary Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </Button>
            </header>

            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex items-end gap-2 max-w-[85%]",
                      msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    )}
                  >
                    {msg.sender === 'bot' && <Bot className={cn("h-6 w-6 text-primary flex-shrink-0 mb-1", theme === 'dark' ? 'text-primary' : 'text-primary')} />}
                    {msg.sender === 'user' && <User className={cn("h-6 w-6 text-muted-foreground flex-shrink-0 mb-1", theme === 'dark' ? 'text-slate-400' : 'text-gray-500')} />}
                    <div
                      className={cn(
                        "p-3 rounded-xl text-sm leading-relaxed",
                        msg.sender === 'user' 
                          ? (theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground')
                          : (theme === 'dark' ? 'bg-slate-700 text-slate-50' : 'bg-gray-100 text-gray-800')
                      )}
                    >
                      {msg.text}
                      {msg.products && msg.products.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="font-medium text-xs mb-1">Here are some products I found:</p>
                          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                             {msg.products.slice(0, 3).map(product => (
                                <div key={product.id} className={cn("rounded-md p-2", theme === 'dark' ? 'bg-slate-600' : 'bg-white')}>
                                  <h4 className="font-semibold text-xs">{product.name}</h4>
                                  <p className="text-xs opacity-80">₹{product.price.toFixed(2)}</p>
                                  {product.discount > 0 && <span className="text-xs text-green-500"> ({product.discount}% off)</span>}
                                </div>
                             ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex items-end gap-2 mr-auto">
                    <Bot className={cn("h-6 w-6 text-primary flex-shrink-0 mb-1", theme === 'dark' ? 'text-primary' : 'text-primary')} />
                    <div className={cn("p-3 rounded-xl text-sm", theme === 'dark' ? 'bg-slate-700 text-slate-50' : 'bg-gray-100 text-gray-800')}>
                      <div className="flex space-x-1">
                        <span className="animate-pulse">.</span><span className="animate-pulse delay-100">.</span><span className="animate-pulse delay-200">.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {messages.length <= 1 && !isLoading && (
              <div className={cn("p-3 border-t", theme === 'dark' ? 'border-slate-700' : 'border-gray-200')}>
                <p className="text-xs text-muted-foreground mb-2">Or try a quick question:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map(reply => (
                    <Button 
                      key={reply} 
                      variant="outline" 
                      size="sm" 
                      className={cn("text-xs h-auto py-1 px-2", theme === 'dark' ? 'border-slate-600 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-100')}
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className={cn("p-3 border-t", theme === 'dark' ? 'border-slate-700' : 'border-gray-200')}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about products..."
                  className={cn("flex-1", theme === 'dark' ? 'bg-slate-800 border-slate-600 placeholder:text-slate-400' : 'bg-white')}
                  disabled={isLoading}
                  aria-label="Chat input"
                />
                <Button type="submit" size="icon" disabled={isLoading || inputValue.trim() === ''} className="flex-shrink-0">
                  {isLoading ? 
                    <CornerDownLeft size={20} className="animate-ping"/> :
                    <Send size={20} />
                  }
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;