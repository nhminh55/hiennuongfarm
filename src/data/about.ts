/**
 * Copy for /ve-chung-toi/ (src/pages/ve-chung-toi/index.astro).
 *
 * Vietnamese chapters: the six Markdown files in src/content/about/
 * (approved copy, one file per chapter, read in filename order). Each is
 * rendered whole: "## 01 · Label", "### Title", paragraphs, and an
 * optional "#### Question" disclosure with its intro paragraph and table.
 * The opening line, #dinh-huong and the closing come from
 * docs/HIEN_NUONG_ABOUT_VI.md.
 *
 * English and Chinese translate the earlier, shorter Vietnamese copy
 * without adding anything; place names, the founders' names and the
 * peaks' names stay in Vietnamese, as elsewhere on the site.
 * Facts are OWNER-VERIFIED: keep "more than" with 4 ha and 40 workers,
 * keep the 100% to the electricity used for growing mushrooms, and the
 * solar system as owned by chị Nương (not built by the founders). The
 * owner asked for no source links on the page.
 */

import type { Locale } from '../i18n';

export interface Photo {
  src: string;
  width: number;
  height: number;
  /** Smaller file for narrow screens (same crop). */
  small?: { src: string; width: number };
  /** object-position of the crop. */
  position?: string;
}

const about = (name: string, width: number, height: number, position?: string): Photo => ({
  src: `/images/about/${name}.webp`, width, height, position,
  small: { src: `/images/about/${name}-800.webp`, width: 800 },
});

/**
 * Photographs: authentic farm and press images only. Locations are named
 * only where the source says so: Thới Sơn from Dân Việt's report on the
 * visit to Nương Farm, xã Thới Sơn (05.03.2026); Tà Đảnh from the Báo Tin
 * tức caption. No worker is named in a caption.
 */
export const photos = {
  founders: about('hai-nguoi-sang-lap', 1280, 720, '62% 50%'),
  // Frame from the farm's own video (original export, unretouched).
  bayNui: about('bay-nui-nui-dong-thot-not', 1280, 712, '50% 40%'),
  hero: { src: '/images/farm/bay-nui-canh-dong.webp', width: 1672, height: 941, position: '50% 60%' } as Photo,
  thoiSon: {
    src: '/images/dau-an/dv-tham-toan-canh-1800.webp', width: 1800, height: 958, position: '30% 60%',
    small: { src: '/images/dau-an/dv-tham-toan-canh-640.webp', width: 640 },
  } as Photo,
  taDanh: about('trang-trai-giua-dong-lua', 1429, 901, '40% 50%'),
  solar: about('mai-dien-mat-troi', 1430, 804, '50% 50%'),
  substrate: about('nguyen-lieu-gia-the', 1280, 820, '55% 50%'),
  bags: {
    src: '/images/farm/process-dong-bich.webp', width: 1448, height: 1086, position: '50% 50%',
    small: { src: '/images/farm/process-dong-bich-800.webp', width: 800 },
  } as Photo,
  team: about('chuan-bi-gia-the', 1600, 1090, '50% 55%'),
  harvest: {
    src: '/images/dau-an/nd-khmer-thu-hoach-1280.webp', width: 1280, height: 619, position: '50% 50%',
    small: { src: '/images/dau-an/nd-khmer-thu-hoach-640.webp', width: 640 },
  } as Photo,
};
export type PhotoKey = keyof typeof photos;

/** Chapter anchors, in chapter order (the same in every language). */
export const chapterIds = ['cau-chuyen', 'bay-nui', 'co-so', 'nang-luong', 'tuan-hoan', 'con-nguoi'] as const;

/** One chapter as the page renders it. */
export interface StoryChapter {
  id: (typeof chapterIds)[number];
  num: string;
  /** Kicker beside the number ("Câu chuyện Hiền Nương"). */
  label: string;
  title: string;
  paragraphs: string[];
  /** "Bảy Núi gồm những ngọn nào?": opens in place under the chapter text. */
  more?: { summary: string; intro: string; head?: [string, string]; rows: [string, string][] };
}

