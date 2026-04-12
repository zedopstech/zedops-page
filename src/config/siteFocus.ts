/**
 * Marketing focus: MEP (mechanical, electrical, plumbing) and **action**; not only
 * schedule/logs/inspections/punch → tasks, but any module where teams execute (finance,
 * supply chain, projects, etc.), plus **Zed AI** on the same data.
 *
 * Implementation:
 * - `src/data/navDropdownMenus.ts` keeps **both** `dropdownMenusGeneral` and `dropdownMenusMep`.
 *   Active export `dropdownMenus` switches on this flag (no copy/paste hunt later).
 * - Navbar always shows Solutions, Built for you, Resources; only the **labels/links copy** changes.
 * - Footer always lists the full Product / Docs / Company / Legal columns; MEP mode only changes the tagline.
 * - All `App.tsx` routes stay registered regardless of this flag.
 */
export const SITE_FOCUS_MEP_EXECUTION = true;

/** Hide the blog/resources strip on the home page (pages under /blog etc. stay live). */
export const HIDE_HOME_RESOURCES_SECTION = true;
