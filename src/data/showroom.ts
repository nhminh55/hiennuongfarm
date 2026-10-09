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
            vi: 'Tai nấm linh chi phát triển từ bịch phôi đặt trên lớp rơm.',
            en: 'A lingzhi cap growing from a spawn bag set on a layer of straw.',
            zh: '灵芝从铺在稻草上的菌袋中长出。',
          },
          source: `${PRODUCT_NOTES}:45 (en :94, zh :116)`,
        },
      ],
      facts: [MAIN_LINE, GROWING_REGION],
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
      facts: [
        {
          label: RAW_MATERIAL,
          value: { vi: 'Nấm mối đen nuôi trồng tại trang trại', en: 'Black termite mushroom grown on the farm', zh: '农场种植的黑皮鸡枞菌' },
          source: `${HOME_INTRO}; ${OWNER_HOME}`,
        },
        { label: PROCESS, value: FREEZE_DRIED, source: `${OWNER_HOME} (product name and summary)` },
        {
          label: { vi: 'Đơn vị sản xuất', en: 'Producer', zh: '生产单位' },
          value: { vi: 'Hợp tác xã Nông nghiệp Tà Đảnh', en: 'Tà Đảnh Agricultural Cooperative (Hợp tác xã Nông nghiệp Tà Đảnh)', zh: 'Tà Đảnh 农业合作社（Hợp tác xã Nông nghiệp Tà Đảnh）' },
          source: `${TCB_02}, mục I và II.5 (p.2–3); Phụ lục 2 (p.6)`,
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
          vi: 'Nấm mối đen sấy thăng hoa (100%)',
          en: 'Freeze-dried black termite mushroom (100%)',
          zh: '冻干黑皮鸡枞菌（100%）',
        },
        source: `${TCB_02}, Phụ lục 2 – Mẫu nội dung ghi nhãn (p.6)`,
      },
    },
    usage: {
      preparation: [
        {
          text: {
            vi: 'Rửa sạch và ngâm nấm trong nước khoảng 10 – 15 phút để nấm trở lại độ mềm tự nhiên. Sử dụng để chế biến các món ăn như xào, nấu hoặc hầm.',
            en: 'Rinse, then soak the mushrooms in water for about 10–15 minutes until they return to their natural softness. Use in dishes such as stir-fries, simmered dishes or stews.',
            zh: '洗净后将菌菇在水中浸泡约 10–15 分钟，使其恢复自然柔软。可用于炒、煮或炖等菜肴。',
          },
          source: `${TCB_02}, Phụ lục 2 – Hướng dẫn sử dụng (p.6)`,
        },
      ],
      storage: [
        {
          text: {
            vi: 'Bảo quản trong túi kín, đặt ở nơi khô ráo và thoáng mát. Tránh để sản phẩm dưới ánh nắng mặt trời hoặc nơi có nhiệt độ cao.',
            en: 'Keep in a sealed bag in a dry, cool, well-ventilated place. Keep the product out of the sun and away from high temperatures.',
            zh: '密封袋装，存放于干燥、阴凉通风处。避免阳光直射或高温环境。',
          },
          source: `${TCB_02}, Phụ lục 2 – Bảo quản (p.6)`,
        },
        {
          text: {
            vi: 'Không sử dụng khi sản phẩm có mùi lạ, có dấu hiệu hư hỏng hoặc đã hết hạn sử dụng.',
            en: 'Do not use if the product has an unusual smell, shows signs of spoilage or is past its expiry date.',
            zh: '产品如有异味、变质迹象或已过保质期，请勿食用。',
          },
          source: `${TCB_02}, Phụ lục 2 – Khuyến cáo (p.6)`,
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
      facts: [
        {
          label: RAW_MATERIAL,
          value: { vi: 'Nấm mối đen của Hiền Nương', en: 'Hiền Nương’s black termite mushrooms', zh: 'Hiền Nương 的黑皮鸡枞菌' },
          source: OWNER_HOME,
        },
      ],
    },
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
      facts: [
        {
          label: RAW_MATERIAL,
          value: { vi: 'Nấm bào ngư của Hiền Nương', en: 'Hiền Nương’s oyster mushrooms', zh: 'Hiền Nương 的平菇' },
          source: OWNER_HOME,
        },
      ],
    },
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
      facts: [
        {
          label: RAW_MATERIAL,
          value: { vi: 'Đông trùng hạ thảo nuôi cấy tại trang trại', en: 'Cordyceps cultivated on the farm', zh: '农场培育的蛹虫草' },
          source: `${HOME_INTRO}; ${OWNER_HOME}`,
        },
        { label: PROCESS, value: FREEZE_DRIED, source: `${OWNER_HOME} (product name and summary)` },
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
      facts: [
        {
          label: RAW_MATERIAL,
          value: { vi: 'Nấm linh chi nuôi trồng tại trang trại', en: 'Lingzhi grown on the farm', zh: '农场种植的灵芝' },
          source: `${HOME_INTRO}; ${OWNER_HOME}`,
        },
      ],
    },
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
