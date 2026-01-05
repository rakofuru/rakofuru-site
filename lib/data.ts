import type { FarmList, LegacyCommentList, SiteMeta } from "./types";
import farmsData from "../data/farms.json";
import siteData from "../data/site.json";
import legacyCommentsData from "../data/legacy-comments.json";

export const farms: FarmList = farmsData as FarmList;
export const site: SiteMeta = siteData as SiteMeta;
export const legacyComments: LegacyCommentList =
  legacyCommentsData as LegacyCommentList;
