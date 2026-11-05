import type { NewsletterPopupCopy } from '../shared/NewsletterPopup';

/**
 * lapland.blog: uutiskirjepopupin oma teksti.
 *
 * Vesa 23.9.2026: "tekstit ja värimaailma sivustokohtaisiksi" → "kyllä, vie
 * kaikille". Kuva, lomake, nappi ja #LAPLAND-merkki pysyvät verkoston yhteisinä.
 * Teksti = sivun oma aihe lukijan näkökulmasta, 12 kielellä natiivina.
 * 🔴 Ei hälytyksiä, ei lähetystahtia, ei "ensimmäisenä" (9.8.2026 lupauspurku):
 * uutiskirje lähtee vain kun on kerrottavaa. Otsikko mahtuu yhdelle riville
 * (latinalaiset enintään ~22 merkkiä, ja/zh/ko enintään ~10).
 */
export const POPUP_COPY: NewsletterPopupCopy = {
  en: {
    submit: 'Get the letters',
    headline: 'Letters from Lapland',
    description: 'I write to you when the autumn colours turn, the first snow falls or the aurora season opens, with what is worth booking in time.',
  },
  fi: {
    submit: 'Tilaa kirje',
    headline: 'Kirje Lapista',
    description: 'Kun ruska alkaa, ensilumi sataa tai revontulikausi aukeaa, kerron sen ja mitä kannattaa varata ajoissa.',
  },
  de: {
    submit: 'Abonnieren',
    headline: 'Brief aus Lappland',
    description: 'Wenn sich das Herbstlaub färbt, der erste Schnee fällt oder die Polarlichtsaison beginnt, schreibe ich Ihnen und sage, was Sie besser früh buchen.',
  },
  ja: {
    submit: '登録する',
    headline: 'ラップランド便り',
    description: '紅葉が色づくとき、初雪が降るとき、オーロラのシーズンが始まるときに、私からお知らせします。早めに予約しておくとよいこともお伝えします。',
  },
  es: {
    submit: 'Suscribirme',
    headline: 'Carta desde Laponia',
    description: 'Cuando el otoño se tiñe de colores, cae la primera nevada o empieza la temporada de auroras boreales, se lo cuento, y también qué conviene reservar con tiempo.',
  },
  'pt-BR': {
    submit: 'Quero receber',
    headline: 'Carta da Lapônia',
    description: 'Quando o outono ganha cor, cai a primeira neve ou começa a temporada de auroras boreais, eu conto para você, junto com o que vale reservar com antecedência.',
  },
  'zh-CN': {
    submit: '订阅',
    headline: '来自拉普兰的信',
    description: '当秋叶变色、初雪落下，或极光季拉开帷幕时，我会告诉你，也会说说哪些最好提前预订。',
  },
  ko: {
    submit: '구독하기',
    headline: '라플란드 편지',
    description: '단풍이 물들고, 첫눈이 내리고, 오로라 시즌이 시작될 때 그 소식을 전해 드립니다. 미리 예약해 두면 좋은 것도 함께 알려 드립니다.',
  },
  fr: {
    submit: 'Je m’abonne',
    headline: 'Lettre de Laponie',
    description: 'Quand les couleurs de l\'automne s\'installent, que la première neige tombe ou que la saison des aurores boréales s\'ouvre, je vous l\'écris, avec ce qu\'il vaut mieux réserver à temps.',
  },
  it: {
    submit: 'Mi iscrivo',
    headline: 'Dalla Lapponia',
    description: 'Quando l\'autunno si tinge di colori, cade la prima neve o si apre la stagione delle aurore boreali, Le scrivo, e Le dico anche cosa conviene prenotare per tempo.',
  },
  nl: {
    submit: 'Aanmelden',
    headline: 'Brief uit Lapland',
    description: 'Als de herfstkleuren verschijnen, de eerste sneeuw valt of het noorderlichtseizoen begint, laat ik het u weten, samen met wat u het best op tijd boekt.',
  },
  sv: {
    submit: 'Prenumerera',
    headline: 'Brev från Lappland',
    description: 'När höstfärgerna slår ut, första snön faller eller norrskenssäsongen börjar, berättar jag det för dig, och även vad som är bra att boka i god tid.',
  },
};
