import React, { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { ArtStyle } from './types';
import { generateChristmasImage } from './services/geminiService';
import { StyleSelector } from './components/StyleSelector';
import { ResultCard } from './components/ResultCard';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(ArtStyle.Disney);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Por favor, descreva o que você quer ver no desenho.");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedUrl = await generateChristmasImage(prompt, selectedStyle);
      setImageUrl(generatedUrl);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao gerar a imagem.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `natal-artista-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen snow-bg flex flex-col items-center py-12 px-4 md:px-6">
      <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="text-christmas-gold" size={32} />
          <h1 className="font-display text-5xl md:text-6xl text-christmas-red drop-shadow-lg">
            Natal Artista AI
          </h1>
          <Sparkles className="text-christmas-gold" size={32} />
        </div>
        <p className="text-christmas-cream text-lg md:text-xl font-light opacity-90">
          Transforme suas ideias em desenhos mágicos de Natal
        </p>
      </header>

      <main className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Controls */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
          <div className="mb-6">
            <label className="block text-christmas-cream font-bold mb-2 text-lg">
              O que você quer desenhar?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Um boneco de neve usando cachecol vermelho bebendo chocolate quente..."
              className="w-full h-32 bg-christmas-dark/50 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-christmas-red focus:border-transparent resize-none transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block text-christmas-cream font-bold mb-4 text-lg">
              Escolha o Estilo
            </label>
            <StyleSelector selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className={`
              w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all
              ${loading || !prompt.trim() 
                ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                : 'bg-gradient-to-r from-christmas-red to-red-700 hover:from-red-500 hover:to-christmas-red text-white transform hover:scale-[1.02]'}
            `}
          >
            {loading ? (
              'Criando...'
            ) : (
              <>
                <Wand2 size={24} />
                Gerar Desenho
              </>
            )}
          </button>
        </div>

        {/* Right Column: Result */}
        <div className="sticky top-8">
           <ResultCard 
             imageUrl={imageUrl || ''} 
             loading={loading} 
             onDownload={handleDownload} 
           />
           {imageUrl && (
             <p className="text-center text-gray-400 text-sm mt-4">
               Dica: Clique na imagem ou no botão para baixar.
             </p>
           )}
        </div>

      </main>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Desenvolvido com Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;