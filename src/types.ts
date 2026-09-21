export type Language = 'ET' | 'RU' | 'EN';

export interface Destination {
  id: string;
  name: {
    ET: string;
    RU: string;
    EN: string;
  };
  subtitle: {
    ET: string;
    RU: string;
    EN: string;
  };
  region: {
    ET: string;
    RU: string;
    EN: string;
  };
  description: {
    ET: string;
    RU: string;
    EN: string;
  };
  highlights: {
    ET: string[];
    RU: string[];
    EN: string[];
  };
  bestSeason: {
    ET: string;
    RU: string;
    EN: string;
  };
  travelStyle: {
    ET: string;
    RU: string;
    EN: string;
  };
  imageUrl: string;
  aspect: 'tall' | 'wide' | 'square';
}

export interface HowItWorksStep {
  step: string;
  title: {
    ET: string;
    RU: string;
    EN: string;
  };
  description: {
    ET: string;
    RU: string;
    EN: string;
  };
  detail: {
    ET: string;
    RU: string;
    EN: string;
  };
  imageUrl: string;
}
