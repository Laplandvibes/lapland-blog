// GENEROITU — älä muokkaa käsin. Lähde: scripts/routes.json (/post/-reitit), scripts/gen-page-meta.mjs (prebuild).
// Jutun <title> ja kuvaus kielittäin samasta kentästä kuin esirenderöidyssä HTML:ssä: fi/sv tulevat kannasta
// (sync-post-meta-langs.mjs), englanti ja muiden kielten listaotsikot on kirjoitettu routes.jsoniin.
// Puuttuva kieli = englanti, sama sääntö kuin esirenderöinnissä. Jutun h1 tulee yhä kannasta.
import type { Lang } from '../i18n/useLang';

export interface PostMeta {
  title: Partial<Record<Lang, string>>;
  description: Partial<Record<Lang, string>>;
}

export const POST_META: Record<string, PostMeta> = {
  "the-night-the-sky-broke-open-over-kemi": {
    "title": {
      "en": "Northern lights in Kemi: where to watch and what Kp means",
      "sv": "Norrsken i Kemi: var du tittar och vad Kp-talet betyder",
      "fi": "Revontulet Kemissä: missä katsoa ja mitä Kp-luku tarkoittaa",
      "de": "Nordlichter in Kemi: wo man schaut und was der Kp-Wert bedeutet (auf Englisch)",
      "es": "Auroras boreales en Kemi: dónde mirar y qué significa el Kp (en inglés)",
      "fr": "Aurores boréales à Kemi : où regarder et ce que signifie le Kp (en anglais)",
      "it": "Aurora boreale a Kemi: dove guardare e cosa significa il Kp (in inglese)",
      "nl": "Noorderlicht in Kemi: waar je kijkt en wat Kp betekent (Engels)",
      "ja": "ケミのオーロラ：観測場所と、Kp指数の意味（英語）",
      "ko": "케미의 오로라: 어디서 보고 Kp 지수는 무슨 뜻인지 (영문)",
      "pt-BR": "Aurora boreal em Kemi: onde observar e o que significa o Kp (em inglês)",
      "zh-CN": "凯米看极光：在哪里看，Kp 指数是什么意思（英文）"
    },
    "description": {
      "en": "Kemi lies south of the Arctic Circle, so the aurora needs a stronger night there than in Inari. How to read the forecast, choose a spot and survive the cold.",
      "sv": "Kemi ligger söder om polcirkeln, så norrskenet kräver en starkare natt där än i Enare. Så läser du prognosen, väljer plats och klarar kylan.",
      "fi": "Kemi on napapiirin eteläpuolella, joten revontulet vaativat siellä vahvemman yön kuin Inarissa. Näin luet ennustetta, valitset paikan ja kestät pakkasen."
    }
  },
  "why-i-stopped-chasing-the-aurora-with-an-app": {
    "title": {
      "en": "Your aurora app can't see clouds: how to read the forecast",
      "sv": "Norrskensappen ser inga moln: så läser du prognosen rätt",
      "fi": "Revontulisovellus ei näe pilviä: näin luet ennustetta oikein",
      "de": "Die Aurora-App sieht keine Wolken: so liest man die Vorhersage (auf Englisch)",
      "es": "Tu app de auroras no ve las nubes: cómo leer el pronóstico (en inglés)",
      "fr": "Votre appli aurores ne voit pas les nuages : lire la prévision (en anglais)",
      "it": "L’app per l’aurora non vede le nuvole: come leggere la previsione (in inglese)",
      "nl": "Je noorderlicht-app ziet geen wolken: zo lees je de verwachting (Engels)",
      "ja": "オーロラアプリは雲を見ない：予報の正しい読み方（英語）",
      "ko": "오로라 앱은 구름을 못 본다: 예보 제대로 읽는 법 (영문)",
      "pt-BR": "Seu app de aurora não vê nuvens: como ler a previsão (em inglês)",
      "zh-CN": "极光 App 看不见云：怎样正确读预报（英文）"
    },
    "description": {
      "en": "An aurora app alerts you about the Kp number, but clouds and town lights decide whether you see anything. Use the forecast once a day, then go outside.",
      "sv": "En norrskensapp larmar om Kp-talet, men moln och stadens ljus avgör om du ser något. Använd prognosen en gång om dagen och gå sedan ut.",
      "fi": "Revontulisovellus hälyttää Kp-luvusta, mutta pilvet ja kaupungin valot ratkaisevat, näetkö mitään. Näin käytät ennustetta kerran päivässä ja menet sitten ulos."
    }
  },
  "five-nights-in-a-forest-cabin": {
    "title": {
      "en": "Winter cabin week: what to pack for a Lapland forest cabin",
      "sv": "Vinterstugvecka: vad du packar för en skogsstuga i Lappland",
      "fi": "Mökkiviikko talvella: mitä pakata Lapin metsämökkiin",
      "de": "Winterwoche in der Hütte: Packliste für eine Waldhütte in Lappland (auf Englisch)",
      "es": "Semana de invierno en cabaña: qué llevar a una cabaña del bosque en Laponia (en inglés)",
      "fr": "Semaine d’hiver en chalet : quoi emporter dans un chalet forestier en Laponie (en anglais)",
      "it": "Chalet nel bosco in Lapponia d’inverno: cosa mettere in valigia (in inglese)",
      "nl": "Winterweek in een boshut: wat je meeneemt naar een hut in Lapland (Engels)",
      "ja": "冬の森のコテージ一週間：ラップランドへの持ち物リスト（英語）",
      "ko": "겨울 숲속 통나무집 일주일: 라플란드 오두막 준비물 (영문)",
      "pt-BR": "Semana de inverno na cabana: o que levar para uma cabana na floresta da Lapônia (em inglês)",
      "zh-CN": "冬季林中小屋一周：去拉普兰森林小屋该带什么（英文）"
    },
    "description": {
      "en": "Wood stove, a well and no signal: a week in a winter cabin near Kemijärvi works when the bag holds the right things. What you need, and what you'll forget.",
      "sv": "Vedspis, brunn och ingen täckning: en vecka i en vinterstuga nära Kemijärvi fungerar när väskan innehåller rätt saker. Vad du behöver och vad du glömmer.",
      "fi": "Puuhella, kaivo ja ei kenttää: viikko talvimökissä Kemijärven takana onnistuu, kun kassissa on oikeat asiat. Lista siitä, mitä tarvitset ja mitä unohdat."
    }
  },
  "a-bowl-of-salmon-soup-that-cost-more-than-the-flight": {
    "title": {
      "en": "Salmon soup in Rovaniemi: where to get it and what it costs",
      "sv": "Laxsoppa i Rovaniemi: var du får den och vad den kostar",
      "fi": "Lohikeitto Rovaniemellä: missä sitä saa ja mitä se maksaa",
      "de": "Lachssuppe in Rovaniemi: wo es sie gibt und was sie kostet (auf Englisch)",
      "es": "Sopa de salmón en Rovaniemi: dónde tomarla y cuánto cuesta (en inglés)",
      "fr": "Soupe de saumon à Rovaniemi : où la trouver et combien elle coûte (en anglais)",
      "it": "Zuppa di salmone a Rovaniemi: dove trovarla e quanto costa (in inglese)",
      "nl": "Zalmsoep in Rovaniemi: waar je het krijgt en wat het kost (Engels)",
      "ja": "ロヴァニエミのサーモンスープ：どこで食べられて、いくらか（英語）",
      "ko": "로바니에미 연어 수프: 어디서 먹고 얼마인지 (영문)",
      "pt-BR": "Sopa de salmão em Rovaniemi: onde comer e quanto custa (em inglês)",
      "zh-CN": "罗瓦涅米的三文鱼汤：哪里能喝到、多少钱（英文）"
    },
    "description": {
      "en": "Three Rovaniemi restaurants serve salmon soup at 12–19 euros; several well-known places don't have it. Prices read from the menus on 14 September 2026.",
      "sv": "Tre restauranger i Rovaniemi serverar laxsoppa för 12–19 euro, och flera kända ställen har den inte alls. Priserna lästa på menyerna den 14 september 2026.",
      "fi": "Kolme Rovaniemen ravintolaa tarjoaa lohikeittoa 12–19 eurolla, ja moni tunnettu paikka ei tarjoa sitä lainkaan. Hinnat luettu ruokalistoilta 14.9.2026."
    }
  },
  "living-between-two-suns": {
    "title": {
      "en": "Polar night in Rovaniemi: what the dark is and what helps",
      "sv": "Polarnatt i Rovaniemi: vad mörkret är och vad som hjälper",
      "fi": "Kaamos Rovaniemellä: mitä pimeä oikeasti on ja mikä auttaa",
      "de": "Polarnacht in Rovaniemi: was die Dunkelheit ist und was hilft (auf Englisch)",
      "es": "Noche polar en Rovaniemi: qué es la oscuridad y qué ayuda (en inglés)",
      "fr": "Nuit polaire à Rovaniemi : ce qu’est l’obscurité et ce qui aide (en anglais)",
      "it": "Notte polare a Rovaniemi: cos’è il buio e cosa aiuta (in inglese)",
      "nl": "Poolnacht in Rovaniemi: wat het donker is en wat helpt (Engels)",
      "ja": "ロヴァニエミの極夜：暗さの正体と、乗り切るための習慣（英語）",
      "ko": "로바니에미의 극야: 어둠의 정체와 도움이 되는 것 (영문)",
      "pt-BR": "Noite polar em Rovaniemi: o que é a escuridão e o que ajuda (em inglês)",
      "zh-CN": "罗瓦涅米的极夜：黑暗究竟是什么，什么能帮上忙（英文）"
    },
    "description": {
      "en": "In Rovaniemi the polar night isn't total darkness but weeks of blue twilight. What it does to your body, and four habits that carry you to February.",
      "sv": "I Rovaniemi är polarnatten inte totalt mörker utan veckor av blå skymning. Vad den gör med kroppen, och fyra vanor som bär dig från november till februari.",
      "fi": "Rovaniemellä kaamos ei ole täyttä pimeää vaan viikkoja sinistä hämärää. Mitä se tekee keholle, ja neljä keinoa, jotka kantavat marraskuusta helmikuuhun."
    }
  },
  "the-sun-did-not-set-it-just-circled-the-house": {
    "title": {
      "en": "Sodankylä's midnight sun: when it shines and how to sleep",
      "fi": "Yötön yö Sodankylässä: kun aurinko ei laske ja miten nukut",
      "sv": "Midnattssol i Sodankylä: när den lyser och hur du sover",
      "de": "Mitternachtssonne in Sodankylä: wann sie scheint und wie man schläft (auf Englisch)",
      "es": "Sol de medianoche en Sodankylä: cuándo brilla y cómo dormir (en inglés)",
      "fr": "Soleil de minuit à Sodankylä : quand il brille et comment dormir (en anglais)",
      "it": "Sole di mezzanotte a Sodankylä: quando splende e come dormire (in inglese)",
      "nl": "Middernachtzon in Sodankylä: wanneer hij schijnt en hoe je slaapt (Engels)",
      "ja": "ソダンキュラの白夜：太陽が沈まない時期と、眠り方（英語）",
      "ko": "소단퀼래의 백야: 해가 지지 않는 시기와 잠드는 법 (영문)",
      "pt-BR": "Sol da meia-noite em Sodankylä: quando brilha e como dormir (em inglês)",
      "zh-CN": "索丹屈莱的午夜太阳：什么时候照耀，怎么睡觉（英文）"
    },
    "description": {
      "en": "In Sodankylä the sun stays above the horizon from late May to mid-July. Here's how the light behaves, when it's at its best, and how to actually sleep.",
      "fi": "Sodankylässä aurinko pysyy horisontin yllä toukokuun lopusta heinäkuun puoliväliin. Näin valo käyttäytyy, mihin aikaan se on kaunein ja miten saat nukuttua.",
      "sv": "I Sodankylä stannar solen ovanför horisonten från slutet av maj till mitten av juli. Så beter sig ljuset, när det är som vackrast och hur du faktiskt får sova."
    }
  },
  "twelve-kilometres-at-one-in-the-morning": {
    "title": {
      "en": "Night hiking at Kiilopää: in July you start at midnight",
      "sv": "Nattvandring på Kiilopää: i juli startar du vid midnatt",
      "fi": "Yövaellus Kiilopäällä: heinäkuussa lähdetään keskiyöllä",
      "de": "Nachtwanderung am Kiilopää: im Juli geht es um Mitternacht los (auf Englisch)",
      "es": "Senderismo nocturno en Kiilopää: en julio se sale a medianoche (en inglés)",
      "fr": "Randonnée nocturne à Kiilopää : en juillet, on part à minuit (en anglais)",
      "it": "Escursione notturna al Kiilopää: a luglio si parte a mezzanotte (in inglese)",
      "nl": "Nachtwandeling op Kiilopää: in juli vertrek je om middernacht (Engels)",
      "ja": "キーロパーの夜のハイキング：7月は真夜中に出発（英語）",
      "ko": "킬로파 야간 하이킹: 7월에는 자정에 출발한다 (영문)",
      "pt-BR": "Trilha noturna em Kiilopää: em julho a saída é à meia-noite (em inglês)",
      "zh-CN": "基洛帕夜间徒步：7月要在午夜出发（英文）"
    },
    "description": {
      "en": "In July the smartest time to hike the Kiilopää fells is at night: low golden light, cool air, and the mosquitoes stay in the birch. How a night hike works.",
      "sv": "I juli är det klokast att vandra på Kiilopääs fjäll om natten: lågt gyllene ljus, sval luft, och myggen stannar nere i björkskogen. Så gör du en nattvandring.",
      "fi": "Heinäkuussa Kiilopään tunturissa on viisainta vaeltaa yöllä: valo on matalaa ja kultaista, ilma viileää ja hyttyset jäävät koivikkoon. Näin yövaellus tehdään."
    }
  },
  "strawberry-hour-at-the-rovaniemi-market": {
    "title": {
      "en": "Rovaniemi market in summer: strawberries, potatoes, vendace",
      "fi": "Rovaniemen tori kesällä: mansikat, uudet perunat ja muikut",
      "sv": "Rovaniemi torg på sommaren: jordgubbar, potatis, siklöja",
      "de": "Rovaniemis Markt im Sommer: Erdbeeren, Kartoffeln, Maränen (auf Englisch)",
      "es": "El mercado de Rovaniemi en verano: fresas, patatas y corégono (en inglés)",
      "fr": "Le marché de Rovaniemi en été : fraises, pommes de terre, corégones (en anglais)",
      "it": "Il mercato di Rovaniemi d’estate: fragole, patate, coregoni (in inglese)",
      "nl": "De markt van Rovaniemi in de zomer: aardbeien, aardappels, kleine marene (Engels)",
      "ja": "夏のロヴァニエミ市場：いちご、新じゃが、ムイック（英語）",
      "ko": "여름 로바니에미 시장: 딸기, 감자, 무이쿠 (영문)",
      "pt-BR": "O mercado de Rovaniemi no verão: morangos, batatas e peixe muikku (em inglês)",
      "zh-CN": "夏天的罗瓦涅米集市：草莓、土豆和小白鲑（英文）"
    },
    "description": {
      "en": "Finnish strawberries reach the Rovaniemi market in early July. How the market works: when to go, what to buy, and how new potatoes and fried vendace are eaten.",
      "fi": "Suomalaiset mansikat tulevat Rovaniemen torille heinäkuun alussa. Näin tori toimii: milloin mennä, mitä ostaa ja miten uudet perunat ja muikut syödään.",
      "sv": "De finska jordgubbarna når Rovaniemi torg i början av juli. Så fungerar torget: när du ska gå, vad du ska köpa och hur färskpotatis och stekt siklöja äts."
    }
  },
  "the-sauna-thermometer-said-eighty-two": {
    "title": {
      "en": "Lapland lake sauna: two hours, four rounds, one damper",
      "fi": "Lapin rantasauna: näin puukiuas lämmitetään oikein",
      "sv": "Strandbastu i Lappland: så eldar du bastun rätt",
      "de": "Seesauna in Lappland: zwei Stunden, vier Saunagänge, eine Ofenklappe (auf Englisch)",
      "es": "Sauna de lago en Laponia: dos horas, cuatro rondas, una trampilla (en inglés)",
      "fr": "Sauna au bord du lac en Laponie : deux heures, quatre passages, une trappe (en anglais)",
      "it": "Sauna sul lago in Lapponia: due ore, quattro turni, una serranda (in inglese)",
      "nl": "Meersauna in Lapland: twee uur, vier rondes, één schuif (Engels)",
      "ja": "ラップランドの湖畔サウナ：二時間、四ラウンド、ダンパーひとつ（英語）",
      "ko": "라플란드 호숫가 사우나: 두 시간, 네 라운드, 댐퍼 하나 (영문)",
      "pt-BR": "Sauna à beira do lago na Lapônia: duas horas, quatro rodadas, um registro (em inglês)",
      "zh-CN": "拉普兰湖畔桑拿：两小时、四轮蒸汽、一个风门（英文）"
    },
    "description": {
      "en": "A wood-fired sauna takes two hours to heat: time enough for the firewood, the whisk and the jetty. How a cabin guest runs a Lapland lake sauna, step by step.",
      "fi": "Puukiuas lämpiää kahdessa tunnissa, ja siinä ajassa ehtii klapit, vastan ja laiturin. Näin mökkivieras lämmittää Lapin rantasaunan ensimmäistä kertaa.",
      "sv": "En vedeldad bastu tar två timmar att värma, och det är precis den tid som går åt till veden, kvasten och bryggan. Så eldar en stuggäst en lappländsk sjöbastu."
    }
  },
  "what-july-in-lapland-actually-asks-you-to-pack": {
    "title": {
      "en": "July packing list for Lapland: what you actually need",
      "sv": "Packlista för Lappland i juli: det du faktiskt behöver",
      "fi": "Heinäkuun pakkauslista Lappiin: mitä oikeasti tarvitset",
      "de": "Packliste für Lappland im Juli: was man wirklich braucht (auf Englisch)",
      "es": "Lista para Laponia en julio: lo que de verdad necesitas (en inglés)",
      "fr": "Liste pour la Laponie en juillet : ce qu’il faut vraiment emporter (en anglais)",
      "it": "Cosa mettere in valigia per la Lapponia a luglio: l’essenziale (in inglese)",
      "nl": "Paklijst voor Lapland in juli: wat je echt nodig hebt (Engels)",
      "ja": "7月のラップランド持ち物リスト：本当に必要なもの（英語）",
      "ko": "7월 라플란드 짐 목록: 정말 필요한 것만 (영문)",
      "pt-BR": "Lista para a Lapônia em julho: o que você realmente precisa (em inglês)",
      "zh-CN": "7月拉普兰行李清单：真正需要带的东西（英文）"
    },
    "description": {
      "en": "The same July day can be a heatwave in the afternoon and windy and cold on the fell at night. How to pack ten days into one bag without carrying dead weight.",
      "sv": "Samma julidag kan bjuda på värmebölja på eftermiddagen och blåst och kyla på fjället om natten. Så packar du tio dagar i en väska utan onödig vikt.",
      "fi": "Sama heinäkuun päivä voi olla iltapäivällä hellettä ja yöllä tunturissa tuulinen ja kylmä. Näin pakkaat kymmeneksi päiväksi yhteen kassiin ilman turhaa painoa."
    }
  },
  "wilderness-hut-firewood-ends-2026": {
    "title": {
      "en": "154 Lapland rest areas lose their firewood service",
      "fi": "154 taukopaikkaa jää ilman polttopuita ensi talvena",
      "sv": "154 rastplatser blir utan ved nästa vinter",
      "de": "154 Rastplätze in Lappland verlieren ihren Brennholzservice (auf Englisch)",
      "es": "154 áreas de descanso de Laponia se quedan sin servicio de leña (en inglés)",
      "fr": "154 aires de repos de Laponie perdent leur service de bois de chauffage (en anglais)",
      "it": "154 aree di sosta in Lapponia perdono il servizio legna (in inglese)",
      "nl": "154 rustplaatsen in Lapland verliezen hun brandhoutservice (Engels)",
      "ja": "ラップランドの休憩所154か所で薪の提供が終了（英語）",
      "ko": "라플란드 휴게소 154곳, 장작 서비스 중단 (영문)",
      "pt-BR": "154 áreas de descanso da Lapônia perdem o serviço de lenha (em inglês)",
      "zh-CN": "拉普兰 154 处休息点将停止供应柴火（英文）"
    },
    "description": {
      "en": "Metsähallitus is ending firewood and toilet servicing at 154 rest areas. What it means for hikers, which Lapland sites are listed, and why the saving misses.",
      "fi": "Metsähallitus lopettaa polttopuu- ja käymälähuollon 154 taukopaikalla. Mitä se merkitsee retkeilijälle ja mitkä Lapin kohteet ovat listalla.",
      "sv": "Forststyrelsen slutar med ved- och toalettservice på 154 rastplatser. Vad det betyder för vandraren och vilka platser i Lappland som finns på listan."
    }
  },
  "seven-and-a-half-minutes-a-day": {
    "title": {
      "en": "Seven and a half minutes a day: how fast Lapland loses its light",
      "fi": "Seitsemän ja puoli minuuttia päivässä",
      "sv": "Sju och en halv minut om dagen",
      "de": "Siebeneinhalb Minuten am Tag: wie schnell Lappland sein Licht verliert (auf Englisch)",
      "es": "Siete minutos y medio al día: lo rápido que Laponia pierde la luz (en inglés)",
      "fr": "Sept minutes et demie par jour : à quelle vitesse la Laponie perd sa lumière (en anglais)",
      "it": "Sette minuti e mezzo al giorno: quanto in fretta la Lapponia perde la luce (in inglese)",
      "nl": "Zeven en een halve minuut per dag: hoe snel Lapland zijn licht verliest (Engels)",
      "ja": "一日に七分半ずつ：ラップランドの光はどれほど速く失われるか（英語）",
      "ko": "하루에 7분 30초씩: 라플란드의 빛은 얼마나 빨리 사라지나 (영문)",
      "pt-BR": "Sete minutos e meio por dia: a velocidade com que a Lapônia perde a luz (em inglês)",
      "zh-CN": "每天七分半钟：拉普兰的光消失得有多快（英文）"
    },
    "description": {
      "en": "Nobody announces the end of the summer light. In late August Rovaniemi loses about seven and a half minutes of daylight a day, and Utsjoki loses nine.",
      "fi": "Kesän valon loppua ei kukaan ilmoita. Se vain vähenee, Rovaniemellä seitsemän ja puoli minuuttia päivässä ja Utsjoella yhdeksän, kunnes eräänä elokuun lopun iltana et enää näe polkua puuvajalle.",
      "sv": "Ingen meddelar när sommarljuset tar slut. Det bara försvinner, sju och en halv minut om dagen i Rovaniemi och nio i Utsjoki, tills du en kväll i slutet av augusti inte längre ser stigen till vedboden."
    }
  }
};
