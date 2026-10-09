/**
 * Dấu ấn: press coverage, recognitions and activities.
 *
 * Four pages, no landing page: /dau-an/bao-chi/, /dau-an/giai-thuong/,
 * /dau-an/su-kien/ (the homepage section #dau-an lists these three) and
 * /dau-an/chung-nhan/.
 *
 * Every entry records where it comes from. Headlines are the outlets'
 * own, as published. Dates are the dates the sources show (publication
 * dates for press; event dates only where a source states them).
 * Quotations are short and verbatim, checked against the article. Figures
 * that differ between articles (revenue, area, workforce) are not
 * repeated here.
 *
 * Photographs come from the press photo library collected on 07.10.2026
 * (design-reference/HIEN_NUONG_PHOTO_COLLECTION, IMAGE_SOURCES.csv); the
 * owner cleared press photographs for use on the site. `origin` names the
 * archive file each image was converted from. Outlet watermarks are
 * cropped off where they sat in a corner. Nothing is retouched or
 * generated.
 *
 * Sources checked 09.10.2026.
 */

export interface DauAnPage {
  href: string;
  title: string;
}

export const dauAnPages: DauAnPage[] = [
  { href: '/dau-an/bao-chi/', title: 'Báo chí & Truyền thông' },
  { href: '/dau-an/giai-thuong/', title: 'Giải thưởng & Ghi nhận' },
  { href: '/dau-an/su-kien/', title: 'Sự kiện & Hoạt động' },
  { href: '/dau-an/chung-nhan/', title: 'Chứng nhận sản phẩm' },
];

export interface Pic {
  src: string;
  srcset: string;
  /** The largest file, for the photo viewer. */
  full: string;
  width: number;
  height: number;
  alt: string;
  /** Caption shown with the photograph (the source's own where it has one). */
  caption?: string;
  /** Who took or published the photograph. */
  credit: string;
  /** Archive file the image was made from. */
  origin: string;
  /** object-position for cropped slots. */
  position?: string;
}

const dir = '/images/dau-an/';

/** A converted image: its widths with their heights, smallest first. */
const pic = (
  name: string,
  sizes: [number, number][],
  p: Omit<Pic, 'src' | 'srcset' | 'full' | 'width' | 'height'>,
): Pic => {
  const [w, h] = sizes[sizes.length - 1];
  const mid = sizes.find(([sw]) => sw >= 1000) ?? sizes[sizes.length - 1];
  return {
    src: `${dir}${name}-${mid[0]}.webp`,
    srcset: sizes.map(([sw]) => `${dir}${name}-${sw}.webp ${sw}w`).join(', '),
    full: `${dir}${name}-${w}.webp`,
    width: w,
    height: h,
    ...p,
  };
};

/** 18.05.2025 from 2025-05-18; Tháng 8/2026 from 2026-08; a year alone stays a year. */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return d ? `${d}.${m}.${y}` : m ? `Tháng ${Number(m)}/${y}` : y;
};

// ---------------------------------------------------------------------------
// Báo chí & Truyền thông
// ---------------------------------------------------------------------------

/**
 * One list for both press pages. The archive (/dau-an/bao-chi/tu-lieu/)
 * shows every entry; featured entries are also on the press page, in the
 * order given here, each with a page of its own.
 */
export interface PressItem {
  /** Stable ID; for a featured entry, also the path of its page. */
  slug: string;
  outlet: string;
  headline: string;
  /** Publication date (ISO), as the source shows it. For a video, the upload date. Left out when no source shows one. */
  date?: string;
  url: string;
  kind: 'article' | 'video' | 'audio';
  /** On the press page, with its own page. */
  featured?: boolean;
  /** A brief mention or quotation within a wider story: "Nhắc đến" in the archive. */
  mention?: boolean;
  /** The same piece at other addresses (reposts, a moved URL). Kept for reference, not listed. */
  alternates?: { outlet: string; url: string }[];
  byline?: string;
  /** One or two sentences on what the piece covers, from its own text. */
  intro?: string;
  /** The article's opening paragraph (sapo), verbatim. */
  lede?: string;
  photo?: Pic;
  /** More photographs from the same article. */
  gallery?: Pic[];
  /** YouTube id: the video is embedded on its page (embedding allowed). */
  youtube?: string;
  /** Short verbatim quotation of chị Nương in this article. */
  quote?: string;
  /** Key points the article reports, in its own terms and dated by it. */
  points?: string[];
}

