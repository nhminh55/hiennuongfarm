/**
 * The 12 products shown in the /san-pham/ showroom.
 *
 * Names and summaries are owner-supplied (the homepage catalogue). Images are
 * the studio illustrations already used on the homepage
 * (design-reference/HIEN_NUONG_12_STUDIO_WEBP); they are visual assets, not
 * evidence. Every other field must come from an original label, document or
 * approved source, cited in its `source`. Leave a field out rather than
 * filling it: empty tabs and sections are hidden. The audit, gaps and
 * proposed (unapproved) content live in docs/PRODUCT_CONTENT_AUDIT.md.
 *
 * A product is selected by its slug: /san-pham/#slug.
 */

import { localizePath, type Locale } from '../i18n';

/** Text in every site language. */
export type Text = Record<Locale, string>;

/* --------------------------------------------------------------------------
   Source records (edit these)
   -------------------------------------------------------------------------- */

interface SourcedText {
  text: Text;
  /** Where the fact comes from: file path, document number or owner note. */
  source: string;
}

interface RawFact {
  label: Text;
  value: Text;
  source: string;
}

interface RawDocument {
  /** Clear document name. */
  title: Text;
  /** Document type, e.g. test report, product declaration, OCOP certificate. */
  kind: Text;
  issuer?: Text;
  /** Reference / decision number, as printed. */
  reference?: string;
  /** Date as printed (dd/mm/yyyy). */
  date?: string;
  /** What the document covers: the exact product or sample it names. */
  scope?: Text;
  /** Working preview/download link or page section. Omit when none is public. */
  href?: string;
  linkLabel?: Text;
  source: string;
}

interface RawRecipe {
  name: Text;
  ingredients: Text[];
  steps: Text[];
  time?: Text;
  servings?: Text;
  image?: { src: string; width: number; height: number; alt: Text };
  source: string;
}

interface RawReview {
  quote: Text;
  /** Only with the customer's permission to be named. */
  author?: string;
  date?: string;
  sourceName?: Text;
  source: string;
}

interface RawProduct {
  slug: string;
  /** Exact product name. */
  name: Text;
  /** Category / form shown above the name on the stage (verified only). */
  category?: SourcedText;
  /** Short summary under the stage. */
  summary: SourcedText;
  image: {
    /** Approved transparent WebP under /images/products/showroom/. */
    file: string;
    alt: Text;
    /** Full-image width (% of stage), visible-subject centre and surface (%). */
    placement: { width: number; x: number; surface: number; bounds: [number, number, number, number] };
    plate: boolean;
  };
  /** A dedicated product page, when one exists (Vietnamese path). */
  detail?: string;
  /** Giới thiệu: description, characteristics, ingredient origin. */
  intro?: { paragraphs?: SourcedText[]; facts?: RawFact[] };
  /** Thành phần: ingredients (label wording), proportions, net weight, packaging, variants. */
  composition?: { ingredients?: SourcedText; facts?: RawFact[] };
  /** Cách dùng: preparation, storage, approved recipes. */
  usage?: { preparation?: SourcedText[]; storage?: SourcedText[]; recipes?: RawRecipe[] };
  /** Hồ sơ: product declaration, OCOP, test reports and other documents. */
  records?: RawDocument[];
  /** Nhận xét: authentic customer feedback, with permission. */
  reviews?: RawReview[];
}

const OWNER_HOME = 'Owner-supplied homepage catalogue copy (src/components/home/Products.astro)';
/** Approved homepage intro: the four lines are grown on the farm; the eight other products are made from them. */
const HOME_INTRO = 'Approved homepage catalogue intro (src/components/home/Products.astro:40; en :77, zh :114)';
const MOI_DEN_PAGE = 'Approved product page src/pages/san-pham/nam-moi-den.astro';
const PRODUCT_NOTES = 'Approved product notes src/data/products.ts';
const STUDIO_ALT = 'Describes the studio illustration (AI-edited; not evidence)';
/** Product self-declaration for “Nấm mối đen sấy”; its label annexes name Nấm Mối Đen Sấy Thăng Hoa. */
const TCB_02_URL = 'https://mekongsen.vn/datafiles/1950631709934493696/2025-08/74586519-TU%20CONG%20BO%20SAN%20PHAM.pdf';
const TCB_02 = `Bản tự công bố sản phẩm số 02/TADANH/2024, HTX Nông nghiệp Tà Đảnh, 30/09/2024 (${TCB_02_URL})`;

const TEST_REPORT: Text = { vi: 'Báo cáo thử nghiệm', en: 'Test report', zh: '检测报告' };
const VIETLABS: Text = {
  vi: 'Công ty Cổ phần Công nghệ VietLabs',
  en: 'VietLabs Technology Joint Stock Company',
  zh: 'VietLabs Technology Joint Stock Company',
};
const AVATEK: Text = {
  vi: 'Trung tâm Kiểm nghiệm và Tư vấn UDKH AVATEK',
  en: 'AVATEK Science Technology JSC',
  zh: 'AVATEK Science Technology JSC',
};
const SAMPLE_NOTE = 'Sample-specific; results valid only for the sample tested. Matching explained in docs/PRODUCT_CONTENT_AUDIT.md';

/* Facts shared by the four main lines. */
const MAIN_LINE: RawFact = {
  label: { vi: 'Dòng sản phẩm', en: 'Product line', zh: '产品类别' },
  value: { vi: 'Một trong bốn dòng nấm chính', en: 'One of four main mushroom lines', zh: '四类主要菌菇之一' },
  source: `${MOI_DEN_PAGE}:47,50; ${HOME_INTRO}`,
};
const GROWING_REGION: RawFact = {
  label: { vi: 'Vùng nuôi trồng', en: 'Growing region', zh: '种植地区' },
  value: { vi: 'Bảy Núi, An Giang', en: 'Bảy Núi, An Giang', zh: '安江省七山' },
  source: `${MOI_DEN_PAGE}:47 (“bốn dòng nấm chính mà Hiền Nương nuôi trồng tại vùng Bảy Núi, An Giang”), :50`,
};
const RAW_MATERIAL: Text = { vi: 'Nguyên liệu', en: 'Raw material', zh: '原料' };
const PROCESS: Text = { vi: 'Phương pháp chế biến', en: 'Processing', zh: '加工方式' };
const FREEZE_DRIED: Text = { vi: 'Sấy thăng hoa', en: 'Freeze-drying', zh: '冷冻干燥' };

const CATEGORY = {
  fresh: { vi: 'Nấm tươi', en: 'Fresh mushroom', zh: '鲜菇' },
  freezeDried: { vi: 'Sấy thăng hoa', en: 'Freeze-dried', zh: '冻干' },
  snack: { vi: 'Snack', en: 'Snack', zh: '零食' },
  tea: { vi: 'Trà hòa tan', en: 'Instant tea', zh: '速溶茶' },
} satisfies Record<string, Text>;

