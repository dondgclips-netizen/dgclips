import type { ImageStyle, ImageSize, StyleOption, SizeOption } from '../types';

interface StyleSelectorProps {
  selectedStyle: ImageStyle;
  setSelectedStyle: (style: ImageStyle) => void;
  selectedSize: ImageSize;
  setSelectedSize: (size: ImageSize) => void;
}

const styles: StyleOption[] = [
  { id: 'realistic', label: 'Realistic', icon: '📷', description: 'Photorealistic images' },
  { id: 'anime', label: 'Anime', icon: '🎌', description: 'Anime/manga style' },
  { id: 'digital-art', label: 'Digital Art', icon: '🎨', description: 'Digital illustrations' },
  { id: 'oil-painting', label: 'Oil Painting', icon: '🖼️', description: 'Classical oil painting' },
  { id: 'watercolor', label: 'Watercolor', icon: '💧', description: 'Watercolor painting' },
  { id: '3d-render', label: '3D Render', icon: '🧊', description: '3D rendered scenes' },
  { id: 'pixel', label: 'Pixel Art', icon: '👾', description: 'Retro pixel art' },
  { id: 'sketch', label: 'Sketch', icon: '✏️', description: 'Pencil sketches' },
];

const sizes: SizeOption[] = [
  { id: '512x512', label: '512×512', ratio: '1:1' },
  { id: '768x768', label: '768×768', ratio: '1:1' },
  { id: '1024x1024', label: '1024×1024', ratio: '1:1' },
  { id: '1024x768', label: '1024×768', ratio: '4:3' },
  { id: '768x1024', label: '768×1024', ratio: '3:4' },
  { id: '1280x720', label: '1280×720', ratio: '16:9' },
];

export default function StyleSelector({ selectedStyle, setSelectedStyle, selectedSize, setSelectedSize }: StyleSelectorProps) {
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
      {/* Style Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Art Style
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                selectedStyle === style.id
                  ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-2xl">{style.icon}</span>
              <span className="text-xs font-medium">{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          Image Size
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                selectedSize === size.id
                  ? 'bg-cyan-600/30 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-xs font-mono">{size.label}</span>
              <span className="text-[10px] text-gray-500">{size.ratio}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