export const pressArchive: PressItem[] = [
  {
    slug: 'bien-giac-mo-netzero-tu-trang-trai-nam',
    outlet: 'Báo Tin tức và Dân tộc – TTXVN',
    headline: 'Biến giấc mơ “NetZero” từ trang trại nấm',
    date: '2025-05-18',
    url: 'https://baotintuc.vn/bien-giac-mo-netzero-tu-trang-trai-nam-post1379079.html',
    kind: 'article',
    featured: true,
    byline: 'Thanh Liêm – Công Mạo/TTXVN',
    intro: 'Phóng sự từ Nương Farm ở vùng Bảy Núi: nhà trồng nấm dược liệu dùng điện mặt trời, và những lao động người Khmer làm việc tại trang trại.',
    lede: 'Dưới cái nắng chói chang của vùng Bảy Núi, tỉnh An Giang vào một ngày đầu tháng 3/2025, Néang Môm (25 tuổi) cẩn thận kiểm tra từng bịch phôi nấm trong khu sản xuất của trang trại Nương Farm.',
    photo: pic('bt-netzero-nha-nam', [[640, 414], [1280, 829], [1800, 1166]], {
      alt: 'Chị Châu Thị Nương áo hồng, đội nón lá, đứng giữa những dãy kệ phôi nấm trong nhà trồng nấm có điều hòa',
      caption: 'Nhà trồng nấm của chị Nương có gắn điều hòa để kiểm soát nhiệt độ. Ban ngày máy hoạt động bằng điện Mặt trời còn ban đêm sử dụng điện lưới quốc gia.',
      credit: 'Thanh Liêm/TTXVN',
      origin: 'E007__baotintuc.vn/E007__a3970f__r001.avif',
      position: '35% 50%',
    }),
    gallery: [
      pic('bt-netzero-san-pham', [[640, 427], [1280, 853], [1800, 1200]], {
        alt: 'Chị Nương giới thiệu các sản phẩm nấm dược liệu với khách bên một bàn trưng bày',
        caption: 'Chị Nương giới thiệu với khách hàng các sản phẩm nấm dược liệu do Nương Farm sản xuất.',
        credit: 'Thanh Liêm/TTXVN',
        origin: 'E007__baotintuc.vn/E007__a3970f__r003.avif',
      }),
      pic('bt-netzero-tren-cao', [[640, 360], [1280, 720]], {
        alt: 'Ảnh chụp từ trên cao: mái pin mặt trời phủ kín các dãy nhà trồng nấm giữa vườn cây',
        caption: 'Trang trại trồng nấm dược liệu sử dụng năng lượng Mặt trời của chị Châu Thị Nương.',
        credit: 'Thanh Liêm/TTXVN',
        origin: 'E007__baotintuc.vn/E007__a3970f__r004.avif',
      }),
      pic('bt-netzero-ta-danh', [[640, 404], [1280, 807]], {
        alt: 'Dãy nhà trồng nấm lợp pin mặt trời chạy dọc cánh đồng lúa xanh',
        caption: 'Trang trại trồng nấm sử dụng năng lượng Mặt trời của chị Nương ở xã Tà Đảnh, huyện Tri Tôn, tỉnh An Giang.',
        credit: 'Thanh Liêm/TTXVN',
        origin: 'E007__baotintuc.vn/E007__a3970f__r005.avif',
      }),
    ],
  },
  {
    slug: 'roi-buc-giang-nu-giao-vien-khoi-nghiep',
    outlet: 'VietNamNet',
    headline: 'Rời bục giảng, nữ giáo viên khởi nghiệp với trang trại nấm bạc tỷ',
    date: '2025-09-28',
    url: 'https://vietnamnet.vn/roi-buc-giang-giao-vien-khoi-nghiep-voi-trang-trai-nam-bac-ty-2445463.html',
    kind: 'article',
    featured: true,
    byline: 'Trần Tuyên',
    intro: 'Chân dung chị Châu Thị Nương: từ bục giảng đến mô hình trồng nấm tuần hoàn khép kín.',
    lede: 'Rời bục giảng sau gần 5 năm gắn bó, chị Châu Thị Nương khởi nghiệp với mô hình trồng nấm tuần hoàn khép kín.',
    photo: pic('vnn-nuong', [[640, 332], [1280, 663]], {
      alt: 'Chị Châu Thị Nương mỉm cười, tay nâng cây nấm linh chi bên tấm bảng Nấm mối Nàng Nương',
      caption: 'Chị Nương bước đầu thành công với nghề trồng nấm.',
      credit: 'Trần Tuyên/VietNamNet',
      origin: 'E009__vietnamnet.vn/E009__ba0dea__r001.jpg',
      position: '30% 40%',
    }),
    gallery: [
      pic('vnn-cong-nhan', [[640, 407], [1280, 815]], {
        alt: 'Các công nhân mặc đồng phục xanh ngồi trên sàn xưởng, đóng giá thể vào bịch phôi nấm',
        caption: 'Cơ sở trồng nấm của nữ giáo viên tạo công việc ổn định cho 20 công nhân.',
        credit: 'Nhân vật cung cấp',
        origin: 'E009__vietnamnet.vn/E009__ba0dea__r004.jpg',
      }),
    ],
  },
  {
    slug: 'nguoi-phu-nu-khmer-khoi-nghiep-tu-trong-nam-huu-co',
    outlet: 'Báo Nhân Dân',
    headline: 'Người phụ nữ Khmer khởi nghiệp từ trồng nấm hữu cơ',
    date: '2025-09-05',
    url: 'https://nhandan.vn/nguoi-phu-nu-khmer-khoi-nghiep-tu-trong-nam-huu-co-post905877.html',
    kind: 'article',
    featured: true,
    byline: 'Thanh Dũng',
    intro: 'Mô hình nông nghiệp tuần hoàn từ phụ phẩm nông nghiệp của chị Châu Thị Nương, ở xã Cô Tô, tỉnh An Giang.',
    lede: 'Chị Châu Thị Nương, ngụ xã Cô Tô, tỉnh An Giang là người phụ nữ Khmer đầu tiên của tỉnh tham gia mô hình ứng dụng nông nghiệp tuần hoàn từ phụ phẩm nông nghiệp để tạo ra sản phẩm nấm sạch, giàu dinh dưỡng.',
    photo: pic('nd-khmer-kiem-tra', [[640, 310], [1280, 619]], {
      alt: 'Chị Nương đeo khẩu trang và găng tay, ngồi cùng một công nhân kiểm tra bịch phôi nấm trong xưởng',
      caption: 'Chị Nương kiểm tra quy trình trồng nấm.',
      credit: 'Báo Nhân Dân',
      origin: 'E005__nhandan.vn/E005__ad1000__r006.avif',
      position: '60% 50%',
    }),
    gallery: [
      pic('nd-khmer-thu-hoach', [[640, 310], [1280, 619]], {
        alt: 'Hai người đội nón bê rổ nấm linh chi vừa thu hoạch giữa những hàng phôi trên nền rơm',
        caption: 'Nhân công thu hoạch nấm sạch tại trại nấm.',
        credit: 'Báo Nhân Dân',
        origin: 'E005__nhandan.vn/E005__ad1000__r002.avif',
      }),
      pic('nd-khmer-doi-ngu', [[640, 310], [1000, 484]], {
        alt: 'Đông đủ nhân công trong đồng phục xanh đứng và ngồi sau những hàng bịch phôi nấm',
        caption: 'Trang trại trồng nấm sạch của chị Châu Thị Nương.',
        credit: 'Báo Nhân Dân',
        origin: 'E005__nhandan.vn/E005__ad1000__r001.avif',
      }),
    ],
  },
  {
    slug: 'co-giao-tieng-anh-trong-nam-ocop',
    outlet: 'Tạp chí Việt Nam Hương sắc',
    headline: 'Cô giáo tiếng Anh ứng dụng công nghệ vào trồng nấm OCOP, vươn lên làm kinh tế giỏi',
    date: '2026-03-31',
    url: 'https://tapchivietnamhuongsac.vn/co-giao-tieng-anh-ung-dung-cong-nghe-vao-trong-nam-ocop-vuon-len-lam-kinh-te-gioi-5514.html',
    kind: 'article',
    featured: true,
    byline: 'Kim Ngân',
    intro: 'Hành trình từ giáo viên tiếng Anh sang nông nghiệp công nghệ cao của chị Châu Thị Nương, Giám đốc HTX Nông nghiệp Tà Đảnh.',
    photo: pic('vnhs-nha-nam', [[640, 480], [1024, 768]], {
      alt: 'Chị Nương quàng khăn rằn, đeo găng tay hồng, chăm sóc bịch phôi nấm trên kệ trong nhà nuôi',
      credit: 'Hiền Nương Farm (theo Tạp chí Việt Nam Hương sắc)',
      origin: 'E030__tapchivietnamhuongsac.vn/E030__14eef0__r001.jpg',
      position: '30% 40%',
    }),
  },
  {
    slug: 'bien-rom-ra-thanh-vang',
    outlet: 'VnBusiness',
    headline: 'Biến rơm rạ thành “vàng”: Nữ giám đốc HTX thu 20 tấn nấm mỗi năm',
    date: '2026-03-30',
    url: 'https://vnbusiness.vn/bien-rom-ra-thanh-vang-nu-giam-doc-htx-thu-20-tan-nam-moi-nam.html',
    kind: 'article',
    featured: true,
    byline: 'Hồng Hương',
    intro: 'Rơm rạ, cám gạo, cám bắp trở thành phôi nấm trong chuỗi sản xuất của HTX Nông nghiệp Tà Đảnh.',
    lede: 'Không chỉ tận dụng triệt để phụ phẩm nông nghiệp, mô hình trồng nấm của chị Châu Thị Nương còn tạo nên chuỗi sản xuất “không rác thải”, giúp nâng cao giá trị nông sản và tạo việc làm ổn định cho hàng chục lao động tại An Giang.',
    photo: pic('vnb-phoi-nam', [[640, 480], [1024, 768]], {
      alt: 'Cận cảnh những cây nấm mối mũ nâu mọc lên từ bịch phôi',
      caption: 'Chị Nương tận dụng các phụ phẩm nông nghiệp như rơm, rạ, cám bắp, cám gạo... để phối trộn, làm phôi giống, cấy meo và nuôi trồng thành công các loại nấm quý.',
      credit: 'VnBusiness',
      origin: 'E042__vnbusiness.vn/E042__83ff7b__r002.jpg',
    }),
  },
  {
    slug: 'chu-tich-hoi-nong-dan-tham-mo-hinh-trong-nam',
    outlet: 'Báo điện tử Dân Việt',
    headline: 'Chủ tịch Hội Nông dân Việt Nam Lương Quốc Đoàn thăm mô hình trồng nấm dược liệu công nghệ cao tại An Giang',
    date: '2026-03-22',
    url: 'https://danviet.vn/chu-tich-hoi-nong-dan-viet-nam-luong-quoc-doan-tham-mo-hinh-trong-nam-doanh-thu-15-ty-dong-nam-cua-nu-nong-dan-khmer-d1412214.html',
    kind: 'article',
    featured: true,
    byline: 'Phạm Hưng',
    intro: 'Phóng sự ảnh chuyến thăm Nương Farm (xã Thới Sơn, tỉnh An Giang) của Chủ tịch Trung ương Hội Nông dân Việt Nam.',
    quote: 'Từng phôi nấm trước khi cung ứng ra thị trường đều được kiểm tra kỹ lưỡng, đảm bảo phôi nấm tốt nhất đến tay người tiêu dùng.',
    photo: pic('dv-tham-phoi-nam', [[640, 341], [1280, 681], [1800, 958]], {
      alt: 'Chị Châu Thị Nương áo đỏ quàng khăn rằn đứng cạnh đoàn khách, một vị khách cầm bịch phôi nấm xem xét',
      caption: 'Chị Châu Thị Nương giới thiệu quy trình làm phôi nấm của trang trại với Chủ tịch Hội nông dân Việt Nam Lương Quốc Đoàn.',
      credit: 'Phạm Hưng/Dân Việt',
      origin: 'E018__danviet.vn/E018__dbb019__r002.jpg',
    }),
  },
  {
    slug: 'tu-trai-nam-nho-den-danh-hieu-nong-dan-viet-nam-xuat-sac-2025',
    outlet: 'Tạp chí Nông nghiệp Hữu cơ Việt Nam',
    headline: 'Từ trại nấm nhỏ đến danh hiệu Nông dân Việt Nam xuất sắc 2025',
    date: '2026-03-03',
    url: 'https://nongnghiephuuco.vn/tu-trai-nam-nho-den-danh-hieu-nong-dan-viet-nam-xuat-sac-2025-12542.html',
    kind: 'article',
    featured: true,
    byline: 'Thái Hà',
    intro: 'Chặng đường từ trại nấm đầu tiên đến danh hiệu Nông dân Việt Nam xuất sắc năm 2025.',
    lede: 'Năm 2025, chị Châu Thị Nương, ngụ xã Cô Tô, tỉnh An Giang, vinh dự được bình chọn là “Nông dân Việt Nam xuất sắc” với mô hình trồng nấm hiệu quả, bền vững và giàu tính sáng tạo.',
  },
  {
    slug: 'lam-giau-tu-nam-sach',
    outlet: 'VnExpress',
    headline: 'Làm giàu từ nấm sạch',
    date: '2025-12-28',
    url: 'https://vnexpress.net/lam-giau-tu-nam-sach-4996984.html',
    kind: 'article',
    featured: true,
    byline: 'Chúc Ly',
    intro: 'Trang trại nấm sạch của chị Châu Thị Nương, nơi phụ phẩm nông nghiệp như rơm, trấu, mùn cưa trở thành nguyên liệu trồng nấm.',
  },
  {
    slug: 'nu-nong-dan-xuat-sac-vung-bay-nui',
    outlet: 'Báo An Giang',
    headline: 'Nữ nông dân xuất sắc vùng Bảy Núi An Giang',
    date: '2025-10-26',
    url: 'https://baoangiang.com.vn/nu-nong-dan-xuat-sac-vung-bay-nui-an-giang-a465150.html',
    alternates: [{ outlet: 'Cổng Thông tin điện tử tỉnh An Giang', url: 'https://angiang.gov.vn/vi/nu-nong-dan-xuat-sac-vung-bay-nui-an-giang' }],
    kind: 'article',
    featured: true,
    byline: 'Mỹ Hạnh',
    intro: 'Từ rơm rạ sau mỗi vụ lúa đến mô hình trồng nấm tuần hoàn khép kín ở vùng Bảy Núi.',
    lede: 'Khởi nghiệp tại quê nhà, tận dụng phụ phẩm nông nghiệp để trồng nấm, chị Châu Thị Nương (xã Cô Tô, tỉnh An Giang) đã thực hiện mô hình tuần hoàn khép kín hướng đến nông nghiệp xanh, bền vững.',
    quote: 'Sống ở đồng bằng sông Cửu Long, đồng lúa bạt ngàn, mỗi vụ có rất nhiều rơm sau thu hoạch, nông dân chỉ bán giá rẻ hoặc đốt. Vùng Bảy Núi lại có khí trời mát mẻ, rất hợp để trồng nấm.',
    // Revenue and output figures in the article are left out (see header).
    points: [
      'Chị Nương là con gái ông Châu Thành Phú, lão nông được biết đến là “vua trị phèn” ở vùng Tứ giác Long Xuyên, người tạo ra giống lúa TP những năm 1990.',
      'Từ buổi đầu phải mua meo giống, chị đã tự phân lập giống, làm meo và chuyển giao kỹ thuật cho các trại nấm khác.',
      'Giá thể nấm mối đen sau vụ được phối trộn thêm nguyên liệu mới để trồng nấm rơm, hết vụ dùng nuôi trùn quế; chân nấm đông trùng hạ thảo làm thức ăn nuôi gà thả vườn.',
      'Ba sản phẩm đạt OCOP mang thương hiệu Nàng Nương: nấm linh chi tai to, nấm đông trùng hạ thảo và nấm mối tươi.',
      'Hợp tác xã Tà Đảnh có 8 thành viên; mô hình giải quyết việc làm thường xuyên cho 30 lao động nữ, cao điểm mùa vụ khoảng 60 lao động.',
    ],
    photo: pic('bag-xuat-sac', [[640, 457], [1280, 914]], {
      alt: 'Chị Châu Thị Nương áo hoa cầm hộp quà sản phẩm nấm linh chi trong phòng trưng bày',
      caption: 'Chị Châu Thị Nương tại cơ sở trưng bày sản phẩm nấm (xã Cô Tô).',
      credit: 'Mỹ Hạnh/Báo An Giang',
      origin: 'E017__baoangiang.com.vn/E017__aaa83f__r006.jpg',
      position: '50% 35%',
    }),
    gallery: [
      pic('bag-xuat-sac-gian-hang', [[640, 449], [1280, 898]], {
        alt: 'Chị Nương quàng khăn rằn, xem một hộp sản phẩm bên quầy trưng bày nấm linh chi',
        credit: 'Mỹ Hạnh/Báo An Giang',
        origin: 'E017__baoangiang.com.vn/E017__aaa83f__r002.jpg',
      }),
    ],
  },
  {
    slug: 'chau-thi-nuong-mo-loi-di-xanh-tu-nam-huu-co',
    outlet: 'Báo Đầu tư',
    headline: 'Châu Thị Nương, Giám đốc HTX Nông nghiệp Tà Đảnh: Mở lối đi “xanh” từ nấm hữu cơ',
    date: '2025-10-23',
    url: 'https://baodautu.vn/chau-thi-nuong-giam-doc-htx-nong-nghiep-ta-danh-mo-loi-di-xanh-tu-nam-huu-co-d418567.html',
    alternates: [{ outlet: 'Tin nhanh Chứng khoán', url: 'https://www.tinnhanhchungkhoan.vn/chau-thi-nuong-giam-doc-htx-nong-nghiep-ta-danh-mo-loi-di-xanh-tu-nam-huu-co-post379112.html' }],
    kind: 'article',
    featured: true,
    byline: 'Nhung Bùi',
    intro: 'Từ giáo viên ngoại ngữ đến chuỗi sản xuất nấm tuần hoàn khép kín và thương hiệu “Nấm mối Nàng Nương”.',
    lede: 'Từng là giáo viên ngoại ngữ, chị Châu Thị Nương đã mạnh dạn rẽ hướng sang nông nghiệp công nghệ cao.',
    quote: 'Mỗi sản phẩm đều có một vòng đời và giá trị riêng. Nếu biết cách khai thác, chúng ta vừa tiết kiệm chi phí, vừa bảo vệ môi trường',
    photo: pic('bdt-gian-hang', [[640, 392], [1280, 784]], {
      alt: 'Chị Châu Thị Nương áo dài xanh đứng sau bàn trưng bày sản phẩm nấm của HTX Nông nghiệp Tà Đảnh',
      caption: 'Châu Thị Nương, Giám đốc HTX Nông nghiệp Tà Đảnh.',
      credit: 'Báo Đầu tư',
      origin: 'E029__baodautu.vn/E029__2702b2__r001.jpg',
    }),
  },
  {
    slug: 'mo-huong-moi-nong-nghiep-xanh-o-long-bay-nui',
    outlet: 'Báo Tin tức và Dân tộc – TTXVN',
    headline: 'Mở hướng mới phát triển nông nghiệp xanh ở lòng Bảy Núi',
    date: '2025-09-20',
    url: 'https://baotintuc.vn/mo-huong-moi-phat-trien-nong-nghiep-xanh-o-long-bay-nui-post1380699.html',
    kind: 'article',
    featured: true,
    byline: 'Thanh Sang/TTXVN',
    intro: 'Trang trại trồng nấm dược liệu tuần hoàn khép kín “Nương Farm”, gây dựng từ ý tưởng nhen nhóm trong đại dịch COVID-19.',
    photo: pic('btt-bay-nui', [[640, 402], [1280, 804]], {
      alt: 'Chị Châu Thị Nương cầm hộp sản phẩm đứng trước tủ kính trưng bày sản phẩm nấm',
      caption: 'Chị Châu Thị Nương bên gian hàng các sản phẩm chế biến từ nấm được giới thiệu tại gian hàng “Nương Farm”.',
      credit: 'Thanh Sang/TTXVN',
      origin: 'E008__dantocmiennui.baotintuc.vn/E008__ff552c__r001.avif',
      position: '25% 40%',
    }),
    gallery: [
      pic('btt-bay-nui-cay-meo', [[640, 417], [1280, 834]], {
        alt: 'Công nhân ngồi thành nhóm trong xưởng, cấy meo vào bịch phôi nấm',
        caption: 'Công nhân tại “Nương Farm” tỉ mỉ cấy meo nấm.',
        credit: 'TTXVN phát',
        origin: 'E008__dantocmiennui.baotintuc.vn/E008__ff552c__r003.avif',
      }),
    ],
  },
  {
    slug: 'tang-thu-nhap-nho-lam-nong-lap-them-dien-mat-troi',
    outlet: 'VnExpress',
    headline: 'Tăng thu nhập nhờ làm nông lắp thêm điện mặt trời',
    date: '2025-02-26',
    url: 'https://vnexpress.net/tang-thu-nhap-nho-lam-nong-lap-them-dien-mat-troi-4854034.html',
    kind: 'article',
    featured: true,
    byline: 'Viễn Thông',
    intro: 'Bài tổng hợp về các mô hình trồng trọt, chăn nuôi kết hợp pin mặt trời; trong đó có khu trồng nấm dưới mái pin của HTX Nông nghiệp Tà Đảnh.',
  },
  {
    slug: 're-huong-trong-nam-nguoi-phu-nu-mien-tay',
    outlet: 'Báo Thanh Niên',
    headline: 'Rẽ hướng trồng nấm, người phụ nữ miền Tây thu nhập gần 900 triệu đồng/năm',
    date: '2024-07-07',
    url: 'https://thanhnien.vn/re-huong-trong-nam-nguoi-phu-nu-mien-tay-thu-nhap-gan-900-trieu-dong-nam-185240707101107657.htm',
    kind: 'article',
    featured: true,
    byline: 'Duy Tân',
    intro: 'Từ canh tác lúa chuyển sang trồng nấm theo hướng tuần hoàn khép kín ở xã Tà Đảnh, huyện Tri Tôn.',
    photo: pic('tn-linh-chi', [[640, 640], [1280, 1280]], {
      alt: 'Chị Châu Thị Nương áo hoa ngồi giữa luống nấm linh chi đỏ nâu trên nền đất, hai tay mở rộng',
      caption: 'Chị Nương tại trại trồng nấm linh chi.',
      credit: 'Duy Tân/Thanh Niên',
      origin: 'E003__thanhnien.vn/E003__05eaff__r003.jpg',
    }),
    gallery: [
      pic('tn-nam-moi', [[640, 480], [1280, 960]], {
        alt: 'Chị Nương cầm mâm nấm mối đen bên bàn bày nhiều khay nấm vừa thu hoạch',
        caption: 'Nấm mối đen thu hoạch tại trại của chị Nương.',
        credit: 'Duy Tân/Thanh Niên',
        origin: 'E003__thanhnien.vn/E003__05eaff__r002.jpg',
      }),
      pic('tn-xuong', [[640, 640], [1280, 1280]], {
        alt: 'Xưởng sản xuất chất đầy bịch phôi nấm, các chị em ngồi làm việc phía sau',
        caption: 'Nhiều chị em người Khmer có việc làm tại trại nấm của chị Nương.',
        credit: 'Duy Tân/Thanh Niên',
        origin: 'E003__thanhnien.vn/E003__05eaff__r005.jpg',
      }),
    ],
  },
  {
    slug: 'khat-vong-mua-vang-tap-92',
    outlet: 'Truyền hình Vĩnh Long',
    headline: 'Khát vọng mùa vàng – Tập 92: Chị Châu Thị Nương với mô hình trồng nấm theo chuỗi tuần hoàn khép kín',
    date: '2024-07-04',
    url: 'https://www.youtube.com/watch?v=cWuLXkp6FT0',
    kind: 'video',
    featured: true,
    intro: 'Phóng sự truyền hình trong chương trình “Khát vọng mùa vàng” về mô hình trồng nấm theo chuỗi tuần hoàn khép kín của chị Châu Thị Nương.',
    youtube: 'cWuLXkp6FT0',
  },
  {
    slug: 'nam-moi-nang-nuong',
    outlet: 'Báo Nhân Dân',
    headline: 'Nấm mối nàng Nương',
    date: '2024-06-30',
    url: 'https://nhandan.vn/nam-moi-nang-nuong-post816923.html',
    kind: 'article',
    featured: true,
    byline: 'Thanh Dũng',
    intro: 'Câu chuyện thương hiệu “Nấm mối nàng Nương” và việc ứng dụng công nghệ cao vào trồng, chế biến nấm.',
    lede: 'Chị Châu Thị Nương là người dân tộc Khmer ở tỉnh An Giang đã tự tin ứng dụng công nghệ cao vào trồng, chế biến nấm mối sạch và nấm dược liệu, từng bước thành lập thương hiệu “Nấm mối nàng Nương”.',
    photo: pic('nd-nang-nuong', [[640, 360], [800, 450]], {
      alt: 'Chị Châu Thị Nương tóc tết, áo hoa, mỉm cười bên mâm nấm mối đen',
      caption: 'Chị Châu Thị Nương tự tin khởi nghiệp bằng nghề trồng và chế biến nấm sạch.',
      credit: 'Báo Nhân Dân',
      origin: 'E004__nhandan.vn/E004__6fb14d__r001.avif',
      position: '40% 30%',
    }),
  },
  {
    slug: 'nong-nghiep-tuan-hoan-tu-duoc-lieu-tu-nhien',
    outlet: 'Báo An Giang',
    headline: 'Nông nghiệp tuần hoàn từ dược liệu tự nhiên',
    date: '2024-03-14',
    url: 'https://baoangiang.com.vn/nong-nghiep-tuan-hoan-tu-duoc-lieu-tu-nhien-a390412.html',
    kind: 'article',
    featured: true,
    byline: 'Ngô Chuẩn',
    intro: 'Bóng mát dưới mái pin mặt trời và phụ phẩm nông nghiệp trong quy trình tuần hoàn khép kín của HTX Nông nghiệp Tà Đảnh.',
    lede: 'Tận dụng bóng mát dưới mái tấm pin năng lượng mặt trời, phế phẩm trong nông nghiệp (rơm rạ, thân cây rau màu, cám gạo, cám bắp), người phụ nữ dân tộc thiểu số Khmer Châu Thị Nương (Hợp tác xã Nông nghiệp Tà Đảnh, huyện Tri Tôn, tỉnh An Giang) đã xây dựng quy trình nông nghiệp tuần hoàn khép kín.',
    photo: pic('bag-tuan-hoan', [[640, 480], [1024, 768]], {
      alt: 'Chị Nương ngồi giữa cánh đồng phôi nấm linh chi dưới mái nhà trồng rộng',
      caption: 'Nông trại “Nương Farm”.',
      credit: 'Ngô Chuẩn/Báo An Giang',
      origin: 'E011__baoangiang.com.vn/E011__6bee3f__r002.jpg',
    }),
  },

  // Archive only. Each checked against the live page 09.10.2026 (headline,
  // date, and that it names Hiền Nương Farm or chị Châu Thị Nương). Brief
  // mentions and policy quotations are kept, marked `mention`. A piece that
  // names only HTX Tà Đảnh is kept when it is about chị Nương's HTX as
  // verified elsewhere (the Sáng kiến ESG Việt Nam 2023 final: Báo Nhân
  // Dân, 30.06.2024). Reposts are kept as `alternates` of the original.
  // Left out: undated NGO stories, self-published videos, aggregator copies
  // whose original is not found, and translations.
  {
    slug: 'nong-dan-an-giang-ung-dung-cong-nghe-cao-vao-san-xuat',
    outlet: 'Báo An Giang',
    headline: 'Nông dân An Giang ứng dụng công nghệ cao vào sản xuất',
    date: '2025-12-17',
    url: 'https://baoangiang.com.vn/nong-dan-an-giang-ung-dung-cong-nghe-cao-vao-san-xuat-a470518.html',
    kind: 'article',
    byline: 'Đặng Linh',
  },
  {
    slug: 'chu-tich-tu-hoi-nong-dan-tham-mo-hinh-nong-dan-san-xuat-gioi',
    outlet: 'Báo điện tử Dân Việt',
    headline: 'Chủ tịch T.Ư Hội Nông dân Việt Nam Lương Quốc Đoàn thăm mô hình của nông dân sản xuất giỏi tại An Giang',
    date: '2026-03-06',
    url: 'https://danviet.vn/chu-tich-tu-hoi-nong-dan-viet-nam-luong-quoc-doan-tham-mo-hinh-cua-nong-dan-san-xuat-gioi-tai-an-giang-d1407793.html',
    alternates: [{ outlet: 'Hội Nông dân Việt Nam', url: 'https://www.hoinongdan.org.vn/trung-uong-hoi/chu-tich-t-u-hoi-nong-dan-viet-nam-luong-quoc-doan-tham-mo-hinh-cua-nong-dan-san-xuat-gioi-tai-an-giang-380436' }],
    kind: 'article',
    byline: 'Hồng Cẩm',
  },
  {
    slug: 'cong-bo-95-nong-dan-viet-nam-xuat-sac-2025',
    outlet: 'Báo Nhân Dân',
    headline: 'Công bố 95 nông dân Việt Nam xuất sắc và nhà khoa học của nhà nông năm 2025',
    date: '2025-10-08',
    url: 'https://nhandan.vn/cong-bo-95-nong-dan-viet-nam-xuat-sac-va-nha-khoa-hoc-cua-nha-nong-nam-2025-post913741.html',
    mention: true,
    kind: 'article',
    byline: 'Thanh Trà',
  },
  {
    slug: 'nong-dan-tri-ton-day-manh-san-xuat',
    outlet: 'Báo An Giang',
    headline: 'Nông dân Tri Tôn đẩy mạnh sản xuất, nâng cao thu nhập',
    date: '2024-11-04',
    url: 'https://baoangiang.com.vn/nong-dan-tri-ton-day-manh-san-xuat-nang-cao-thu-nhap-a408766.html',
    kind: 'article',
    byline: 'Minh Đức',
  },
  {
    slug: 'trong-nam-moi-den-theo-huong-tuan-hoan-khep-kin',
    outlet: 'Cổng Thông tin điện tử tỉnh An Giang',
    headline: 'Trồng nấm mối đen theo hướng tuần hoàn khép kín',
    date: '2024-06-19',
    url: 'https://angiang.gov.vn/vi/trong-nam-moi-den-theo-huong-tuan-hoan-khep-kin',
    alternates: [{ outlet: 'Khuyến nông Đắk Lắk', url: 'https://khuyennongdaklak.com.vn/an-giang-trong-nam-moi-den-theo-huong-tuan-hoan-khep-kin-10795.html' }],
    kind: 'article',
    byline: 'Trang Nghiêm (Trung tâm Khuyến nông An Giang)',
  },
  {
    slug: 'nong-dan-chuyen-doi-tu-duy-san-xuat',
    outlet: 'Báo An Giang',
    headline: 'Nông dân chuyển đổi tư duy sản xuất',
    date: '2023-10-15',
    url: 'https://baoangiang.com.vn/nong-dan-chuyen-doi-tu-duy-san-xuat-a377198.html',
    kind: 'article',
    byline: 'Thanh Tiến',
  },
  {
    slug: 'phu-nu-khmer-dbscl-sang-tao-khoi-nghiep',
    outlet: 'Cổng thông tin Hội LHPN Việt Nam',
    headline: 'Phụ nữ dân tộc Khmer vùng đồng bằng sông Cửu Long phát huy tài nguyên bản địa, sáng tạo khởi nghiệp',
    date: '2023-08-11',
    url: 'https://vwu.vn/vi_VN/web/guest/tin-chi-tiet/-/chi-tiet/phu-nu-dan-toc-khmer-vung-%C4%91ong-bang-song-cuu-long-phat-huy-tai-nguyen-ban-%C4%91ia-sang-tao-khoi-nghiep-58172-2.html',
    kind: 'article',
  },
  {
    slug: 'doc-dao-san-pham-khoi-nghiep',
    outlet: 'Báo An Giang',
    headline: 'Độc đáo sản phẩm khởi nghiệp',
    date: '2023-01-27',
    url: 'https://baoangiang.com.vn/doc-dao-san-pham-khoi-nghiep-a352309.html',
    alternates: [{ outlet: 'Thế giới Tiếp thị (Dân Việt)', url: 'https://thegioitiepthi.danviet.vn/doc-dao-san-pham-khoi-nghiep-20230224075746932-d19192.html' }],
    kind: 'article',
    byline: 'Hạnh Châu',
  },
  {
    slug: 'an-giang-mo-hinh-nam-moi-nang-nuong',
    outlet: 'Cổng thông tin Hội LHPN Việt Nam',
    headline: 'An Giang: Mô hình “Nấm mối nàng Nương” mang thực phẩm sạch tới người tiêu dùng',
    date: '2022-10-10',
    url: 'https://vwu.vn/web/guest/tin-chi-tiet/-/chi-tiet/an-giang-mo-hinh-nam-moi-nang-nuong-mang-thuc-pham-sach-toi-nguoi-tieu-dung-50818-9.html',
    kind: 'article',
  },
  {
    slug: 'bao-an-giang-nam-moi-nang-nuong',
    outlet: 'Báo An Giang',
    headline: '“Nấm mối nàng Nương”',
    date: '2022-08-25',
    url: 'https://baoangiang.com.vn/-nam-moi-nang-nuong--a341198.html',
    kind: 'article',
    byline: 'Ánh Nguyên',
  },
  {
    slug: 'thi-anh-dua-cong-nghe-xanh-vao-chuoi-san-xuat-nam-tuan-hoan',
    outlet: 'Báo điện tử Dân Việt',
    headline: 'Thi ảnh nông thôn Việt Nam 40 năm đổi mới: Đưa công nghệ xanh vào chuỗi sản xuất nấm tuần hoàn',
    date: '2026-09-24',
    url: 'https://danviet.vn/thi-anh-nong-thon-viet-nam-40-nam-doi-moi-dua-cong-nghe-xanh-vao-chuoi-san-xuat-nam-tuan-hoan-d1461950.html',
    kind: 'article',
  },
  {
    slug: 'ung-dung-cong-nghe-tu-dong-ruong-ra-thi-truong-so',
    outlet: 'Báo Phụ nữ Việt Nam',
    headline: 'Ứng dụng công nghệ từ đồng ruộng ra thị trường số, nông dân miền Tây gặt "quả ngọt"',
    date: '2026-09-02',
    url: 'https://phunuvietnam.vn/ung-dung-cong-nghe-tu-dong-ruong-ra-thi-truong-so-nong-dan-mien-tay-gat-qua-ngot-238260823135529548.htm',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'thoi-son-khai-mo-tiem-nang-du-lich',
    outlet: 'Báo An Giang',
    headline: 'Thới Sơn khai mở tiềm năng du lịch',
    date: '2026-07-06',
    url: 'https://baoangiang.com.vn/thoi-son-khai-mo-tiem-nang-du-lich-a491382.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'nong-nghiep-mien-tay-no-luc-chuyen-doi-xanh',
    outlet: 'Báo Phụ Nữ',
    headline: 'Nông nghiệp miền Tây nỗ lực chuyển đổi xanh',
    date: '2026-06-15',
    url: 'https://tuoitre.vn/phunuonline/nong-nghiep-mien-tay-no-luc-chuyen-doi-xanh-1101585014.htm',
    alternates: [{ outlet: 'Báo Phụ Nữ (địa chỉ cũ)', url: 'https://www.phunuonline.com.vn/nong-nghiep-mien-tay-no-luc-chuyen-doi-xanh-a1585014.html' }],
    kind: 'article',
  },
  {
    slug: 'thoi-quen-dot-dong-o-mien-tay',
    outlet: 'Báo Phụ Nữ',
    headline: 'Thói quen đốt đồng ở miền Tây gây lãng phí tài nguyên và ô nhiễm',
    date: '2026-06-01',
    url: 'https://tuoitre.vn/phunuonline/thoi-quen-dot-dong-o-mien-tay-gay-lang-phi-tai-nguyen-va-o-nhiem-1101583890.htm',
    alternates: [{ outlet: 'Báo Phụ Nữ (địa chỉ cũ)', url: 'https://www.phunuonline.com.vn/thoi-quen-dot-dong-o-mien-tay-gay-lang-phi-tai-nguyen-va-o-nhiem-a1583890.html' }],
    kind: 'article',
  },
  {
    slug: 'chuyen-kinh-te-nau-thanh-xanh',
    outlet: 'Báo An Giang',
    headline: 'Chuyển kinh tế nâu thành xanh',
    date: '2026-05-27',
    url: 'https://baoangiang.com.vn/chuyen-kinh-te-nau-thanh-xanh-a486892.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'go-kho-de-hop-tac-xa-phat-trien',
    outlet: 'Báo An Giang',
    headline: 'Gỡ khó để hợp tác xã phát triển',
    date: '2026-05-11',
    url: 'https://baoangiang.com.vn/go-kho-de-hop-tac-xa-phat-trien-a485133.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'co-giao-o-an-giang-lap-dien-mat-troi-o-trai-nam',
    outlet: 'Báo điện tử Dân Việt',
    headline: 'Cô giáo ở An Giang đầu tư tiền tỷ lắp điện mặt trời ở trại nấm, bất ngờ nấm đẻ tua tủa, tạo chuỗi sản xuất xanh',
    date: '2026-03-30',
    url: 'https://danviet.vn/co-giao-o-an-giang-dau-tu-tien-ty-lap-dien-mat-troi-o-trai-nam-bat-ngo-nam-de-tua-tua-tao-chuoi-san-xuat-xanh-d1414455.html',
    kind: 'article',
  },
  {
    slug: 'tiem-an-nhieu-nguy-hai-tu-thoi-quen-dot-rom-ra',
    outlet: 'Báo Nhân Dân',
    headline: 'Tiềm ẩn nhiều nguy hại từ thói quen đốt rơm rạ trên đồng',
    date: '2026-03-29',
    url: 'https://nhandan.vn/tiem-an-nhieu-nguy-hai-tu-thoi-quen-dot-rom-ra-tren-dong-post951838.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'nong-nghiep-an-giang-tang-toc-chuyen-doi-so',
    outlet: 'Thiên nhiên & Môi trường',
    headline: 'Nông nghiệp An Giang tăng tốc chuyển đổi số',
    date: '2026-03-27',
    url: 'https://thiennhienmoitruong.vn/nong-nghiep-an-giang-tang-toc-chuyen-doi-so.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: '30-chu-du-an-doat-giai-phu-nu-viet-tu-tin-lam-kinh-te',
    outlet: 'Báo Phụ nữ Việt Nam',
    headline: '30 chủ dự án tiêu biểu đoạt giải "Phụ nữ Việt tự tin làm kinh tế"',
    date: '2026-03-23',
    url: 'https://phunuvietnam.vn/30-chu-du-an-tieu-bieu-doat-giai-phu-nu-viet-tu-tin-lam-kinh-te-238260323141305731.htm',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'doan-dai-bieu-quoc-hoi-an-giang-dau-an-nguoi-dai-bieu-cua-nong-dan',
    outlet: 'Hội Nông dân Việt Nam',
    headline: 'Đoàn Đại biểu Quốc hội An Giang: Dấu ấn người đại biểu của nông dân và kỳ vọng “vươn mình” trong nhiệm kỳ mới',
    date: '2026-02-26',
    url: 'https://hoinongdan.org.vn/trung-uong-hoi/doan-dai-bieu-quoc-hoi-an-giang-dau-an-nguoi-dai-bieu-cua-nong-dan-va-ky-vong-vuon-minh-trong-nhiem-ky-moi-380395',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'chau-thi-nuong-hinh-mau-nong-dan-xay-dung-nong-thon-moi',
    outlet: 'Doanh nghiệp & Tiếp thị',
    headline: 'Châu Thị Nương – hình mẫu nông dân trong xây dựng nông thôn mới và phát triển sản phẩm OCOP',
    date: '2026-02-18',
    url: 'https://dntt.vn/chau-thi-nuong-hinh-mau-nong-dan-trong-xay-dung-nong-thon-moi-va-phat-trien-san-pham-ocop-d13644.html',
    kind: 'article',
  },
  {
    slug: 'tat-bat-san-xuat-hang-tet',
    outlet: 'Báo An Giang',
    headline: 'Tất bật sản xuất hàng Tết',
    date: '2026-02-12',
    url: 'https://baoangiang.com.vn/tat-bat-san-xuat-hang-tet-a476831.html',
    kind: 'article',
  },
  {
    slug: 'qua-tet-voi-san-pham-ocop-suc-khoe',
    outlet: 'Báo Tuổi Trẻ',
    headline: 'Quà Tết với sản phẩm OCOP "sức khỏe"',
    date: '2026-01-30',
    url: 'https://tuoitre.vn/qua-tet-voi-san-pham-ocop-suc-khoe-20260130080016094.htm',
    kind: 'article',
  },
  {
    slug: 'tu-co-so-gui-gam-niem-tin-kien-nghi-dot-pha',
    outlet: 'Báo An Giang',
    headline: 'Từ cơ sở gửi gắm niềm tin, kiến nghị đột phá cho nhiệm kỳ mới',
    date: '2026-01-18',
    url: 'https://baoangiang.com.vn/tu-co-so-gui-gam-niem-tin-kien-nghi-dot-pha-cho-nhiem-ky-moi-a473981.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'tong-thuat-hoi-nghi-thu-tuong-doi-thoai-voi-nong-dan-2025',
    outlet: 'Báo Điện tử Chính phủ',
    headline: 'TỔNG THUẬT: Hội nghị Thủ tướng Chính phủ đối thoại với nông dân năm 2025',
    date: '2025-12-10',
    url: 'https://baochinhphu.vn/cap-nhat-hoi-nghi-thu-tuong-chinh-phu-doi-thoai-voi-nong-dan-nam-2025-102251210080135023.htm',
    alternates: [
      { outlet: 'Báo Điện tử Chính phủ', url: 'https://cms.baochinhphu.vn/cap-nhat-hoi-nghi-thu-tuong-chinh-phu-doi-thoai-voi-nong-dan-nam-2025-102251210080135023.htm' },
      { outlet: 'Cổng TTĐT Chính phủ – Xây dựng chính sách', url: 'https://xaydungchinhsach.chinhphu.vn/thu-tuong-doi-thoai-voi-nong-dan-nam-2025-119251210085703666.htm' },
    ],
    kind: 'article',
    mention: true,
  },
  {
    slug: 'nong-dan-ke-chuyen-len-nui-hung-song-livestream',
    outlet: 'Báo Thanh Niên',
    headline: 'Nông dân kể chuyện lên núi \'hứng sóng\' livestream bán nông sản',
    date: '2025-12-10',
    url: 'https://thanhnien.vn/nong-dan-ke-chuyen-len-nui-hung-song-livestream-ban-nong-san-185251210143337259.htm',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'nong-dan-co-to-lam-chu-kinh-te-nong-thon',
    outlet: 'Báo An Giang',
    headline: 'Nông dân Cô Tô làm chủ kinh tế nông thôn',
    date: '2025-12-01',
    url: 'https://baoangiang.com.vn/nong-dan-co-to-lam-chu-kinh-te-nong-thon-a468674.html',
    kind: 'article',
  },
  {
    slug: 'trien-vong-san-xuat-nam-theo-huong-tuan-hoan-khep-kin',
    outlet: 'Báo Cần Thơ',
    headline: 'Triển vọng sản xuất nấm theo hướng tuần hoàn, khép kín',
    date: '2025-11-26',
    url: 'https://baocantho.com.vn/trien-vong-san-xuat-nam-theo-huong-tuan-hoan-khep-kin-a194527.html',
    kind: 'article',
  },
  {
    slug: 'tong-bi-thu-gap-mat-nong-dan-xuat-sac-2025',
    outlet: 'Hội Nông dân Việt Nam',
    headline: 'Tổng Bí thư Tô Lâm gặp mặt các nông dân xuất sắc, Nhà khoa học của Nhà nông tiêu biểu',
    date: '2025-10-15',
    url: 'https://www.hoinongdan.org.vn/hoat-dong-hoi/tong-bi-thu-to-lam-gap-mat-cac-nong-dan-xuat-sac-nha-khoa-hoc-cua-nha-nong-tieu-bieu-380043',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'nhat-thu-rac-gi-mang-ve-nha-chi-dep-an-giang',
    outlet: 'Báo điện tử Dân Việt',
    headline: 'Nhặt thứ rác gì mang về nhà mà một "chị đẹp" An Giang nay là Nông dân Việt Nam xuất sắc 2025?',
    date: '2025-09-12',
    url: 'https://danviet.vn/nhat-thu-rac-gi-mang-ve-nha-ma-mot-chi-dep-an-giang-nay-la-nong-dan-viet-nam-xuat-sac-d1360947.html',
    kind: 'article',
  },
  {
    slug: 'mot-nu-giam-doc-htx-o-an-giang-bien-thu-rac',
    outlet: 'Báo điện tử Dân Việt',
    headline: 'Một nữ giám đốc HTX ở tỉnh An Giang mới "biến" thứ rác gì mà ra bộn tiền, 10 người khen cả 10?',
    date: '2025-07-19',
    url: 'https://danviet.vn/mot-nu-giam-doc-htx-o-tinh-an-giang-moi-bien-thu-rac-gi-ma-ra-bon-tien-10-nguoi-khen-ca-10-d1348548.html',
    kind: 'article',
  },
  {
    slug: 'sinh-vien-fpt-can-tho-ky-ket-hop-tac-truyen-thong',
    outlet: 'Báo Cần Thơ',
    headline: 'Sinh viên Trường Đại học FPT phân hiệu Cần Thơ ký kết hợp tác thực hiện truyền thông với doanh nghiệp',
    date: '2025-06-28',
    url: 'https://baocantho.com.vn/sinh-vien-truong-dai-hoc-fpt-phan-hieu-can-tho-ky-ket-hop-tac-thuc-hien-truyen-thong-voi-doanh-nghie-a187954.html',
    alternates: [{ outlet: 'Trường Đại học FPT', url: 'https://daihoc.fpt.edu.vn/trai-nghiem-sinh-vien/hoat-dong-sinh-vien/sinh-vien-truong-dai-hoc-fpt-phan-hieu-can-tho-ky-ket-hop-tac-thuc-hien-truyen-thong-voi-doanh-nghiep/' }],
    kind: 'article',
  },
  {
    slug: 'tri-ton-cong-nhan-them-4-san-pham-ocop-3-sao',
    outlet: 'Báo An Giang',
    headline: 'Tri Tôn công nhận thêm 4 sản phẩm đạt tiêu chuẩn OCOP 3 sao',
    date: '2025-04-26',
    url: 'https://baoangiang.com.vn/tri-ton-cong-nhan-them-4-san-pham-dat-tieu-chuan-ocop-3-sao-a419698.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'phu-nu-dbscl-va-cuoc-chuyen-dich-xanh',
    outlet: 'VietnamPlus – TTXVN',
    headline: 'Phụ nữ ĐBSCL và cuộc chuyển dịch Xanh: Năng lượng mới, tầm nhìn mới',
    date: '2025-04-07',
    url: 'https://www.vietnamplus.vn/phu-nu-dbscl-va-cuoc-chuyen-dich-xanh-nang-luong-moi-tam-nhin-moi-post1025227.vnp',
    kind: 'article',
  },
  {
    slug: 'cultivating-medicinal-mushrooms-under-solar-panels',
    outlet: 'Vietnam Agriculture – Báo Nông nghiệp và Môi trường',
    headline: 'Cultivating medicinal mushrooms under solar panels: An economic and environmental solution',
    date: '2025-03-01',
    url: 'https://van.nongnghiepmoitruong.vn/cultivating-medicinal-mushrooms-under-solar-panels-an-economic-and-environmental-solution-d423294.html',
    kind: 'article',
  },
  {
    slug: 'tap-huan-ky-nang-truyen-thong-hoi-nong-dan-ca-mau-an-giang',
    outlet: 'Hội Nông dân Việt Nam',
    headline: 'Tập huấn kỹ năng truyền thông cho cán bộ, hội viên Hội Nông dân tại Cà Mau và An Giang',
    date: '2024-08-23',
    url: 'https://www.hoinongdan.org.vn/trung-uong-hoi/tap-huan-ky-nang-truyen-thong-cho-can-bo-hoi-vien-hoi-nong-dan-tai-ca-mau-va-an-giang-289657',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'chi-nong-dan-trong-loai-cay-sieu-sach',
    outlet: 'Doanh nghiệp & Thương hiệu',
    headline: 'Chị nông dân trồng loại cây "siêu sạch", nhẹ nhàng thu gần 1 tỷ đồng/năm',
    date: '2024-08-22',
    url: 'https://doanhnghiepthuonghieu.vn/chi-nong-dan-trong-loai-cay-sieu-sach-nhe-nhang-thu-gan-1-ty-dong-nam1-p58316.html',
    kind: 'article',
  },
  {
    slug: 'tao-viec-lam-cho-phu-nu-nong-thon-bang-nghe-trong-nam',
    outlet: 'Báo Phụ Nữ',
    headline: 'Tạo việc làm cho phụ nữ nông thôn bằng nghề trồng nấm',
    date: '2024-08-15',
    url: 'https://tuoitre.vn/phunuonline/tao-viec-lam-cho-phu-nu-nong-thon-bang-nghe-trong-nam-1101525754.htm',
    alternates: [{ outlet: 'Báo Phụ Nữ (địa chỉ cũ)', url: 'https://www.phunuonline.com.vn/tao-viec-lam-cho-phu-nu-nong-thon-bang-nghe-trong-nam-a1525754.html' }],
    kind: 'article',
  },
  {
    slug: 'nu-giam-doc-me-lam-kinh-te-tuan-hoan-khep-kin',
    outlet: 'VOV Giao thông',
    headline: 'Nữ giám đốc mê làm kinh tế tuần hoàn khép kín',
    date: '2024-06-24',
    url: 'https://vovgiaothong.vn/newsaudio/nu-giam-doc-me-lam-kinh-te-tuan-hoan-khep-kin-d39522.html',
    kind: 'audio',
  },
  {
    slug: 'ho-tro-phu-nu-cho-moi-khoi-nghiep',
    outlet: 'Báo An Giang',
    headline: 'Hỗ trợ phụ nữ Chợ Mới khởi nghiệp',
    date: '2024-03-21',
    url: 'https://baoangiang.com.vn/ho-tro-phu-nu-cho-moi-khoi-nghiep-a390965.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'thu-nhap-tram-trieu-moi-nam-nho-trong-nam-moi-den',
    outlet: 'Báo Cần Thơ',
    headline: 'Thu nhập trăm triệu mỗi năm nhờ trồng nấm mối đen',
    date: '2024-03-21',
    url: 'https://baocantho.com.vn/thu-nhap-tram-trieu-moi-nam-nho-trong-nam-moi-den-a171459.html',
    kind: 'article',
  },
  {
    slug: 'tich-cuc-trien-khai-cac-du-an-chuong-trinh-muc-tieu-quoc-gia',
    outlet: 'Cổng thông tin Hội LHPN Việt Nam',
    headline: 'Thực hiện chương trình mục tiêu quốc gia phát triển vùng dân tộc thiểu số và miền núi: Tích cực triển khai các dự án trong Chương trình Mục tiêu quốc gia',
    date: '2023-12-06',
    url: 'https://vwu.vn/web/guest/tin-chi-tiet/-/chi-tiet/thuc-hien-chuong-trinh-muc-tieu-quoc-gia-phat-trien-vung-dan-toc-thieu-so-va-mien-nui-tich-cuc-trien-khai-cac-du-an-trong-chuong-trinh-muc-tieu-quoc-gia-60755-6901.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'to-chuc-vong-chung-ket-sang-kien-esg-viet-nam-2023',
    outlet: 'Thời báo Tài chính Việt Nam',
    headline: 'Tổ chức Vòng chung kết Sáng kiến ESG Việt Nam 2023 để chọn 3 doanh nghiệp chiến thắng',
    date: '2023-09-09',
    url: 'https://thoibaotaichinhvietnam.vn/to-chuc-vong-chung-ket-sang-kien-esg-viet-nam-2023-de-chon-3-doanh-nghiep-chien-thang-135459.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: '10-doanh-nghiep-so-gang-vong-chung-ket-sang-kien-esg-2023',
    outlet: 'Báo Đầu tư',
    headline: '10 doanh nghiệp “so găng” tại Vòng chung kết Sáng kiến ESG Việt Nam 2023',
    date: '2023-09-08',
    url: 'https://baodautu.vn/10-doanh-nghiep-so-gang-tai-vong-chung-ket-sang-kien-esg-viet-nam-2023-d198122.html',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'top-3-doanh-nghiep-dat-sang-kien-viet-nam-2023',
    outlet: 'VnEconomy',
    headline: 'Top 3 doanh nghiệp đạt Sáng kiến Việt Nam 2023 sẽ được công bố vào tháng 10/2023',
    date: '2023-09-08',
    url: 'https://vneconomy.vn/top-3-doanh-nghiep-dat-sang-kien-viet-nam-2023-se-duoc-cong-bo-vao-thang-10-2023.htm',
    kind: 'article',
    mention: true,
  },
  {
    slug: 'trong-nam-moi-den-de-mang-thuc-pham-sach',
    outlet: 'Báo Phụ nữ Việt Nam',
    headline: 'Trồng nấm mối đen để mang thực phẩm sạch đến người tiêu dùng',
    date: '2023-04-05',
    url: 'https://phunuvietnam.vn/trong-nam-moi-den-de-mang-thuc-pham-sach-den-nguoi-tieu-dung-20230405144535187.htm',
    kind: 'article',
  },
  {
    slug: 'tao-su-khac-biet-cho-san-pham-ocop',
    outlet: 'Báo Tin tức và Dân tộc – TTXVN',
    headline: 'Tạo sự khác biệt cho sản phẩm OCOP',
    date: '2023-01-31',
    url: 'https://baotintuc.vn/kinh-te/tao-su-khac-biet-cho-san-pham-ocop-20230131105311312.htm',
    kind: 'article',
  },
];

