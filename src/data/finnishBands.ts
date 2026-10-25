// /finnish-bands — "Did you know these are Finnish?" (Vesa 2026-10-25: one YouTube song per act).
//
// Language-neutral facts only; every sentence a reader sees lives in COPY[lang].finnishBands.
// Order is Vesa's approved list (25.10.2026), not a ranking by numbers.
//
// 🔴 Videos: one per act, uploaded by the act's own channel or its record label's channel
//    (checked 25.10.2026 from the watch page: ownerChannelName, playableInEmbed true, oEmbed 200).
//    The page loads nothing from Google before the reader presses play; then the iframe comes from
//    youtube-nocookie.com. The preview image is an own LaplandVibes photo, never a YouTube thumbnail
//    and never a band photo.
// 🔴 Numbers carry their reading date. YouTube views = this video, read 2026-10-25.
//    Spotify monthly listeners = kworb.net (exact) or the artist page (rounded), read 2026-10-22
//    (marketing-kit/10-social/posts/2026-10-bandit/DATA-suomalaiset-artistit-20261022.txt).
// 🔴 Photos: own frames from the October 2026 road trip, reserved with _kuvavaihto-20261004/claim.mjs.

export type BandId =
  | 'nightwish' | 'him' | 'darude' | 'rasmus' | 'lordi' | 'apocalyptica' | 'kaarija' | 'bomfunk'
  | 'bodom' | 'sunrise' | 'beastinblack' | 'stratovarius' | 'alma' | 'blindchannel' | 'sonata';

export interface Band {
  id: BandId;
  /** Name as the act writes it. Never translated. */
  name: string;
  song: string;
  songYear: number;
  videoId: string;
  /** Uploading channel and its URL, as YouTube shows them. */
  channel: string;
  channelUrl: string;
  /** 'band' = the act's own channel, 'label' = its record label's channel. */
  channelKind: 'band' | 'label';
  youtubeViews: number;
  spotifyListeners: number;
  /** Own photo under the play button: file stem in /images/finnish-bands/ and the master frame. */
  photo: string;
  photoMaster: string;
  /** Lapland connection: the act is from Lapland (link to the network's own page on the town). */
  lapland?: { town: 'rovaniemi' | 'kemi'; href: string };
  /** Sources for the facts in the copy, in reading order. */
  sources: { label: string; url: string }[];
}

export const YOUTUBE_READ = '2026-10-25';
export const SPOTIFY_READ = '2026-10-22';
export const HERO = { stem: 'hero-kevo-road-frost', master: '20261013_095733', day: '2026-10-13' };

/** Wikipedia (en) article; the label is the article's own title, so two sources never read the same. */
const wiki = (title: string) => ({
  label: `Wikipedia: ${decodeURIComponent(title).replace(/_/g, ' ')}`,
  url: `https://en.wikipedia.org/wiki/${title}`,
});

