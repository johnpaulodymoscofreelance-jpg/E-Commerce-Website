import React, { useState, useRef, useEffect } from 'react';
import { StylistMessage, Product } from '../types';
import { X, Sparkles, Send, ShoppingBag, ArrowRight, User, RefreshCw } from 'lucide-react';

interface AIStylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: any) => void;
}

export const AIStylistDrawer: React.FC<AIStylistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [messages, setMessages] = useState<StylistMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'stylist',
      text: 'Good evening. I am your Aurelia Head Personal Stylist. Whether you are seeking haute couture for a gala, fine Place Vendôme jewelry, or a Swiss time instrument, allow me to curate a bespoke selection tailored to your desires.',
      timestamp: 'Now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Black Tie Gala Haute Outfit',
    'Fine Gold & Diamond Gift Idea',
    'Swiss Tourbillon Timepieces',
    'Italian Leather Executive Tote'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = textToSend || inputText;
    if (!promptText.trim()) return;

    const userMsg: StylistMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          history: messages
        })
      });

      const data = await response.json();

      const stylistMsg: StylistMessage = {
        id: `stylist-${Date.now()}`,
        sender: 'stylist',
        text: data.reply || 'Allow me to present our finest creations for your consideration.',
        recommendedProductIds: data.recommendedProductIds || [],
        timestamp: 'Now'
      };

      setMessages(prev => [...prev, stylistMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'stylist',
          text: 'I am currently consulting with another VIP client. Allow me a quick moment before we resume our styling conversation.',
          timestamp: 'Now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg bg-[#121212] border-l border-amber-500/40 h-full shadow-2xl flex flex-col justify-between z-10 text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 bg-[#161616] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif text-sm text-white tracking-wider">AURELIA CONCIERGE & STYLIST</h3>
              <p className="text-[10px] text-amber-400/90 tracking-widest uppercase">Bespoke AI Fashion Advisory</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-[#181818] border-b border-neutral-800 flex items-center space-x-2 overflow-x-auto text-[11px] scrollbar-none">
          <span className="text-neutral-500 shrink-0 font-mono text-[10px]">Suggestions:</span>
          {quickPrompts.map(qp => (
            <button
              key={qp}
              onClick={() => handleSendMessage(qp)}
              className="px-2.5 py-1 bg-[#222222] hover:bg-amber-500/20 hover:text-amber-300 text-neutral-300 border border-neutral-700 rounded-full shrink-0 transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(msg => {
            const isStylist = msg.sender === 'stylist';
            const recommendedProducts = products.filter(p => msg.recommendedProductIds?.includes(p.id));

            return (
              <div key={msg.id} className={`flex flex-col ${isStylist ? 'items-start' : 'items-end'}`}>
                <div className={`max-w-[88%] p-4 rounded-xl text-xs leading-relaxed ${
                  isStylist 
                    ? 'bg-[#1A1A1A] border border-amber-500/30 text-neutral-200' 
                    : 'bg-amber-400 text-black font-medium'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Recommended Product Cards directly inside chat bubble! */}
                {isStylist && recommendedProducts.length > 0 && (
                  <div className="mt-3 w-full space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                      Curated Pieces Recommended for You:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {recommendedProducts.map(rec => (
                        <div 
                          key={rec.id}
                          className="p-3 bg-[#161616] border border-neutral-800 rounded flex items-center space-x-3 hover:border-amber-400 transition-all"
                        >
                          <img 
                            src={rec.images[0]} 
                            alt={rec.name} 
                            className="w-12 h-14 object-cover rounded border border-neutral-800"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-serif text-xs text-white truncate">{rec.name}</h5>
                            <p className="text-[11px] text-amber-300">${rec.price.toLocaleString()}</p>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => {
                                onClose();
                                onSelectProduct(rec);
                              }}
                              className="px-2 py-1 bg-[#222222] hover:bg-neutral-700 text-neutral-200 text-[10px] uppercase rounded"
                            >
                              Inspect
                            </button>
                            <button
                              onClick={() => onAddToCart(rec, rec.colors[0])}
                              className="px-2 py-1 bg-amber-400 text-black font-semibold text-[10px] uppercase rounded"
                            >
                              + Bag
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-amber-400 italic">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Aurelia Stylist is curating suggestions...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#161616] border-t border-neutral-800">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input 
              type="text" 
              placeholder="Ask your personal stylist about fit, occasions, or pairings..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#101010] border border-neutral-700 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-light"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
