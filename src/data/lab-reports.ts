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

export interface LabResult {
  /** Parameter name in Vietnamese. */
  name: string;
  /** Parameter name as printed in English on the report. */
  en: string;
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
  group: string;
  results: LabResult[];
}

export const labReports: Record<string, LabReport[]> = {
  'nam-moi-den': [
    {
      id: 'VLAB-2309-0307/1',
      sample: 'Nấm mối',
      lab: 'VietLabs',
      customer: 'HTX Nông nghiệp Tà Đảnh',
      testedOn: '23/09/2023',
      group: 'Chỉ tiêu vi sinh',
      results: [
        { name: 'Tổng số vi sinh vật hiếu khí ở 30°C', en: 'Total plate count at 30°C', value: '8.2 × 10', exp: '2', unit: 'CFU/g' },
        { name: 'Coliforms', en: 'Coliforms', value: '<10', unit: 'CFU/g' },
        { name: 'Escherichia coli', en: 'Escherichia coli', value: '<10', unit: 'CFU/g', scientific: true },
        { name: 'Tổng số nấm men và nấm mốc', en: 'Total yeast and mold', value: '6.5 × 10', exp: '1', unit: 'CFU/g' },
      ],
    },
  ],
};
