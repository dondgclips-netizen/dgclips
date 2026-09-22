export type ImageStyle = 
  | 'realistic' 
  | 'anime' 
  | 'digital-art' 
  | 'oil-painting' 
  | 'watercolor' 
  | '3d-render' 
  | 'pixel' 
  | 'sketch';

export type ImageSize = '512x512' | '768x768' | '1024x1024' | '1024x768' | '768x1024' | '1280x720';

export interface GeneratedImage {
  id: string;
  prompt: string;
  style: ImageStyle;
  size: string;
  url: string;
  seed: number;
  timestamp: Date;
}

export interface StyleOption {
  id: ImageStyle;
  label: string;
  icon: string;
  description: string;
}

export interface SizeOption {
  id: ImageSize;
  label: string;
  ratio: string;
}
