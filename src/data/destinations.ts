import { Destination, HowItWorksStep } from '../types';

export const destinations: Destination[] = [
  {
    id: 'egypt',
    name: {
      ET: 'Egiptus',
      RU: 'Египет',
      EN: 'Egypt',
    },
    subtitle: {
      ET: 'Punase mere kuurordid ja ajaloolised paigad',
      RU: 'Курорты Красного моря и исторические места',
      EN: 'Red Sea resorts and historic sites',
    },
    region: {
      ET: 'Punane meri',
      RU: 'Красное море',
      EN: 'Red Sea',
    },
    description: {
      ET: 'Egiptuses saab ühendada rannapuhkuse Punase mere ääres ja ekskursioonid ajaloolistesse paikadesse. Aitame valida kuurordi, hotelli ja programmi vastavalt Sinu soovidele ja eelarvele.',
      RU: 'В Египте можно совместить пляжный отдых на Красном море и экскурсии к историческим местам. Поможем выбрать курорт, отель и программу под ваши пожелания и бюджет.',
      EN: 'Egypt lets you combine a beach holiday on the Red Sea with excursions to historic sites. We help you choose the resort, hotel and programme to fit your wishes and budget.',
    },
    highlights: {
      ET: [
        'Hurghada, Sharm el-Sheikh ja Marsa Alam kuurordid',
        'Snorgeldamine ja sukeldumine Punases meres',
        'Ekskursioonid Kairosse ja Luxorisse',
      ],
      RU: [
        'Курорты Хургады, Шарм-эль-Шейха и Марса-Алам',
        'Снорклинг и дайвинг в Красном море',
        'Экскурсии в Каир и Луксор',
      ],
      EN: [
        'Resorts in Hurghada, Sharm el-Sheikh and Marsa Alam',
        'Snorkelling and diving in the Red Sea',
        'Excursions to Cairo and Luxor',
      ],
    },
    bestSeason: {
      ET: 'Kogu aasta, suvel väga kuum',
      RU: 'Круглый год, летом очень жарко',
      EN: 'Year-round, very hot in summer',
    },
    travelStyle: {
      ET: 'Rannapuhkus, snorgeldamine ja ekskursioonid',
      RU: 'Пляжный отдых, снорклинг и экскурсии',
      EN: 'Beach holidays, snorkelling and excursions',
    },
    imageUrl: 'https://images.unsplash.com/photo-1678480258391-56b32d6939b1?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
  },
  {
    id: 'turkey',
    name: {
      ET: 'Türgi',
      RU: 'Турция',
      EN: 'Turkey',
    },
    subtitle: {
      ET: 'Kapadookia maastikud ja Egeuse mere rannik',
      RU: 'Пейзажи Каппадокии и побережье Эгейского моря',
      EN: 'Cappadocian landscapes and the Aegean coast',
    },
    region: {
      ET: 'Väike-Aasia & Vahemeri',
      RU: 'Малая Азия и Средиземноморье',
      EN: 'Asia Minor & Aegean',
    },
    description: {
      ET: 'Türgis on nii rannakuurordid kui ajaloolised paigad. Aitame valida kuurordi, hotelli ja programmi vastavalt Sinu soovidele ja eelarvele.',
      RU: 'В Турции есть и пляжные курорты, и исторические места. Поможем выбрать курорт, отель и программу под ваши пожелания и бюджет.',
      EN: 'Turkey offers beach resorts and historic sites alike. We help you choose the resort, hotel and programme to fit your wishes and budget.',
    },
    highlights: {
      ET: [
        'Vahemere ja Egeuse mere kuurordid',
        'Kapadookia ja Istanbul',
        'Rannapuhkus ja ekskursioonid',
      ],
      RU: [
        'Курорты Средиземного и Эгейского морей',
        'Каппадокия и Стамбул',
        'Пляжный отдых и экскурсии',
      ],
      EN: [
        'Mediterranean and Aegean resorts',
        'Cappadocia and Istanbul',
        'Beach holidays and excursions',
      ],
    },
    bestSeason: {
      ET: 'Aprill – Juuni & September – November',
      RU: 'Апрель – Июнь и Сентябрь – Ноябрь',
      EN: 'April – June & September – November',
    },
    travelStyle: {
      ET: 'Ajalugu, maastikud ja rannikuline elustiil',
      RU: 'История, пейзажи и прибрежный стиль жизни',
      EN: 'Living history, surreal geography, and coastal ease',
    },
    // Hot air balloons over Cappadocia landscape
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1400&q=85',
    aspect: 'square',
  },
  {
    id: 'tenerife',
    name: {
      ET: 'Tenerife',
      RU: 'Тенерифе',
      EN: 'Tenerife',
    },
    subtitle: {
      ET: 'Teide vulkaan, rannikud ja pehme kliima aastaringselt',
      RU: 'Вулкан Тейде, побережья и мягкий климат круглый год',
      EN: 'Mount Teide, coastlines and a mild climate year-round',
    },
    region: {
      ET: 'Kanaari saared',
      RU: 'Канарские острова',
      EN: 'Canary Islands',
    },
    description: {
      ET: 'Tenerife sobib nii rannapuhkuseks kui loodusretkedeks. Aitame valida piirkonna saarel, hotelli ja programmi vastavalt Sinu soovidele ja eelarvele.',
      RU: 'Тенерифе подходит и для пляжного отдыха, и для прогулок на природе. Поможем выбрать район острова, отель и программу под ваши пожелания и бюджет.',
      EN: 'Tenerife suits both beach holidays and time in nature. We help you choose the area of the island, the hotel and the programme to fit your wishes and budget.',
    },
    highlights: {
      ET: [
        'Teide rahvuspark ja vulkaanimaastik',
        'Los Gigantesi kaljud ja lõunaranniku rannad',
        'Jalutuskäigud ja loodusretked',
      ],
      RU: [
        'Национальный парк Тейде и вулканические пейзажи',
        'Скалы Лос-Гигантес и пляжи юга острова',
        'Пешие прогулки и поездки на природу',
      ],
      EN: [
        'Teide National Park and volcanic landscapes',
        'The Los Gigantes cliffs and south-coast beaches',
        'Walks and nature excursions',
      ],
    },
    bestSeason: {
      ET: 'Kogu aasta',
      RU: 'Круглый год',
      EN: 'Year-round',
    },
    travelStyle: {
      ET: 'Rannapuhkus ja loodus',
      RU: 'Пляжный отдых и природа',
      EN: 'Beach holidays and nature',
    },
    imageUrl: 'https://images.unsplash.com/photo-1679913156021-ab9d1e6c7a7f?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
  },
  {
    id: 'greece',
    name: {
      ET: 'Kreeka',
      RU: 'Греция',
      EN: 'Greece',
    },
    subtitle: {
      ET: 'Valged Küklaadide saared, Joonia meri ja varjatud lahesopid',
      RU: 'Киклады, бирюза Ионического моря и скрытые бухты',
      EN: 'Sun-washed Cyclades, Ionian bays, and quiet Aegean coves',
    },
    region: {
      ET: 'Vahemeri',
      RU: 'Средиземноморье',
      EN: 'Mediterranean',
    },
    description: {
      ET: 'Kreekas saab ühendada saarepuhkuse ja ajaloolised paigad. Aitame valida saared, marsruudi ja hooaja Sinu tempo järgi.',
      RU: 'В Греции можно совместить отдых на островах и знакомство с историей. Поможем выбрать острова, маршрут и сезон в подходящем вам темпе.',
      EN: 'Greece combines island holidays with history. We help you choose the islands, route and season at a pace that suits you.',
    },
    highlights: {
      ET: [
        'Küklaadid ja Dodekaneesid',
        'Joonia ja Egeuse mere rannikud',
        'Reis saarelt saarele',
      ],
      RU: [
        'Киклады и Додеканес',
        'Побережья Ионического и Эгейского морей',
        'Путешествие с острова на остров',
      ],
      EN: [
        'The Cyclades and the Dodecanese',
        'Ionian and Aegean coasts',
        'Island-hopping',
      ],
    },
    bestSeason: {
      ET: 'Mai – Juuni & September – Oktoober',
      RU: 'Май – Июнь и Сентябрь – Октябрь',
      EN: 'May – June & September – October',
    },
    travelStyle: {
      ET: 'Saareelu, valgus, meri ja aeglane rütm',
      RU: 'Островная жизнь, свет, море и размеренный ритм',
      EN: 'Island aesthetics, Aegean light, and slow living',
    },
    // Serene whitewashed Greek island architecture
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85',
    aspect: 'tall',
  },
  {
    id: 'montenegro',
    name: {
      ET: 'Montenegro',
      RU: 'Черногория',
      EN: 'Montenegro',
    },
    subtitle: {
      ET: 'Kotori laht, Aadria mere rannik ja mäed',
      RU: 'Бока-Которская бухта, побережье Адриатики и горы',
      EN: 'The Bay of Kotor, the Adriatic coast and mountains',
    },
    region: {
      ET: 'Aadria meri',
      RU: 'Адриатика',
      EN: 'Adriatic Sea',
    },
    description: {
      ET: 'Montenegro ühendab Aadria mere rannad, vanalinnad ja mäed. Aitame valida kuurordi, majutuse ja marsruudi vastavalt Sinu soovidele ja eelarvele.',
      RU: 'Черногория сочетает пляжи Адриатики, старые города и горы. Поможем выбрать курорт, проживание и маршрут под ваши пожелания и бюджет.',
      EN: 'Montenegro combines Adriatic beaches, old towns and mountains. We help you choose the resort, accommodation and route to fit your wishes and budget.',
    },
    highlights: {
      ET: [
        'Kotori laht ja Kotori vanalinn',
        'Budva ja Aadria mere rannad',
        'Mäed ja rahvuspargid',
      ],
      RU: [
        'Бока-Которская бухта и старый город Котор',
        'Будва и пляжи Адриатики',
        'Горы и национальные парки',
      ],
      EN: [
        'The Bay of Kotor and Kotor Old Town',
        'Budva and the Adriatic beaches',
        'Mountains and national parks',
      ],
    },
    bestSeason: {
      ET: 'Mai – Oktoober',
      RU: 'Май – Октябрь',
      EN: 'May – October',
    },
    travelStyle: {
      ET: 'Rannapuhkus ja looduslikud maastikud',
      RU: 'Пляжный отдых и природные пейзажи',
      EN: 'Beach holidays and scenic landscapes',
    },
    imageUrl: 'https://images.unsplash.com/photo-1614122027743-50a9e6e8002f?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
  },
  {
    id: 'maldives',
    name: {
      ET: 'Maldiivid',
      RU: 'Мальдивы',
      EN: 'Maldives',
    },
    subtitle: {
      ET: 'Puutumata atollid, privaatsed veevillad ja ookeani rahu',
      RU: 'Уединенные атоллы, водные виллы и океанический покой',
      EN: 'Secluded atolls, overwater pavilions, and quiet lagoons',
    },
    region: {
      ET: 'India ookean',
      RU: 'Индийский океан',
      EN: 'Indian Ocean',
    },
    description: {
      ET: 'Maldiividel on palju kuurortsaari ja need on üksteisest väga erinevad. Aitame valida saare, majutuse ja transfeeri viisi vastavalt Sinu soovidele ja eelarvele.',
      RU: 'На Мальдивах множество курортных островов, и они заметно отличаются. Поможем выбрать остров, проживание и вид трансфера под ваши пожелания и бюджет.',
      EN: 'The Maldives has many resort islands and they differ a lot. We help you choose the island, accommodation and transfer type to fit your wishes and budget.',
    },
    highlights: {
      ET: [
        'Atollid ja kuurortsaared',
        'Veevillad ja korallrifid',
        'Transfeer vesilennuki või kiirlaevaga (sõltub kuurordist)',
      ],
      RU: [
        'Атоллы и курортные острова',
        'Водные виллы и коралловые рифы',
        'Трансфер на гидросамолёте или катере (зависит от курорта)',
      ],
      EN: [
        'Atolls and resort islands',
        'Overwater villas and coral reefs',
        'Seaplane or speedboat transfers (depends on the resort)',
      ],
    },
    bestSeason: {
      ET: 'November – Aprill',
      RU: 'Ноябрь – Апрель',
      EN: 'November – April',
    },
    travelStyle: {
      ET: 'Täielik lõõgastus, ookean ja privaatsus',
      RU: 'Абсолютный релакс, океан и приватность',
      EN: 'Uncompromising barefoot sanctuary and tranquility',
    },
    // Pristine turquoise lagoon overwater villa
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85',
    aspect: 'tall',
  },
  {
    id: 'thailand',
    name: {
      ET: 'Tai',
      RU: 'Таиланд',
      EN: 'Thailand',
    },
    subtitle: {
      ET: 'Džunglisaared, kohalik kultuur ja eraldatud rannad',
      RU: 'Островные святилища, древняя культура и уединенные пляжи',
      EN: 'Rainforest sanctuaries, secluded shores, and ancient rituals',
    },
    region: {
      ET: 'Kagu-Aasia',
      RU: 'Юго-Восточная Азия',
      EN: 'Southeast Asia',
    },
    description: {
      ET: 'Tais saab ühendada rannapuhkuse, saared ja kultuuri. Aitame valida piirkonna ja hooaja: Põhja-Tai, Phuket, Krabi või Samui.',
      RU: 'В Таиланде можно совместить пляжный отдых, острова и культуру. Поможем выбрать регион и сезон: север страны, Пхукет, Краби или Самуи.',
      EN: 'Thailand lets you combine beach holidays, islands and culture. We help you choose the region and season: the north, Phuket, Krabi or Samui.',
    },
    highlights: {
      ET: [
        'Phuketi, Krabi ja Samui saared',
        'Põhja-Tai templid ja mäestik',
        'Rannapuhkus koos kultuuriprogrammiga',
      ],
      RU: [
        'Острова Пхукет, Краби и Самуи',
        'Храмы и горы севера Таиланда',
        'Пляжный отдых с культурной программой',
      ],
      EN: [
        'Phuket, Krabi and Samui islands',
        'Temples and hills of northern Thailand',
        'Beach holidays combined with culture',
      ],
    },
    bestSeason: {
      ET: 'Detsember – Märts',
      RU: 'Декабрь – Март',
      EN: 'December – March',
    },
    travelStyle: {
      ET: 'Kultuuriline sügavus, heaolu ja troopiline loodus',
      RU: 'Глубокая культура, велнес и тропическая природа',
      EN: 'Cultural depth, tropical wellness, and serene hospitality',
    },
    // Lush tropical coastal bay
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
  },
  {
    id: 'srilanka',
    name: {
      ET: 'Sri Lanka',
      RU: 'Шри-Ланка',
      EN: 'Sri Lanka',
    },
    subtitle: {
      ET: 'Teeistanduste jahedad künkad ja lõunaranniku koloniaalstiil',
      RU: 'Чайные холмы, колониальный шарм Галле и дикий океан',
      EN: 'Highland tea country bungalows, leopard trails and Galle coast',
    },
    region: {
      ET: 'Lõuna-Aasia',
      RU: 'Южная Азия',
      EN: 'South Asia',
    },
    description: {
      ET: 'Sri Lankal saab ühendada rannapuhkuse, teemaastikud ja kultuuripärandi. Aitame valida marsruudi ja hooaja rannikule ja mägismaale.',
      RU: 'На Шри-Ланке можно совместить пляжный отдых, чайные холмы и культурное наследие. Поможем выбрать маршрут и сезон для побережья и гор.',
      EN: 'Sri Lanka lets you combine beaches, tea country and cultural heritage. We help you choose the route and season for the coast and the hills.',
    },
    highlights: {
      ET: [
        'Teeistandused ja mägironglõik',
        'Galle ajalooline kindlus',
        'Lõuna- ja läänekalda rannad',
      ],
      RU: [
        'Чайные плантации и горная железная дорога',
        'Исторический форт Галле',
        'Пляжи юга и запада острова',
      ],
      EN: [
        'Tea country and the highland railway',
        'The historic Galle Fort',
        'Beaches on the south and west coast',
      ],
    },
    bestSeason: {
      ET: 'Detsember – Aprill & Juuli – September',
      RU: 'Декабрь – Апрель и Июль – Сентябрь',
      EN: 'December – April & July – September',
    },
    travelStyle: {
      ET: 'Loodus, koloniaalne pärand ja autentne rahu',
      RU: 'Природа, колониальное наследие и покой',
      EN: 'Verdant landscapes, colonial heritage, and quiet shores',
    },
    // Lush green Ceylon tea hills / train passage
    imageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
  },
  {
    id: 'italy',
    name: {
      ET: 'Itaalia',
      RU: 'Италия',
      EN: 'Italy',
    },
    subtitle: {
      ET: 'Amalfi ranniku kaljud, Toscana künkad ja Dolomiitide vaikus',
      RU: 'Амальфитанские утесы, холмы Тосканы и величие Доломитов',
      EN: 'Amalfi cliffside hideaways, Tuscan estates and alpine serenity',
    },
    region: {
      ET: 'Lõuna- ja Kesk-Euroopa',
      RU: 'Южная и Центральная Европа',
      EN: 'Southern & Central Europe',
    },
    description: {
      ET: 'Itaalia sobib nii kultuuri- kui rannapuhkuseks: Amalfi rannik, Toscana, Como järv ja Dolomiidid. Aitame valida piirkonna, hooaja ja majutuse.',
      RU: 'Италия подходит и для культурных поездок, и для отдыха у моря: Амальфитанское побережье, Тоскана, озеро Комо и Доломиты. Поможем выбрать регион, сезон и проживание.',
      EN: 'Italy suits both cultural trips and seaside holidays: the Amalfi Coast, Tuscany, Lake Como and the Dolomites. We help you choose the region, season and accommodation.',
    },
    highlights: {
      ET: [
        'Amalfi rannik ja Capri saar',
        'Toscana künkad ja Chianti veinipiirkond',
        'Como järv ja Dolomiidid',
      ],
      RU: [
        'Амальфитанское побережье и остров Капри',
        'Холмы Тосканы и винный регион Кьянти',
        'Озеро Комо и Доломиты',
      ],
      EN: [
        'Amalfi Coast and the island of Capri',
        'Tuscan hills and the Chianti wine region',
        'Lake Como and the Dolomites',
      ],
    },
    bestSeason: {
      ET: 'Mai – Juuni & September – Oktoober',
      RU: 'Май – Июнь и Сентябрь – Октябрь',
      EN: 'May – June & September – October',
    },
    travelStyle: {
      ET: 'Kultuur, maastikud ja esteetiline gastronoomia',
      RU: 'Культура, пейзажи и высокая гастрономия',
      EN: 'Culture, landscapes and leisurely gastronomy',
    },
    // High-resolution curated Amalfi coastal view
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: '01',
    title: {
      ET: 'Räägi meile oma soovidest',
      RU: 'Расскажите о ваших пожеланиях',
      EN: 'Tell us how you wish to travel',
    },
    description: {
      ET: 'Kõik algab rahulikust vestlusest. Räägime läbi Sinu reisieelistused, soovitava tempo, seltskonna ja eelarve.',
      RU: 'Все начинается с открытого спокойного разговора. Мы обсуждаем ваш стиль отдыха, ритм, компанию и бюджет.',
      EN: 'Everything begins with an unhurried conversation. We listen to your preferred rhythm, travel party, aesthetics, and expectations.',
    },
    detail: {
      ET: 'Ei mingeid standardseid ankeete. Keskendume sellele, mis teeb Sinu jaoks reisi nauditavaks.',
      RU: 'Никаких скучных шаблонов. Мы выясняем детали, которые определяют истинный комфорт именно для вас.',
      EN: 'No rigid questionnaires. We zero in on what transforms an ordinary trip into something genuinely personal.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    step: '02',
    title: {
      ET: 'Kureerime sobivad võimalused',
      RU: 'Мы формируем варианты маршрута',
      EN: 'We curate tailored options',
    },
    description: {
      ET: 'Töötame läbi lennuühendused, käsitsi valitud butiikhotellid ning unikaalsed kohalikud elamused, koostades esmase visiooni.',
      RU: 'Мы подбираем оптимальные стыковки, камерные отели с характером и редкие локальные впечатления в первом проекте поездки.',
      EN: 'We research thoughtful connections, handpick boutique properties with distinct character, and draft an initial bespoke route.',
    },
    detail: {
      ET: 'Võrdleme erinevaid lahendusi ja selgitame, mis neist Sinu reisiga kokku sobib.',
      RU: 'Сравниваем варианты и объясняем, что из них подходит вашей поездке.',
      EN: 'We compare options and explain which of them fit your journey.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    step: '03',
    title: {
      ET: 'Viimistleme reisi koos Sinuga',
      RU: 'Мы доводим детали до совершенства',
      EN: 'We refine the journey together',
    },
    description: {
      ET: 'Kohandame plaani seni, kuni iga päev, transfeer ja peatuspaik tunduvad täpselt õiged ja loomulikud.',
      RU: 'Мы корректируем маршрут до тех пор, пока каждый день, трансфер и отель не станут идеальными.',
      EN: 'We fine-tune the pacing, adjust stay lengths, and polish every transfer until the entire itinerary flows effortlessly.',
    },
    detail: {
      ET: 'Lisame soovi korral erisoovid: lauasalongid, privaatsõidud ja kohalikud giidid.',
      RU: 'По желанию добавляем бронирование знаковых ресторанов, частных гидов и морских прогулок.',
      EN: 'We incorporate private guides, sunset sailings, or dining reservations suited to your palate.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
  },
  {
    step: '04',
    title: {
      ET: 'Reisid kindla toega selja taga',
      RU: 'Вы путешествуете с надежной поддержкой',
      EN: 'You travel with dedicated care',
    },
    description: {
      ET: 'Saad selge reisidokumentatsiooni ning teadmise, et Sinu isiklik konsultant on vajadusel kättesaadav kogu reisi vältel.',
      RU: 'Вы получаете подробную программу и уверенность в том, что персональный консультант на связи на протяжении всего пути.',
      EN: 'You depart with a curated digital dossier and the reassurance that your personal advisor is a direct message away.',
    },
    detail: {
      ET: 'Reisitõrgete või plaanimuudatuste korral lahendame küsimused kiirelt ja professionaalselt.',
      RU: 'При любых непредвиденных изменениях в расписании мы берем решение вопросов на себя.',
      EN: 'Should flight schedules shift or plans evolve, we manage the logistics swiftly and discreetly behind the scenes.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=85',
  },
];
