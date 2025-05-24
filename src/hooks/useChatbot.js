import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addMessage = (sender, text, products = null) => {
    setMessages(prev => [...prev, { sender, text, products, id: Date.now() + Math.random() }]);
  };

  const processUserMessage = useCallback(async (userInput) => {
    if (!userInput.trim()) return;

    addMessage('user', userInput.trim());
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('product-chatbot', {
        body: JSON.stringify({ query: userInput.trim() }),
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || 'Failed to get response from chatbot.');
      }
      
      addMessage('bot', data.response, data.products);

    } catch (err) {
      console.error("Chatbot processing error:", err);
      toast({
        title: 'Chatbot Error',
        description: err.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      addMessage('bot', "Sorry, I'm having trouble connecting. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const initializeChat = useCallback(() => {
    setMessages([{ 
      sender: 'bot', 
      text: "Hello! I'm Ved's AI assistant. How can I help you find the perfect stationery today? You can ask me about products, prices, or categories.",
      id: Date.now() 
    }]);
  }, []);

  return {
    messages,
    isLoading,
    processUserMessage,
    initializeChat,
    setMessages 
  };
};