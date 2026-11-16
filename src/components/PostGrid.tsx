import Reveal from './Reveal';
import PostCard from './PostCard';
import type { Post } from '../data/posts';

/**
 * Juttukorttien ruudukko, johon ei jää orpoa korttia eikä tyhjää ruutua millään leveydellä.
 *
 * Vesa 16.11.2026: "miten on niin paljon tyhjää valkoista grideissä?" Mitattu samana iltana: Rovaniemen
 * sivulla neljä juttua kolmella palstalla = yksi kortti yksin rivillä ja kaksi tyhjää ruutua sen vieressä;
 * Saariselän ja Kemin sivulla yksi kortti ja kaksi tyhjää. Sama syntyy Kaikki jutut -sivulla aina, kun
 * suodatin jättää näkyviin määrän, joka ei mene palstoilla tasan.
 *
 * Ruudukossa on kuusi uraa, joten rivi jaetaan kahteen (3 + 3) tai kolmeen (2 + 2 + 2) korttiin tai yksi
 * kortti vie koko rivin (6):
 *   - 768–1023 px, kaksi palstaa: pariton määrä ⇒ ENSIMMÄINEN kortti on koko rivin levyinen.
 *   - 1024 px ja yli, kolme palstaa: jakojäännös 1 ⇒ ensimmäinen kortti koko rivin levyinen,
 *     jakojäännös 2 ⇒ kaksi ensimmäistä korttia puolikkaan rivin levyisiä.
 * Koko rivin levyinen kortti on vaakamallinen (kuva vasemmalla, teksti oikealla), ks. PostCardin `wide`.
 * Ensimmäinen kortti on uusin juttu, joten iso kortti on myös sisällöllisesti oikea nosto.
 */
export default function PostGrid({ posts }: { posts: Post[] }) {
  const n = posts.length;
  const pariton = n % 2 === 1;
  const jaannos = n % 3;
  return (
    <div className="grid gap-6 md:grid-cols-6">
      {posts.map((post, i) => {
        const tablettiKoko = i === 0 && pariton;
        const tietokoneKoko = i === 0 && jaannos === 1;
        const tietokonePuolikas = i < 2 && jaannos === 2;
        const ura = [
          tablettiKoko ? 'md:col-span-6' : 'md:col-span-3',
          tietokoneKoko ? 'lg:col-span-6' : tietokonePuolikas ? 'lg:col-span-3' : 'lg:col-span-2',
        ].join(' ');
        const wide = tablettiKoko && tietokoneKoko ? 'always' : tablettiKoko ? 'tablet' : tietokoneKoko ? 'desktop' : undefined;
        return (
          <Reveal key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3} className={ura}>
            <PostCard post={post} wide={wide} />
          </Reveal>
        );
      })}
    </div>
  );
}
