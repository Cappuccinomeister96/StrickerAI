export interface PatternMetadata {
  maschenprobe: string;
  nadelart: string;
  garnArt: string;
  kleidungsstueckart: string;
  fuerWen: 'Mann' | 'Frau' | 'Kind' | 'Unisex';
}

export interface Pattern {
  id: string;
  name: string;
  pdfPath: string;
  metadata: PatternMetadata;
  thumbnail?: string;
}

export interface Needle {
  id: string;
  type: string;
  size: string;
  material: string;
  quantity: number;
}

export interface Yarn {
  id: string;
  brand: string;
  name: string;
  color: string;
  weight: string;
  quantity: number;
  unit: 'Knäuel' | 'Gramm';
}