interface MediaCopy {
  alt: string;
  caption?: string;
}

export interface AboutCopy {
  pageTitle: string;
  description: string;
  home: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroAlt: string;
  navLabel: string;
  /** Short chapter names for the chapter bar. */
  nav: string[];
  /** The inline quotation in chapter 01 (must appear in its prose). */
  quote?: string;
  circularLink: string;
  media: Record<Exclude<PhotoKey, 'hero'>, MediaCopy>;
  /** English and Chinese chapters; Vietnamese reads the Markdown files. */
  chapters?: { label: string; title: string; paragraphs: string[]; more?: StoryChapter['more'] }[];
  /** Intro film block (#video-gioi-thieu); the title is the homepage brand film line. */
  film: { eyebrow: string; title: string; watch: string };
  /** #dinh-huong, after the six chapters. */
  outlook: { title: string; body: string[] };
  closing: { eyebrow: string; title: string; body: string[]; button: string };
}

/* Vietnamese chapters from Markdown ----------------------------------------- */

const sources = import.meta.glob<string>('../content/about/*.md', { query: '?raw', import: 'default', eager: true });

// Only the forms the chapter files use; anything else stops the build
// rather than printing Markdown syntax on the page.
const parseChapter = (file: string, md: string, index: number): StoryChapter => {
  const fail = (why: string): never => { throw new Error(`${file}: ${why}`); };
  const blocks = md.replace(/\r\n?/g, '\n').trim().split(/\n\s*\n/).map((b) => b.trim());
  const head = /^## (\d+) · (.+)$/.exec(blocks.shift() ?? '') ?? fail('expected "## NN · Label" first');
  const title = /^### (.+)$/.exec(blocks.shift() ?? '')?.[1] ?? fail('expected "### Title" second');
  const chapter: StoryChapter = { id: chapterIds[index], num: head[1], label: head[2], title, paragraphs: [] };
  for (const block of blocks) {
    const summary = /^#### (.+)$/.exec(block)?.[1];
    if (summary) {
      if (chapter.more) fail('one disclosure per chapter');
      chapter.more = { summary, intro: '', rows: [] };
    } else if (block.startsWith('|')) {
      if (!chapter.more) fail('a table belongs under a "####" disclosure');
      const cells = block.split('\n').map((line) => line.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      const [header, , ...rows] = cells;
      if (cells.some((row) => row.length !== 2)) fail('the disclosure table has two columns');
      chapter.more!.head = header as [string, string];
      chapter.more!.rows = rows as [string, string][];
    } else {
      if (/^#|[*_`[\]<>]/.test(block)) fail(`unsupported Markdown in: ${block.slice(0, 60)}`);
      const text = block.replace(/\s*\n\s*/g, ' ');
      if (chapter.more) {
        if (chapter.more.intro) fail('one paragraph before the disclosure table');
        chapter.more.intro = text;
      } else {
        chapter.paragraphs.push(text);
      }
    }
  }
  return chapter;
};

const viChapters = Object.keys(sources).sort().map((file, i) => parseChapter(file, sources[file], i));
if (viChapters.length !== chapterIds.length) {
  throw new Error(`src/content/about/: expected ${chapterIds.length} chapter files, found ${viChapters.length}`);
}

/** The six chapters in a language. */
export const storyChapters = (lang: Locale): StoryChapter[] => {
  const copy = aboutCopy[lang].chapters;
  if (!copy) return viChapters;
  return copy.map((chapter, i) => ({ id: chapterIds[i], num: String(i + 1).padStart(2, '0'), ...chapter }));
};

/* Copy ---------------------------------------------------------------------- */

// The seven peaks: Vietnamese name — Sino-Vietnamese name, in every language.
const peaks: [string, string][] = [
  ['Núi Cấm', 'Thiên Cấm Sơn'],
  ['Núi Cô Tô', 'Phụng Hoàng Sơn'],
  ['Núi Dài', 'Ngọa Long Sơn'],
  ['Núi Két', 'Anh Vũ Sơn'],
  ['Núi Tượng', 'Liên Hoa Sơn'],
  ['Núi Dài Năm Giếng', 'Ngũ Hồ Sơn'],
  ['Núi Nước', 'Thủy Đài Sơn'],
];

export const aboutCopy: Record<Locale, AboutCopy> = {
  vi: {
    pageTitle: 'Về chúng tôi',
    description: 'Câu chuyện Hiền Nương: một hành trình làm nông từ vùng Bảy Núi, An Giang — từ hai người sáng lập năm 2020 đến hai cơ sở trồng nấm, điện mặt trời, cách làm tuần hoàn và những người cùng làm.',
    home: 'Trang chủ',
    eyebrow: 'Về chúng tôi',
    title: 'Câu chuyện Hiền Nương',
    lead: 'Một hành trình làm nông từ vùng Bảy Núi.',
    heroAlt: 'Cánh đồng lúa xanh vùng Bảy Núi điểm những cây thốt nốt, nhìn từ trên cao',
    navLabel: 'Các chương',
    nav: ['Câu chuyện', 'Bảy Núi', 'Hai cơ sở', 'Năng lượng', 'Tuần hoàn', 'Con người'],
    circularLink: 'Khám phá vòng tuần hoàn',
    media: {
      founders: { alt: 'Chị Châu Thị Nương và anh Trần Phương Hiền vẫy tay bên tảng đá khắc tên Trang trại Nông nghiệp Hiền Nương' },
      bayNui: { alt: 'Cánh đồng lúa xanh điểm hàng thốt nốt, dãy núi vùng Bảy Núi phía xa, nhìn từ trên cao' },
      thoiSon: { alt: 'Người lao động đóng giá thể quanh đống nguyên liệu trong xưởng làm phôi, khách tham quan đứng quan sát', caption: 'Thới Sơn — cơ sở đầu tiên' },
      taDanh: { alt: 'Dãy nhà trồng nấm lợp tấm pin mặt trời chạy dọc cánh đồng lúa xanh, nhìn từ trên cao', caption: 'Tà Đảnh — cơ sở xây dựng sau' },
      solar: { alt: 'Các dãy nhà mái lợp tấm pin mặt trời giữa cây xanh và hàng thốt nốt, nhìn từ trên cao' },
      substrate: { alt: 'Hai người đội mũ rộng vành ngồi bên đống nguyên liệu giá thể trong nhà xưởng, phía trước là những khay nấm trong rơm', caption: 'Nguyên liệu cho giá thể trồng nấm' },
      bags: { alt: 'Đôi tay xếp những bịch phôi nấm vào giỏ sắt', caption: 'Giá thể được đóng bịch' },
      team: { alt: 'Những người làm nấm, phần lớn là phụ nữ, ngồi quanh đống giá thể trong xưởng và đóng giá thể vào bịch', caption: 'Chuẩn bị giá thể' },
      harvest: { alt: 'Hai người đội nón bê rổ nấm linh chi vừa thu hoạch giữa những hàng phôi trên nền rơm', caption: 'Thu hoạch nấm' },
    },
    film: { eyebrow: 'Video giới thiệu', title: 'Một vòng tuần hoàn, bắt đầu từ Bảy Núi.', watch: 'Xem phim' },
    outlook: {
      title: 'Định hướng phát triển',
      body: [
        'Hiền Nương hướng đến việc tiếp tục hoàn thiện chất lượng sản phẩm, phát triển cách làm nông kết hợp năng lượng mặt trời và tận dụng phụ phẩm nông nghiệp.',
        'Trong hành trình ấy, chúng tôi mong tạo thêm cơ hội việc làm cho người dân địa phương, mở rộng kết nối với các đối tác và đưa sản phẩm của nông trại đến gần hơn với người tiêu dùng.',
      ],
    },
    closing: {
      eyebrow: 'Liên hệ',
      title: 'Kết nối cùng Hiền Nương',
      body: [
        'Nếu bạn quan tâm đến sản phẩm, muốn tìm hiểu mô hình hoặc trao đổi cơ hội hợp tác, chúng tôi mong được trò chuyện cùng bạn.',
        'Mỗi cuộc gặp là một cơ hội để chia sẻ kinh nghiệm, hiểu thêm nhu cầu của nhau và tìm hướng đồng hành phù hợp.',
      ],
      button: 'Trao đổi cùng chúng tôi',
    },
  },

  en: {
    pageTitle: 'About us',
    description: 'The Hiền Nương story: a farming journey from the Bảy Núi region of An Giang, Vietnam — from two founders in 2020 to two mushroom-growing sites, solar power, circular practice and the people who work together.',
    home: 'Home',
    eyebrow: 'About us',
    title: 'The Hiền Nương story',
    lead: 'A farming journey from the Bảy Núi region.',
    heroAlt: 'Green rice fields of the Bảy Núi region dotted with palmyra palms, seen from above',
    navLabel: 'Chapters',
    nav: ['Story', 'Bảy Núi', 'Two sites', 'Energy', 'Circularity', 'People'],
    circularLink: 'Explore the cycle',
    media: {
      founders: { alt: 'Ms. Châu Thị Nương and Mr. Trần Phương Hiền waving beside the stone engraved with the farm’s name, Trang trại Nông nghiệp Hiền Nương' },
      bayNui: { alt: 'Green rice fields dotted with palmyra palms, the mountains of the Bảy Núi region in the distance, seen from above' },
      thoiSon: { alt: 'Workers bagging substrate around a pile of material in the spawn shed while visitors look on', caption: 'Thới Sơn — the first site' },
      taDanh: { alt: 'A long row of mushroom houses roofed with solar panels along green rice fields, seen from above', caption: 'Tà Đảnh — built later' },
      solar: { alt: 'Rows of buildings roofed with solar panels among green trees and palmyra palms, seen from above' },
      substrate: { alt: 'Two people in wide-brimmed hats sitting by a pile of substrate material in the shed, with trays of mushrooms in straw in front', caption: 'Material for the growing substrate' },
      bags: { alt: 'Hands placing bags of mushroom substrate into a wire basket', caption: 'Substrate packed into bags' },
      team: { alt: 'Mushroom workers, most of them women, sitting around a pile of substrate in the shed and packing it into bags', caption: 'Preparing substrate' },
      harvest: { alt: 'Two people in hats carrying baskets of freshly harvested lingzhi between rows of substrate on straw', caption: 'Harvesting mushrooms' },
    },
    chapters: [
      {
        label: 'Story',
        title: 'Two people, one beginning',
        paragraphs: [
          'Hiền Nương joins the names of its founders, Ms. Châu Thị Nương and Mr. Trần Phương Hiền. In 2020 the couple founded the farm in An Giang and began growing mushrooms on their home ground.',
          'Ms. Nương is the daughter of Mr. Châu Thành Phú (ông Tư Phú), a veteran farmer known as the “vua trị phèn” — “king of acid-soil reclamation” — of the Long Xuyên Quadrangle, who created the TP rice variety in the 1990s.',
          'Where ông Tư Phú’s name is tied to rice and acid soil, the couple chose their own path: mushrooms, agricultural by-products and solar power, on the same land of An Giang.',
          'In a region built on farming, the by-products left after each crop become material for the mushroom-growing substrate — where the Hiền Nương way of working begins.',
          'It has also been a journey of learning to master the work. According to Báo An Giang, from buying spawn in the early days, Ms. Nương went on to isolate her own strains and make her own spawn.',
          'From its beginning in 2020, the story continues through two sites, solar roofs facing the sun and the reuse of substrate after harvest — a journey the couple build together, season by season.',
        ],
      },
      {
        label: 'Bảy Núi',
        title: 'Mountains amid the fields, palms against the sky',
        paragraphs: [
          'Bảy Núi, also known as Thất Sơn, has a character of its own in the Mekong Delta: mountains rising from wide open rice fields, among rows of tall palmyra palms.',
          'The region carries the mark of Khmer culture, in its pagodas, its palm-sugar making and the Bảy Núi bull races. The palmyra palms are both lines against the sky and part of a traditional local craft.',
          'This is the homeland around the Hiền Nương story — where mountains and fields are part of the rhythm of farming life.',
        ],
        more: {
          summary: 'Which peaks make up Bảy Núi?',
          intro: 'The name Bảy Núi (“Seven Mountains”) does not mean the region has only seven peaks. Thất Sơn is known for seven representative peaks:',
          head: ['Common name', 'Sino-Vietnamese name'],
          rows: peaks,
        },
      },
      {
        label: 'Two sites',
        title: 'From one farm to two sites',
        paragraphs: [
          'Hiền Nương Farm grows mushrooms at two sites, in Thới Sơn and Tà Đảnh, An Giang, covering more than 4 ha in total.',
          'Thới Sơn is the first and larger site, where the farm’s mushroom growing was founded. Tà Đảnh was built later, closer to the home of Ms. Châu Thị Nương and Mr. Trần Phương Hiền.',
          'From one site to two, the journey carries on through the work of each day: preparing substrate, tending and harvesting.',
          'Inside the farm, a mushroom season passes through many stages: preparing substrate, cultivating, tending and harvesting, taking raw materials through to mushroom products.',
          'At both Thới Sơn and Tà Đảnh, the founders and a team of local workers contribute to that work. The two sites are where the Hiền Nương story carries on each day.',
        ],
      },
      {
        label: 'Energy',
        title: 'Sunlight for every mushroom season',
        paragraphs: [
          'Above, a solar power system. Below, the space where mushrooms are grown. The two share one piece of land.',
          'The farm is built on land used to generate solar power, with a system owned by Ms. Châu Thị Nương. 100% of the electricity used for growing mushrooms comes from solar power.',
          'The sun is tied to the power supply; below is the work of cultivation — part of the way of farming Hiền Nương is developing.',
        ],
      },
      {
        label: 'Circularity',
        title: 'Value that continues after every harvest',
        paragraphs: [
          'Circular practice at Hiền Nương begins with agricultural by-products, put to use in preparing the mushroom-growing substrate.',
          'The materials are treated, mixed and bagged into substrate. From there, the mushrooms are tended and harvested on the farm, sold fresh or processed into other products.',
          'After the harvest, the substrate’s story goes on — linking mushroom growing with raising earthworms, so the material is put to use once more.',
          'After harvest, the substrate is used as feed for earthworms. The worm castings are then used to fertilise plants, adding organic nutrients to the soil and continuing the cycle.',
          'Together with solar power, using by-products is part of Hiền Nương’s farming model.',
        ],
      },
      {
        label: 'People',
        title: 'Working together, growing together',
        paragraphs: [
          'Hiền Nương Farm provides jobs for more than 40 local workers, especially women, in the Thới Sơn and Tri Tôn area of An Giang.',
          'Behind every harvest is a team that prepares the substrate, tends, harvests and finishes the products — taking the story from two founders’ idea to the work of many.',
          'Photographs of daily farm life introduce the people behind every mushroom season.',
          'Alongside production there are meetings, visits and occasions to share how the farm works — another view of Hiền Nương and the ties formed around farming.',
          'As it grows, Hiền Nương hopes to keep creating jobs for local people and to widen its connections with others who share its interests.',
        ],
      },
    ],
    film: { eyebrow: 'Introduction video', title: 'A cycle that begins in Bảy Núi.', watch: 'Watch the film' },
    outlook: {
      title: 'Looking ahead',
      body: [
        'Hiền Nương aims to keep improving the quality of its products and to develop a way of farming that combines solar power with the use of agricultural by-products.',
        'Along the way, we hope to create more jobs for local people, widen our connections with partners and bring the farm’s products closer to consumers.',
      ],
    },
    closing: {
      eyebrow: 'Contact',
      title: 'Connect with Hiền Nương',
      body: [
        'If you are interested in our products, would like to learn about our model or discuss partnership opportunities, we would be glad to talk with you.',
        'Every meeting is a chance to share experience, understand each other’s needs and find the right way to work together.',
      ],
      button: 'Talk with us',
    },
  },

  zh: {
    pageTitle: '关于我们',
    description: 'Hiền Nương 的故事：一段源自越南安江省七山地区的农耕旅程——从2020年的两位创始人，到两处种菇基地、太阳能发电、循环做法，以及一起劳作的人们。',
    home: '首页',
    eyebrow: '关于我们',
    title: 'Hiền Nương 的故事',
    lead: '一段源自七山地区的农耕旅程。',
    heroAlt: '从高处俯瞰七山地区点缀着糖棕树的绿色稻田',
    navLabel: '章节',
    nav: ['故事', '七山', '两处基地', '能源', '循环', '人们'],
    circularLink: '探索循环',
    media: {
      founders: { alt: 'Châu Thị Nương 女士和 Trần Phương Hiền 先生在刻有农场名称“Trang trại Nông nghiệp Hiền Nương”的石碑旁挥手' },
      bayNui: { alt: '从高处俯瞰点缀着糖棕树的绿色稻田，远处是七山地区的群山' },
      thoiSon: { alt: '工人们在菌包车间里围着原料堆装填基质，访客在一旁观看', caption: 'Thới Sơn——第一处基地' },
      taDanh: { alt: '一长排屋顶铺满太阳能板的菇房沿着绿色稻田延伸，俯瞰视角', caption: 'Tà Đảnh——后来建成的基地' },
      solar: { alt: '绿树和糖棕树之间一排排屋顶铺满太阳能板的建筑，俯瞰视角' },
      substrate: { alt: '两位戴宽檐帽的人坐在菇房的基质原料堆旁，前方是一盘盘稻草中的菌菇', caption: '种菇基质的原料' },
      bags: { alt: '一双手把菌包放进铁丝筐', caption: '装袋的基质' },
      team: { alt: '一群种菇工人（大多为女性）围坐在菇房的基质堆旁，把基质装进菌袋', caption: '准备基质' },
      harvest: { alt: '两位戴帽子的人在铺着稻草的菌包行间端着刚采收的灵芝', caption: '采收菌菇' },
    },
    chapters: [
      {
        label: '故事',
        title: '两个人，一个起点',
        paragraphs: [
          '“Hiền Nương”取自两位创始人的名字：Châu Thị Nương 女士和 Trần Phương Hiền 先生。2020年，夫妻二人在安江省共同创立农场，在家乡的土地上开始种菇。',
          'Nương 女士是 Châu Thành Phú 先生的女儿，人们常称他为 Tư Phú 老人——这位老农在龙川四角地区被誉为“治酸土之王”（vua trị phèn），并在1990年代培育出 TP 水稻品种。',
          '如果说 Tư Phú 老人的名字与水稻和酸土相连，那么 Nương 女士和 Hiền 先生则以菌菇、农业副产品和太阳能走出了自己的路——依然在安江这片土地上。',
          '在以农业为本的地方，每季收获后留下的副产品成为种菇基质的原料——这正是 Hiền Nương 做法的起点。',
          '这也是学习掌握工作的旅程。据《安江报》（Báo An Giang）报道，从起初需要购买菌种，到后来 Nương 女士已能自行分离菌种、制作菌种。',
          '从2020年的起点出发，故事延续到两处基地、迎着阳光的太阳能屋顶，以及采收后基质的再利用——这是夫妻二人一季又一季共同建设的旅程。',
        ],
      },
      {
        label: '七山',
        title: '山在田间，糖棕在天际',
        paragraphs: [
          '七山（越南语 Bảy Núi，又称 Thất Sơn）在湄公河三角洲独具风貌：一座座山峰从开阔的稻田间拔地而起，其间点缀着一排排高大的糖棕树。',
          '这里带有高棉文化的印记：寺庙、糖棕糖制作，以及七山赛牛节。一排排糖棕树既是天际的线条，也与当地的一门传统手艺相连。',
          '这就是环绕着 Hiền Nương 故事的家乡——山与田共同存在于农耕生活的节奏之中。',
        ],
        more: {
          summary: '七山包括哪些山？',
          intro: '“七山”这个名字并不意味着这里只有七座山。Thất Sơn 以七座具有代表性的山峰而闻名：',
          head: ['常用名', '汉越名'],
          rows: peaks,
        },
      },
      {
        label: '两处基地',
        title: '从一座农场到两处基地',
        paragraphs: [
          'Hiền Nương Farm 在安江省的 Thới Sơn 和 Tà Đảnh 设有两处种菇基地，总面积超过4公顷。',
          'Thới Sơn 是第一处基地，规模较大，是种菇事业奠基的地方。Tà Đảnh 基地建于其后，离 Châu Thị Nương 女士和 Trần Phương Hiền 先生的家更近。',
          '从一处基地到两处基地，这段旅程在每天的工作中延续：准备基质、照料和采收。',
          '在农场里，一季菌菇要经过许多道工序：准备基质、种植、照料再到采收，把最初的原料变成菌菇产品。',
          '在 Thới Sơn 和 Tà Đảnh，创始人与当地劳动者团队一起为这些工作出力。两处基地是 Hiền Nương 的故事每天延续的地方。',
        ],
      },
      {
        label: '能源',
        title: '阳光滋养每一季菌菇',
        paragraphs: [
          '上方是太阳能发电系统，下方是菌菇生产空间。两者同处一片土地。',
          '农场建在利用太阳能发电的土地上，这套系统归 Châu Thị Nương 女士所有。种菇所用的电力100%来自太阳能。',
          '阳光连着电力，下方则是种植工作——这是 Hiền Nương 正在发展的务农方式的一部分。',
        ],
      },
      {
        label: '循环',
        title: '每一季收获之后，价值仍在延续',
        paragraphs: [
          'Hiền Nương 的循环做法始于农业副产品，它们被用来准备种菇基质。',
          '原料经过处理、混合并装袋，制成基质。之后，菌菇在农场里得到照料和采收，供应鲜菇或加工成其他产品。',
          '采收之后，基质的故事仍在继续——连接种菇和养殖蚯蚓，让原料再被利用一次。',
          '采收后的基质被用作蚯蚓的饲料。蚯蚓粪随后用来给植物施肥，为土壤补充有机养分，让循环继续下去。',
          '与太阳能一起，利用副产品是 Hiền Nương 农业模式的一部分。',
        ],
      },
      {
        label: '人们',
        title: '一起劳作，共同成长',
        paragraphs: [
          'Hiền Nương Farm 为40多名当地劳动者提供了就业机会，尤其是安江省 Thới Sơn 和 Tri Tôn 一带的女性。',
          '每一季收获的背后，是团队一起准备基质、照料、采收和完善产品的辛劳——让故事从两位创始人的想法，成为许多人共同的工作。',
          '通过农场日常生活的画面，人们可以认识每一季菌菇背后的人。',
          '除了生产，这里还有交流、参观和分享种植经验的时刻——为了解 Hiền Nương 及围绕农业形成的联系打开了另一个视角。',
          '在发展的道路上，Hiền Nương 希望继续为当地人创造更多就业机会，并与志同道合的人扩大联系。',
        ],
      },
    ],
    film: { eyebrow: '介绍视频', title: '一个循环，从七山开始。', watch: '观看影片' },
    outlook: {
      title: '发展方向',
      body: [
        'Hiền Nương 致力于继续提升产品质量，发展结合太阳能与农业副产品利用的务农方式。',
        '在这段旅程中，我们希望为当地人创造更多就业机会，扩大与合作伙伴的联系，让农场的产品更贴近消费者。',
      ],
    },
    closing: {
      eyebrow: '联系我们',
      title: '与 Hiền Nương 联系',
      body: [
        '如果您对我们的产品感兴趣，想了解我们的模式，或希望洽谈合作机会，我们很期待与您交流。',
        '每一次见面，都是分享经验、了解彼此需求、找到合适合作方式的机会。',
      ],
      button: '与我们交流',
    },
  },
};
