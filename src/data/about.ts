/**
 * Copy for /ve-chung-toi/ (src/pages/ve-chung-toi/index.astro).
 *
 * Vietnamese: docs/HIEN_NUONG_ABOUT_VI.md (approved). English and Chinese
 * translate it without adding anything; place names, the founders' names
 * and the peaks' names stay in Vietnamese, as elsewhere on the site.
 * Facts are OWNER-VERIFIED: keep "more than" with 4 ha and 40 workers,
 * keep the 100% to the electricity used for growing mushrooms, and the
 * solar system as owned by chị Nương (not built by the founders).
 * Ông Châu Thành Phú and the spawn-making are from Báo An Giang
 * 26.10.2025 (a465150); the owner asked for no source links on the page.
 *
 * Each chapter has one or more pages of whole paragraphs, shortened (with
 * the owner's agreement, 09.10.2026) so that each page fits beside the
 * photograph on common desktop screens. In the pinned stage one page shows
 * at a time (the script breaks further only on screens too short for a
 * page); stacked, the pages follow each other.
 */

import type { Locale } from '../i18n';

/** Chapter anchors and photographs, the same in every language. */
export const chapterMedia = [
  { id: 'cau-chuyen', photo: { src: '/images/about/hai-nguoi-sang-lap.webp', width: 1280, height: 720, position: '34% 50%' } },
  // Frame from the farm's own video (original export, unretouched; the
  // letterbox rows are trimmed).
  { id: 'bay-nui', photo: { src: '/images/about/bay-nui-nui-dong-thot-not.webp', width: 1280, height: 712, position: '50% 50%' } },
  { id: 'co-so', photo: { src: '/images/about/trang-trai-giua-dong-lua.webp', width: 1429, height: 901, position: '45% 50%' } },
  { id: 'nang-luong', photo: { src: '/images/about/mai-dien-mat-troi.webp', width: 1430, height: 804, position: '50% 50%' } },
  { id: 'tuan-hoan', photo: { src: '/images/about/nguyen-lieu-gia-the.webp', width: 1280, height: 820, position: '50% 50%' } },
  { id: 'con-nguoi', photo: { src: '/images/about/chuan-bi-gia-the.webp', width: 1600, height: 1090, position: '50% 55%' } },
] as const;

export interface Fact {
  value: string;
  /** Small word set before the value ("Hơn 4 ha"). */
  pre?: string;
  label: string;
}

/**
 * A paragraph. `withPrevious` keeps it on the same page as the paragraph
 * before (ông Tư Phú stays on the first page, right after the founders).
 */
export type Paragraph = string | { text: string; withPrevious: true };

export interface ChapterPage {
  body: Paragraph[];
  facts?: Fact[];
  /** Further reading, folded under the copy (native disclosure). */
  more?: { summary: string; intro: string; items: [string, string][] };
  steps?: string[];
  /** Link to the circular agriculture page. */
  linkLabel?: string;
}

