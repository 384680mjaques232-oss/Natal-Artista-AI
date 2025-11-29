import React from 'react';
import { Download, Sparkles } from 'lucide-react';

interface ResultCardProps {
  imageUrl: string;
  loading: boolean;
  onDownload: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ imageUrl, loading, onDownload }) => {
  if (loading) {
    return (
      <div className="w-full aspect-square rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center animate-pulse">
        <Sparkles className="text-christmas-gold animate-spin mb-4" size={48} />
        <p className="text-christmas-cream font-display text-xl">Criando mágica...</p>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full aspect-square rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-400">
        <Sparkles size={48} className="mb-4 opacity-50" />
        <p>Sua arte aparecerá aqui</p>
      </div>
    );
  }

  return (
    <div className="relative group w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-christmas-gold/30">
      <img 
        src={imageUrl} 
        alt="Arte de Natal Gerada" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button 
          onClick={onDownload}
          className="bg-christmas-green text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
        >
          <Download size={20} />
          Baixar Imagem
        </button>
      </div>
    </div>
  );
};