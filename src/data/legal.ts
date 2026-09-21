import { Language } from '../types';

export type LocalizedText = Record<Language, string>;

export interface LegalLink {
  href: string;
  label: LocalizedText;
}

export interface OperatorReference {
  id: string;
  name: string;
  links: LegalLink[];
}

export interface OfficialResource {
  id: string;
  title: LocalizedText;
  source: LocalizedText;
  href: string;
}

export interface DestinationGuide {
  id: string;
  title: LocalizedText;
  href: string;
}

/** Operator-published documents kept as reference only — not confirmed current partners. */
export const operatorReferences: OperatorReference[] = [
  {
    id: 'novatours',
    name: 'Novatours',
    links: [
      {
        href: 'https://www.novatours.ee/reisitingimused',
        label: {
          ET: 'Novatours reisitingimused',
          RU: 'Условия путешествия Novatours',
          EN: 'Novatours travel terms',
        },
      },
    ],
  },
  {
    id: 'teztour',
    name: 'TezTour',
    links: [
      {
        href: 'https://www.teztour.ee/page/reisilepingu-tingimused-pakettreisidele-2025.et.html',
        label: {
          ET: 'TezTour reisilepingu üldtingimused pakettreisidele',
          RU: 'Общие условия договора TezTour для пакетных туров',
          EN: 'TezTour package travel contract terms',
        },
      },
      {
        href: 'https://www.teztour.ee/page/maksetingimused.et.html',
        label: {
          ET: 'TezTour maksetingimused / online-müügi tingimused',
          RU: 'Условия оплаты / онлайн-продажи TezTour',
          EN: 'TezTour payment / online sales terms',
        },
      },
    ],
  },
  {
    id: 'joinup',
    name: 'Join UP',
    links: [
      {
        href: 'https://joinup.ee/et/standard-information-forms',
        label: {
          ET: 'Join UP standardteabe vormid',
          RU: 'Стандартные информационные формы Join UP',
          EN: 'Join UP standard information forms',
        },
      },
    ],
  },
  {
    id: 'coral-anex',
    name: 'Coral Travel / Anex Tour',
    // coraltravel.ee/reisitingimused returns 404; no stable official HTML terms URL confirmed.
    // CDN PDFs exist but are fragile filenames — do not publish until the owner confirms a durable link.
    links: [
      {
        href: 'https://anextour.ee/',
        label: {
          ET: 'Anex Tour veebileht',
          RU: 'Сайт Anex Tour',
          EN: 'Anex Tour website',
        },
      },
    ],
  },
  {
    id: 'interlux',
    name: 'Interlux Travel',
    links: [
      {
        href: 'https://interluxtravel.lv/policy',
        label: {
          ET: 'Interlux Travel tingimused ja lepingupoliitika',
          RU: 'Условия и договорная политика Interlux Travel',
          EN: 'Interlux Travel terms and contract policy',
        },
      },
    ],
  },
  {
    id: 'premio',
    name: 'Premio Travel',
    links: [
      {
        href: 'https://www.premiotravel.ee/userfiles/files/Pakettreisilepingu%20u%CC%88ldtingimused_al%2026_01_2026.pdf',
        label: {
          ET: 'Premio Travel pakettreisilepingu üldtingimused (al. 26.01.2026)',
          RU: 'Общие условия договора Premio Travel для пакетных туров (с 26.01.2026)',
          EN: 'Premio Travel package travel contract terms (from 26 January 2026)',
        },
      },
      {
        href: 'https://www.premiotravel.ee/pakettreisilepingu-standardinfo-teabeleht',
        label: {
          ET: 'Premio Travel pakettreisilepingu standardinfo teabeleht',
          RU: 'Стандартный информационный лист Premio Travel для пакетных туров',
          EN: 'Premio Travel standard information sheet for package travel',
        },
      },
    ],
  },
];

export const officialResources: OfficialResource[] = [
  {
    id: 'flights',
    title: {
      ET: 'Kontrolli väljalennu aega: reaalajas lennuinfo',
      RU: 'Проверьте время вылета: информация о рейсах в реальном времени',
      EN: 'Check departure time: live flight information',
    },
    source: {
      ET: 'Tallinna Lennujaam',
      RU: 'Таллиннский аэропорт',
      EN: 'Tallinn Airport',
    },
    href: 'https://airport.ee/lennuinfo/',
  },
  {
    id: 'children',
    title: {
      ET: 'Lastega reisimine',
      RU: 'Путешествие с детьми',
      EN: 'Travelling with children',
    },
    source: {
      ET: 'Reisi Targalt / Välisministeerium',
      RU: 'Reisi Targalt / Министерство иностранных дел',
      EN: 'Reisi Targalt / Ministry of Foreign Affairs',
    },
    href: 'https://reisitargalt.vm.ee/lastega-reisimine/',
  },
  {
    id: 'id-card',
    title: {
      ET: 'ID-kaardiga reisimine',
      RU: 'Поездки с ID-картой',
      EN: 'Travelling with an ID card',
    },
    source: {
      ET: 'ID.ee',
      RU: 'ID.ee',
      EN: 'ID.ee',
    },
    href: 'https://www.id.ee/',
  },
  {
    id: 'border',
    title: {
      ET: 'Küsimusi piiriületustest',
      RU: 'Вопросы о пересечении границы',
      EN: 'Border crossing information',
    },
    source: {
      ET: 'Politsei- ja Piirivalveamet',
      RU: 'Департамент полиции и погранохраны',
      EN: 'Police and Border Guard Board',
    },
    href: 'https://www.politsei.ee/et/piiripunktid',
  },
  {
    id: 'medicines',
    title: {
      ET: 'Ravimitega reisimine',
      RU: 'Поездки с лекарствами',
      EN: 'Travelling with medicines',
    },
    source: {
      ET: 'Ravimiamet',
      RU: 'Департамент лекарств',
      EN: 'State Agency of Medicines',
    },
    href: 'https://www.ravimiamet.ee/ravimitegareisimine',
  },
  {
    id: 'goods',
    title: {
      ET: 'Kaupade kaasatoomine Euroopa Liidu välisest riigist',
      RU: 'Ввоз товаров из страны вне Европейского союза',
      EN: 'Bringing goods from a country outside the European Union',
    },
    source: {
      ET: 'Maksu- ja Tolliamet',
      RU: 'Налогово-таможенный департамент',
      EN: 'Tax and Customs Board',
    },
    href: 'https://www.emta.ee/eraklient/saadetised-reisimine-elama-asumine/reisimine/eestisse-kolmandast-riigist',
  },
  {
    id: 'pets',
    title: {
      ET: 'Lemmikloomaga reisimine',
      RU: 'Поездки с домашним животным',
      EN: 'Travelling with a pet',
    },
    source: {
      ET: 'Põllumajandus- ja Toiduamet',
      RU: 'Сельскохозяйственно-продовольственный департамент',
      EN: 'Agriculture and Food Board',
    },
    href: 'https://pta.agri.ee/tarbijale-ja-eraisikule/reisimine/lemmikloomaga-reisimine',
  },
];

