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

  const processUser Message = useCallback(async (userInput) => {
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
    processUser Message,
    initializeChat,
    setMessages 
  };
};

// Chatbot UI Component
const ChatbotUI = () => {
  const { messages, isLoading, processUser Message, initializeChat } = useChatbot();
  const [userInput, setUser Input] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    processUser Message(userInput);
    setUser Input('');
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-lg">
        {messages.map((msg) => (
          <div key={msg.id} className={`my-2 p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="my-2 p-3 text-gray-500">Loading...</div>}
      </div>
      <form onSubmit={handleSend} className="flex mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUser Input(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotUI;