/** A press-page entry: dated, introduced, with a page of its own. */
export type FeaturedPress = PressItem & { featured: true; date: string; intro: string };

/** The press page, in its order: the lead first. */
export const press = pressArchive.filter((p): p is FeaturedPress => p.featured === true);

export const pressBySlug = (slug: string) => press.find((p) => p.slug === slug);

// ---------------------------------------------------------------------------
// Giải thưởng & Ghi nhận
// ---------------------------------------------------------------------------

export interface Source {
  label: string;
  href: string;
}

export interface Award {
  id: string;
  year: string;
  /** Exact name of the distinction, as on the certificate or trophy. */
  name: string;
  /** Awarding organisation or programme. */
  by: string;
  /** Who received it, as named. */
  recipient: string;
  significance: string;
  photo: Pic;
  /** Certificates, trophies and other evidence. */
  evidence: Pic[];
  sources: Source[];
}

export const awards: Award[] = [
  {
    // Nhân Dân 08.10.2025 (list announced); certificate dated 10.10.2025;
    // ceremony 14.10 in Hà Nội (Nhân Dân). Photo: the meeting with Tổng Bí
    // thư Tô Lâm on 14.10.2025 (hoinongdan.org.vn 15.10.2025; GBI 28.10.2025).
    id: 'nong-dan-viet-nam-xuat-sac-2025',
    year: '2025',
    name: 'Nông dân Việt Nam xuất sắc năm 2025',
    by: 'Trung ương Hội Nông dân Việt Nam · Chương trình Tự hào Nông dân Việt Nam năm 2025',
    recipient: 'Chị Châu Thị Nương',
    significance: 'Chị Châu Thị Nương là một trong 63 nông dân được Trung ương Hội Nông dân Việt Nam bình chọn năm 2025, dịp kỷ niệm 95 năm thành lập Hội, với mô hình trồng nấm. Các nông dân được tôn vinh tại Hà Nội vào tháng 10/2025.',
    photo: pic('tbt-phat-bieu', [[640, 427], [1280, 854], [1800, 1200]], {
      alt: 'Chị Châu Thị Nương mặc áo dài đỏ, quàng khăn rằn, cài hoa đỏ trên ngực, đứng phát biểu giữa hội trường',
      caption: 'Chị Châu Thị Nương tại buổi gặp mặt của Tổng Bí thư Tô Lâm với các Nông dân Việt Nam xuất sắc năm 2025, Hà Nội, 14.10.2025.',
      credit: 'Trang trại Hiền Nương',
      origin: 'HIEN_NUONG_DAU_AN_HANDOFF/dau-an-handoff/dau-an-chi-nuong-phat-bieu.jpg (netid.vn, L08)',
      position: '62% 30%',
    }),
    evidence: [
      pic('ndvnxs-chung-nhan', [[379, 522]], {
        alt: 'Giấy chứng nhận của Ban Tổ chức Chương trình Tự hào Nông dân Việt Nam năm 2025 ghi bà Châu Thị Nương, ấp Tân Bình, xã Cô Tô, tỉnh An Giang, đạt danh hiệu Nông dân Việt Nam xuất sắc 2025, ký ngày 10 tháng 10 năm 2025',
        caption: 'Giấy chứng nhận đạt danh hiệu Nông dân Việt Nam xuất sắc 2025, Hà Nội, ngày 10.10.2025.',
        credit: 'Trang trại Hiền Nương',
        origin: 'dau-an-cup-chung-nhan-2025.jpg, phần bên phải',
      }),
      pic('ndvnxs-cup', [[379, 522]], {
        alt: 'Cúp pha lê hình ngôi sao khắc dòng chữ Danh hiệu Nông dân Việt Nam xuất sắc năm 2025',
        caption: 'Cúp danh hiệu Nông dân Việt Nam xuất sắc năm 2025.',
        credit: 'Trang trại Hiền Nương',
        origin: 'dau-an-cup-chung-nhan-2025.jpg, phần bên trái',
      }),
      pic('nd-xuat-sac-2025', [[640, 360], [800, 450]], {
        alt: 'Chị Châu Thị Nương đội nón lá, quàng khăn rằn, cầm hộp sản phẩm nấm linh chi',
        caption: 'Chị Châu Thị Nương (xã Cô Tô, tỉnh An Giang) là nông dân Việt Nam xuất sắc năm 2025 với mô hình trồng nấm. Ảnh: Ban Tổ chức cung cấp, đăng trên Báo Nhân Dân.',
        credit: 'Ban Tổ chức cung cấp',
        origin: 'E006__nhandan.vn/E006__8692b9__r001.avif',
      }),
    ],
    sources: [
      { label: 'Báo Nhân Dân, 08.10.2025', href: 'https://nhandan.vn/cong-bo-95-nong-dan-viet-nam-xuat-sac-va-nha-khoa-hoc-cua-nha-nong-nam-2025-post913741.html' },
      { label: 'Hội Nông dân Việt Nam, 15.10.2025', href: 'https://www.hoinongdan.org.vn/hoat-dong-hoi/tong-bi-thu-to-lam-gap-mat-cac-nong-dan-xuat-sac-nha-khoa-hoc-cua-nha-nong-tieu-bieu-380043' },
    ],
  },
  {
    // VnEconomy 08.09.2023 and Thời báo Tài chính 09.09.2023 name the HTX
    // among 10 finalists (pitch on 07.09.2023). No source shows it among
    // the three winners. Certificate photo: the farm's profile on netid.vn.
    id: 'top-10-sang-kien-esg-viet-nam-2023',
    year: '2023',
    name: 'Top 10 doanh nghiệp xuất sắc nhất Sáng kiến ESG Việt Nam 2023',
    by: 'Sáng kiến ESG Việt Nam 2023 · Bộ Kế hoạch và Đầu tư phối hợp với USAID',
    recipient: 'Hợp tác xã Nông nghiệp Tà Đảnh',
    significance: 'Hợp tác xã Nông nghiệp Tà Đảnh là một trong mười doanh nghiệp vào vòng chung kết Sáng kiến ESG Việt Nam 2023, thuyết trình trước hội đồng đánh giá ngày 07.09.2023.',
    photo: pic('esg-chung-nhan', [[481, 384]], {
      alt: 'Giấy chứng nhận khung vàng có logo USAID, trao tặng Hợp tác xã Nông nghiệp Tà Đảnh, thuộc Top 10 doanh nghiệp xuất sắc nhất Sáng kiến ESG Việt Nam 2023',
      caption: 'Giấy chứng nhận trao tặng Hợp tác xã Nông nghiệp Tà Đảnh: Thuộc Top 10 doanh nghiệp xuất sắc nhất Sáng kiến ESG Việt Nam 2023.',
      credit: 'Trang trại Hiền Nương',
      origin: 'L08__netid.vn/L08__9e0982__r012.jpg, góc dưới bên phải',
    }),
    evidence: [],
    sources: [
      { label: 'VnEconomy, 08.09.2023', href: 'https://vneconomy.vn/top-3-doanh-nghiep-dat-sang-kien-viet-nam-2023-se-duoc-cong-bo-vao-thang-10-2023.htm' },
      { label: 'Thời báo Tài chính Việt Nam, 09.09.2023', href: 'https://thoibaotaichinhvietnam.vn/to-chuc-vong-chung-ket-sang-kien-esg-viet-nam-2023-de-chon-3-doanh-nghiep-chien-thang-135459.html' },
    ],
  },
  {
    // Oxfam image story (undated; tagged GRAISEA 2). Year 2022 from vwu.vn
    // (11.08.2023). The name is the one on the trophy and the stage; the
    // Oxfam story calls the contest "Tìm kiếm sáng kiến sinh kế nông nghiệp".
    id: 'giai-nhat-sang-kien-graisea-2',
    year: '2022',
    name: 'Giải Nhất — Cuộc thi Tìm kiếm sáng kiến tăng quyền năng kinh tế phụ nữ trong nông nghiệp',
    by: 'Oxfam tại Việt Nam và các đối tác · Dự án GRAISEA 2',
    recipient: 'Hợp tác xã Nông nghiệp Tà Đảnh, sáng kiến “Tận dụng rơm rạ sản xuất phôi nấm mối đen”',
    significance: 'Chị Châu Thị Nương thuyết trình sáng kiến thay mặt HTX Tà Đảnh: dùng rơm rạ sau thu hoạch lúa làm phôi nấm mối đen. Đây là sáng kiến đạt giải nhất của cuộc thi.',
    photo: pic('ox-trao-giai', [[640, 457], [1280, 914], [1800, 1286]], {
      alt: 'Trên sân khấu chung kết cuộc thi, hai phụ nữ mặc áo dài cầm hoa và bảng giải thưởng đứng hai bên đại diện ban tổ chức; người bên phải cầm bảng Giải Nhất',
      caption: 'Trao giải tại vòng chung kết cuộc thi Tìm kiếm sáng kiến tăng quyền năng kinh tế phụ nữ trong nông nghiệp.',
      credit: 'Oxfam tại Việt Nam',
      origin: 'E020__vietnam.oxfam.org/E020__4f045f__ox02.jpg',
      position: '50% 55%',
    }),
    evidence: [
      pic('ox-cup-giai-nhat', [[481, 384]], {
        alt: 'Cúp pha lê có logo Sverige và Oxfam, khắc dòng chữ Đạt Giải Nhất cuộc thi Tìm kiếm sáng kiến tăng quyền năng kinh tế phụ nữ trong nông nghiệp, Dự án GRAISEA 2',
        caption: 'Cúp Giải Nhất của cuộc thi, Dự án GRAISEA 2.',
        credit: 'Trang trại Hiền Nương',
        origin: 'L08__netid.vn/L08__9e0982__r012.jpg, góc trên bên phải',
      }),
      pic('ox-thuyet-trinh', [[640, 457], [704, 503]], {
        alt: 'Người thuyết trình đứng trên sân khấu trước màn hình ghi Tận dụng rơm rạ sản xuất phôi nấm mối đen, BCV: Châu Thị Nương; hội đồng giám khảo ngồi phía trước',
        caption: 'Chị Châu Thị Nương, đại diện HTX Tà Đảnh, tỉnh An Giang thuyết trình về mô hình “Tận dụng rơm rạ sản xuất phôi nấm mối đen”.',
        credit: 'Oxfam tại Việt Nam',
        origin: 'E020__vietnam.oxfam.org/E020__4f045f__ox01.jpg',
      }),
    ],
    sources: [
      { label: 'Oxfam tại Việt Nam', href: 'https://vietnam.oxfam.org/vi/latest/image-story/using-rice-straw-produce-black-termite-mushroom-embryos' },
      { label: 'Hội LHPN Việt Nam', href: 'https://vwu.vn/web/guest/tin-chi-tiet/-/chi-tiet/an-giang-mo-hinh-nam-moi-nang-nuong-mang-thuc-pham-sach-toi-nguoi-tieu-dung-50818-9.html' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sự kiện & Hoạt động
// ---------------------------------------------------------------------------

export interface Activity {
  slug: string;
  /** ISO date; year-month or a year alone where only that is documented. */
  date: string;
  title: string;
  place?: string;
  /** One short sentence for the list. */
  summary: string;
  /** A few sentences for the album page, from the sources. */
  story: string[];
  photos: Pic[];
  sources: Source[];
  /** A recognition on the awards page this activity belongs to. */
  award?: string;
}

export const activities: Activity[] = [
  {
    // Owner-provided photographs and participation details (09.10.2026).
    // The invitation gives the opening, 06.08.2026, not the day of chị
    // Nương's visit, so the date stays at the month.
    slug: 'vietfood-beverage-propack-vietnam-2026',
    date: '2026-08',
    title: 'Hiền Nương tại Vietfood & Beverage – ProPack Vietnam 2026',
    place: 'SECC, TP.HCM',
    summary: 'Hiền Nương giới thiệu các sản phẩm nấm của trang trại trong không gian trưng bày chung cùng các đơn vị sản xuất.',
    story: [
      'Tháng 8/2026, Hiền Nương tham gia Vietfood & Beverage – ProPack Vietnam tại SECC, TP.HCM, giới thiệu các sản phẩm nấm của trang trại trong không gian trưng bày chung cùng các đơn vị sản xuất.',
    ],
    photos: [
      pic('vf26-chan-dung', [[640, 427], [1280, 854], [1800, 1201]], {
        alt: 'Chị Châu Thị Nương mặc áo dài xanh, quàng khăn rằn, đội nón lá, đeo thẻ triển lãm, đứng tại gian trưng bày bên giỏ mây xếp các hũ sản phẩm',
        caption: 'Sản phẩm Hiền Nương trong không gian triển lãm.',
        credit: 'Trang trại Hiền Nương',
        origin: 'HIEN_NUONG_PHOTO_COLLECTION/events-8-2026/01.jpg',
      }),
      pic('vf26-linh-chi', [[640, 427], [1280, 854], [1800, 1201]], {
        alt: 'Chị Châu Thị Nương trong áo dài xanh và khăn rằn nghiêng người chỉnh một chậu nấm linh chi trên kệ trưng bày, phía sau là các hộp thiếc in hình nấm linh chi xếp chồng',
        caption: 'Giới thiệu nấm linh chi tại gian trưng bày.',
        credit: 'Trang trại Hiền Nương',
        origin: 'HIEN_NUONG_PHOTO_COLLECTION/events-8-2026/03.jpg',
        position: '30% 35%',
      }),
      pic('vf26-trung-bay', [[640, 427], [1280, 854], [1800, 1201]], {
        alt: 'Kệ trưng bày với bốn chậu nấm linh chi ở hàng trước, phía sau xếp các hộp thiếc xanh in hình nấm linh chi, hộp rượu và chai sản phẩm; phông nền ghi Hợp tác xã Nông nghiệp Tà Đảnh',
        caption: 'Góc trưng bày nấm và các sản phẩm chế biến.',
        credit: 'Trang trại Hiền Nương',
        origin: 'HIEN_NUONG_PHOTO_COLLECTION/events-8-2026/04.jpg',
      }),
    ],
    sources: [],
  },
  {
    slug: 'chu-tich-hoi-nong-dan-tham-nuong-farm',
    date: '2026-03-05',
    title: 'Chủ tịch Trung ương Hội Nông dân Việt Nam thăm Nương Farm',
    place: 'Nương Farm, xã Thới Sơn, tỉnh An Giang',
    summary: 'Đồng chí Lương Quốc Đoàn cùng đoàn công tác thăm xưởng làm phôi, nhà nuôi và sản phẩm của trang trại.',
    story: [
      'Ngày 5/3/2026, trong chuyến công tác tại An Giang, đồng chí Lương Quốc Đoàn, Chủ tịch Trung ương Hội Nông dân Việt Nam, cùng đoàn công tác đến thăm mô hình “Nương Farm” tại xã Thới Sơn.',
      'Chị Châu Thị Nương giới thiệu quy trình làm phôi nấm của trang trại, từ khâu đóng bịch, hấp phôi đến nhà nuôi, và các sản phẩm chế biến từ nấm.',
    ],
    photos: [
      pic('dv-tham-phoi-nam', [[640, 341], [1280, 681], [1800, 958]], {
        alt: 'Chị Châu Thị Nương áo đỏ quàng khăn rằn đứng cạnh đoàn khách, một vị khách cầm bịch phôi nấm xem xét',
        caption: 'Chị Châu Thị Nương giới thiệu quy trình làm phôi nấm của trang trại với Chủ tịch Hội nông dân Việt Nam Lương Quốc Đoàn.',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r002.jpg',
      }),
      pic('dv-tham-toan-canh', [[640, 341], [1280, 681], [1800, 958]], {
        alt: 'Đoàn khách đứng quan sát công nhân đóng giá thể quanh đống mùn nâu trong xưởng làm phôi',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r001.jpg',
      }),
      pic('dv-tham-dong-bich', [[640, 341], [1280, 681]], {
        alt: 'Công nhân mặc đồng phục xanh ngồi quanh đống giá thể, đóng giá thể vào bịch',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r003.jpg',
      }),
      pic('dv-tham-hap', [[640, 341], [1280, 681]], {
        alt: 'Một công nhân xếp các bịch phôi lên xe đẩy bên cạnh lò hấp hình trụ',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r009.jpg',
      }),
      pic('dv-tham-nha-nuoi', [[640, 341], [1280, 681]], {
        alt: 'Những dãy kệ phôi nấm trong nhà nuôi mờ hơi sương',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r010.jpg',
      }),
      pic('dv-tham-linh-chi', [[640, 341], [1280, 681]], {
        alt: 'Cận cảnh những cây nấm linh chi mọc ra từ đầu các bịch phôi xếp nằm',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r011.jpg',
      }),
      pic('dv-tham-san-pham', [[640, 341], [1280, 681]], {
        alt: 'Chị Nương giới thiệu với đoàn khách bàn bày nấm linh chi và sản phẩm chế biến ngoài trời',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r012.jpg',
      }),
      pic('dv-tham-trao-doi', [[640, 341], [1280, 681]], {
        alt: 'Chị Nương trò chuyện với Chủ tịch Lương Quốc Đoàn bên bàn trưng bày sản phẩm',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r013.jpg',
      }),
      pic('dv-tham-bao-tu', [[640, 341], [1280, 681]], {
        alt: 'Chủ tịch Lương Quốc Đoàn xem nấm linh chi trong chậu bày trên bàn, chị Nương đứng phía sau',
        caption: 'Đồng chí Lương Quốc Đoàn quan sát và kiểm tra lớp bào tử trên bề mặt nấm linh chi tại Nương Farm.',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r016.jpg',
      }),
      pic('dv-tham-ban-trung-bay', [[640, 341], [1280, 681]], {
        alt: 'Bàn phủ khăn đỏ bày nấm linh chi, hộp quà và chai lọ sản phẩm từ nấm',
        credit: 'Phạm Hưng/Dân Việt',
        origin: 'E018__danviet.vn/E018__dbb019__r014.jpg',
      }),
    ],
    sources: [
      { label: 'Hội Nông dân Việt Nam, 06.03.2026', href: 'https://www.hoinongdan.org.vn/trung-uong-hoi/chu-tich-t-u-hoi-nong-dan-viet-nam-luong-quoc-doan-tham-mo-hinh-cua-nong-dan-san-xuat-gioi-tai-an-giang-380436' },
      { label: 'Dân Việt, 22.03.2026', href: 'https://danviet.vn/chu-tich-hoi-nong-dan-viet-nam-luong-quoc-doan-tham-mo-hinh-trong-nam-doanh-thu-15-ty-dong-nam-cua-nu-nong-dan-khmer-d1412214.html' },
    ],
  },
  {
    slug: 'hoi-nghi-thu-tuong-doi-thoai-voi-nong-dan-2025',
    date: '2025-12-10',
    title: 'Hội nghị Thủ tướng Chính phủ đối thoại với nông dân năm 2025',
    place: 'Điểm cầu tỉnh An Giang',
    summary: 'Chị Châu Thị Nương phát biểu từ điểm cầu An Giang.',
    story: [
      'Từ điểm cầu tỉnh An Giang, bà Châu Thị Nương, nông dân xuất sắc tỉnh An Giang, bày tỏ mong muốn Nhà nước đứng ra hỗ trợ kết nối nông dân, các hợp tác xã với doanh nghiệp phân phối - bán lẻ và các đối tác xuất khẩu. (Báo Thanh Niên)',
    ],
    photos: [],
    sources: [
      { label: 'Báo Chính phủ, 10.12.2025', href: 'https://baochinhphu.vn/cap-nhat-hoi-nghi-thu-tuong-chinh-phu-doi-thoai-voi-nong-dan-nam-2025-102251210080135023.htm' },
      { label: 'Báo Thanh Niên, 10.12.2025', href: 'https://thanhnien.vn/nong-dan-ke-chuyen-len-nui-hung-song-livestream-ban-nong-san-185251210143337259.htm' },
    ],
  },
  {
    slug: 'gap-mat-tong-bi-thu-to-lam',
    date: '2025-10-14',
    title: 'Gặp mặt Tổng Bí thư Tô Lâm cùng các Nông dân Việt Nam xuất sắc năm 2025',
    place: 'Trụ sở Trung ương Đảng, Hà Nội',
    summary: 'Chị Châu Thị Nương có mặt trong đoàn Nông dân Việt Nam xuất sắc năm 2025 được Tổng Bí thư tiếp tại Hà Nội.',
    story: [
      'Chiều 14/10/2025, Tổng Bí thư Tô Lâm gặp mặt các nông dân xuất sắc và nhà khoa học của nhà nông tiêu biểu năm 2025 tại Trụ sở Trung ương Đảng.',
      'Chị Châu Thị Nương, Nông dân Việt Nam xuất sắc năm 2025 đến từ An Giang, bày tỏ niềm vui mừng, vinh dự, tự hào khi được tiếp kiến Tổng Bí thư (Hội Nông dân Việt Nam).',
    ],
    photos: [
      pic('tbt-phat-bieu', [[640, 427], [1280, 854], [1800, 1200]], {
        alt: 'Chị Châu Thị Nương mặc áo dài đỏ, quàng khăn rằn, cài hoa đỏ trên ngực, đứng phát biểu giữa hội trường',
        credit: 'Trang trại Hiền Nương',
        origin: 'HIEN_NUONG_DAU_AN_HANDOFF/dau-an-handoff/dau-an-chi-nuong-phat-bieu.jpg (netid.vn, L08)',
        position: '62% 30%',
      }),
      pic('tbt-anh-chung', [[640, 427], [1280, 853]], {
        alt: 'Ảnh chụp chung đông đủ các đại biểu trên bậc thềm hội trường, chị Nương áo dài đỏ đứng hàng trước bên phải',
        credit: 'Trang trại Hiền Nương',
        origin: 'HIEN_NUONG_DAU_AN_HANDOFF/dau-an-handoff/dau-an-gap-mat-nong-dan.jpg (netid.vn, L08)',
      }),
      pic('tbt-hoi-truong', [[640, 480], [1280, 960]], {
        alt: 'Toàn cảnh hội trường với hai dãy bàn phủ khăn đỏ, đại biểu ngồi kín hai bên',
        credit: 'Hệ sinh thái GBI',
        origin: 'E031__hesinhthaigbi.vn/E031__d20eaf__r002.jpg',
      }),
      pic('tbt-tong-bi-thu', [[640, 480], [1280, 960]], {
        alt: 'Tổng Bí thư Tô Lâm phát biểu tại bục, phía sau là rèm đỏ và lẵng hoa lớn',
        credit: 'Hệ sinh thái GBI',
        origin: 'E031__hesinhthaigbi.vn/E031__d20eaf__r004.jpg',
      }),
    ],
    sources: [
      { label: 'Hội Nông dân Việt Nam, 15.10.2025', href: 'https://www.hoinongdan.org.vn/hoat-dong-hoi/tong-bi-thu-to-lam-gap-mat-cac-nong-dan-xuat-sac-nha-khoa-hoc-cua-nha-nong-tieu-bieu-380043' },
      { label: 'Hệ sinh thái GBI, 28.10.2025', href: 'https://hesinhthaigbi.vn/3eFh09D5F93e2cC' },
    ],
    award: 'nong-dan-viet-nam-xuat-sac-2025',
  },
  {
    // Date and place from the banner in the photograph and the Talk Xanh
    // event page (luma.com/kuw8qjx3); FPT University article 02.07.2025.
    slug: 'ky-ket-hop-tac-truyen-thong-sinh-vien-fpt-can-tho',
    date: '2025-06-26',
    title: 'Ký kết hợp tác truyền thông với sinh viên FPT Cần Thơ',
    place: 'Trường Đại học FPT phân hiệu Cần Thơ',
    summary: 'Trang trại Hiền Nương ký kết với nhóm sinh viên thực hiện chiến dịch truyền thông trong đồ án tốt nghiệp, cùng talkshow “Talk Xanh”.',
    story: [
      'Nhóm sinh viên chuyên ngành Truyền thông Đa phương tiện, Trường Đại học FPT phân hiệu Cần Thơ, ký kết hợp tác thực hiện truyền thông cho Trang trại Hiền Nương trong đồ án tốt nghiệp của mình.',
      'Buổi ký kết đi cùng talkshow “Talk Xanh – Khởi nghiệp NetZero & Định hướng tương lai bền vững”.',
    ],
    photos: [
      {
        src: '/images/hop-tac/kyket.webp',
        srcset: '/images/hop-tac/kyket.webp 800w',
        full: '/images/hop-tac/kyket.webp',
        width: 800,
        height: 565,
        alt: 'Lễ ký kết hợp tác truyền thông giữa Trang trại Hiền Nương và sinh viên FPT Cần Thơ; chị Châu Thị Nương mặc áo dài đỏ ngồi ký văn bản, xung quanh là các đại biểu chụp ảnh chung',
        caption: 'Lễ ký kết hợp tác truyền thông giữa Trang trại Hiền Nương và sinh viên FPT Cần Thơ, ngày 26.06.2025.',
        credit: 'Trường Đại học FPT',
        origin: 'public/images/hop-tac/kyket.webp (E023__daihoc.fpt.edu.vn)',
      },
    ],
    sources: [
      { label: 'Trường Đại học FPT, 02.07.2025', href: 'https://daihoc.fpt.edu.vn/trai-nghiem-sinh-vien/hoat-dong-sinh-vien/sinh-vien-truong-dai-hoc-fpt-phan-hieu-can-tho-ky-ket-hop-tac-thuc-hien-truyen-thong-voi-doanh-nghiep/' },
    ],
  },
  {
    slug: 'chung-ket-cuoc-thi-sang-kien-graisea-2',
    date: '2022',
    title: 'Chung kết cuộc thi Tìm kiếm sáng kiến tăng quyền năng kinh tế phụ nữ trong nông nghiệp',
    summary: 'Chị Châu Thị Nương thuyết trình sáng kiến “Tận dụng rơm rạ sản xuất phôi nấm mối đen” thay mặt HTX Tà Đảnh; sáng kiến đạt giải nhất.',
    story: [
      'Chị Châu Thị Nương, đại diện HTX Tà Đảnh, tỉnh An Giang, thuyết trình về mô hình “Tận dụng rơm rạ sản xuất phôi nấm mối đen” tại vòng chung kết.',
      'Cuộc thi do Oxfam tại Việt Nam và các đối tác tổ chức trong Dự án GRAISEA 2. Sáng kiến của HTX Tà Đảnh đạt giải nhất.',
    ],
    photos: [
      pic('ox-thuyet-trinh', [[640, 457], [704, 503]], {
        alt: 'Người thuyết trình đứng trên sân khấu trước màn hình ghi Tận dụng rơm rạ sản xuất phôi nấm mối đen, BCV: Châu Thị Nương; hội đồng giám khảo ngồi phía trước',
        caption: 'Thuyết trình sáng kiến “Tận dụng rơm rạ sản xuất phôi nấm mối đen”.',
        credit: 'Oxfam tại Việt Nam',
        origin: 'E020__vietnam.oxfam.org/E020__4f045f__ox01.jpg',
      }),
      pic('ox-trao-giai', [[640, 457], [1280, 914], [1800, 1286]], {
        alt: 'Trên sân khấu chung kết, hai phụ nữ mặc áo dài cầm hoa và bảng giải thưởng đứng hai bên đại diện ban tổ chức; người bên phải cầm bảng Giải Nhất',
        caption: 'Trao giải tại vòng chung kết.',
        credit: 'Oxfam tại Việt Nam',
        origin: 'E020__vietnam.oxfam.org/E020__4f045f__ox02.jpg',
      }),
      pic('ox-anh-chung', [[640, 457], [1280, 914]], {
        alt: 'Các thí sinh và khách mời chụp ảnh chung trước phông chung kết, cầm bảng cổ vũ có chữ An Giang và GRAISEA',
        credit: 'Oxfam tại Việt Nam',
        origin: 'E020__vietnam.oxfam.org/E020__4f045f__ox05.jpg',
      }),
      pic('ox-khan-gia', [[640, 426], [1280, 853]], {
        alt: 'Khán giả ngồi quanh bàn tiệc, giơ bảng cổ vũ trong hội trường',
        credit: 'Oxfam tại Việt Nam',
        origin: 'E020__vietnam.oxfam.org/E020__4f045f__ox03.jpg',
      }),
      pic('ox-ghi-chep', [[640, 428], [1280, 855]], {
        alt: 'Cận cảnh bàn tay viết ý tưởng bằng bút lông lên tờ giấy lớn',
        credit: 'Oxfam tại Việt Nam',
        origin: 'E020__vietnam.oxfam.org/E020__4f045f__ox04.jpg',
      }),
    ],
    sources: [
      { label: 'Oxfam tại Việt Nam', href: 'https://vietnam.oxfam.org/vi/latest/image-story/using-rice-straw-produce-black-termite-mushroom-embryos' },
    ],
    award: 'giai-nhat-sang-kien-graisea-2',
  },
];

export const activityBySlug = (slug: string) => activities.find((a) => a.slug === slug);

// ---------------------------------------------------------------------------
// Chứng nhận sản phẩm
// ---------------------------------------------------------------------------

/**
 * OCOP products as Báo An Giang names them (26.10.2025, a465150). The
 * article gives no star rating, certificate year or issuing body: add them
 * only from the certificates themselves. Images are the products' studio
 * photographs from the showroom (src/data/showroom.ts).
 */
export interface OcopProduct {
  /** Showroom slug: /san-pham/#slug and /images/products/studio/<slug>-*.webp. */
  slug: string;
  /** Name as the article gives it. */
  name: string;
  alt: string;
}

export const ocopProducts: OcopProduct[] = [
  { slug: 'nam-linh-chi', name: 'Nấm linh chi tai to', alt: 'Một tai nấm linh chi lớn màu nâu với nhiều lớp vân tròn, đặt trên nền sáng' },
  { slug: 'dong-trung-ha-thao', name: 'Nấm đông trùng hạ thảo', alt: 'Một khối đông trùng hạ thảo với những sợi màu cam mọc dày từ lớp giá thể' },
  { slug: 'nam-moi-den', name: 'Nấm mối tươi', alt: 'Một nhóm nấm mối đen tươi, mũ nâu sẫm, thân trắng ngà, xếp chồng trên nền sáng' },
];

export const ocopSource: Source = {
  label: 'Báo An Giang, 26.10.2025',
  href: 'https://baoangiang.com.vn/nu-nong-dan-xuat-sac-vung-bay-nui-an-giang-a465150.html',
};
