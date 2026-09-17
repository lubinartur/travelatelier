import { LocalizedText } from './legal';

export interface Partner {
  id: string;
  name: string;
  href: string;
  linkLabel: LocalizedText;
}

/**
 * Owner-confirmed operating partners, 17.09.2026.
 * Homepages verified the same day (HTTP 200). No logos or operator contact details.
 */
export const partners: Partner[] = [
  {
    id: 'novatours',
    name: 'Novatours',
    href: 'https://www.novatours.ee/',
    linkLabel: {
      ET: 'Novatours, ametlik veebileht',
      RU: 'Novatours, официальный сайт',
      EN: 'Novatours, official website',
    },
  },
  {
    id: 'tez-tour',
    name: 'Tez Tour',
    href: 'https://www.teztour.ee/',
    linkLabel: {
      ET: 'Tez Tour, ametlik veebileht',
      RU: 'Tez Tour, официальный сайт',
      EN: 'Tez Tour, official website',
    },
  },
  {
    id: 'join-up-baltic',
    name: 'Join UP Baltic',
    href: 'https://joinup.ee/',
    linkLabel: {
      ET: 'Join UP Baltic, ametlik veebileht',
      RU: 'Join UP Baltic, официальный сайт',
      EN: 'Join UP Baltic, official website',
    },
  },
  {
    id: 'anex-tour',
    name: 'ANEX Tour',
    href: 'https://anextour.ee/',
    linkLabel: {
      ET: 'ANEX Tour, ametlik veebileht',
      RU: 'ANEX Tour, официальный сайт',
      EN: 'ANEX Tour, official website',
    },
  },
  {
    id: 'interlux-travel',
    name: 'Interlux Travel',
    href: 'https://interluxtravel.ee/',
    linkLabel: {
      ET: 'Interlux Travel, ametlik veebileht',
      RU: 'Interlux Travel, официальный сайт',
      EN: 'Interlux Travel, official website',
    },
  },
];
