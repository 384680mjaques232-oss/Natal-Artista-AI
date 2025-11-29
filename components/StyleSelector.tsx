import React from 'react';
import { ArtStyle } from '../types';
import { Palette, Brush, Camera, Box, PenTool, Tv } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: ArtStyle;
  onSelect: (style: ArtStyle) => void;
}

const styles = [
  { id: ArtStyle.Disney, label: '3D Fofo', icon: <Box size={20} /> },
  { id: ArtStyle.Watercolor, label: 'Aquarela', icon: <Brush size={20} /> },
  { id: ArtStyle.Vintage, label: 'Vintage', icon: <Palette size={20} /> },
  { id: ArtStyle.Realistic, label: 'Realista', icon: <Camera size={20} /> },
  { id: ArtStyle.PixelArt, label: 'Pixel Art', icon: <Tv size={20} /> },
  { id: ArtStyle.Sketch, label: 'Esboço', icon: <PenTool size={20} /> },
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style.id)}
          className={`
            flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200
            ${selectedStyle === style.id 
              ? 'bg-christmas-red text-white border-christmas-red shadow-lg scale-105' 
              : 'bg-white/10 text-gray-300 border-white/10 hover:bg-white/20 hover:border-white/30'}
          `}
        >
          {style.icon}
          <span className="font-medium text-sm">{style.label}</span>
        </button>
      ))}
    </div>
  );
};