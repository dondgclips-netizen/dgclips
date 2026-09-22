import { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import StyleSelector from './components/StyleSelector';
import ImageGallery from './components/ImageGallery';
import HeroSection from './components/HeroSection';
import type { GeneratedImage, ImageStyle, ImageSize } from './types';

function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>('realistic');
  const [selectedSize, setSelectedSize] = useState<ImageSize>('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentGenerating, setCurrentGenerating] = useState<GeneratedImage | null>(null);

  const generateImage = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    const stylePrompts: Record<ImageStyle, string> = {
      realistic: 'photorealistic, ultra detailed, 8k, professional photography',
      anime: 'anime style, vibrant colors, detailed illustration, studio ghibli inspired',
      'digital-art': 'digital art, concept art, trending on artstation, highly detailed',
      'oil-painting': 'oil painting style, classical art, rich textures, masterpiece',
      'watercolor': 'watercolor painting, soft colors, artistic, delicate brushstrokes',
      '3d-render': '3D render, octane render, cinema 4D, volumetric lighting, ultra detailed',
      pixel: 'pixel art style, 16-bit, retro game aesthetic, detailed pixel work',
      sketch: 'pencil sketch, hand drawn, detailed line art, artistic',
    };

    const [width, height] = selectedSize.split('x').map(Number);
    const seed = Math.floor(Math.random() * 999999);
    const fullPrompt = `${prompt}, ${stylePrompts[selectedStyle]}`;
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

    const newImage: GeneratedImage = {
      id: Date.now().toString(),
      prompt: prompt,
      style: selectedStyle,
      size: selectedSize,
      url: imageUrl,
      seed: seed,
      timestamp: new Date(),
    };

    setCurrentGenerating(newImage);

    // Preload the image
    const img = new Image();
    img.onload = () => {
      setGeneratedImages(prev => [newImage, ...prev]);
      setCurrentGenerating(null);
      setIsGenerating(false);
    };
    img.onerror = () => {
      setCurrentGenerating(null);
      setIsGenerating(false);
    };
    img.src = imageUrl;
  }, [prompt, selectedStyle, selectedSize]);

  const removeImage = (id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <HeroSection />
          
          <div className="mt-12 space-y-8">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={generateImage}
              isGenerating={isGenerating}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <StyleSelector
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />

              {currentGenerating && (
                <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin-slow"></div>
                    Generating...
                  </h3>
                  <div className="aspect-square rounded-xl overflow-hidden animate-shimmer flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin-slow"></div>
                      <p className="text-purple-300 text-sm">Creating your masterpiece...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {generatedImages.length > 0 && (
              <ImageGallery
                images={generatedImages}
                onRemove={removeImage}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-purple-900/30 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 text-sm">
              Powered by AI • Images generated using Pollinations AI • Free & Open Source
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
