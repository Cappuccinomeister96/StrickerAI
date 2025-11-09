export interface PatternAnalysis {
  yarnType: string | null;
  yarnWeight: string | null;
  garmentType: string | null;
  targetDemographic: string | null;
  gauge: string | null;
  needleType: string | null;
  positiveEase: string | null;
  constructionMethod: string | null;
}

export interface Pattern {
  id: string;
  filename: string;
  title: string;
  description: string;
  analysis: PatternAnalysis;
  difficulty: string;
  estimatedTime: string;
  sizes: string[];
  createdAt: string;
}

// Legacy interface für Kompatibilität
export interface PatternMetadata {
  maschenprobe: string;
  nadelart: string;
  garnArt: string;
  kleidungsstueckart: string;
  fuerWen: 'Mann' | 'Frau' | 'Kind' | 'Unisex';
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

