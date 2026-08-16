/** A paged artifact (deck, report, document) rendered from its source pages. */
export type ArtifactDoc = {
  id: string;
  /** owning org / competition / programme — used as the reader eyebrow */
  org: string;
  title: string;
  meta: string;
  pages: number;
  dir: string;
};
