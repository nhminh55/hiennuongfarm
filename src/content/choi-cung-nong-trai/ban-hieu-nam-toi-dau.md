---
caption: Một điều mới sau mỗi câu hỏi.
progress: Câu {n} / 5
start: Sẵn sàng khám phá?
next: Câu tiếp theo
last: Xem kết quả
correct_mark: Đáp án đúng
chosen_mark: Bạn đã chọn
right: Đúng rồi! {explanation}
wrong: Chưa đúng, mình cùng xem nhé. {explanation}
complete_eyebrow: Bạn đã hoàn thành
complete_title: Người bạn của nấm
score: '{score} / 5 câu đúng'
result_all: Bạn đã nối được nhiều điều về nấm và nông trại. Cùng mang những điều nhỏ này vào câu chuyện hằng ngày nhé.
result_most: Bạn đã biết thêm vài điều hay về nấm. Mỗi câu hỏi là một dịp để khám phá thêm.
result_few: Cảm ơn bạn đã ghé chơi. Những điều mới hôm nay là khởi đầu cho lần khám phá tiếp theo.
replay: Chơi lại
link: Khám phá vòng tuần hoàn
noscript: Bật JavaScript để chơi. Bạn có thể
noscript_link: tìm hiểu vòng tuần hoàn tại đây
questions:
  - id: raw
    question: Trong vòng tuần hoàn, phụ phẩm nông nghiệp được tận dụng để làm gì?
    choices:
      - Chuẩn bị giá thể trồng nấm
      - Đóng gói nấm tươi
      - Làm pin mặt trời
      - Thay thế nấm giống
    correct: 0
    explanation: Phụ phẩm được tận dụng làm nguyên liệu chuẩn bị giá thể trồng nấm.
    source: src/pages/nong-nghiep-tuan-hoan/index.astro — vi.steps
  - id: treatment
    question: Trước khi nuôi trồng nấm, nguyên liệu làm giá thể cần qua bước nào?
    choices:
      - Dùng ngay khi thu gom
      - Xử lý, phối trộn và đóng bịch
      - Chỉ phơi cạnh nhà trồng
      - Trộn trực tiếp với nấm đã thu hoạch
    correct: 1
    explanation: Nguyên liệu được xử lý, phối trộn và đóng bịch thành giá thể phù hợp.
    source: src/pages/nong-nghiep-tuan-hoan/index.astro — vi.steps
  - id: after
    question: Tại Hiền Nương, giá thể sau thu hoạch nấm được tận dụng cho việc gì?
    choices:
      - Làm thức ăn cho trùn quế
      - Trộn vào món ăn
      - Thay bao bì sản phẩm
      - Bỏ toàn bộ đi
    correct: 0
    explanation: Giá thể sau thu hoạch được tận dụng làm thức ăn cho trùn quế.
    source: src/pages/nong-nghiep-tuan-hoan/index.astro — vi.steps
  - id: castings
    question: Phân trùn được dùng vào đâu trong vòng tuần hoàn?
    choices:
      - Đóng bịch nấm tươi
      - Bón cây trồng
      - Làm thức ăn cho người
      - Làm vật liệu nhà trồng
    correct: 1
    explanation: Phân trùn được dùng để bón cây và bổ sung nguồn dinh dưỡng hữu cơ cho đất.
    source: src/pages/nong-nghiep-tuan-hoan/index.astro — vi.steps
  - id: order
    question: Bước nào nối tiếp việc chuẩn bị giá thể?
    choices:
      - Bón cây bằng phân trùn
      - Thu gom bao bì
      - Nuôi trồng và thu hoạch nấm
      - Nuôi trùn trước khi trồng nấm
    correct: 2
    explanation: Giá thể sau khi được chuẩn bị phù hợp sẽ phục vụ quá trình nuôi trồng nấm.
    source: src/pages/nong-nghiep-tuan-hoan/index.astro — vi.steps
  - id: harvest
    question: Nấm thu hoạch tại trang trại được dùng theo cách nào?
    choices:
      - Chỉ dùng để bón cây
      - Chỉ dùng trang trí
      - Dùng tươi và chế biến thành sản phẩm khác
      - Chỉ làm thức ăn cho trùn
    correct: 2
    explanation: Nấm được thu hoạch để phục vụ nhu cầu sử dụng nấm tươi và chế biến.
    source: src/pages/nong-nghiep-tuan-hoan/index.astro — vi.steps
  - id: oyster
    question: Trong ảnh sản phẩm của Hiền Nương, chùm nấm bào ngư mọc từ đâu?
    choices:
      - Bịch phôi trên kệ nhà trồng
      - Chậu nước không có giá thể
      - Cành chuối
      - Mặt tấm pin mặt trời
    correct: 0
    explanation: Ảnh sản phẩm cho thấy chùm nấm bào ngư mọc từ bịch phôi xếp trên kệ trong nhà trồng.
    source: src/data/products.ts — products (approved names, notes and images)
  - id: line
    question: Loại nào thuộc bốn dòng nấm chính của trang trại?
    choices:
      - Nấm không rõ nguồn gốc
      - Nấm mối đen
      - Nấm hái ngẫu nhiên trong rừng
      - Mọi loại nấm ngoài tự nhiên
    correct: 1
    explanation: Bốn dòng chính là nấm mối đen, nấm linh chi, đông trùng hạ thảo và nấm bào ngư.
    source: src/pages/nong-nghiep-tuan-hoan/index.astro — vi.produceBody
  - id: lingzhi
    question: Ảnh nấm linh chi trên website cho thấy tai nấm phát triển từ đâu?
    choices:
      - Bịch phôi đặt trên lớp rơm
      - Bát nước sạch
      - Cây rau trong vườn
      - Bề mặt đá
    correct: 0
    explanation: Chú thích ảnh đã duyệt mô tả tai nấm linh chi mọc từ bịch phôi đặt trên lớp rơm.
    source: src/data/products.ts — products (approved names, notes and images)
  - id: loop
    question: Điều gì tiếp nối vòng tuần hoàn sau khi nuôi trùn quế?
    choices:
      - Bỏ giá thể chưa xử lý vào món ăn
      - Chỉ thu hoạch thêm nấm
      - Sử dụng phân trùn để bón cây
      - Ngừng tận dụng phụ phẩm
    correct: 2
    explanation: Phân trùn trở lại với cây trồng, tiếp nối giá trị từ nguồn phụ phẩm ban đầu.
    source: src/pages/nong-nghiep-tuan-hoan/index.astro — vi.steps
---