const raw: RawProduct[] = [
  {
    slug: 'nam-moi-den',
    name: { vi: 'Nấm Mối Đen', en: 'Black Termite Mushroom', zh: '黑皮鸡枞菌' },
    category: { text: CATEGORY.fresh, source: `${OWNER_HOME} (“Nấm tươi nuôi trồng tại trang trại Hiền Nương.”)` },
    summary: {
      text: {
        vi: 'Nấm tươi nuôi trồng tại trang trại Hiền Nương.',
        en: 'Fresh mushrooms grown at the Hiền Nương farm.',
        zh: '在 Hiền Nương 农场种植的新鲜菌菇。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '01-nam-moi-den.webp',
      alt: {
        vi: 'Một nhóm nấm mối đen tươi, mũ nâu sẫm, thân trắng ngà, xếp chồng trên nền sáng',
        en: 'A pile of fresh black termite mushrooms with dark brown caps and ivory stems on a light background',
        zh: '一堆新鲜的黑皮鸡枞菌，深褐色菌盖、象牙白菌柄，置于浅色背景上',
      },
      placement: { width: 51, x: 55, surface: 66, bounds: [12, 248, 1245, 1028] },
      plate: true,
    },
    detail: '/san-pham/nam-moi-den/',
    intro: {
      paragraphs: [
        {
          text: {
            vi: 'Bên cạnh nấm linh chi, đông trùng hạ thảo và nấm bào ngư, nấm mối đen là một trong bốn dòng nấm chính mà Hiền Nương nuôi trồng tại vùng Bảy Núi, An Giang.',
            en: 'Alongside lingzhi, cordyceps and oyster mushroom, black termite mushroom is one of the four main mushroom lines Hiền Nương grows in the Bảy Núi region of An Giang.',
            zh: '除灵芝、蛹虫草和平菇外，黑皮鸡枞菌也是 Hiền Nương 在安江省七山地区种植的四类主要菌菇之一。',
          },
          source: `${MOI_DEN_PAGE}:47 (en :86, zh :125)`,
        },
        {
          text: {
            vi: 'Nấm mối đen mọc lên từ bịch giá thể, được nuôi trồng tại trang trại.',
            en: 'Black termite mushrooms growing from substrate bags, cultivated on the farm.',
            zh: '从基质袋中长出的黑皮鸡枞菌，在农场培育。',
          },
          source: `${PRODUCT_NOTES}:33 (en :89, zh :111)`,
        },
      ],
      facts: [
        MAIN_LINE,
        GROWING_REGION,
        {
          label: { vi: 'Mô hình', en: 'Model', zh: '模式' },
          value: { vi: 'Nông nghiệp tuần hoàn', en: 'Circular agriculture', zh: '循环农业' },
          source: `${MOI_DEN_PAGE}:50`,
        },
      ],
    },
    records: [
      {
        title: { vi: 'Báo cáo thử nghiệm mẫu nấm mối', en: 'Test report: termite mushroom sample', zh: '鸡枞菌样品检测报告' },
        kind: TEST_REPORT,
        issuer: VIETLABS,
        reference: 'VLAB-2309-0307/1',
        date: '18/10/2023',
        scope: { vi: 'Mẫu: Nấm mối', en: 'Sample: “Nấm mối” (termite mushroom)', zh: '样品：“Nấm mối”（鸡枞菌）' },
        href: '/san-pham/nam-moi-den/#kiem-nghiem',
        linkLabel: { vi: 'Xem kết quả kiểm nghiệm', en: 'View the test results', zh: '查看检测结果' },
        source: `design-reference/NƯƠNG FARM/KẾT QUẢ - NẤM MỐI.pdf p.1–2 (also 23-09-00979.pdf); src/data/lab-reports.ts. Received/tested 23/09/2023, issued 18/10/2023. ${SAMPLE_NOTE}`,
      },
      {
        title: { vi: 'Báo cáo thử nghiệm mẫu nấm mối', en: 'Test report: termite mushroom sample', zh: '鸡枞菌样品检测报告' },
        kind: TEST_REPORT,
        issuer: AVATEK,
        reference: 'AVA1231210158-2',
        date: '27/12/2023',
        scope: { vi: 'Mẫu: Nấm mối', en: 'Sample: “Nấm mối” (termite mushroom)', zh: '样品：“Nấm mối”（鸡枞菌）' },
        source: `design-reference/NƯƠNG FARM/KIỂM NGHIỆM NẤM MỐI.pdf p.3–4. Received 20/12/2023, issued 27/12/2023. ${SAMPLE_NOTE}`,
      },
      {
        title: { vi: 'Báo cáo thử nghiệm mẫu nấm mối Nàng Nương', en: 'Test report: “Nàng Nương” termite mushroom sample', zh: '“Nàng Nương”鸡枞菌样品检测报告' },
        kind: TEST_REPORT,
        issuer: AVATEK,
        reference: 'NCA8240901258-2',
        date: '03/10/2024',
        scope: { vi: 'Mẫu: Nấm mối Nàng Nương', en: 'Sample: “Nấm mối Nàng Nương”', zh: '样品：“Nấm mối Nàng Nương”' },
        source: `design-reference/NƯƠNG FARM/KIỂM NGHIỆM NẤM MỐI.pdf p.5–10. Received 28/09/2024, issued 03/10/2024. ${SAMPLE_NOTE}`,
      },
    ],
  },
  {
    slug: 'nam-linh-chi',
    name: { vi: 'Nấm Linh Chi Tai To', en: 'Large-Cap Lingzhi Mushroom', zh: '大朵灵芝' },
    summary: {
      text: {
        vi: 'Dòng linh chi được nuôi trồng và thu hái tại trang trại.',
        en: 'Lingzhi grown and harvested on the farm.',
        zh: '在农场种植和采收的灵芝。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '02-nam-linh-chi-tai-to.webp',
      alt: {
        vi: 'Một tai nấm linh chi lớn màu nâu với nhiều lớp vân tròn, đặt trên nền sáng',
        en: 'A large brown lingzhi cap with layered concentric rings on a light background',
        zh: '一朵带有层层环纹的大朵褐色灵芝，置于浅色背景上',
      },
      placement: { width: 48, x: 56, surface: 66, bounds: [2, 156, 1253, 1116] },
      plate: true,
    },
    intro: {
      paragraphs: [
        {
          text: {
            vi: 'Nấm Linh Chi Tai To Nương Farm được nuôi trồng và thu hoạch theo mô hình hữu cơ tuần hoàn khép kín tại vùng Bảy Núi, An Giang.',
            en: 'Nương Farm large-cap lingzhi is grown and harvested using a closed-loop organic circular farming model in Bảy Núi, An Giang.',
            zh: 'Nương Farm 大朵灵芝在安江省七山地区以闭环有机循环农业模式种植并采收。',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          text: {
            vi: 'Sản phẩm giữ nguyên tai nấm lớn, nguyên vẹn, có màu sắc và hương thơm tự nhiên, không chứa chất bảo quản.',
            en: 'The product retains its large, whole mushroom cap, natural colour and aroma, and contains no preservatives.',
            zh: '产品保留完整的大朵菌盖、天然色泽和香气，不含防腐剂。',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
      ],
      facts: [
        {
          label: {
            vi: 'Nguồn gốc nguyên liệu',
            en: 'Ingredient origin',
            zh: '原料来源',
          },
          value: {
            vi: 'Nương Farm, vùng Bảy Núi, An Giang',
            en: 'Nương Farm, Bảy Núi, An Giang',
            zh: 'Nương Farm，安江省七山',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          label: {
            vi: 'Xuất xứ',
            en: 'Country of origin',
            zh: '原产国',
          },
          value: {
            vi: 'Việt Nam',
            en: 'Vietnam',
            zh: '越南',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          label: {
            vi: 'Chứng nhận',
            en: 'Certification',
            zh: '认证',
          },
          value: {
            vi: 'OCOP 3 sao',
            en: '3-star OCOP',
            zh: 'OCOP 三星',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
      ],
    },
    composition: {
      ingredients: {
        text: {
          vi: '100% nấm linh chi đỏ nguyên bản, nguyên tai (Ganoderma Australe). Không chất bảo quản.',
          en: '100% whole red lingzhi mushroom caps (Ganoderma Australe). No preservatives.',
          zh: '100% 完整原朵赤灵芝（Ganoderma Australe）。不含防腐剂。',
        },
        source: 'docs/products/02. Nam linh chi tai to.md',
      },
      facts: [
        {
          label: {
            vi: 'Khối lượng tịnh',
            en: 'Net weight',
            zh: '净含量',
          },
          value: {
            vi: '200 g',
            en: '200 g',
            zh: '200 克',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          label: {
            vi: 'Quy cách khác',
            en: 'Other sizes',
            zh: '其他规格',
          },
          value: {
            vi: '100 g, 250 g, 500 g hoặc đóng gói theo yêu cầu',
            en: '100 g, 250 g, 500 g or packaging on request',
            zh: '100 克、250 克、500 克，或按需包装',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          label: {
            vi: 'Đơn vị tính',
            en: 'Unit',
            zh: '计量单位',
          },
          value: {
            vi: '1 nguyên tai nấm',
            en: '1 whole mushroom cap',
            zh: '1 朵完整菌盖',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          label: {
            vi: 'Hạn sử dụng',
            en: 'Shelf life',
            zh: '保质期',
          },
          value: {
            vi: '1 năm kể từ ngày sản xuất',
            en: '1 year from the date of manufacture',
            zh: '自生产日期起 1 年',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
      ],
    },
    usage: {
      preparation: [
        {
          text: {
            vi: 'Thái lát mỏng để hãm trà hoặc nấu nước. Lượng dùng theo hướng dẫn sản phẩm: khoảng 20 g mỗi ngày.',
            en: 'Slice thinly to brew as tea or boil in water. The product instructions specify about 20 g per day.',
            zh: '切成薄片后泡茶或煮水。产品使用说明建议每日约 20 克。',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          text: {
            vi: 'Nấu hoặc ủ 20 g nấm với 1,5–2 lít nước. Để nước sôi khoảng 5 phút rồi chắt lấy nước uống trong ngày.',
            en: 'Boil or steep 20 g of mushrooms in 1.5–2 litres of water. Boil for about 5 minutes, then strain and drink during the day.',
            zh: '用 1.5–2 升水煮或焖泡 20 克灵芝。煮沸约 5 分钟后滤出，当日饮用。',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          text: {
            vi: 'Có thể kết hợp thêm táo đỏ, cam thảo hoặc các loại thảo mộc khác để tăng hương vị.',
            en: 'Combine with red dates, liquorice or other herbs for additional flavour.',
            zh: '可搭配红枣、甘草或其他草本植物增添风味。',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
      ],
      storage: [
        {
          text: {
            vi: 'Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và môi trường ẩm thấp. Đậy kín nắp hoặc buộc chặt miệng bao bì sau khi sử dụng.',
            en: 'Store in a dry, cool, well-ventilated place away from direct sunlight and humidity. Close the lid or tie the packaging tightly after use.',
            zh: '存放于干燥、阴凉通风处，避免阳光直射和潮湿环境。使用后盖紧盖子或扎紧包装袋口。',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
        {
          text: {
            vi: 'Hạn sử dụng: 1 năm kể từ ngày sản xuất.',
            en: 'Shelf life: 1 year from the date of manufacture.',
            zh: '保质期：自生产日期起 1 年。',
          },
          source: 'docs/products/02. Nam linh chi tai to.md',
        },
      ],
    },
    records: [
      {
        title: { vi: 'Báo cáo thử nghiệm mẫu nấm linh chi', en: 'Test report: lingzhi sample', zh: '灵芝样品检测报告' },
        kind: TEST_REPORT,
        issuer: VIETLABS,
        reference: 'VLAB-2309-0307/2',
        date: '18/10/2023',
        scope: { vi: 'Mẫu: Nấm linh chi', en: 'Sample: “Nấm linh chi” (lingzhi)', zh: '样品：“Nấm linh chi”（灵芝）' },
        source: `design-reference/NƯƠNG FARM/KẾT QUẢ - NẤM LINH CHI.pdf + KẾT QUẢ - NẤM LINH CHI 1.pdf (also 23-09-00980.pdf). Received/tested 23/09/2023, issued 18/10/2023. ${SAMPLE_NOTE}`,
      },
      {
        title: { vi: 'Báo cáo thử nghiệm mẫu linh chi', en: 'Test report: lingzhi sample', zh: '灵芝样品检测报告' },
        kind: TEST_REPORT,
        issuer: AVATEK,
        reference: 'AVA1231210158-1',
        date: '27/12/2023',
        scope: { vi: 'Mẫu: Linh chi', en: 'Sample: “Linh chi” (lingzhi)', zh: '样品：“Linh chi”（灵芝）' },
        source: `design-reference/NƯƠNG FARM/KIỂM NGHIỆM NẤM LINH CHI.pdf p.5–6. Received 20/12/2023, issued 27/12/2023. ${SAMPLE_NOTE}`,
      },
      {
        title: { vi: 'Báo cáo thử nghiệm mẫu nấm linh chi tai to', en: 'Test report: large-cap lingzhi sample', zh: '大朵灵芝样品检测报告' },
        kind: TEST_REPORT,
        issuer: AVATEK,
        reference: 'NCA8240901258-1',
        date: '03/10/2024',
        scope: { vi: 'Mẫu: Nấm linh chi tai to', en: 'Sample: “Nấm linh chi tai to” (large-cap lingzhi)', zh: '样品：“Nấm linh chi tai to”（大朵灵芝）' },
        source: `design-reference/NƯƠNG FARM/KIỂM NGHIỆM NẤM LINH CHI.pdf p.7–8. Received 28/09/2024, issued 03/10/2024. ${SAMPLE_NOTE}`,
      },
    ],
  },
  {
    slug: 'dong-trung-ha-thao',
    name: { vi: 'Đông Trùng Hạ Thảo', en: 'Cordyceps', zh: '蛹虫草' },
    summary: {
      text: {
        vi: 'Đông trùng hạ thảo được nuôi cấy tại Hiền Nương Farm.',
        en: 'Cordyceps cultivated at Hiền Nương Farm.',
        zh: '在 Hiền Nương Farm 培育的蛹虫草。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '03-dong-trung-ha-thao.webp',
      alt: {
        vi: 'Một khối đông trùng hạ thảo với những sợi màu cam mọc dày từ lớp giá thể',
        en: 'A clump of cordyceps with dense orange strands rising from a base of substrate',
        zh: '一簇蛹虫草，橙色子实体从基质上密集长出',
      },
      placement: { width: 44, x: 58, surface: 66, bounds: [6, 117, 1250, 1163] },
      plate: true,
    },
    intro: {
      paragraphs: [
        {
          text: {
            vi: 'Những sợi đông trùng hạ thảo được nuôi cấy và thu hái tại trang trại.',
            en: 'Cordyceps strands cultivated and harvested on the farm.',
            zh: '在农场培育和采收的蛹虫草。',
          },
          source: `${PRODUCT_NOTES}:56 (en :99, zh :121)`,
        },
      ],
      facts: [MAIN_LINE, GROWING_REGION],
    },
    records: [
      {
        title: { vi: 'Báo cáo thử nghiệm mẫu đông trùng hạ thảo', en: 'Test report: cordyceps sample', zh: '蛹虫草样品检测报告' },
        kind: TEST_REPORT,
        issuer: VIETLABS,
        reference: 'VLAB-2309-0307/3',
        date: '18/10/2023',
        scope: { vi: 'Mẫu: Đông trùng hạ thảo', en: 'Sample: “Đông trùng hạ thảo” (cordyceps)', zh: '样品：“Đông trùng hạ thảo”（蛹虫草）' },
        source: `design-reference/NƯƠNG FARM/KẾT QUẢ - ĐÔNG TRÙNG HẠ THẢO.pdf + KẾT QUẢ - ĐÔNG TRÙNG HẠ THẢO 1.pdf (also 23-09-00981.pdf). Received/tested 23/09/2023, issued 18/10/2023. ${SAMPLE_NOTE}`,
      },
    ],
  },
  {
    slug: 'nam-bao-ngu',
    name: { vi: 'Nấm Bào Ngư', en: 'Oyster Mushroom', zh: '平菇' },
    category: { text: CATEGORY.fresh, source: `${OWNER_HOME} (“Nấm tươi được nuôi trồng theo quy trình của trang trại.”)` },
    summary: {
      text: {
        vi: 'Nấm tươi được nuôi trồng theo quy trình của trang trại.',
        en: 'Fresh mushrooms grown following the farm’s own process.',
        zh: '按照农场自己的流程种植的新鲜菌菇。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '04-nam-bao-ngu.webp',
      alt: {
        vi: 'Một chùm nấm bào ngư trắng với nhiều tai nấm xếp tầng',
        en: 'A cluster of white oyster mushrooms with layered caps',
        zh: '一簇白色平菇，菌盖层层叠叠',
      },
      placement: { width: 48, x: 57, surface: 66, bounds: [20, 176, 1232, 1202] },
      plate: true,
    },
    intro: {
      paragraphs: [
        {
          text: {
            vi: 'Chùm nấm bào ngư mọc từ bịch phôi xếp trên kệ trong nhà trồng.',
            en: 'A cluster of oyster mushrooms growing from a spawn bag on a shelf in the grow house.',
            zh: '一簇平菇从种植棚架子上的菌袋中长出。',
          },
          source: `${PRODUCT_NOTES}:67 (en :104, zh :126)`,
        },
      ],
      facts: [MAIN_LINE, GROWING_REGION],
    },
  },
  {
    slug: 'nam-moi-den-say-thang-hoa',
    name: { vi: 'Nấm Mối Đen Sấy Thăng Hoa', en: 'Freeze-Dried Black Termite Mushroom', zh: '冻干黑皮鸡枞菌' },
    category: { text: CATEGORY.freezeDried, source: `${OWNER_HOME} (product name and summary)` },
    summary: {
      text: {
        vi: 'Nấm mối đen chế biến bằng phương pháp sấy thăng hoa.',
        en: 'Black termite mushroom, processed by freeze-drying.',
        zh: '采用冷冻干燥工艺加工的黑皮鸡枞菌。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '05-nam-moi-den-say-thang-hoa.webp',
      alt: {
        vi: 'Hộp giấy nấm mối đen sấy thăng hoa có ô cửa sổ, bên cạnh vài cây nấm sấy',
        en: 'A paper box of freeze-dried black termite mushroom with a window panel, beside a few dried mushrooms',
        zh: '带透明窗的冻干黑皮鸡枞菌纸盒，旁边放着几朵干菌',
      },
      placement: { width: 44, x: 58, surface: 76, bounds: [347, 67, 1220, 1221] },
      plate: false,
    },
    intro: {
      paragraphs: [
        {
          text: {
            vi: 'Nấm mối đen được nuôi trồng và thu hoạch trực tiếp tại Hiền Nương Farm theo mô hình hữu cơ tuần hoàn khép kín. Sản phẩm được chế biến bằng công nghệ sấy thăng hoa, không sử dụng chất bảo quản hay phẩm màu.',
            en: 'Black termite mushrooms are grown and harvested directly at Hiền Nương Farm using a closed-loop organic circular farming model. The product is freeze-dried without preservatives or colouring.',
            zh: '黑皮鸡枞菌由 Hiền Nương Farm 以闭环有机循环农业模式种植并直接采收，采用冷冻干燥工艺加工，不添加防腐剂或色素。',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          text: {
            vi: 'Nấm tự nhiên được chọn lọc kỹ lưỡng trước khi sấy thăng hoa để giữ màu sắc, hình dáng và hương vị.',
            en: 'Carefully selected natural mushrooms are freeze-dried to preserve their colour, shape and flavour.',
            zh: '精心挑选的天然菌菇经过冷冻干燥，保留其色泽、形态和风味。',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
      ],
      facts: [
        {
          label: {
            vi: 'Nguồn gốc nguyên liệu',
            en: 'Ingredient origin',
            zh: '原料来源',
          },
          value: {
            vi: 'Trồng và thu hoạch trực tiếp tại Hiền Nương Farm',
            en: 'Grown and harvested directly at Hiền Nương Farm',
            zh: '由 Hiền Nương Farm 种植并直接采收',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          label: {
            vi: 'Phương pháp chế biến',
            en: 'Processing',
            zh: '加工方式',
          },
          value: {
            vi: 'Sấy thăng hoa',
            en: 'Freeze-drying',
            zh: '冷冻干燥',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          label: {
            vi: 'Đơn vị sản xuất',
            en: 'Producer',
            zh: '生产单位',
          },
          value: {
            vi: 'Hợp tác xã Nông nghiệp Tà Đảnh',
            en: 'Tà Đảnh Agricultural Cooperative',
            zh: 'Tà Đảnh 农业合作社',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          label: {
            vi: 'Xuất xứ',
            en: 'Country of origin',
            zh: '原产国',
          },
          value: {
            vi: 'Việt Nam',
            en: 'Vietnam',
            zh: '越南',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          label: { vi: 'Nơi sản xuất', en: 'Place of production', zh: '生产地址' },
          value: {
            vi: 'ấp Tân Bình, xã Tà Đảnh, huyện Tri Tôn, tỉnh An Giang',
            en: 'Tân Bình hamlet, Tà Đảnh commune, Tri Tôn district, An Giang province',
            zh: '安江省知尊县 Tà Đảnh 乡 Tân Bình 村',
          },
          source: `${TCB_02}, mục II.5 (p.3), as printed in 2024`,
        },
      ],
    },
    composition: {
      ingredients: {
        text: {
          vi: '100% nấm mối đen tươi nguyên chất. Không pha tạp, không hóa chất.',
          en: '100% pure fresh black termite mushrooms. No adulterants or chemicals.',
          zh: '100% 纯鲜黑皮鸡枞菌。不掺杂，不添加化学物质。',
        },
        source: 'docs/products/05.Nam moi den say thang hoa.md',
      },
      facts: [
        {
          label: {
            vi: 'Khối lượng tịnh',
            en: 'Net weight',
            zh: '净含量',
          },
          value: {
            vi: '45 g',
            en: '45 g',
            zh: '45 克',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          label: {
            vi: 'Quy cách đóng gói',
            en: 'Packaging',
            zh: '包装',
          },
          value: {
            vi: '1 hộp giấy',
            en: '1 paper box',
            zh: '1 个纸盒',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          label: {
            vi: 'Hạn sử dụng',
            en: 'Shelf life',
            zh: '保质期',
          },
          value: {
            vi: '1 năm kể từ ngày sản xuất',
            en: '1 year from the date of manufacture',
            zh: '自生产日期起 1 年',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
      ],
    },
    usage: {
      preparation: [
        {
          text: {
            vi: 'Ngâm nấm trong nước ấm khoảng 5–10 phút trước khi chế biến để nấm nở mềm.',
            en: 'Soak the mushrooms in warm water for about 5–10 minutes before cooking to soften them.',
            zh: '烹饪前将菌菇放入温水中浸泡约 5–10 分钟，使其泡发变软。',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          text: {
            vi: 'Dùng để nấu canh, xào, hầm, lẩu nấm hoặc chế biến các món chay.',
            en: 'Use in soups, stir-fries, stews, mushroom hotpots or vegetarian dishes.',
            zh: '可用于煮汤、炒菜、炖菜、菌菇火锅或素食料理。',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
      ],
      storage: [
        {
          text: {
            vi: 'Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Đóng kín bao bì sau khi sử dụng.',
            en: 'Store in a dry, cool, well-ventilated place away from direct sunlight. Close the packaging tightly after use.',
            zh: '存放于干燥、阴凉通风处，避免阳光直射。使用后请密封包装。',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
        {
          text: {
            vi: 'Hạn sử dụng: 1 năm kể từ ngày sản xuất.',
            en: 'Shelf life: 1 year from the date of manufacture.',
            zh: '保质期：自生产日期起 1 年。',
          },
          source: 'docs/products/05.Nam moi den say thang hoa.md',
        },
      ],
    },
    records: [
      {
        title: {
          vi: 'Bản tự công bố sản phẩm Nấm mối đen sấy',
          en: 'Product self-declaration: “Nấm mối đen sấy” (dried black termite mushroom)',
          zh: '产品自我公布书：“Nấm mối đen sấy”（干黑皮鸡枞菌）',
        },
        kind: { vi: 'Bản tự công bố sản phẩm', en: 'Product self-declaration', zh: '产品自我公布书' },
        issuer: { vi: 'Hợp tác xã Nông nghiệp Tà Đảnh', en: 'Tà Đảnh Agricultural Cooperative', zh: 'Tà Đảnh 农业合作社' },
        reference: '02/TADANH/2024',
        date: '30/09/2024',
        scope: {
          vi: 'Sản phẩm: Nấm mối đen sấy; mẫu nhãn kèm theo: Nấm Mối Đen Sấy Thăng Hoa',
          en: 'Product: “Nấm mối đen sấy”; attached label: Nấm Mối Đen Sấy Thăng Hoa (freeze-dried)',
          zh: '产品：“Nấm mối đen sấy”；所附标签：Nấm Mối Đen Sấy Thăng Hoa（冻干）',
        },
        href: TCB_02_URL,
        linkLabel: { vi: 'Xem bản tự công bố (PDF)', en: 'View the declaration (PDF)', zh: '查看自我公布书（PDF）' },
        source: `${TCB_02}. Linked from the Mekong Sen catalogue page https://mekongsen.vn/B41h9bA7AbAc3cC (“Xem hồ sơ tự công bố sản phẩm số 02/TADANH/2024”). Annexes 1–2 show the Nấm Mối Đen Sấy Thăng Hoa label.`,
      },
    ],
  },
  {
    slug: 'snack-nam-moi-den',
    name: { vi: 'Snack Nấm Mối Đen', en: 'Black Termite Mushroom Snack', zh: '黑皮鸡枞菌零食' },
    category: { text: CATEGORY.snack, source: `${OWNER_HOME} (product name)` },
    summary: {
      text: {
        vi: 'Sản phẩm chế biến từ nấm mối đen của Hiền Nương.',
        en: 'Made from Hiền Nương’s black termite mushrooms.',
        zh: '以 Hiền Nương 的黑皮鸡枞菌加工而成。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '06-snack-nam-moi-den.webp',
      alt: {
        vi: 'Hũ nhựa trong nắp nhôm đựng snack nấm mối đen, bên cạnh vài miếng snack',
        en: 'A clear jar with an aluminium lid holding black termite mushroom snack, with a few pieces beside it',
        zh: '铝盖透明罐装的黑皮鸡枞菌零食，旁边放着几块',
      },
      placement: { width: 48, x: 57, surface: 76, bounds: [211, 167, 1243, 1163] },
      plate: false,
    },
    intro: {
      paragraphs: [
        {
          text: { vi: 'Snack Nấm Mối Đen Hiền Nương Farm được chế biến từ nấm mối tươi hữu cơ của vùng Bảy Núi, An Giang. Nấm được tuyển chọn kỹ lưỡng và sấy giòn, giữ hương vị thơm ngon tự nhiên.', en: 'Hiền Nương Farm Black Termite Mushroom Snack is made from fresh organic termite mushrooms from Bảy Núi, An Giang. Carefully selected mushrooms are dried until crisp, retaining their natural flavour.', zh: 'Hiền Nương Farm 黑皮鸡枞菌零食采用安江省七山地区的新鲜有机鸡枞菌，经过精心挑选并干燥至酥脆，保留天然风味。' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
        {
          text: { vi: 'Sản phẩm tiện mang theo trong các chuyến đi chơi, dã ngoại hoặc làm quà tặng cho bạn bè, người thân.', en: 'Convenient to take on trips and picnics, or give as a gift to friends and family.', zh: '方便旅行、野餐时携带，也可赠送给亲友。' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
      ],
      facts: [
        {
          label: { vi: 'Thương hiệu', en: 'Brand', zh: '品牌' },
          value: { vi: 'Hiền Nương Farm', en: 'Hiền Nương Farm', zh: 'Hiền Nương Farm' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
        {
          label: { vi: 'Sản xuất tại', en: 'Produced at', zh: '生产单位' },
          value: { vi: 'Hợp tác xã Tà Đảnh, vùng Bảy Núi, An Giang', en: 'Tà Đảnh Cooperative, Bảy Núi, An Giang', zh: 'Tà Đảnh 合作社，安江省七山' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
        {
          label: { vi: 'Xuất xứ', en: 'Country of origin', zh: '原产国' },
          value: { vi: 'Việt Nam', en: 'Vietnam', zh: '越南' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
      ],
    },
    composition: {
      ingredients: {
        text: { vi: 'Nấm mối tươi hữu cơ, dầu thực vật.', en: 'Fresh organic termite mushrooms, vegetable oil.', zh: '新鲜有机鸡枞菌、植物油。' },
        source: 'docs/products/06. Snack nam moi den.md',
      },
      facts: [
        {
          label: { vi: 'Khối lượng tịnh', en: 'Net weight', zh: '净含量' },
          value: { vi: '50 g', en: '50 g', zh: '50 克' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
        {
          label: { vi: 'Quy cách đóng gói', en: 'Packaging', zh: '包装' },
          value: { vi: '1 hộp × 50 g', en: '1 box × 50 g', zh: '1 盒 × 50 克' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
        {
          label: { vi: 'Hạn sử dụng', en: 'Shelf life', zh: '保质期' },
          value: { vi: '6 tháng kể từ ngày sản xuất', en: '6 months from the date of manufacture', zh: '自生产日期起 6 个月' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
      ],
    },
    usage: {
      preparation: [
        {
          text: { vi: 'Dùng trực tiếp ngay sau khi mở bao bì.', en: 'Ready to eat immediately after opening.', zh: '开封后可直接食用。' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
        {
          text: { vi: 'Có thể dùng kèm trà, cà phê hoặc làm món ăn nhẹ trong các buổi tiệc.', en: 'Enjoy with tea or coffee, or serve as a snack at parties.', zh: '可搭配茶、咖啡，或作为聚会小食。' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
      ],
      storage: [
        {
          text: { vi: 'Bảo quản nơi khô ráo, thoáng mát. Đậy kín hoặc buộc chặt miệng túi/hộp sau khi mở để giữ độ giòn.', en: 'Store in a dry, cool, well-ventilated place. Close or tie the bag or box tightly after opening to retain crispness.', zh: '存放于干燥、阴凉通风处。开封后请密封或扎紧袋口、盒口，以保持酥脆。' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
        {
          text: { vi: 'Hạn sử dụng: 6 tháng kể từ ngày sản xuất.', en: 'Shelf life: 6 months from the date of manufacture.', zh: '保质期：自生产日期起 6 个月。' },
          source: 'docs/products/06. Snack nam moi den.md',
        },
      ],
    },
    reviews: [
      {
        quote: { vi: 'Snack giòn tan, vị vừa ăn, ăn hoài không ngán.', en: 'The snack is crisp, the flavour is just right, and I never get tired of eating it.', zh: '零食酥脆，味道刚刚好，怎么吃都不腻。' },
        author: 'Chị Lan (TP. HCM)',
        source: 'docs/products/06. Snack nam moi den.md',
      },
      {
        quote: { vi: 'Mang đi làm món ăn vặt, đồng nghiệp ai cũng khen lạ và ngon.', en: 'I take it to work as a snack, and all my colleagues say it is unusual and delicious.', zh: '带去上班当零食，同事们都说新奇又好吃。' },
        author: 'Anh Phúc (Cần Thơ)',
        source: 'docs/products/06. Snack nam moi den.md',
      },
    ],
  },
  {
    slug: 'snack-nam-bao-ngu',
    name: { vi: 'Snack Nấm Bào Ngư', en: 'Oyster Mushroom Snack', zh: '平菇零食' },
    category: { text: CATEGORY.snack, source: `${OWNER_HOME} (product name)` },
    summary: {
      text: {
        vi: 'Sản phẩm chế biến từ nấm bào ngư của Hiền Nương.',
        en: 'Made from Hiền Nương’s oyster mushrooms.',
        zh: '以 Hiền Nương 的平菇加工而成。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '07-snack-nam-bao-ngu.webp',
      alt: {
        vi: 'Hũ nhựa trong nắp nhôm, nhãn xanh lá, đựng snack nấm bào ngư, bên cạnh vài miếng snack vàng nâu',
        en: 'A clear jar with an aluminium lid and green label holding oyster mushroom snack, with a few golden pieces beside it',
        zh: '铝盖绿标透明罐装的平菇零食，旁边放着几块金黄色零食',
      },
      placement: { width: 47, x: 57, surface: 76, bounds: [198, 145, 1243, 1181] },
      plate: false,
    },
    intro: {
      paragraphs: [
        {
          text: { vi: 'Snack Nấm Bào Ngư Hiền Nương Farm được làm từ nấm bào ngư tươi, trồng và thu hoạch mới mỗi ngày tại trang trại.', en: 'Hiền Nương Farm Oyster Mushroom Snack is made from fresh oyster mushrooms grown and harvested daily on the farm.', zh: 'Hiền Nương Farm 平菇零食采用农场种植并每日新鲜采收的平菇。' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          text: { vi: 'Nấm được sấy giòn để giữ hương thơm và vị ngọt tự nhiên. Sản phẩm không sử dụng phụ gia, phẩm màu hay chất bảo quản.', en: 'The mushrooms are dried until crisp to retain their natural aroma and sweetness. The product contains no additives, colouring or preservatives.', zh: '菌菇干燥至酥脆，保留天然香气和甜味。产品不添加添加剂、色素或防腐剂。' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
      ],
      facts: [
        {
          label: { vi: 'Nguồn gốc nguyên liệu', en: 'Ingredient origin', zh: '原料来源' },
          value: { vi: 'Trồng và thu hoạch mới mỗi ngày tại Hiền Nương Farm', en: 'Grown and harvested daily at Hiền Nương Farm', zh: '由 Hiền Nương Farm 种植并每日新鲜采收' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          label: { vi: 'Đơn vị sản xuất', en: 'Producer', zh: '生产单位' },
          value: { vi: 'Hợp tác xã Nông nghiệp Tà Đảnh', en: 'Tà Đảnh Agricultural Cooperative', zh: 'Tà Đảnh 农业合作社' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          label: { vi: 'Xuất xứ', en: 'Country of origin', zh: '原产国' },
          value: { vi: 'Việt Nam', en: 'Vietnam', zh: '越南' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
      ],
    },
    composition: {
      ingredients: {
        text: { vi: '100% nấm bào ngư tươi.', en: '100% fresh oyster mushrooms.', zh: '100% 新鲜平菇。' },
        source: 'docs/products/07. Snack nam bao ngu.md',
      },
      facts: [
        {
          label: { vi: 'Khối lượng tịnh', en: 'Net weight', zh: '净含量' },
          value: { vi: '50 g', en: '50 g', zh: '50 克' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          label: { vi: 'Quy cách đóng gói', en: 'Packaging', zh: '包装' },
          value: { vi: '1 hũ', en: '1 jar', zh: '1 罐' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          label: { vi: 'Hạn sử dụng', en: 'Shelf life', zh: '保质期' },
          value: { vi: '6 tháng kể từ ngày sản xuất', en: '6 months from the date of manufacture', zh: '自生产日期起 6 个月' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
      ],
    },
    usage: {
      preparation: [
        {
          text: { vi: 'Ăn trực tiếp như món ăn vặt.', en: 'Ready to eat as a snack.', zh: '可直接作为零食食用。' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          text: { vi: 'Có thể dùng kèm salad, cơm trộn hoặc các món ăn nhẹ tùy thích.', en: 'Enjoy with salads, mixed rice or other light dishes.', zh: '可搭配沙拉、拌饭或其他小食。' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          text: { vi: 'Không dùng cho người dị ứng với nấm.', en: 'Not suitable for people with mushroom allergies.', zh: '对菌菇过敏者请勿食用。' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
      ],
      storage: [
        {
          text: { vi: 'Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Đóng kín nắp hộp sau khi sử dụng để giữ độ giòn.', en: 'Store in a dry, cool, well-ventilated place away from direct sunlight. Close the lid tightly after use to retain crispness.', zh: '存放于干燥、阴凉通风处，避免阳光直射。使用后盖紧盖子，以保持酥脆。' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          text: { vi: 'Hạn sử dụng: 6 tháng kể từ ngày sản xuất.', en: 'Shelf life: 6 months from the date of manufacture.', zh: '保质期：自生产日期起 6 个月。' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
        {
          text: { vi: 'Không sử dụng sản phẩm đã hết hạn hoặc có dấu hiệu ẩm mốc.', en: 'Do not use if the product is past its expiry date or shows signs of mould.', zh: '产品如已过保质期或有受潮发霉迹象，请勿食用。' },
          source: 'docs/products/07. Snack nam bao ngu.md',
        },
      ],
    },
    reviews: [
      {
        quote: { vi: 'Con mình rất thích ăn vặt, nhất là các loại snack, tuy nhiên mình không yên tâm cho con sử dụng nhiều vì nhiều loại snack có quá nhiều phụ gia và chất bảo quản, không rõ nguồn gốc. Từ lúc mua snack bào ngư này cho con, con mình rất thích mà mình cũng yên tâm cho con ăn mà không lo sợ.', en: 'My child loves snacks, especially packaged snacks, but I do not feel comfortable letting them have too much because many contain lots of additives and preservatives and their origins are unclear. Since buying this oyster mushroom snack, my child has loved it, and I feel comfortable letting them eat it without worrying.', zh: '我的孩子很喜欢吃零食，尤其是各种脆片，但很多零食添加剂和防腐剂太多，来源也不清楚，所以我不放心让孩子多吃。自从买了这款平菇零食，孩子很喜欢，我也放心让孩子吃，不再担心。' },
        author: 'Chị Nhi (TP. HCM)',
        source: 'docs/products/07. Snack nam bao ngu.md',
      },
      {
        quote: { vi: 'Lần đầu tiên mình thấy nấm mà làm thành "sì nách" để ăn vặt, rất lạ miệng mà sử dụng cũng cảm thấy yên tâm vì làm từ nấm tươi mà.', en: 'It is the first time I have seen mushrooms made into a “snack” for nibbling. The taste is quite novel, and I feel comfortable eating it because it is made from fresh mushrooms.', zh: '这是我第一次看到菌菇做成“零食”，口味很新奇，因为是用新鲜菌菇做的，吃起来也觉得放心。' },
        author: 'Anh Thanh (Hậu Giang)',
        source: 'docs/products/07. Snack nam bao ngu.md',
      },
    ],
  },
  {
    slug: 'dong-trung-ha-thao-say-thang-hoa',
    name: { vi: 'Đông Trùng Hạ Thảo Sấy Thăng Hoa', en: 'Freeze-Dried Cordyceps', zh: '冻干蛹虫草' },
    category: { text: CATEGORY.freezeDried, source: `${OWNER_HOME} (product name and summary)` },
    summary: {
      text: {
        vi: 'Đông trùng hạ thảo chế biến bằng phương pháp sấy thăng hoa.',
        en: 'Cordyceps, processed by freeze-drying.',
        zh: '采用冷冻干燥工艺加工的蛹虫草。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '08-dong-trung-ha-thao-say-thang-hoa.webp',
      alt: {
        vi: 'Hũ thủy tinh vuông nắp đen đựng đông trùng hạ thảo sấy thăng hoa, bên cạnh vài sợi đông trùng',
        en: 'A square glass jar with a black lid holding freeze-dried cordyceps, with a few strands beside it',
        zh: '黑盖方形玻璃罐装的冻干蛹虫草，旁边放着几根虫草',
      },
      placement: { width: 46, x: 58, surface: 76, bounds: [242, 113, 1241, 1181] },
      plate: false,
    },
    intro: {
      paragraphs: [
        {
          text: {
            vi: 'Đông trùng hạ thảo Nương Farm được nuôi trồng theo mô hình hữu cơ tuần hoàn khép kín tại vùng Bảy Núi, An Giang và chế biến bằng công nghệ sấy thăng hoa.',
            en: 'Nương Farm cordyceps is grown using a closed-loop organic circular farming model in Bảy Núi, An Giang, and processed by freeze-drying.',
            zh: 'Nương Farm 蛹虫草在安江省七山地区以闭环有机循环农业模式培育，并采用冷冻干燥工艺加工。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          text: {
            vi: 'Sản phẩm có đặc tính giòn xốp và mùi thơm nấm tự nhiên, phù hợp để pha trà hoặc kết hợp vào các món ăn hằng ngày.',
            en: 'With a crisp, porous texture and a natural mushroom aroma, the product can be brewed as tea or added to everyday dishes.',
            zh: '产品质地酥脆疏松，带有天然菌菇香气，可用于泡茶或搭配日常菜肴。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
      ],
      facts: [
        {
          label: {
            vi: 'Vùng nuôi trồng',
            en: 'Growing region',
            zh: '种植地区',
          },
          value: {
            vi: 'Bảy Núi, An Giang',
            en: 'Bảy Núi, An Giang',
            zh: '安江省七山',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          label: {
            vi: 'Thương hiệu',
            en: 'Brand',
            zh: '品牌',
          },
          value: {
            vi: 'Nương Farm',
            en: 'Nương Farm',
            zh: 'Nương Farm',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          label: {
            vi: 'Phương pháp chế biến',
            en: 'Processing',
            zh: '加工方式',
          },
          value: {
            vi: 'Sấy thăng hoa',
            en: 'Freeze-drying',
            zh: '冷冻干燥',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          label: {
            vi: 'Xuất xứ',
            en: 'Country of origin',
            zh: '原产国',
          },
          value: {
            vi: 'Việt Nam',
            en: 'Vietnam',
            zh: '越南',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
      ],
    },
    composition: {
      ingredients: {
        text: {
          vi: '100% đông trùng hạ thảo sấy thăng hoa nguyên chất.',
          en: '100% pure freeze-dried cordyceps.',
          zh: '100% 纯冻干蛹虫草。',
        },
        source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
      },
      facts: [
        {
          label: {
            vi: 'Khối lượng tịnh',
            en: 'Net weight',
            zh: '净含量',
          },
          value: {
            vi: '25 g',
            en: '25 g',
            zh: '25 克',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          label: {
            vi: 'Quy cách đóng gói',
            en: 'Packaging',
            zh: '包装',
          },
          value: {
            vi: 'Hũ thủy tinh',
            en: 'Glass jar',
            zh: '玻璃罐',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          label: {
            vi: 'Hạn sử dụng',
            en: 'Shelf life',
            zh: '保质期',
          },
          value: {
            vi: '1 năm kể từ ngày sản xuất',
            en: '1 year from the date of manufacture',
            zh: '自生产日期起 1 年',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
      ],
    },
    usage: {
      preparation: [
        {
          text: {
            vi: 'Pha trà: Cho 5–10 sợi nấm vào ly, rót nước nóng khoảng 80°C và hãm trong 15–20 phút. Sau khi uống trà, có thể ăn cả sợi nấm.',
            en: 'Tea: Place 5–10 strands in a cup, add hot water at about 80°C and steep for 15–20 minutes. The strands can be eaten after drinking the tea.',
            zh: '泡茶：将 5–10 根虫草放入杯中，注入约 80°C 的热水，浸泡 15–20 分钟。饮茶后可食用虫草。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          text: {
            vi: 'Món hầm, canh, súp: Kết hợp với thịt gà hoặc sườn heo.',
            en: 'Stews, soups and broths: Combine with chicken or pork ribs.',
            zh: '炖菜和汤品：可搭配鸡肉或猪排骨。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          text: {
            vi: 'Cháo: Cho vào cháo trắng hoặc cháo thịt bằm.',
            en: 'Congee: Add to plain rice congee or minced-meat congee.',
            zh: '粥品：可加入白粥或肉末粥。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          text: {
            vi: 'Món chưng: Chưng cùng tổ yến, đường phèn, táo đỏ và kỷ tử.',
            en: 'Steamed dishes: Steam with edible bird’s nest, rock sugar, red dates and goji berries.',
            zh: '炖盅：可与燕窝、冰糖、红枣和枸杞一同炖煮。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          text: {
            vi: 'Cho sợi nấm vào khi món ăn sắp chín.',
            en: 'Add the strands when the dish is nearly cooked.',
            zh: '在菜肴快熟时加入虫草。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
      ],
      storage: [
        {
          text: {
            vi: 'Bảo quản nơi khô thoáng, tránh ẩm ướt.',
            en: 'Store in a dry, well-ventilated place away from moisture.',
            zh: '存放于干燥通风处，避免受潮。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          text: {
            vi: 'Hạn sử dụng: 1 năm kể từ ngày sản xuất.',
            en: 'Shelf life: 1 year from the date of manufacture.',
            zh: '保质期：自生产日期起 1 年。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
        {
          text: {
            vi: 'Không sử dụng sản phẩm khi có dấu hiệu hư hỏng, nấm mốc.',
            en: 'Do not use if the product shows signs of spoilage or mould.',
            zh: '产品如有变质或发霉迹象，请勿食用。',
          },
          source: 'docs/products/08. Dong trung ha thao say thang hoa.md',
        },
      ],
    },
  },
  {
    slug: 'tra-hoa-tan-linh-chi',
    name: { vi: 'Trà Hòa Tan Linh Chi', en: 'Instant Lingzhi Tea', zh: '灵芝速溶茶' },
    category: { text: CATEGORY.tea, source: `${OWNER_HOME} (product name and summary)` },
    summary: {
      text: {
        vi: 'Sản phẩm trà hòa tan được phát triển từ nấm linh chi.',
        en: 'An instant tea developed from lingzhi.',
        zh: '以灵芝开发的速溶茶。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '09-tra-hoa-tan-linh-chi-200g.webp',
      alt: {
        vi: 'Hộp thiếc trà hòa tan linh chi màu xanh lá, bên cạnh một chén trà thủy tinh',
        en: 'A green tin of instant lingzhi tea beside a glass cup of tea',
        zh: '绿色灵芝速溶茶铁罐，旁边是一杯茶',
      },
      placement: { width: 47, x: 57, surface: 76, bounds: [218, 127, 1138, 1165] },
      plate: false,
    },
    intro: {
      paragraphs: [
        {
          text: { vi: 'Trà Hòa Tan Linh Chi Hiền Nương Farm được chiết xuất từ nấm linh chi hữu cơ nuôi trồng tại trang trại. Công nghệ hòa tan giúp pha trà nhanh chóng, tiện dùng trong nhịp sống bận rộn.', en: 'Hiền Nương Farm Instant Lingzhi Tea is extracted from organic lingzhi grown on the farm. Its instant format makes preparation quick and convenient for busy daily routines.', zh: 'Hiền Nương Farm 灵芝速溶茶提取自农场种植的有机灵芝。速溶形式冲泡快捷，方便忙碌的日常生活。' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
        {
          text: { vi: 'Trà có hương thơm nhẹ, dễ uống và có thể thưởng thức nóng hoặc lạnh tùy sở thích.', en: 'The tea has a light aroma and a mild taste, and can be enjoyed hot or cold.', zh: '茶香清淡，口感柔和，可根据喜好热饮或冷饮。' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
      ],
      facts: [
        {
          label: { vi: 'Nguồn gốc nguyên liệu', en: 'Ingredient origin', zh: '原料来源' },
          value: { vi: 'Nấm linh chi nuôi trồng tại Hiền Nương Farm', en: 'Lingzhi grown at Hiền Nương Farm', zh: '由 Hiền Nương Farm 种植的灵芝' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
        {
          label: { vi: 'Đơn vị sản xuất', en: 'Producer', zh: '生产单位' },
          value: { vi: 'Hợp tác xã Nông nghiệp Tà Đảnh', en: 'Tà Đảnh Agricultural Cooperative', zh: 'Tà Đảnh 农业合作社' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
        {
          label: { vi: 'Xuất xứ', en: 'Country of origin', zh: '原产国' },
          value: { vi: 'Việt Nam', en: 'Vietnam', zh: '越南' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
      ],
    },
    composition: {
      ingredients: {
        text: { vi: '100% chiết xuất nấm linh chi.', en: '100% lingzhi mushroom extract.', zh: '100% 灵芝提取物。' },
        source: 'docs/products/09. Tra hoa tan linh chi.md',
      },
      facts: [
        {
          label: { vi: 'Quy cách 50 g', en: '50 g format', zh: '50 克规格' },
          value: { vi: 'Hộp giấy, gồm 10 gói × 5 g', en: 'Paper box containing 10 sachets × 5 g', zh: '纸盒，内含 10 包 × 5 克' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
        {
          label: { vi: 'Quy cách 200 g', en: '200 g format', zh: '200 克规格' },
          value: { vi: 'Hũ thiếc hoặc hũ nhựa cao cấp', en: 'Tin or premium plastic jar', zh: '铁罐或优质塑料罐' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
        {
          label: { vi: 'Hạn sử dụng', en: 'Shelf life', zh: '保质期' },
          value: { vi: '3 năm kể từ ngày sản xuất', en: '3 years from the date of manufacture', zh: '自生产日期起 3 年' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
      ],
    },
    usage: {
      preparation: [
        {
          text: { vi: 'Loại hộp 50 g (dạng gói): Pha 1 gói trà với 150–200 ml nước nóng, khuấy đều và thưởng thức.', en: '50 g box (sachets): Mix 1 sachet with 150–200 ml of hot water, stir well and enjoy.', zh: '50 克盒装（袋装）：将 1 包茶加入 150–200 毫升热水，搅拌均匀后饮用。' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
        {
          text: { vi: 'Loại hũ 200 g: Pha 2 muỗng cà phê trà với 150–200 ml nước nóng, khuấy đều và thưởng thức.', en: '200 g jar: Mix 2 teaspoons of tea with 150–200 ml of hot water, stir well and enjoy.', zh: '200 克罐装：将 2 茶匙茶加入 150–200 毫升热水，搅拌均匀后饮用。' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
        {
          text: { vi: 'Có thể dùng nóng hoặc lạnh tùy sở thích.', en: 'Enjoy hot or cold, according to preference.', zh: '可根据喜好热饮或冷饮。' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
      ],
      storage: [
        {
          text: { vi: 'Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và môi trường ẩm thấp. Đóng kín nắp hộp hoặc bọc kín sau khi mở.', en: 'Store in a dry, cool, well-ventilated place away from direct sunlight and humidity. Close the lid or seal the packaging after opening.', zh: '存放于干燥、阴凉通风处，避免阳光直射和潮湿环境。开封后请盖紧盖子或密封包装。' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
        {
          text: { vi: 'Hạn sử dụng: 3 năm kể từ ngày sản xuất.', en: 'Shelf life: 3 years from the date of manufacture.', zh: '保质期：自生产日期起 3 年。' },
          source: 'docs/products/09. Tra hoa tan linh chi.md',
        },
      ],
    },
    reviews: [
      {
        quote: { vi: 'Trà có vị thanh nhẹ dễ uống, cả nhà mình ai cũng dùng.', en: 'The tea has a light, mild taste and is easy to drink. Everyone in my family enjoys it.', zh: '茶味清淡，容易入口，我们全家都喝。' },
        author: 'Chị Thảo (An Giang)',
        source: 'docs/products/09. Tra hoa tan linh chi.md',
      },
      {
        quote: { vi: 'Sản phẩm này phù hợp với người bận rộn như mình, đi làm cả ngày từ sáng tới chiều tối không có thời gian xắt uống.', en: 'This product suits busy people like me. I work all day, from morning until evening, and have no time to slice mushrooms to prepare a drink.', zh: '这款产品适合像我这样忙碌的人。我从早到晚都在上班，没有时间切灵芝来煮水喝。' },
        author: 'Anh Dũng (Cần Thơ)',
        source: 'docs/products/09. Tra hoa tan linh chi.md',
      },
    ],
  },
  {
    slug: 'tra-hoa-tan-linh-chi-trung-thao',
    name: { vi: 'Trà Hòa Tan Linh Chi Trùng Thảo', en: 'Instant Lingzhi & Cordyceps Tea', zh: '灵芝虫草速溶茶' },
    category: { text: CATEGORY.tea, source: `${OWNER_HOME} (product name and summary)` },
    summary: {
      text: {
        vi: 'Trà hòa tan kết hợp linh chi và đông trùng hạ thảo.',
        en: 'An instant tea combining lingzhi and cordyceps.',
        zh: '灵芝与蛹虫草搭配的速溶茶。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '10-tra-linh-chi-trung-thao.webp',
      alt: {
        vi: 'Hộp thiếc trà hòa tan linh chi trùng thảo với hình vẽ linh chi và đông trùng hạ thảo, bên cạnh một chén trà thủy tinh',
        en: 'A tin of instant lingzhi and cordyceps tea illustrated with lingzhi and cordyceps, beside a glass cup of tea',
        zh: '绘有灵芝和虫草图案的灵芝虫草速溶茶铁罐，旁边是一杯茶',
      },
      placement: { width: 47, x: 57, surface: 76, bounds: [197, 153, 1170, 1183] },
      plate: false,
    },
    intro: {
      facts: [
        {
          label: RAW_MATERIAL,
          value: {
            vi: 'Linh chi và đông trùng hạ thảo nuôi trồng tại trang trại',
            en: 'Lingzhi and cordyceps grown on the farm',
            zh: '农场种植的灵芝和蛹虫草',
          },
          source: `${HOME_INTRO}; ${OWNER_HOME}`,
        },
      ],
    },
  },
  {
    slug: 'bao-tu-nam-linh-chi',
    name: { vi: 'Bào Tử Nấm Linh Chi', en: 'Lingzhi Spores', zh: '灵芝孢子' },
    summary: {
      text: {
        vi: 'Sản phẩm từ bào tử của nấm linh chi tại Hiền Nương.',
        en: 'Made from the spores of Hiền Nương’s lingzhi.',
        zh: '取自 Hiền Nương 灵芝孢子的产品。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '11-bao-tu-nam-linh-chi.webp',
      alt: {
        vi: 'Hũ thủy tinh vuông nắp đen đựng bột bào tử linh chi màu nâu đỏ, bên cạnh một chén nhỏ đựng bột',
        en: 'A square glass jar with a black lid holding reddish-brown lingzhi spore powder, beside a small dish of the powder',
        zh: '黑盖方形玻璃罐装的红褐色灵芝孢子粉，旁边是一小碟孢子粉',
      },
      placement: { width: 47, x: 57, surface: 76, bounds: [210, 168, 1201, 1197] },
      plate: false,
    },
    intro: {
      facts: [
        {
          label: RAW_MATERIAL,
          value: { vi: 'Bào tử của nấm linh chi tại Hiền Nương', en: 'Spores of Hiền Nương’s lingzhi', zh: 'Hiền Nương 灵芝的孢子' },
          source: OWNER_HOME,
        },
      ],
    },
  },
  {
    slug: 'dong-trung-ha-thao-ngam-mat-ong',
    name: { vi: 'Đông Trùng Hạ Thảo Ngâm Mật Ong', en: 'Cordyceps in Honey', zh: '蜂蜜浸蛹虫草' },
    summary: {
      text: {
        vi: 'Sự kết hợp giữa đông trùng hạ thảo và mật ong.',
        en: 'Cordyceps paired with honey.',
        zh: '蛹虫草与蜂蜜的结合。',
      },
      source: OWNER_HOME,
    },
    image: {
      file: '12-dong-trung-ha-thao-ngam-mat-ong.webp',
      alt: {
        vi: 'Chai thủy tinh nắp vàng đựng đông trùng hạ thảo ngâm mật ong, bên cạnh một chén thủy tinh nhỏ',
        en: 'A glass bottle with a gold lid holding cordyceps steeped in honey, beside a small glass bowl',
        zh: '金色瓶盖的玻璃瓶装蜂蜜浸蛹虫草，旁边是一个小玻璃碗',
      },
      placement: { width: 48, x: 58, surface: 76, bounds: [358, 114, 1172, 1171] },
      plate: false,
    },
    intro: {
      facts: [
        {
          label: RAW_MATERIAL,
          value: {
            vi: 'Đông trùng hạ thảo nuôi cấy tại trang trại, mật ong',
            en: 'Cordyceps cultivated on the farm; honey',
            zh: '农场培育的蛹虫草；蜂蜜',
          },
          source: `${HOME_INTRO}; ${OWNER_HOME}. Honey origin not sourced — not stated.`,
        },
      ],
    },
  },
];

/* --------------------------------------------------------------------------
   What components receive: plain strings in one language
   -------------------------------------------------------------------------- */

export type TabId = 'gioi-thieu' | 'thanh-phan' | 'cach-dung' | 'ho-so' | 'nhan-xet';

/** Tab order; labels live in the components. */
export const tabIds: TabId[] = ['gioi-thieu', 'thanh-phan', 'cach-dung', 'ho-so', 'nhan-xet'];

export interface ShowroomFact { label: string; value: string }

export interface ShowroomDocument {
  title: string;
  kind: string;
  issuer?: string;
  reference?: string;
  date?: string;
  scope?: string;
  href?: string;
  linkLabel?: string;
  /** href leaves the site. */
  external: boolean;
}

export interface ShowroomRecipe {
  name: string;
  ingredients: string[];
  steps: string[];
  time?: string;
  servings?: string;
  image?: { src: string; width: number; height: number; alt: string };
}

export interface ShowroomReview {
  quote: string;
  author?: string;
  date?: string;
  sourceName?: string;
}

export interface ShowroomItem {
  slug: string;
  name: string;
  category?: string;
  summary: string;
  image: {
    src: string;
    thumb: string;
    width: number;
    height: number;
    alt: string;
    /** Full-image scale and visible-subject alignment, measured against the 3:2 stage. */
    placement: { width: number; x: number; surface: number; bounds: [number, number, number, number] };
    plate: boolean;
  };
  /** Localized link to a dedicated product page. */
  detail?: string;
  intro: { paragraphs: string[]; facts: ShowroomFact[] };
  composition?: { ingredients?: string; facts: ShowroomFact[] };
  usage?: { preparation: string[]; storage: string[]; recipes: ShowroomRecipe[] };
  records?: ShowroomDocument[];
  reviews?: ShowroomReview[];
  /** Tabs with content, in order. Giới thiệu is always present. */
  tabs: TabId[];
}

const facts = (list: RawFact[] | undefined, lang: Locale): ShowroomFact[] =>
  (list ?? []).map((f) => ({ label: f.label[lang], value: f.value[lang] }));

const texts = (list: SourcedText[] | undefined, lang: Locale) => (list ?? []).map((p) => p.text[lang]);

const localizeHref = (href: string, lang: Locale) => (href.startsWith('/') ? localizePath(href, lang) : href);

/** The showroom products in a language. */
export const showroomProducts = (lang: Locale): ShowroomItem[] =>
  raw.map((p) => {
    const src = `/images/products/showroom/${p.image.file}`;
    const composition = p.composition && (p.composition.ingredients || p.composition.facts?.length)
      ? { ingredients: p.composition.ingredients?.text[lang], facts: facts(p.composition.facts, lang) }
      : undefined;
    const usage = p.usage && (p.usage.preparation?.length || p.usage.storage?.length || p.usage.recipes?.length)
      ? {
          preparation: texts(p.usage.preparation, lang),
          storage: texts(p.usage.storage, lang),
          recipes: (p.usage.recipes ?? []).map((r) => ({
            name: r.name[lang],
            ingredients: r.ingredients.map((x) => x[lang]),
            steps: r.steps.map((x) => x[lang]),
            time: r.time?.[lang],
            servings: r.servings?.[lang],
            image: r.image && { ...r.image, alt: r.image.alt[lang] },
          })),
        }
      : undefined;
    const records = p.records?.length
      ? p.records.map((d) => ({
          title: d.title[lang],
          kind: d.kind[lang],
          issuer: d.issuer?.[lang],
          reference: d.reference,
          date: d.date,
          scope: d.scope?.[lang],
          href: d.href && localizeHref(d.href, lang),
          linkLabel: d.linkLabel?.[lang],
          external: !!d.href && !d.href.startsWith('/'),
        }))
      : undefined;
    const reviews = p.reviews?.length
      ? p.reviews.map((r) => ({ quote: r.quote[lang], author: r.author, date: r.date, sourceName: r.sourceName?.[lang] }))
      : undefined;

    const tabs: TabId[] = ['gioi-thieu'];
    if (composition) tabs.push('thanh-phan');
    if (usage) tabs.push('cach-dung');
    if (records) tabs.push('ho-so');
    if (reviews) tabs.push('nhan-xet');

    return {
      slug: p.slug,
      name: lang === 'vi' ? p.name.vi.charAt(0) + p.name.vi.slice(1).toLocaleLowerCase('vi') : p.name[lang],
      category: p.category?.text[lang],
      summary: p.summary.text[lang],
      image: {
        src,
        thumb: `/images/products/studio/${p.slug}-160.webp`,
        width: 1254,
        height: 1254,
        alt: p.image.alt[lang],
        placement: p.image.placement,
        plate: p.image.plate,
      },
      detail: p.detail && localizePath(p.detail, lang),
      intro: { paragraphs: texts(p.intro?.paragraphs, lang), facts: facts(p.intro?.facts, lang) },
      composition,
      usage,
      records,
      reviews,
      tabs,
    };
  });

/** Link that opens a product in the showroom. */
export const showroomHref = (slug: string, lang: Locale) => localizePath(`/san-pham/#${slug}`, lang);
