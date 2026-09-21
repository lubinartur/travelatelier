import { LocalizedText } from './legal';
import novatoursLogo from '../assets/partners/novatours.png';
import tezTourLogo from '../assets/partners/teztour.png';
import joinUpLogo from '../assets/partners/joinup.svg';
import anexLogo from '../assets/partners/anex.svg';
import interluxLogo from '../assets/partners/interlux.png';
import premioLogo from '../assets/partners/premio.png';

export interface Partner {
  id: string;
  name: string;
  href: string;
  logo: string;
  /** Tailwind height per logo so wide and compact marks carry equal visual weight. */
  logoHeight: string;
  linkLabel: LocalizedText;
}

/**
 * Owner-confirmed operating partners (Premio Travel added on owner instruction 21.09.2026).
 * Homepages verified (HTTP 200). Logos come from the owner's live site or the operators' own sites; no operator contact details.
 */
export const partners: Partner[] = [
  {
    id: 'novatours',
    name: 'Novatours',
    href: 'https://www.novatours.ee/',
    logo: novatoursLogo,
    logoHeight: 'h-6',
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
    logo: tezTourLogo,
    logoHeight: 'h-10',
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
    logo: joinUpLogo,
    logoHeight: 'h-9',
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
    logo: anexLogo,
    logoHeight: 'h-9',
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
    logo: interluxLogo,
    logoHeight: 'h-7',
    linkLabel: {
      ET: 'Interlux Travel, ametlik veebileht',
      RU: 'Interlux Travel, официальный сайт',
      EN: 'Interlux Travel, official website',
    },
  },
  {
    id: 'premio-travel',
    name: 'Premio Travel',
    href: 'https://www.premiotravel.ee/',
    logo: premioLogo,
    logoHeight: 'h-11',
    linkLabel: {
      ET: 'Premio Travel, ametlik veebileht',
      RU: 'Premio Travel, официальный сайт',
      EN: 'Premio Travel, official website',
    },
  },
];