export const BANDS: Band[] = [
  {
    id: 'nightwish', name: 'Nightwish', song: 'Amaranth', songYear: 2007, videoId: 'GdZn7k5rZLQ',
    channel: 'Nuclear Blast Records', channelUrl: 'https://www.youtube.com/@NuclearBlastRecords', channelKind: 'label',
    youtubeViews: 130900856, spotifyListeners: 2972513,
    photo: 'nightwish-kaamanen-lake', photoMaster: '20261012_162740',
    sources: [wiki('Nightwish'), { label: 'floorjansen.com', url: 'https://www.floorjansen.com/news/nightwish-and-floor-jansen-part-ways' }],
  },
  {
    id: 'him', name: 'HIM', song: 'Join Me in Death', songYear: 1999, videoId: '1V4AscLidWg',
    channel: 'HIMVEVO', channelUrl: 'https://www.youtube.com/@HIMVEVO', channelKind: 'band',
    youtubeViews: 55494319, spotifyListeners: 5301481,
    photo: 'him-inarijarvi', photoMaster: '20261012_141651',
    sources: [wiki('HIM_(Finnish_band)'), wiki('Dark_Light_(HIM_album)')],
  },
  {
    id: 'darude', name: 'Darude', song: 'Sandstorm', songYear: 1999, videoId: 'y6120QOlsfU',
    channel: 'Darude', channelUrl: 'https://www.youtube.com/@darude', channelKind: 'band',
    youtubeViews: 323468536, spotifyListeners: 4758030,
    photo: 'darude-road-955-snow', photoMaster: '20261014_160019',
    sources: [wiki('Darude'), wiki('Sandstorm_(Darude_song)')],
  },
  {
    id: 'rasmus', name: 'The Rasmus', song: 'In the Shadows', songYear: 2003, videoId: '7gwO8-oqwFw',
    channel: 'The Rasmus', channelUrl: 'https://www.youtube.com/@TheRasmusOfficial', channelKind: 'band',
    youtubeViews: 171875145, spotifyListeners: 3921464,
    photo: 'rasmus-teno-sun', photoMaster: '20261013_140854',
    sources: [wiki('The_Rasmus')],
  },
  {
    id: 'lordi', name: 'Lordi', song: 'Hard Rock Hallelujah', songYear: 2006, videoId: '-6Xl9tBWt54',
    channel: 'LordiVEVO', channelUrl: 'https://www.youtube.com/@LordiVEVO', channelKind: 'band',
    youtubeViews: 119289928, spotifyListeners: 409500,
    photo: 'lordi-rovaniemi-reindeer-lights', photoMaster: '20261015_192253',
    lapland: { town: 'rovaniemi', href: 'https://laplandvibes.com/destination/rovaniemi/' },
    sources: [wiki('Lordi'), wiki('Lordi%27s_Square')],
  },
  {
    id: 'apocalyptica', name: 'Apocalyptica', song: "I Don't Care (feat. Adam Gontier)", songYear: 2008, videoId: 'yN3lUM-r6bk',
    channel: 'Apocalyptica', channelUrl: 'https://www.youtube.com/@apocalyptica', channelKind: 'band',
    youtubeViews: 41589133, spotifyListeners: 3762562,
    photo: 'apocalyptica-utsjoki', photoMaster: '20261013_105948',
    sources: [wiki('Apocalyptica'), wiki('I_Don%27t_Care_(Apocalyptica_song)')],
  },
  {
    id: 'kaarija', name: 'Käärijä', song: 'Cha Cha Cha', songYear: 2023, videoId: 'U-b5gDWVnps',
    channel: 'Käärijä', channelUrl: 'https://www.youtube.com/@kaarijaofficial', channelKind: 'band',
    youtubeViews: 11683428, spotifyListeners: 1263399,
    photo: 'kaarija-reindeer-pasture', photoMaster: '20261010_181350',
    sources: [wiki('K%C3%A4%C3%A4rij%C3%A4'), wiki('Finland_in_the_Eurovision_Song_Contest_2023')],
  },
  {
    id: 'bomfunk', name: "Bomfunk MC's", song: 'Freestyler', songYear: 1999, videoId: 'ymNFyxvIdaM',
    channel: 'BomfunkMCsVEVO', channelUrl: 'https://www.youtube.com/@BomfunkMCsVEVO', channelKind: 'band',
    youtubeViews: 454529447, spotifyListeners: 1804285,
    photo: 'bomfunk-saariselka-road', photoMaster: '20261011_170942',
    sources: [wiki('Bomfunk_MC%27s')],
  },
  {
    id: 'bodom', name: 'Children of Bodom', song: 'Are You Dead Yet?', songYear: 2005, videoId: 'aNJXS9X0yY0',
    channel: 'cobofficial', channelUrl: 'https://www.youtube.com/@childrenofbodom', channelKind: 'band',
    youtubeViews: 6664914, spotifyListeners: 824000,
    photo: 'bodom-road-4-lake', photoMaster: '20261011_154124',
    sources: [wiki('Children_of_Bodom'), wiki('Alexi_Laiho')],
  },
  {
    id: 'sunrise', name: 'Sunrise Avenue', song: 'Hollywood Hills', songYear: 2011, videoId: 'azPQZSlC2zk',
    channel: 'Universal Music Finland', channelUrl: 'https://www.youtube.com/@UniversalMusicFin', channelKind: 'label',
    youtubeViews: 19348447, spotifyListeners: 1238491,
    photo: 'sunrise-avenue-teno-fells', photoMaster: '20261013_131431',
    sources: [wiki('Sunrise_Avenue')],
  },
  {
    id: 'beastinblack', name: 'Beast in Black', song: 'Blind and Frozen', songYear: 2017, videoId: '2N4tXf3Ensw',
    channel: 'Nuclear Blast Records', channelUrl: 'https://www.youtube.com/@NuclearBlastRecords', channelKind: 'label',
    youtubeViews: 55882462, spotifyListeners: 1396885,
    photo: 'beast-in-black-utsjoki-river', photoMaster: '20261013_115916',
    sources: [wiki('Beast_in_Black')],
  },
  {
    id: 'stratovarius', name: 'Stratovarius', song: 'Hunting High and Low', songYear: 2000, videoId: 'kG4uQ6Tk7fY',
    channel: 'Stratovarius Official', channelUrl: 'https://www.youtube.com/@StratovariusChannel', channelKind: 'band',
    youtubeViews: 8062448, spotifyListeners: 1091345,
    photo: 'stratovarius-teno-valley', photoMaster: '20261013_130950',
    sources: [wiki('Stratovarius')],
  },
  {
    id: 'alma', name: 'ALMA', song: 'Chasing Highs', songYear: 2017, videoId: 'w6DukrYK5wQ',
    channel: 'cyberalmaVEVO', channelUrl: 'https://www.youtube.com/@cyberalmaVEVO', channelKind: 'band',
    youtubeViews: 71033753, spotifyListeners: 842600,
    photo: 'alma-road-5-fell', photoMaster: '20261011_135407',
    sources: [wiki('Alma_(Finnish_singer)'), wiki('Chasing_Highs')],
  },
  {
    id: 'blindchannel', name: 'Blind Channel', song: 'Dark Side', songYear: 2021, videoId: 'hMSq7q_iCSg',
    channel: 'Blind Channel', channelUrl: 'https://www.youtube.com/@blindchannelfinland', channelKind: 'band',
    youtubeViews: 154193, spotifyListeners: 511800,
    photo: 'blind-channel-saariselka-dusk', photoMaster: '20261011_183640',
    sources: [wiki('Blind_Channel'), wiki('Finland_in_the_Eurovision_Song_Contest_2021')],
  },
  {
    id: 'sonata', name: 'Sonata Arctica', song: 'Paid in Full', songYear: 2007, videoId: 'G1zkXdqcajk',
    channel: 'Reigning Phoenix Music', channelUrl: 'https://www.youtube.com/@ReigningPhoenixMusicOfficial', channelKind: 'label',
    youtubeViews: 19182616, spotifyListeners: 472100,
    photo: 'sonata-arctica-kemi-road', photoMaster: '20261015_175837',
    lapland: { town: 'kemi', href: 'https://laplandvibes.com/destination/kemi/' },
    sources: [wiki('Sonata_Arctica'), wiki('Unia')],
  },
];
