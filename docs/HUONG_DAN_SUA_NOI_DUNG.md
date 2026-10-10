# Hướng dẫn sửa chữ trên website

Mọi chữ trên trang chủ, trang Về chúng tôi, các trang Sản phẩm, menu, chân trang và thông tin liên hệ đều sửa được ở trang quản trị:

**https://hiennuongfarm.pages.dev/admin/**

(Mở ở `hiennuongfarm.vn/admin/` cũng được; đăng nhập luôn đi qua `pages.dev`, nên vẫn dùng được kể cả khi tên miền `.vn` gặp sự cố.)

## Cách sửa

1. Mở trang quản trị và bấm **Đăng nhập bằng GitHub**.
2. Cột trái là các nhóm trang: **Trang chủ**, **Về chúng tôi**, **Sản phẩm**, **Menu, liên hệ, chân trang**. Bấm vào nhóm, rồi bấm vào mục cần sửa.
3. Sửa chữ trong các ô. Phía trên có các tab **Tiếng Việt / Tiếng Anh / Tiếng Trung** để đổi ngôn ngữ, bên phải là phần xem trước.
4. Bấm **Lưu** ở góc trên bên phải.
5. Chờ 1–3 phút rồi tải lại trang web (Ctrl + F5) để xem.

Bấm Lưu là trang quản trị tự ghi lên GitHub và web tự cập nhật. Không có bước duyệt, nên đọc lại trước khi lưu. Sửa nhiều chỗ trong cùng một mục thì sửa hết rồi bấm Lưu một lần.

## Lưu ý

- **Nâng cao:** mỗi mục có một nhóm "Nâng cao" thu gọn ở cuối. Nhóm này chứa mô tả ảnh cho người khiếm thị, chữ cho trình đọc màn hình và mô tả hiện trên Google. Các chữ này không hiện trên trang, ít khi cần sửa.
- **Email, số điện thoại, đăng ký kinh doanh** (mục *Liên hệ & đăng ký kinh doanh*) giống nhau ở mọi ngôn ngữ: sửa một lần là đổi cả ba.
- **Số ô cố định:** nhiều danh sách có số ô cố định vì giao diện cần đúng số lượng, ví dụ tiêu đề 2 dòng hay 6 bước của vòng tuần hoàn. Riêng đoạn văn của các chương và phần kết thì thêm hoặc bớt được bằng nút **+ Thêm**.
- Chữ trong ngoặc nhọn như `{name}` hay `{title}` do website tự điền, phải giữ nguyên.
- Đoạn văn chỉ là chữ thường: không dùng chữ đậm, nghiêng hay link.
- Sửa tiếng Việt thì nhớ sửa luôn bản tiếng Anh và tiếng Trung tương ứng (nếu cần).
- Không đưa lên web số liệu, chứng nhận hay đối tác chưa được xác nhận.
- Ảnh, đường dẫn, thứ tự các mục và các trang khác (Dấu ấn, Showroom, Hợp tác, Nông nghiệp tuần hoàn) vẫn nằm trong code. Muốn đổi những phần đó thì nhờ người phụ trách website.

## Nếu lỡ sửa sai

Website **không hỏng**: nếu nội dung bị sai cấu trúc, bản build mới sẽ dừng lại và web giữ nguyên bản cũ.

- Sửa lại trong trang quản trị rồi bấm Lưu lần nữa.
- Xem lỗi: vào tab **Actions** của repository trên GitHub. Lần chạy lỗi có dấu ✗ đỏ, dòng báo lỗi ghi rõ tên file, ví dụ `src/content/trang-chu/02-ve-hien-nuong.md: thiếu trường "title"`.
- Muốn quay về bản trước: trên GitHub, mở file trong `src/content/` → **History** → chọn lần sửa trước.

## Cài đặt một lần (người phụ trách website)

Nút **Đăng nhập bằng GitHub** cần một GitHub OAuth App:

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Application name: `Hiền Nương Farm Admin`
   - Homepage URL: `https://hiennuongfarm.pages.dev`
   - Authorization callback URL: `https://hiennuongfarm.pages.dev/api/auth/callback`
2. Bấm **Register application**, chép **Client ID**, rồi bấm **Generate a new client secret** và chép **Client secret**.
3. Cloudflare → **Workers & Pages → hiennuongfarm → Settings → Variables and Secrets**, thêm cho môi trường **Production**:
   - `GITHUB_CLIENT_ID` = Client ID
   - `GITHUB_CLIENT_SECRET` = Client secret (chọn loại **Secret**)
4. Deploy lại một lần (push lên `main`, hoặc chạy lại workflow "Deploy to Cloudflare Pages") để biến môi trường có hiệu lực.

Ai có quyền ghi vào repository `nhminh55/hiennuongfarm` thì đăng nhập và sửa được.

Về kỹ thuật: trang quản trị là Sveltia CMS (`public/admin/`). Đăng nhập dùng `functions/api/auth/`. Nội dung nằm ở `src/content/` và được đọc bởi `src/data/copy.ts`. `public/admin/config.yml` (nhãn, thứ tự ô) và ảnh chú thích trong `public/admin/huong-dan/` được sinh bởi `scripts/admin-guide.mjs`. Thêm ô mới hoặc đổi giao diện thì sửa nhãn trong script đó, build, mở `npx astro preview --port 4330`, rồi chạy `node scripts/admin-guide.mjs http://127.0.0.1:4330`.

Trên máy (localhost): mở `/admin`, bấm **Làm việc với kho mã nguồn cục bộ** và chọn thư mục dự án (Chrome hoặc Edge). Cách này sửa thẳng file trên máy, không commit gì.
