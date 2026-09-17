import { Destination, HowItWorksStep, TravelerStory } from '../types';

export const destinations: Destination[] = [
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
      ET: 'Rätsepatööna koostatud Itaalia teekonnad ühendavad privaatsed villad, oliivisalud ja ajaloolised paleed. Alates Amalfi ranniku panoraamvaadetest kuni Chianti veinimõisate ja Como järve rahuliku aristokraatiani.',
      RU: 'Авторские маршруты по Италии объединяют приватные виллы, старинные оливковые рощи и палаццо с вековой историей: от захватывающих видов Амальфи до поместий Кьянти и безмятежности озера Комо.',
      EN: 'Bespoke Italian journeys harmonizing historic villas, coastal cliffside retreats, and private vineyard estates — from the dramatic curves of Amalfi to quiet Tuscan mornings and Lake Como elegance.',
    },
    highlights: {
      ET: [
        'Privaatne puupaat Positano ja Capri lahtedes',
        'Väikesed butiikhotellid ja ajaloolised masseriad',
        'Eksklusiivsed kohalikud toiduelamused ja veiniaiad',
      ],
      RU: [
        'Индивидуальные морские прогулки вокруг Капри',
        'Камерные бутик-отели и старинные массерии',
        'Аутентичные гастрономические впечатления и винодельни',
      ],
      EN: [
        'Private wooden gozzo cruising Capri and Positano coves',
        'Intimate boutique properties and restored masserias',
        'Handpicked cellar tastings and secluded culinary tables',
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
      ET: 'Valime just Sulle sobiva saare: olgu sooviks täielik eraldatus UNESCO biosfäärikaitsealal, tipptasemel spaa või erakordne riffide elurikkus vahetult villa trepi all.',
      RU: 'Мы подбираем именно тот курорт, который соответствует вашей мечте: от полного уединения в биосферном заповеднике ЮНЕСКО до гастрономических резиденций и богатейших коралловых рифов.',
      EN: 'We carefully match you with an island tailored to your desire: whether absolute barefoot solitude within a UNESCO biosphere reserve, transformative wellness, or teeming marine house reefs.',
    },
    highlights: {
      ET: [
        'Hoolikalt valitud butiiksaared ilma massiturismita',
        'Vesilennuki transfeerid ja privaatne vastuvõtt Malés',
        'Päikeseloojangu sukeldumine ja delfiinivaatlused',
      ],
      RU: [
        'Тщательно отобранные острова без массового потока',
        'Трансфер на гидросамолете и VIP-встреча в Мале',
        'Дайвинг на закате и наблюдение за мантами',
      ],
      EN: [
        'Curated boutique islands free from mass-market crowds',
        'Scenic seaplane flights and seamless CIP arrival in Malé',
        'Sunset marine excursions and manta ray encounters',
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
      ET: 'Kreeka olemus avaneb eemal tavapärastest rahvamassidest: vaoshoitud kiviarhitektuur Milosel või Tinosel, privaatsed purjeretked ning aeglased lõunasöögid oliivipuude varjus.',
      RU: 'Истинный характер Греции раскрывается вдали от толп: лаконичная белая архитектура Милоса и Тиноса, частные морские переходы и неспешные обеды в тени вековых олив.',
      EN: 'The true soul of Greece reveals itself beyond predictable routes: sculptural Cycladic architecture on quiet islands, private sailing among uninhabited islets, and long seaside lunches beneath old olive groves.',
    },
    highlights: {
      ET: [
        'Vaiksemad Küklaadide ja Dodekaneeside pärlid',
        'Disainhotellid, mis sulanduvad maastikku',
        'Kohalikud kalurikülad ja puutumata rannad',
      ],
      RU: [
        'Камерные острова Киклад и Додеканеса',
        'Дизайн-отели, растворенные в прибрежном ландшафте',
        'Аутентичные рыбацкие таверны и уединенные бухты',
      ],
      EN: [
        'Atmospheric Cycladic hideaways beyond tourist corridors',
        'Design sanctuaries sculpted into the rugged landscape',
        'Private rib-boat excursions to secluded coastal inlets',
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
      ET: 'Mõtestatud teekonnad põhjapoolsetest mägirahvaste traditsioonidest ja templiarhitektuurist kuni Lõuna-Tai eraldatud saarteni, kus aeg liigub omasoodu.',
      RU: 'Вдумчивые путешествия от северных чайных террас Чиангмая и древних святилищ до скрытых островов Андаманского моря с безупречным сервисом.',
      EN: 'Contemplative journeys from the misty tea hills and temple heritage of the North to secluded Andaman bays framed by limestone karsts and private beachfront pavilions.',
    },
    highlights: {
      ET: [
        'Eraldatud butiikvillad Phang Nga ja Samui lahtedes',
        'Eraviisilised templivisiidid munkade õnnistusega',
        'Kureeritud heaoluteekonnad ja spaa-rituaalid',
      ],
      RU: [
        'Приватные виллы в заливе Пхангнга и на Самуи',
        'Индивидуальные визиты в храмы с местными проводниками',
        'Велнес-программы и древние спа-ритуалы',
      ],
      EN: [
        'Tucked-away villas overlooking dramatic karst formations',
        'Private temple access and respectful cultural encounters',
        'Restorative traditional wellness and healing culinary arts',
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
    id: 'turkey',
    name: {
      ET: 'Türgi',
      RU: 'Турция',
      EN: 'Turkey',
    },
    subtitle: {
      ET: 'Kapadookia koopakompleksid ja Egeuse ranniku salapaigad',
      RU: 'Пещерные сьюты Каппадокии и тайные бухты Эгейского моря',
      EN: 'Cappadocian stone retreats and private Aegean gulet waters',
    },
    region: {
      ET: 'Väike-Aasia & Vahemeri',
      RU: 'Малая Азия и Средиземноморье',
      EN: 'Asia Minor & Aegean',
    },
    description: {
      ET: 'Kaugele üle tüüpiliste kuurortide: päikesetõusu õhupallilennud vulkaaniliste kaljude kohal, ajaloolised kivisviidid ning privaatne puitgulet Egeuse türkiissinistel vetel.',
      RU: 'Далеко за рамками стандартных курортов: рассветные полеты на воздушных шарах над причудливыми долинами, исторические сьюты в скалах и плавание на традиционной деревянной гулете.',
      EN: 'Transcending conventional resort tourism: sunrise balloon ascents over volcanic fairy chimneys, restored Byzantine cave residences, and private wooden gulet charters along the turquoise Aegean coast.',
    },
    highlights: {
      ET: [
        'Luksuslikud koobashotellid Uçhisari kõrgendikul',
        'Privaatne puust gulett-purjetamine Bodrumi rannikul',
        'Istanbuli ajaloolised paleed ja kureeritud kunstikogud',
      ],
      RU: [
        'Исторические отели в скалах с панорамными террасами',
        'Индивидуальный круиз на деревянной гулете из Бодрума',
        'Османские дворцы и галереи современного Стамбула',
      ],
      EN: [
        'Architectural cave suites with uninterrupted valley horizons',
        'Private chartered wooden gulet sailing secluded bays',
        'Private Bosphorus passages and curated Istanbul heritage',
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
      ET: 'Aeglane reisimine selle parimal kujul: privaatne rongi- ja autoteekond läbi uduste teeistanduste, sajandivanused istanduse residentsid ning Galle ajalooline kindluslinn ookeani veerel.',
      RU: 'Медленное путешествие в чистом виде: поездка на панорамном поезде сквозь чайные склоны, исторические резиденции плантаторов и колониальный форт Галле у океана.',
      EN: 'Slow travel in its purest expression: scenic mountain train lines winding through emerald tea hills, restored colonial planters’ bungalows, and warm evenings within the ramparts of Galle Fort.',
    },
    highlights: {
      ET: [
        'Ajaloolised Tea Trails bangalod mäestikus',
        'Privaatne leopardisafari Yala vähemkülastatud aladel',
        'Rannavillad Bentota ja Tangalle vaiksetes lahtedes',
      ],
      RU: [
        'Колониальные чайные резиденции в горах',
        'Индивидуальное сафари на леопардов в парке Яла',
        'Приватные пляжные виллы в бухтах Тангалле',
      ],
      EN: [
        'Restored highland tea planter bungalows with private butlers',
        'Discreet leopard and wildlife tracking in Yala and Wilpattu',
        'Oceanfront architectural villas on the southern shores',
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

export const travelerStories: TravelerStory[] = [
  {
    quote: {
      ET: 'Esimest korda tundsime, et keegi ei ürita meile müüa valmistoodet, vaid mõtles päriselt kaasa, kuidas meie pere armastab puhata. Amalfi ranniku villa oli täpselt see, millest unistasime.',
      RU: 'Впервые мы почувствовали, что нам не навязывают готовый тур, а искренне вникают в то, как именно любит отдыхать наша семья. Вилла на Амальфи была безупречной.',
      EN: 'For the first time we felt that no one was trying to push a pre-packaged tour; they genuinely listened to how our family prefers to move and unwind. The cliffside retreat was unforgettable.',
    },
    author: 'Kristjan & Laura',
    location: {
      ET: 'Tallinn',
      RU: 'Таллинн',
      EN: 'Tallinn',
    },
    journey: {
      ET: 'Itaalia · Amalfi rannik & Capri',
      RU: 'Италия · Амальфи и Капри',
      EN: 'Italy · Amalfi Coast & Capri',
    },
  },
  {
    quote: {
      ET: 'Maldiivide saare valik osutus täielikuks kümnesse tabamuseks. Saare rahu, toidu tase ja mereelustik ületasid kõik ootused. Terve teekond oli viimse detailini läbi mõeldud.',
      RU: 'Выбор курорта на Мальдивах оказался стопроцентным попаданием. Уединение, гастрономия и подводный мир превзошли все ожидания. Все было организовано до мелочей.',
      EN: 'The island recommendation in the Maldives was spot-on. The calm atmosphere, dining quality, and reef life far exceeded our hopes. Everything was choreographed down to the finest detail.',
    },
    author: 'Elena & Andrei',
    location: {
      ET: 'Tallinn',
      RU: 'Таллинн',
      EN: 'Tallinn',
    },
    journey: {
      ET: 'Maldiivid · Baa atoll',
      RU: 'Мальдивы · Атолл Баа',
      EN: 'Maldives · Baa Atoll',
    },
  },
  {
    quote: {
      ET: 'Sri Lanka mägismaa rongisõit ja eraldatud teeistanduse bangalo jäävad meelde terveks eluks. Travel Atelier tegi kogu korralduse täiesti muretuks.',
      RU: 'Поездка на поезде по чайным холмам Шри-Ланки и колониальное бунгало останутся в памяти навсегда. Travel Atelier избавил нас от любых забот.',
      EN: 'The scenic mountain train through Sri Lanka’s highlands and our stay in a historic tea bungalow will stay with us for life. Travel Atelier made the entire journey effortless.',
    },
    author: 'Mait',
    location: {
      ET: 'Tartu',
      RU: 'Тарту',
      EN: 'Tartu',
    },
    journey: {
      ET: 'Sri Lanka · Kesk-kõrgustik & Galle',
      RU: 'Шри-Ланка · Чайные холмы и Галле',
      EN: 'Sri Lanka · Ceylon Highlands & Galle',
    },
  },
];
