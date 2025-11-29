export enum ArtStyle {
  Disney = "Estilo Disney Pixar 3D, fofo, iluminação cinematográfica",
  Watercolor = "Pintura em aquarela suave, artístico, delicado",
  Vintage = "Cartão postal vintage de Natal, retrô, nostálgico",
  PixelArt = "Pixel art 16-bit, estilo jogo retrô",
  Realistic = "Fotografia realista, 4k, altamente detalhado",
  Sketch = "Desenho a lápis, esboço artístico, preto e branco com detalhes vermelhos"
}

export interface GenerationResult {
  imageUrl: string | null;
  promptUsed: string;
  error?: string;
}