export interface ChapterCopy {
  label: string;
  /** Lines break only after a comma (, or ，). */
  title: string;
  pages: ChapterPage[];
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
  cue: string;
  storyLabel: string;
  navLabel: string;
  /** Page turner in a chapter: "← Trang trước" · "01 / 02" · "Đọc tiếp →". */
  pager: { prev: string; next: string; page: string };
  chapters: ChapterCopy[];
  /** Intro film block (#video-gioi-thieu); the title is the homepage brand film line. */
  film: { eyebrow: string; title: string; watch: string };
  /** #dinh-huong, after the six chapters. */
  outlook: { title: string; body: string[] };
  closing: { eyebrow: string; title: string; body: string[]; button: string };
}

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
    cue: 'Cuộn để tiếp tục',
    storyLabel: 'Sáu chương của câu chuyện',
    navLabel: 'Các chương',
    pager: { prev: 'Trang trước', next: 'Đọc tiếp', page: 'Trang' },
    chapters: [
      {
        label: 'Câu chuyện',
        title: 'Hai người, một khởi đầu',
        pages: [
          {
            body: [
              'Hiền Nương ghép từ tên của hai người sáng lập: chị Châu Thị Nương và anh Trần Phương Hiền. Năm 2020, hai vợ chồng cùng gây dựng nông trại tại An Giang, bắt đầu công việc trồng nấm trên vùng đất quê hương.',
              { text: 'Chị Nương là con gái ông Châu Thành Phú, thường gọi là ông Tư Phú — lão nông được biết đến là “vua trị phèn” ở vùng Tứ giác Long Xuyên, người tạo ra giống lúa TP từ những năm 1990.', withPrevious: true },
              'Nếu tên tuổi ông Tư Phú gắn với cây lúa và đất phèn, thì chị Nương cùng anh Hiền chọn hướng đi riêng với nấm, phụ phẩm nông nghiệp và điện mặt trời — vẫn trên vùng đất An Giang.',
            ],
            facts: [{ value: '2020', label: 'Năm thành lập' }],
          },
          {
            body: [
              'Ở vùng đất gắn với sản xuất nông nghiệp, phụ phẩm sau mỗi mùa vụ trở thành nguyên liệu cho giá thể trồng nấm — điểm bắt đầu của cách làm Hiền Nương.',
              'Đó cũng là hành trình học hỏi để làm chủ công việc. Theo Báo An Giang, từ chỗ phải mua meo giống thời gian đầu, chị Nương đã tự phân lập giống và làm meo.',
              'Từ khởi đầu năm 2020, câu chuyện tiếp tục qua hai cơ sở, những mái pin đón nắng và cách tận dụng giá thể sau thu hoạch — hành trình hai vợ chồng cùng xây dựng qua từng mùa nấm.',
            ],
          },
        ],
        alt: 'Chị Châu Thị Nương và anh Trần Phương Hiền vẫy tay bên tảng đá khắc tên Trang trại Nông nghiệp Hiền Nương',
      },
      {
        label: 'Bảy Núi',
        title: 'Núi giữa đồng, thốt nốt giữa trời',
        pages: [
          {
            body: [
              'Bảy Núi, còn gọi là Thất Sơn, mang một dáng vẻ riêng giữa miền Tây: những ngọn núi nhô lên giữa đồng ruộng rộng mở, xen cùng hàng thốt nốt vươn cao.',
              'Nơi đây mang dấu ấn văn hóa Khmer qua những ngôi chùa, nghề làm đường thốt nốt và hội đua bò Bảy Núi. Hàng thốt nốt vừa là đường nét trên nền trời, vừa gắn với một nghề truyền thống của người dân.',
              'Đó là không gian quê hương bao quanh câu chuyện Hiền Nương — nơi núi và đồng cùng hiện diện trong nhịp sống làm nông.',
            ],
            more: {
              summary: 'Bảy Núi gồm những ngọn nào?',
              intro: 'Tên Bảy Núi không có nghĩa cả vùng chỉ có bảy ngọn. Thất Sơn được biết đến với bảy ngọn tiêu biểu:',
              items: peaks,
            },
          },
        ],
        alt: 'Cánh đồng lúa xanh điểm hàng thốt nốt, dãy núi vùng Bảy Núi phía xa, nhìn từ trên cao',
      },
      {
        label: 'Hai cơ sở',
        title: 'Từ một nông trại đến hai cơ sở',
        pages: [
          {
            body: [
              'Hiền Nương Farm có hai cơ sở trồng nấm tại Thới Sơn và Tà Đảnh, An Giang, với tổng diện tích hơn 4 ha.',
              'Thới Sơn là cơ sở đầu tiên, quy mô lớn hơn, nơi đặt nền móng cho hoạt động trồng nấm. Tà Đảnh được xây dựng sau, gần nhà chị Châu Thị Nương và anh Trần Phương Hiền hơn.',
              'Từ một đến hai cơ sở, hành trình ấy được nối tiếp bằng công việc mỗi ngày: chuẩn bị giá thể, chăm sóc và thu hoạch.',
            ],
            facts: [
              { value: '02', label: 'Cơ sở' },
              { pre: 'Hơn', value: '4 ha', label: 'Tổng diện tích' },
            ],
          },
          {
            body: [
              'Bên trong nông trại, một mùa nấm đi qua nhiều công đoạn: chuẩn bị giá thể, nuôi trồng, chăm sóc rồi thu hoạch, đưa nguyên liệu ban đầu đến những sản phẩm từ nấm.',
              'Tại cả Thới Sơn và Tà Đảnh, những người sáng lập cùng đội ngũ lao động địa phương góp sức vào công việc ấy. Hai cơ sở là nơi câu chuyện Hiền Nương được tiếp tục mỗi ngày.',
            ],
          },
        ],
        alt: 'Dãy nhà trồng nấm mái lợp tấm pin mặt trời nằm giữa cánh đồng lúa, nhìn từ trên cao',
      },
      {
        label: 'Năng lượng',
        title: 'Nắng nuôi những mùa nấm',
        pages: [
          {
            body: [
              'Phía trên là hệ thống điện mặt trời. Phía dưới là không gian sản xuất nấm. Hai phần cùng hiện diện trên một khu đất.',
              'Nông trại được xây dựng trên khu đất khai thác điện năng lượng mặt trời, với hệ thống do chị Châu Thị Nương sở hữu. 100% điện sử dụng cho hoạt động trồng nấm được cung cấp từ năng lượng mặt trời.',
              'Nắng gắn với nguồn điện, phía dưới là công việc nuôi trồng — một phần trong cách làm nông mà Hiền Nương đang phát triển.',
            ],
            facts: [{ value: '100%', label: 'Điện mặt trời cho hoạt động trồng nấm' }],
          },
        ],
        alt: 'Các dãy nhà mái lợp tấm pin mặt trời giữa cây xanh và hàng thốt nốt, nhìn từ trên cao',
      },
      {
        label: 'Tuần hoàn',
        title: 'Tiếp nối giá trị sau mỗi mùa thu hoạch',
        pages: [
          {
            body: [
              'Cách làm tuần hoàn tại Hiền Nương bắt đầu từ phụ phẩm nông nghiệp, được tận dụng để chuẩn bị giá thể trồng nấm.',
              'Nguyên liệu được xử lý, phối trộn và đóng bịch thành giá thể. Từ đó, nấm được chăm sóc và thu hoạch tại trang trại, dùng tươi hoặc chế biến thành các sản phẩm khác.',
              'Sau mùa thu hoạch, câu chuyện của giá thể vẫn tiếp tục — nối hoạt động trồng nấm với việc nuôi trùn quế, để nguyên liệu được tận dụng thêm một lần nữa.',
            ],
          },
          {
            body: [
              'Giá thể sau thu hoạch được tận dụng làm thức ăn cho trùn quế. Phân trùn sau đó được dùng để bón cây, bổ sung dinh dưỡng hữu cơ cho đất và tiếp nối vòng tuần hoàn.',
              'Cùng với điện mặt trời, việc tận dụng phụ phẩm là một phần trong mô hình nông nghiệp của Hiền Nương.',
            ],
            steps: [
              'Phụ phẩm nông nghiệp',
              'Chuẩn bị giá thể',
              'Nuôi trồng và thu hoạch',
              'Giá thể nuôi trùn quế',
              'Phân trùn bón cây',
            ],
            linkLabel: 'Khám phá vòng tuần hoàn',
          },
        ],
        alt: 'Hai người đội mũ rộng vành ngồi bên đống giá thể trong nhà xưởng, phía trước là những khay nấm trong rơm',
      },
      {
        label: 'Con người',
        title: 'Cùng làm, cùng phát triển',
        pages: [
          {
            body: [
              'Hiền Nương Farm tạo việc làm cho hơn 40 lao động địa phương, đặc biệt là phụ nữ tại vùng Thới Sơn và Tri Tôn, An Giang.',
              'Đằng sau mỗi mùa thu hoạch là công sức của đội ngũ cùng chuẩn bị giá thể, chăm sóc, thu hoạch và hoàn thiện sản phẩm — đưa câu chuyện từ ý tưởng của hai người sáng lập đến công việc của nhiều người.',
              'Qua những hình ảnh đời sống tại trang trại, người xem có thể gặp những con người phía sau mỗi mùa nấm.',
            ],
            facts: [{ value: 'Hơn 40', label: 'Lao động địa phương' }],
          },
          {
            body: [
              'Bên cạnh sản xuất là những cuộc gặp gỡ, chuyến tham quan và dịp chia sẻ cách làm tại trang trại — mở thêm một góc nhìn về Hiền Nương và những mối liên hệ quanh công việc làm nông.',
              'Trong hành trình phát triển, Hiền Nương mong tiếp tục tạo thêm việc làm cho người dân địa phương và mở rộng kết nối với những người cùng quan tâm.',
            ],
          },
        ],
        caption: 'Chăm sóc · Thu hoạch · Chia sẻ',
        alt: 'Những người làm nấm, phần lớn là phụ nữ, ngồi quanh đống giá thể trong xưởng và đóng giá thể vào bịch',
      },
    ],
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
    cue: 'Scroll to continue',
    storyLabel: 'Six chapters of the story',
    navLabel: 'Chapters',
    pager: { prev: 'Previous page', next: 'Read on', page: 'Page' },
    chapters: [
      {
        label: 'Story',
        title: 'Two people, one beginning',
        pages: [
          {
            body: [
              'Hiền Nương joins the names of its founders, Ms. Châu Thị Nương and Mr. Trần Phương Hiền. In 2020 the couple founded the farm in An Giang and began growing mushrooms on their home ground.',
              { text: 'Ms. Nương is the daughter of Mr. Châu Thành Phú (ông Tư Phú), a veteran farmer known as the “vua trị phèn” — “king of acid-soil reclamation” — of the Long Xuyên Quadrangle, who created the TP rice variety in the 1990s.', withPrevious: true },
              'Where ông Tư Phú’s name is tied to rice and acid soil, the couple chose their own path: mushrooms, agricultural by-products and solar power, on the same land of An Giang.',
            ],
            facts: [{ value: '2020', label: 'Year founded' }],
          },
          {
            body: [
              'In a region built on farming, the by-products left after each crop become material for the mushroom-growing substrate — where the Hiền Nương way of working begins.',
              'It has also been a journey of learning to master the work. According to Báo An Giang, from buying spawn in the early days, Ms. Nương went on to isolate her own strains and make her own spawn.',
              'From its beginning in 2020, the story continues through two sites, solar roofs facing the sun and the reuse of substrate after harvest — a journey the couple build together, season by season.',
            ],
          },
        ],
        alt: 'Ms. Châu Thị Nương and Mr. Trần Phương Hiền waving beside the stone engraved with the farm’s name, Trang trại Nông nghiệp Hiền Nương',
      },
      {
        label: 'Bảy Núi',
        title: 'Mountains amid the fields, palms against the sky',
        pages: [
          {
            body: [
              'Bảy Núi, also known as Thất Sơn, has a character of its own in the Mekong Delta: mountains rising from wide open rice fields, among rows of tall palmyra palms.',
              'The region carries the mark of Khmer culture, in its pagodas, its palm-sugar making and the Bảy Núi bull races. The palmyra palms are both lines against the sky and part of a traditional local craft.',
              'This is the homeland around the Hiền Nương story — where mountains and fields are part of the rhythm of farming life.',
            ],
            more: {
              summary: 'Which peaks make up Bảy Núi?',
              intro: 'The name Bảy Núi (“Seven Mountains”) does not mean the region has only seven peaks. Thất Sơn is known for seven representative peaks:',
              items: peaks,
            },
          },
        ],
        alt: 'Green rice fields dotted with palmyra palms, the mountains of the Bảy Núi region in the distance, seen from above',
      },
      {
        label: 'Two sites',
        title: 'From one farm to two sites',
        pages: [
          {
            body: [
              'Hiền Nương Farm grows mushrooms at two sites, in Thới Sơn and Tà Đảnh, An Giang, covering more than 4 ha in total.',
              'Thới Sơn is the first and larger site, where the farm’s mushroom growing was founded. Tà Đảnh was built later, closer to the home of Ms. Châu Thị Nương and Mr. Trần Phương Hiền.',
              'From one site to two, the journey carries on through the work of each day: preparing substrate, tending and harvesting.',
            ],
            facts: [
              { value: '02', label: 'Sites' },
              { pre: 'Over', value: '4 ha', label: 'Total area' },
            ],
          },
          {
            body: [
              'Inside the farm, a mushroom season passes through many stages: preparing substrate, cultivating, tending and harvesting, taking raw materials through to mushroom products.',
              'At both Thới Sơn and Tà Đảnh, the founders and a team of local workers contribute to that work. The two sites are where the Hiền Nương story carries on each day.',
            ],
          },
        ],
        alt: 'A long row of mushroom houses roofed with solar panels among rice fields, seen from above',
      },
      {
        label: 'Energy',
        title: 'Sunlight for every mushroom season',
        pages: [
          {
            body: [
              'Above, a solar power system. Below, the space where mushrooms are grown. The two share one piece of land.',
              'The farm is built on land used to generate solar power, with a system owned by Ms. Châu Thị Nương. 100% of the electricity used for growing mushrooms comes from solar power.',
              'The sun is tied to the power supply; below is the work of cultivation — part of the way of farming Hiền Nương is developing.',
            ],
            facts: [{ value: '100%', label: 'Solar electricity for growing mushrooms' }],
          },
        ],
        alt: 'Rows of buildings roofed with solar panels among green trees and palmyra palms, seen from above',
      },
      {
        label: 'Circularity',
        title: 'Value that continues after every harvest',
        pages: [
          {
            body: [
              'Circular practice at Hiền Nương begins with agricultural by-products, put to use in preparing the mushroom-growing substrate.',
              'The materials are treated, mixed and bagged into substrate. From there, the mushrooms are tended and harvested on the farm, sold fresh or processed into other products.',
              'After the harvest, the substrate’s story goes on — linking mushroom growing with raising earthworms, so the material is put to use once more.',
            ],
          },
          {
            body: [
              'After harvest, the substrate is used as feed for earthworms. The worm castings are then used to fertilise plants, adding organic nutrients to the soil and continuing the cycle.',
              'Together with solar power, using by-products is part of Hiền Nương’s farming model.',
            ],
            steps: [
              'Agricultural by-products',
              'Preparing the substrate',
              'Growing and harvesting',
              'Substrate fed to earthworms',
              'Worm castings to fertilise plants',
            ],
            linkLabel: 'Explore the cycle',
          },
        ],
        alt: 'Two people in wide-brimmed hats sitting by a pile of substrate in the shed, with trays of mushrooms in straw in front',
      },
      {
        label: 'People',
        title: 'Working together, growing together',
        pages: [
          {
            body: [
              'Hiền Nương Farm provides jobs for more than 40 local workers, especially women, in the Thới Sơn and Tri Tôn area of An Giang.',
              'Behind every harvest is a team that prepares the substrate, tends, harvests and finishes the products — taking the story from two founders’ idea to the work of many.',
              'Photographs of daily farm life introduce the people behind every mushroom season.',
            ],
            facts: [{ value: 'Over 40', label: 'Local workers' }],
          },
          {
            body: [
              'Alongside production there are meetings, visits and occasions to share how the farm works — another view of Hiền Nương and the ties formed around farming.',
              'As it grows, Hiền Nương hopes to keep creating jobs for local people and to widen its connections with others who share its interests.',
            ],
          },
        ],
        caption: 'Tending · Harvesting · Sharing',
        alt: 'Mushroom workers, most of them women, sitting around a pile of substrate in the shed and packing it into bags',
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
    cue: '向下滚动继续',
    storyLabel: '故事的六个章节',
    navLabel: '章节',
    pager: { prev: '上一页', next: '继续阅读', page: '页' },
    chapters: [
      {
        label: '故事',
        title: '两个人，一个起点',
        pages: [
          {
            body: [
              '“Hiền Nương”取自两位创始人的名字：Châu Thị Nương 女士和 Trần Phương Hiền 先生。2020年，夫妻二人在安江省共同创立农场，在家乡的土地上开始种菇。',
              { text: 'Nương 女士是 Châu Thành Phú 先生的女儿，人们常称他为 Tư Phú 老人——这位老农在龙川四角地区被誉为“治酸土之王”（vua trị phèn），并在1990年代培育出 TP 水稻品种。', withPrevious: true },
              '如果说 Tư Phú 老人的名字与水稻和酸土相连，那么 Nương 女士和 Hiền 先生则以菌菇、农业副产品和太阳能走出了自己的路——依然在安江这片土地上。',
            ],
            facts: [{ value: '2020', label: '创立年份' }],
          },
          {
            body: [
              '在以农业为本的地方，每季收获后留下的副产品成为种菇基质的原料——这正是 Hiền Nương 做法的起点。',
              '这也是学习掌握工作的旅程。据《安江报》（Báo An Giang）报道，从起初需要购买菌种，到后来 Nương 女士已能自行分离菌种、制作菌种。',
              '从2020年的起点出发，故事延续到两处基地、迎着阳光的太阳能屋顶，以及采收后基质的再利用——这是夫妻二人一季又一季共同建设的旅程。',
            ],
          },
        ],
        alt: 'Châu Thị Nương 女士和 Trần Phương Hiền 先生在刻有农场名称“Trang trại Nông nghiệp Hiền Nương”的石碑旁挥手',
      },
      {
        label: '七山',
        title: '山在田间，糖棕在天际',
        pages: [
          {
            body: [
              '七山（越南语 Bảy Núi，又称 Thất Sơn）在湄公河三角洲独具风貌：一座座山峰从开阔的稻田间拔地而起，其间点缀着一排排高大的糖棕树。',
              '这里带有高棉文化的印记：寺庙、糖棕糖制作，以及七山赛牛节。一排排糖棕树既是天际的线条，也与当地的一门传统手艺相连。',
              '这就是环绕着 Hiền Nương 故事的家乡——山与田共同存在于农耕生活的节奏之中。',
            ],
            more: {
              summary: '七山包括哪些山？',
              intro: '“七山”这个名字并不意味着这里只有七座山。Thất Sơn 以七座具有代表性的山峰而闻名：',
              items: peaks,
            },
          },
        ],
        alt: '从高处俯瞰点缀着糖棕树的绿色稻田，远处是七山地区的群山',
      },
      {
        label: '两处基地',
        title: '从一座农场到两处基地',
        pages: [
          {
            body: [
              'Hiền Nương Farm 在安江省的 Thới Sơn 和 Tà Đảnh 设有两处种菇基地，总面积超过4公顷。',
              'Thới Sơn 是第一处基地，规模较大，是种菇事业奠基的地方。Tà Đảnh 基地建于其后，离 Châu Thị Nương 女士和 Trần Phương Hiền 先生的家更近。',
              '从一处基地到两处基地，这段旅程在每天的工作中延续：准备基质、照料和采收。',
            ],
            facts: [
              { value: '02', label: '基地' },
              { pre: '超过', value: '4 公顷', label: '总面积' },
            ],
          },
          {
            body: [
              '在农场里，一季菌菇要经过许多道工序：准备基质、种植、照料再到采收，把最初的原料变成菌菇产品。',
              '在 Thới Sơn 和 Tà Đảnh，创始人与当地劳动者团队一起为这些工作出力。两处基地是 Hiền Nương 的故事每天延续的地方。',
            ],
          },
        ],
        alt: '稻田间一长排屋顶铺满太阳能板的菇房，俯瞰视角',
      },
      {
        label: '能源',
        title: '阳光滋养每一季菌菇',
        pages: [
          {
            body: [
              '上方是太阳能发电系统，下方是菌菇生产空间。两者同处一片土地。',
              '农场建在利用太阳能发电的土地上，这套系统归 Châu Thị Nương 女士所有。种菇所用的电力100%来自太阳能。',
              '阳光连着电力，下方则是种植工作——这是 Hiền Nương 正在发展的务农方式的一部分。',
            ],
            facts: [{ value: '100%', label: '种菇用电来自太阳能' }],
          },
        ],
        alt: '绿树和糖棕树之间一排排屋顶铺满太阳能板的建筑，俯瞰视角',
      },
      {
        label: '循环',
        title: '每一季收获之后，价值仍在延续',
        pages: [
          {
            body: [
              'Hiền Nương 的循环做法始于农业副产品，它们被用来准备种菇基质。',
              '原料经过处理、混合并装袋，制成基质。之后，菌菇在农场里得到照料和采收，供应鲜菇或加工成其他产品。',
              '采收之后，基质的故事仍在继续——连接种菇和养殖蚯蚓，让原料再被利用一次。',
            ],
          },
          {
            body: [
              '采收后的基质被用作蚯蚓的饲料。蚯蚓粪随后用来给植物施肥，为土壤补充有机养分，让循环继续下去。',
              '与太阳能一起，利用副产品是 Hiền Nương 农业模式的一部分。',
            ],
            steps: [
              '农业副产品',
              '准备基质',
              '种植与采收',
              '基质喂养蚯蚓',
              '蚯蚓粪为植物施肥',
            ],
            linkLabel: '探索循环',
          },
        ],
        alt: '两位戴宽檐帽的人坐在菇房的基质堆旁，前方是一盘盘稻草中的菌菇',
      },
      {
        label: '人们',
        title: '一起劳作，共同成长',
        pages: [
          {
            body: [
              'Hiền Nương Farm 为40多名当地劳动者提供了就业机会，尤其是安江省 Thới Sơn 和 Tri Tôn 一带的女性。',
              '每一季收获的背后，是团队一起准备基质、照料、采收和完善产品的辛劳——让故事从两位创始人的想法，成为许多人共同的工作。',
              '通过农场日常生活的画面，人们可以认识每一季菌菇背后的人。',
            ],
            facts: [{ value: '40+', label: '当地劳动者' }],
          },
          {
            body: [
              '除了生产，这里还有交流、参观和分享种植经验的时刻——为了解 Hiền Nương 及围绕农业形成的联系打开了另一个视角。',
              '在发展的道路上，Hiền Nương 希望继续为当地人创造更多就业机会，并与志同道合的人扩大联系。',
            ],
          },
        ],
        caption: '照料 · 采收 · 分享',
        alt: '一群种菇工人（大多为女性）围坐在菇房的基质堆旁，把基质装进菌袋',
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
