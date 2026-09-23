import type { NewsletterPopupCopy } from '../shared/NewsletterPopup';

/**
 * lapland.blog: uutiskirjepopupin oma teksti.
 *
 * Vesa 23.9.2026: "tekstit ja värimaailma sivustokohtaisiksi" → "kyllä, vie
 * kaikille". Kuva, lomake, nappi ja #LAPLAND-merkki pysyvät verkoston yhteisinä.
 * Teksti = sivun oma aihe lukijan näkökulmasta, 12 kielellä natiivina.
 * 🔴 Ei hälytyksiä, ei lähetystahtia, ei "ensimmäisenä" (9.8.2026 lupauspurku):
 * uutiskirje lähtee vain kun on kerrottavaa. Otsikko tulee jaetusta komponentista.
 */
export const POPUP_COPY: NewsletterPopupCopy = {
  en: {
    description: 'Founder of LaplandVibes. Here you\'ll find stories about Lapland\'s villages, fells and seasons. In the newsletter I share what I came across on my trips and where to begin your own.',
  },
  fi: {
    description: 'LaplandVibesin perustaja. Täällä luet juttuja Lapin kylistä, tuntureista ja vuodenajoista. Uutiskirjeessä kerron, mitä reissuilla tuli vastaan ja mistä oma matka kannattaa aloittaa.',
  },
  de: {
    description: 'Gründer von LaplandVibes. Hier lesen Sie Geschichten über Lapplands Dörfer, Fjälls und Jahreszeiten. Im Newsletter erzähle ich Ihnen, was mir unterwegs begegnet ist und wo Ihre eigene Reise am besten beginnt.',
  },
  ja: {
    description: 'LaplandVibes創業者。ここでは、ラップランドの村やフェル、季節をめぐる記事が読めます。ニュースレターでは、私が旅先で出会ったことと、ご自身の旅をどこから始めるとよいかをお伝えします。',
  },
  es: {
    description: 'Fundador de LaplandVibes. Aquí encontrará historias sobre los pueblos, las montañas árticas y las estaciones del año en Laponia. En el boletín le cuento lo que me encontré en mis viajes y por dónde empezar el suyo.',
  },
  'pt-BR': {
    description: 'Fundador do LaplandVibes. Aqui você lê histórias dos vilarejos, dos montes e das estações da Lapônia. Na newsletter, conto o que encontrei nas minhas viagens e por onde vale a pena começar a sua.',
  },
  'zh-CN': {
    description: 'LaplandVibes创始人。这里有拉普兰村庄、山地与季节的故事。在订阅邮件里，我会分享旅途中的见闻，也会聊聊你自己的旅程该从哪里起步。',
  },
  ko: {
    description: 'LaplandVibes 창립자. 여기서는 라플란드의 마을과 펠, 계절 이야기를 읽을 수 있습니다. 뉴스레터에서는 여행길에서 만난 것들을 들려드리고, 여러분의 여행은 어디서 시작하면 좋을지 알려드립니다.',
  },
  fr: {
    description: 'Fondateur de LaplandVibes. Ici, vous trouverez des récits sur les villages, les fjälls et les saisons de Laponie. Dans la newsletter, je vous raconte ce que j\'ai croisé au fil de mes voyages et vous dis par où commencer le vôtre.',
  },
  it: {
    description: 'Fondatore di LaplandVibes. Qui trova storie sui villaggi, sui fjäll e sulle stagioni della Lapponia. Nella newsletter Le racconto cosa ho incontrato nei miei viaggi e da dove conviene cominciare il Suo.',
  },
  nl: {
    description: 'Oprichter van LaplandVibes. Hier leest u verhalen over de dorpen, de fjälls en de seizoenen van Lapland. In de nieuwsbrief vertel ik wat ik onderweg tegenkwam en waar u met uw eigen reis begint.',
  },
  sv: {
    description: 'Grundare av LaplandVibes. Här läser du berättelser om Lapplands byar, fjäll och årstider. I nyhetsbrevet skriver jag om det jag stött på under mina resor och om var du ska börja din egen.',
  },
};
