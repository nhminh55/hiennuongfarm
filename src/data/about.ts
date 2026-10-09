/**
 * Copy for /ve-chung-toi/ (src/pages/ve-chung-toi/index.astro).
 *
 * Vietnamese: docs/HIEN_NUONG_ABOUT_VI.md (approved). English and Chinese
 * translate it without adding anything; place names, the founders' names
 * and the peaks' names stay in Vietnamese, as elsewhere on the site.
 * Facts are OWNER-VERIFIED: keep "more than" with 4 ha and 40 workers, and
 * keep the 100% to the electricity used for growing mushrooms.
 */

import type { Locale } from '../i18n';

/** Chapter anchors and photographs, the same in every language. */
export const chapterMedia = [
  { id: 'cau-chuyen', photo: { src: '/images/about/hai-nguoi-sang-lap.webp', width: 1280, height: 720, position: '34% 50%' } },
  // Frame from the farm's own video (original export, unretouched; the
  // letterbox rows are trimmed).
  { id: 'bay-nui', photo: { src: '/images/about/bay-nui-nui-dong-thot-not.webp', width: 1280, height: 712, position: '50% 50%' } },
  { id: 'hai-co-so', photo: { src: '/images/about/trang-trai-giua-dong-lua.webp', width: 1429, height: 901, position: '45% 50%' } },
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

export interface ChapterCopy {
  label: string;
  /** Lines break only after a comma (, or ，). */
  title: string;
  body: string[];
  facts: Fact[];
  alt: string;
  caption?: string;
  steps?: string[];
  /** Link to the circular agriculture page. */
  linkLabel?: string;
  /** Further reading, folded under the copy (native disclosure). */
  more?: { summary: string; intro: string; items: [string, string][] };
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
  sourceLabel: string;
  newTab: string;
  chapters: ChapterCopy[];
  /** Intro film block (#video-gioi-thieu); the title is the homepage brand film line. */
  film: { eyebrow: string; title: string; watch: string };
  closing: { eyebrow: string; title: string; body: string[]; button: string };
}

/** Source for the seven peaks (chapter 02). */
export const peaksSource = 'https://vannghe.angiang.gov.vn/tri-ton-huyen-mien-nui-giua-dong-bang/';

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
    lead: 'Một hành trình làm nông từ vùng Bảy Núi.',
    cue: 'Cuộn để tiếp tục',
    storyLabel: 'Sáu chương của câu chuyện',
    navLabel: 'Các chương',
    sourceLabel: 'Nguồn',
    newTab: 'mở trong thẻ mới',
    chapters: [
      {
        label: 'Câu chuyện',
        title: 'Hai người, một khởi đầu',
        body: [
          'Hiền Nương Farm được chị Châu Thị Nương và anh Trần Phương Hiền cùng sáng lập vào năm 2020. Tên gọi Hiền Nương ghép từ tên của hai người đồng sáng lập.',
          'Từ vùng Bảy Núi, An Giang, hai vợ chồng cùng xây dựng nông trại, phát triển công việc trồng nấm và từng bước hoàn thiện sản phẩm. Câu chuyện ấy tiếp tục qua từng mùa thu hoạch và những công việc mỗi ngày.',
        ],
        facts: [{ value: '2020', label: 'Năm thành lập' }],
        alt: 'Chị Châu Thị Nương và anh Trần Phương Hiền vẫy tay bên tảng đá khắc tên Trang trại Nông nghiệp Hiền Nương',
      },
      {
        label: 'Bảy Núi',
        title: 'Núi giữa trời, thốt nốt giữa đồng',
        body: [
          'Bảy Núi, còn gọi là Thất Sơn, mang một dáng vẻ riêng giữa miền Tây: những ngọn núi nhô lên trên nền đồng ruộng rộng mở, xen cùng hàng thốt nốt vươn cao. Núi, ruộng lúa và những tán lá thốt nốt tạo nên cảnh sắc dễ nhận ra của vùng đất An Giang.',
          'Nơi đây còn mang dấu ấn văn hóa Khmer qua những ngôi chùa, nghề làm đường thốt nốt và hội đua bò Bảy Núi. Cảnh quan thiên nhiên hòa cùng đời sống văn hóa, làm nên bản sắc của vùng đất.',
          'Đó là không gian quê hương bao quanh câu chuyện Hiền Nương — nơi núi và đồng cùng hiện diện trong nhịp sống làm nông.',
        ],
        facts: [],
        alt: 'Cánh đồng lúa xanh điểm hàng thốt nốt, dãy núi vùng Bảy Núi phía xa, nhìn từ trên cao',
        more: {
          summary: 'Bảy Núi gồm những ngọn nào?',
          intro: 'Tên Bảy Núi không có nghĩa cả vùng chỉ có bảy ngọn. Thất Sơn được biết đến với bảy ngọn tiêu biểu:',
          items: peaks,
        },
      },
      {
        label: 'Hai cơ sở',
        title: 'Từ một nông trại đến hai cơ sở',
        body: [
          'Hiền Nương Farm có hai cơ sở trồng nấm tại Thới Sơn và Tà Đảnh, An Giang, với tổng diện tích hơn 4 ha. Cả hai cơ sở đều phục vụ hoạt động trồng nấm của Hiền Nương Farm.',
        ],
        facts: [
          { value: '02', label: 'Cơ sở' },
          { pre: 'Hơn', value: '4 ha', label: 'Tổng diện tích' },
        ],
        alt: 'Dãy nhà trồng nấm mái lợp tấm pin mặt trời nằm giữa cánh đồng lúa, nhìn từ trên cao',
      },
      {
        label: 'Năng lượng',
        title: 'Nắng nuôi những mùa nấm',
        body: [
          'Phía trên là hệ thống điện mặt trời. Phía dưới là không gian sản xuất nấm.',
          'Nông trại được xây dựng trên khu đất khai thác điện năng lượng mặt trời. Toàn bộ hệ thống do chị Châu Thị Nương cùng anh Trần Phương Hiền tự xây dựng và phát triển. 100% điện sử dụng cho hoạt động trồng nấm được cung cấp từ nguồn năng lượng mặt trời này.',
          'Trên cùng một khu đất, Hiền Nương kết hợp sản xuất điện sạch và trồng nấm, đưa nguồn năng lượng tại chỗ vào công việc hằng ngày.',
        ],
        facts: [{ value: '100%', label: 'Điện mặt trời cho hoạt động trồng nấm' }],
        alt: 'Các dãy nhà mái lợp tấm pin mặt trời giữa cây xanh và hàng thốt nốt, nhìn từ trên cao',
      },
      {
        label: 'Tuần hoàn',
        title: 'Tiếp nối giá trị sau mỗi mùa thu hoạch',
        body: [
          'Cách làm tuần hoàn tại Hiền Nương bắt đầu từ việc sử dụng phụ phẩm nông nghiệp để tạo giá thể trồng nấm.',
          'Sau khi thu hoạch nấm, giá thể tiếp tục được dùng làm thức ăn cho trùn quế. Nguồn nguyên liệu được sử dụng qua nhiều công đoạn, tiếp tục tạo giá trị sau một chu kỳ sản xuất.',
          'Cùng với năng lượng mặt trời, cách tận dụng phụ phẩm này là một phần trong mô hình nông nghiệp tuần hoàn của Hiền Nương.',
        ],
        facts: [],
        steps: [
          'Phụ phẩm nông nghiệp',
          'Giá thể trồng nấm',
          'Thu hoạch nấm',
          'Giá thể sau thu hoạch làm thức ăn cho trùn quế',
          'Phân trùn quế làm phân bón cho cây',
          'Quay lại chu trình trồng nấm',
        ],
        linkLabel: 'Tìm hiểu mô hình nông nghiệp tuần hoàn',
        alt: 'Hai người đội mũ rộng vành ngồi bên đống giá thể trong nhà xưởng, phía trước là những khay nấm trong rơm',
      },
      {
        label: 'Con người',
        title: 'Cùng làm, cùng phát triển',
        body: [
          'Hiền Nương Farm tạo việc làm cho hơn 40 lao động địa phương, đặc biệt là phụ nữ tại vùng Thới Sơn và Tri Tôn, An Giang.',
          'Đằng sau mỗi mùa thu hoạch là công sức của những con người cùng nhau chuẩn bị giá thể, chăm sóc, thu hoạch và hoàn thiện sản phẩm. Sự phát triển của nông trại gắn với việc tạo thêm cơ hội việc làm ngay tại địa phương.',
          'Bên cạnh sản xuất là những cuộc gặp gỡ, chuyến tham quan và dịp chia sẻ cách làm tại trang trại. Những hình ảnh ấy giúp người xem hiểu thêm về con người và công việc phía sau mỗi sản phẩm Hiền Nương.',
        ],
        facts: [{ value: 'Hơn 40', label: 'Lao động địa phương' }],
        caption: 'Chăm sóc · Thu hoạch · Chia sẻ',
        alt: 'Những người làm nấm, phần lớn là phụ nữ, ngồi quanh đống giá thể trong xưởng và đóng giá thể vào bịch',
      },
    ],
    film: { eyebrow: 'Video giới thiệu', title: 'Một vòng tuần hoàn, bắt đầu từ Bảy Núi.', watch: 'Xem phim' },
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
    lead: 'A farming journey from the Bảy Núi region.',
    cue: 'Scroll to continue',
    storyLabel: 'Six chapters of the story',
    navLabel: 'Chapters',
    sourceLabel: 'Source',
    newTab: 'opens in a new tab',
    chapters: [
      {
        label: 'Story',
        title: 'Two people, one beginning',
        body: [
          'Hiền Nương Farm was co-founded in 2020 by Ms. Châu Thị Nương and Mr. Trần Phương Hiền. The name Hiền Nương joins the names of its two co-founders.',
          'From the Bảy Núi region of An Giang, the couple built the farm together, developed their mushroom growing and refined their products step by step. That story continues through every harvest season and the work of each day.',
        ],
        facts: [{ value: '2020', label: 'Year founded' }],
        alt: 'Ms. Châu Thị Nương and Mr. Trần Phương Hiền waving beside the stone engraved with the farm’s name, Trang trại Nông nghiệp Hiền Nương',
      },
      {
        label: 'Bảy Núi',
        title: 'Mountains in the sky, palms in the fields',
        body: [
          'Bảy Núi, also known as Thất Sơn, has a character of its own in the Mekong Delta: mountains rising from wide open rice fields, among rows of tall palmyra palms. Mountains, rice paddies and palmyra crowns make up the familiar scenery of An Giang.',
          'The region also carries the mark of Khmer culture, in its pagodas, its palm-sugar making and the Bảy Núi bull races. Landscape and cultural life together give the land its identity.',
          'This is the homeland around the Hiền Nương story — where mountains and fields are part of the rhythm of farming life.',
        ],
        facts: [],
        alt: 'Green rice fields dotted with palmyra palms, the mountains of the Bảy Núi region in the distance, seen from above',
        more: {
          summary: 'Which peaks make up Bảy Núi?',
          intro: 'The name Bảy Núi (“Seven Mountains”) does not mean the region has only seven peaks. Thất Sơn is known for seven representative peaks:',
          items: peaks,
        },
      },
      {
        label: 'Two sites',
        title: 'From one farm to two sites',
        body: [
          'Hiền Nương Farm grows mushrooms at two sites, in Thới Sơn and Tà Đảnh, An Giang, covering more than 4 ha in total. Both sites serve Hiền Nương Farm’s mushroom growing.',
        ],
        facts: [
          { value: '02', label: 'Sites' },
          { pre: 'Over', value: '4 ha', label: 'Total area' },
        ],
        alt: 'A long row of mushroom houses roofed with solar panels among rice fields, seen from above',
      },
      {
        label: 'Energy',
        title: 'Sunlight for every mushroom season',
        body: [
          'Above, a solar power system. Below, the space where mushrooms are grown.',
          'The farm is built on land used to generate solar power. The whole system was built and developed by Ms. Châu Thị Nương and Mr. Trần Phương Hiền themselves. 100% of the electricity used for growing mushrooms comes from this solar power.',
          'On the same land, Hiền Nương combines clean power generation with mushroom growing, bringing energy produced on site into its daily work.',
        ],
        facts: [{ value: '100%', label: 'Solar electricity for growing mushrooms' }],
        alt: 'Rows of buildings roofed with solar panels among green trees and palmyra palms, seen from above',
      },
      {
        label: 'Circularity',
        title: 'Value that continues after every harvest',
        body: [
          'Circular practice at Hiền Nương begins with using agricultural by-products to make the substrate for growing mushrooms.',
          'After the mushrooms are harvested, the substrate goes on to feed earthworms. The materials are used across several stages, continuing to create value after a production cycle.',
          'Together with solar power, this use of by-products is part of Hiền Nương’s circular agriculture model.',
        ],
        facts: [],
        steps: [
          'Agricultural by-products',
          'Mushroom-growing substrate',
          'Mushroom harvest',
          'Spent substrate fed to earthworms',
          'Worm castings used to fertilise plants',
          'Back to the mushroom-growing cycle',
        ],
        linkLabel: 'Explore the circular agriculture model',
        alt: 'Two people in wide-brimmed hats sitting by a pile of substrate in the shed, with trays of mushrooms in straw in front',
      },
      {
        label: 'People',
        title: 'Working together, growing together',
        body: [
          'Hiền Nương Farm provides jobs for more than 40 local workers, especially women, in the Thới Sơn and Tri Tôn area of An Giang.',
          'Behind every harvest is the work of people who together prepare the substrate, tend, harvest and finish the products. The farm’s growth goes hand in hand with creating more jobs right here in the local area.',
          'Alongside production there are meetings, visits and occasions to share how the farm works. These images help viewers understand more about the people and the work behind every Hiền Nương product.',
        ],
        facts: [{ value: 'Over 40', label: 'Local workers' }],
        caption: 'Tending · Harvesting · Sharing',
        alt: 'Mushroom workers, most of them women, sitting around a pile of substrate in the shed and packing it into bags',
      },
    ],
    film: { eyebrow: 'Introduction video', title: 'A cycle that begins in Bảy Núi.', watch: 'Watch the film' },
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
    sourceLabel: '来源',
    newTab: '在新标签页中打开',
    chapters: [
      {
        label: '故事',
        title: '两个人，一个起点',
        body: [
          'Hiền Nương Farm 由 Châu Thị Nương 女士和 Trần Phương Hiền 先生于2020年共同创立。“Hiền Nương”这个名字取自两位联合创始人的名字。',
          '夫妻二人从安江省七山地区出发，一起建设农场，发展种菇事业，并逐步完善产品。这个故事在每一季收获和每一天的劳作中延续。',
        ],
        facts: [{ value: '2020', label: '创立年份' }],
        alt: 'Châu Thị Nương 女士和 Trần Phương Hiền 先生在刻有农场名称“Trang trại Nông nghiệp Hiền Nương”的石碑旁挥手',
      },
      {
        label: '七山',
        title: '山在天际，糖棕在田间',
        body: [
          '七山（越南语 Bảy Núi，又称 Thất Sơn）在湄公河三角洲独具风貌：一座座山峰从开阔的稻田间拔地而起，其间点缀着一排排高大的糖棕树。山峦、稻田和糖棕树冠，构成了安江省熟悉的景致。',
          '这里还带有高棉文化的印记：寺庙、糖棕糖制作，以及七山赛牛节。自然风光与文化生活相互交融，形成了这片土地的特色。',
          '这就是环绕着 Hiền Nương 故事的家乡——山与田共同存在于农耕生活的节奏之中。',
        ],
        facts: [],
        alt: '从高处俯瞰点缀着糖棕树的绿色稻田，远处是七山地区的群山',
        more: {
          summary: '七山包括哪些山？',
          intro: '“七山”这个名字并不意味着这里只有七座山。Thất Sơn 以七座具有代表性的山峰而闻名：',
          items: peaks,
        },
      },
      {
        label: '两处基地',
        title: '从一座农场到两处基地',
        body: [
          'Hiền Nương Farm 在安江省的 Thới Sơn 和 Tà Đảnh 设有两处种菇基地，总面积超过4公顷。两处基地都用于 Hiền Nương Farm 的种菇工作。',
        ],
        facts: [
          { value: '02', label: '基地' },
          { pre: '超过', value: '4 公顷', label: '总面积' },
        ],
        alt: '稻田间一长排屋顶铺满太阳能板的菇房，俯瞰视角',
      },
      {
        label: '能源',
        title: '阳光滋养每一季菌菇',
        body: [
          '上方是太阳能发电系统，下方是菌菇生产空间。',
          '农场建在利用太阳能发电的土地上。整套系统由 Châu Thị Nương 女士和 Trần Phương Hiền 先生亲自建设和发展。种菇所用的电力100%来自这套太阳能系统。',
          '在同一片土地上，Hiền Nương 将清洁发电与种菇相结合，把就地产生的能源用于日常工作。',
        ],
        facts: [{ value: '100%', label: '种菇用电来自太阳能' }],
        alt: '绿树和糖棕树之间一排排屋顶铺满太阳能板的建筑，俯瞰视角',
      },
      {
        label: '循环',
        title: '每一季收获之后，价值仍在延续',
        body: [
          'Hiền Nương 的循环做法，从利用农业副产品制作种菇基质开始。',
          '菌菇采收后，基质继续用作蚯蚓的饲料。原料经过多个环节被反复利用，在一个生产周期之后继续创造价值。',
          '与太阳能一起，这种对副产品的利用是 Hiền Nương 循环农业模式的一部分。',
        ],
        facts: [],
        steps: [
          '农业副产品',
          '种菇基质',
          '菌菇采收',
          '采收后的基质用作蚯蚓饲料',
          '蚯蚓粪用作植物肥料',
          '回到种菇循环',
        ],
        linkLabel: '了解循环农业模式',
        alt: '两位戴宽檐帽的人坐在菇房的基质堆旁，前方是一盘盘稻草中的菌菇',
      },
      {
        label: '人们',
        title: '一起劳作，共同成长',
        body: [
          'Hiền Nương Farm 为40多名当地劳动者提供了就业机会，尤其是安江省 Thới Sơn 和 Tri Tôn 一带的女性。',
          '每一季收获的背后，是大家一起准备基质、照料、采收和完善产品的辛劳。农场的发展，也为当地带来了更多的就业机会。',
          '除了生产，这里还有交流、参观和分享种植经验的时刻。这些画面让人们更加了解每一件 Hiền Nương 产品背后的人和工作。',
        ],
        facts: [{ value: '40+', label: '当地劳动者' }],
        caption: '照料 · 采收 · 分享',
        alt: '一群种菇工人（大多为女性）围坐在菇房的基质堆旁，把基质装进菌袋',
      },
    ],
    film: { eyebrow: '介绍视频', title: '一个循环，从七山开始。', watch: '观看影片' },
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
