// LV Media -mainospaikkojen per-sivu-config (ks. shared/HomeAdSlots.tsx).
// siteSlug = lv_sites.slug LV Media -portaalissa (HUOM: ilman väliviivaa).
import type { HomeAdSlotsConfig } from '../../../shared/HomeAdSlots';
import { DEFAULT_PREMIUM_SPOTS } from '../../../shared/PremiumSpotGrid';

export const AD_SLOTS: HomeAdSlotsConfig = {
  siteSlug: 'laplandblog',
  sponsors: [null, null],
  spots: DEFAULT_PREMIUM_SPOTS,
};