export const destinationGuides: DestinationGuide[] = [
  {
    id: 'turkey',
    title: { ET: 'Reisimine Türki', RU: 'Поездка в Турцию', EN: 'Travel to Turkey' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/turgi/',
  },
  {
    id: 'egypt',
    title: { ET: 'Reisimine Egiptusesse', RU: 'Поездка в Египет', EN: 'Travel to Egypt' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/egiptus/',
  },
  {
    id: 'greece',
    title: { ET: 'Reisimine Kreekasse', RU: 'Поездка в Грецию', EN: 'Travel to Greece' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/kreeka/',
  },
  {
    id: 'bulgaria',
    title: { ET: 'Reisimine Bulgaariasse', RU: 'Поездка в Болгарию', EN: 'Travel to Bulgaria' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/bulgaaria/',
  },
  {
    id: 'spain',
    title: { ET: 'Reisimine Hispaaniasse', RU: 'Поездка в Испанию', EN: 'Travel to Spain' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/hispaania/',
  },
  {
    id: 'portugal',
    title: { ET: 'Reisimine Portugali', RU: 'Поездка в Португалию', EN: 'Travel to Portugal' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/portugal/',
  },
  {
    id: 'montenegro',
    title: { ET: 'Reisimine Montenegrosse', RU: 'Поездка в Черногорию', EN: 'Travel to Montenegro' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/montenegro/',
  },
  {
    id: 'cyprus',
    title: { ET: 'Reisimine Küprosele', RU: 'Поездка на Кипр', EN: 'Travel to Cyprus' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/kupros/',
  },
  {
    id: 'italy',
    title: { ET: 'Reisimine Itaaliasse', RU: 'Поездка в Италию', EN: 'Travel to Italy' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/itaalia/',
  },
  {
    id: 'sri-lanka',
    title: { ET: 'Reisimine Sri Lankale', RU: 'Поездка на Шри-Ланку', EN: 'Travel to Sri Lanka' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/sri-lanka/',
  },
  {
    id: 'thailand',
    title: { ET: 'Reisimine Taisse', RU: 'Поездка в Таиланд', EN: 'Travel to Thailand' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/tai/',
  },
  {
    id: 'cuba',
    title: { ET: 'Reisimine Kuubasse', RU: 'Поездка на Кубу', EN: 'Travel to Cuba' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/kuuba/',
  },
  {
    id: 'dominican-republic',
    title: {
      ET: 'Reisimine Dominikaani Vabariiki',
      RU: 'Поездка в Доминиканскую Республику',
      EN: 'Travel to the Dominican Republic',
    },
    href: 'https://reisitargalt.vm.ee/sihtkoht/dominikaani-vabariik/',
  },
  {
    id: 'vietnam',
    title: { ET: 'Reisimine Vietnami', RU: 'Поездка во Вьетнам', EN: 'Travel to Vietnam' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/vietnam/',
  },
  {
    id: 'maldives',
    title: { ET: 'Reisimine Maldiividele', RU: 'Поездка на Мальдивы', EN: 'Travel to the Maldives' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/maldiivi-vabariik/',
  },
  {
    id: 'zanzibar',
    title: {
      ET: 'Reisimine Sansibarile (Tansaania)',
      RU: 'Поездка на Занзибар (Танзания)',
      EN: 'Travel to Zanzibar (Tanzania)',
    },
    href: 'https://reisitargalt.vm.ee/sihtkoht/tansaania/',
  },
  {
    id: 'mauritius',
    title: { ET: 'Reisimine Mauritiusele', RU: 'Поездка на Маврикий', EN: 'Travel to Mauritius' },
    href: 'https://reisitargalt.vm.ee/sihtkoht/mauritiuse-vabariik/',
  },
  {
    id: 'uae',
    title: {
      ET: 'Reisimine Araabia Ühendemiraatidesse',
      RU: 'Поездка в Объединённые Арабские Эмираты',
      EN: 'Travel to the United Arab Emirates',
    },
    href: 'https://reisitargalt.vm.ee/sihtkoht/araabia-uhendemiraadid/',
  },
];

export const privacyInspectorate: LegalLink = {
  href: 'https://www.aki.ee/',
  label: {
    ET: 'Andmekaitse Inspektsioon',
    RU: 'Инспекция по защите данных',
    EN: 'Data Protection Inspectorate',
  },
};

export const mfaTravelInfoHref = 'https://reisitargalt.vm.ee/';
