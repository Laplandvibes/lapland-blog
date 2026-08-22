import { Send, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { trackNewsletterSignup } from '../lib/analytics';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import FounderByline from '../shared/FounderByline';

/**
 * [LV-FUNNEL 2026-08-21] Lomakesuppilon eventit Umamiin — paikallinen apuri,
 * ei jaettua importtia (vendoroitu sync on refresh-only). Ei saa koskaan
 * rikkoa lomaketta. Standardi: memory _procedural/lv_form_funnel_events.md.
 */
function track(event: string, data?: Record<string, unknown>) {
  try {
    (window as unknown as { umami?: { track: (e: string, d?: unknown) => void } }).umami?.track(event, data);
  } catch { /* ignore */ }
}

// 🔴 Env-only reads here compile to undefined in every clean-clone build
// (.env is gitignored, CI never has it) and this fetch would post to
// "undefined/functions/v1/...". Values + fallbacks: ../lib/supabaseConfig.
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabaseConfig';

const SOURCE = 'laplandblog-website';

// Marketing consent + 18+ confirmation, one entry per Lang from useLang().
// Kept local to this component on purpose: the shared SectionCopy type and the
// 12 copy.*.ts locale files are out of scope for this change.
const CONSENT_COPY: Record<Lang, { consent: string; privacy: string }> = {
  en: {
    consent:
      'Yes, send the LaplandVibes newsletter (travel tips, seasonal updates and offers) to this email address. I confirm I am 18 or over.',
    privacy: 'Privacy Policy',
  },
  fi: {
    consent:
      'LaplandVibes saa lähettää minulle uutiskirjettä (matkailuvinkkejä, sesonkitietoa ja tarjouksia) antamaani sähköpostiosoitteeseen. Olen täyttänyt 18 vuotta.',
    privacy: 'Tietosuojaseloste',
  },
  de: {
    consent:
      'Ja, LaplandVibes darf mir den Newsletter mit Reisetipps, Saisoninfos und Angeboten an diese E-Mail-Adresse senden. Ich bin mindestens 18 Jahre alt.',
    privacy: 'Datenschutzerklärung',
  },
  ja: {
    consent:
      '入力したメールアドレス宛に、LaplandVibesがニュースレター（旅のヒント、シーズン情報、キャンペーン情報）を送ることに同意します。私は18歳以上です。',
    privacy: 'プライバシーポリシー',
  },
  es: {
    consent:
      'Acepto recibir en mi correo el boletín de LaplandVibes (consejos de viaje, información de temporada y ofertas) y confirmo que tengo al menos 18 años.',
    privacy: 'Política de privacidad',
  },
  'pt-BR': {
    consent:
      'Aceito receber a newsletter da LaplandVibes no e-mail informado, com dicas de viagem, informações de temporada e ofertas. Tenho 18 anos ou mais.',
    privacy: 'Política de Privacidade',
  },
  'zh-CN': {
    consent:
      '我同意 LaplandVibes 向我填写的邮箱发送订阅邮件，内容包括拉普兰旅行建议、季节资讯和优惠信息，并确认本人已年满18周岁。',
    privacy: '隐私政策',
  },
  ko: {
    consent:
      '입력한 이메일 주소로 LaplandVibes가 보내는 여행 팁·시즌 정보·프로모션 소식 뉴스레터 수신에 동의하며, 만 18세 이상임을 확인합니다.',
    privacy: '개인정보처리방침',
  },
  fr: {
    consent:
      "J'accepte de recevoir la newsletter LaplandVibes (conseils voyage, infos saisonnières, offres) à cette adresse e-mail et je confirme avoir 18 ans ou plus.",
    privacy: 'Politique de confidentialité',
  },
  it: {
    consent:
      "Sì, desidero ricevere la newsletter di LaplandVibes (consigli di viaggio, novità stagionali e offerte) all'indirizzo indicato. Ho almeno 18 anni.",
    privacy: 'Informativa sulla privacy',
  },
  nl: {
    consent:
      'Ja, LaplandVibes mag de nieuwsbrief met reistips, seizoensinfo en aanbiedingen naar dit e-mailadres sturen. Ik ben 18 jaar of ouder.',
    privacy: 'Privacyverklaring',
  },
  sv: {
    consent:
      'Ja, jag vill ha nyhetsbrevet från LaplandVibes med restips, säsongsinfo och erbjudanden till min e-postadress. Jag är minst 18 år.',
    privacy: 'Integritetspolicy',
  },
};

/**
 * Newsletter signup — wires into the shared LaplandVibes Supabase edge function.
 * Every ecosystem site posts to the same endpoint with its own `source` tag.
 * See reference_laplandvibes_newsletter.md for the contract.
 */
export default function Newsletter() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].newsletter;
  const cc = CONSENT_COPY[lang];
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'already' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // [LV-FUNNEL] view = osio vieritetty näkyviin (kerran), start = 1. fokus.
  // Lomake on noValidate, joten natiivia invalid-eventtiä ei tule — blocked
  // syntyy vain handleSubmitin guardista.
  const funnelData = { surface: 'inline', lang };
  const sectionRef = useRef<HTMLElement | null>(null);
  const startTracked = useRef(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        track('nl_view', funnelData);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const trackStart = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    track('nl_start', funnelData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consented) {
      track('nl_blocked', { ...funnelData, reason: !email ? 'email' : 'consent' });
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    track('nl_submit', funnelData);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          email,
          source: SOURCE,
          consent: true,
          ageConfirmed: true,
          consentText: cc.consent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.alreadySubscribed) {
        setStatus('already');
        track('nl_success', { ...funnelData, already: true });
      } else {
        setStatus('success');
        track('nl_success', funnelData);
        trackNewsletterSignup(SOURCE);
      }
      setEmail('');
    } catch (err) {
      console.error('Newsletter signup error:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to subscribe. Please try again.'
      );
      track('nl_error', funnelData);
    }
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden border-y border-pink/15"
      aria-labelledby="newsletter-heading"
    >
      {/* Dark base + ambient glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/30 to-night" />
      <div className="absolute top-0 left-1/4 w-[520px] h-[520px] rounded-full bg-pink/10 blur-[160px] pointer-events-none animate-hero-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-aurora-blue/8 blur-[140px] pointer-events-none animate-soft-float" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-night/70 backdrop-blur-sm border border-pink/40">
          <Sparkles size={12} className="text-pink" />
          <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
            {c.eyebrow}
          </p>
        </div>

        <h2
          id="newsletter-heading"
          className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight mb-5"
        >
          {c.h2}
        </h2>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          {c.lead}
        </p>

        {status === 'success' ? (
          <div className="bg-night-light/70 backdrop-blur-sm rounded-2xl p-8 border border-pink/40">
            <CheckCircle className="w-12 h-12 text-aurora-green mx-auto mb-3" />
            <p className="text-snow text-xl font-semibold font-display">
              {c.successTitle}
            </p>
            <p className="text-slate-300 mt-2 text-sm">
              {c.successBody}
            </p>
          </div>
        ) : status === 'already' ? (
          <div className="bg-night-light/70 backdrop-blur-sm rounded-2xl p-8 border border-aurora-blue/40">
            <CheckCircle className="w-12 h-12 text-aurora-blue mx-auto mb-3" />
            <p className="text-snow text-xl font-semibold font-display">
              {c.alreadyTitle}
            </p>
            <p className="text-slate-300 mt-2 text-sm">
              {c.alreadyBody}
            </p>
          </div>
        ) : (
          <>
            <><FounderByline tone="pink" />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 max-w-lg mx-auto"
              noValidate
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  {c.placeholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onFocus={trackStart}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.placeholder}
                  required
                  autoComplete="email"
                  disabled={status === 'loading'}
                  className="flex-1 px-5 py-4 rounded-full bg-night-light/60 backdrop-blur-sm text-snow placeholder:text-slate-500 border border-purple/30 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink/60 disabled:opacity-50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-7 py-4 rounded-full bg-pink text-white font-semibold hover:bg-pink-dark transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(236,72,153,0.35)]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {c.subscribing}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {c.subscribe}
                    </>
                  )}
                </button>
              </div>

              <label
                htmlFor="newsletter-consent"
                className="flex items-start gap-2.5 text-left text-slate-400 text-xs leading-relaxed px-1 cursor-pointer"
              >
                <input
                  id="newsletter-consent"
                  type="checkbox"
                  checked={consented}
                  onChange={(e) => setConsented(e.target.checked)}
                  required
                  disabled={status === 'loading'}
                  className="mt-0.5 shrink-0 w-4 h-4 rounded accent-pink border border-purple/30 bg-night-light/60 focus:outline-none focus:ring-2 focus:ring-pink/50 disabled:opacity-50 cursor-pointer"
                />
                <span>
                  {cc.consent}{' '}
                  <a
                    href={to('/privacy')}
                    target="_blank"
                    rel="noopener"
                    className="text-slate-300 hover:text-pink underline"
                  >
                    {cc.privacy}
                  </a>
                </span>
              </label>
            </form></>

            {status === 'error' && (
              <div
                className="mt-4 flex items-center justify-center gap-2 text-pink"
                role="alert"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}

            <p className="text-slate-500 text-xs mt-6">
              {c.agreeText}{' '}
              <a href={to('/privacy')} className="text-slate-300 hover:text-pink underline">
                {c.privacyLink}
              </a>
              . {c.unsubscribeNote}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
