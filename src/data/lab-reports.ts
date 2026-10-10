/**
 * VietLabs test reports (CONTENT_EVIDENCE_BANK.md §4, SAMPLE-SPECIFIC).
 *
 * Values are reproduced exactly as listed in the Evidence Bank. Each report
 * applies only to the sample it names — never merge reports or present
 * results as a fixed specification for every batch.
 *
 * Not published: the 2024 "Nấm mối đen sấy" report (VLAB0-240919-022/1) is
 * known only from photographs and needs a transcription check against the
 * original before any value is shown.
 */

import type { Locale } from '../i18n';
import { dataFile } from './copy';

export interface LabResult {
  /** Parameter name in Vietnamese. */
  name: string;
  /** Parameter name as printed in English on the report. */
  en: string;
  /** Parameter name in Chinese (translation; not on the report). */
  zh: string;
  /** Reported value; `exp` renders as a power of ten after it. */
  value: string;
  exp?: string;
  unit?: string;
  /** Set for organism names written in italics. */
  scientific?: boolean;
}

export interface LabReport {
  id: string;
  /** Sample name exactly as written on the report. */
  sample: string;
  lab: string;
  customer: string;
  testedOn: string;
  group: Record<Locale, string>;
  results: LabResult[];
}

/** The reports, by product slug: src/content/san-pham/kiem-nghiem.md. */
export const labReports: Record<string, LabReport[]> = Object.fromEntries(
  dataFile<{ products: { slug: string; reports: LabReport[] }[] }>('san-pham/kiem-nghiem').products.map((p) => [p.slug, p.reports]),
);
