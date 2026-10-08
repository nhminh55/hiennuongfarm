// All answers trace to owner-approved farm copy; no wild-mushroom or medical advice.
const cycleSource = 'src/pages/nong-nghiep-tuan-hoan/index.astro — vi.steps';
const productSource = 'src/data/products.ts — products (approved names, notes and images)';
const q = (id, question, choices, correct, explanation, source) => ({id,question,choices:choices.map((text,i)=>({id:String(i),text})),correct:String(correct),explanation,source});
export const questions = [
 q('raw','Trong vòng tuần hoàn, phụ phẩm nông nghiệp được tận dụng để làm gì?', ['Chuẩn bị giá thể trồng nấm','Đóng gói nấm tươi','Làm pin mặt trời','Thay thế nấm giống'],0,'Phụ phẩm được tận dụng làm nguyên liệu chuẩn bị giá thể trồng nấm.',cycleSource),
 q('treatment','Trước khi nuôi trồng nấm, nguyên liệu làm giá thể cần qua bước nào?', ['Dùng ngay khi thu gom','Xử lý, phối trộn và đóng bịch','Chỉ phơi cạnh nhà trồng','Trộn trực tiếp với nấm đã thu hoạch'],1,'Nguyên liệu được xử lý, phối trộn và đóng bịch thành giá thể phù hợp.',cycleSource),
 q('after','Tại Hiền Nương, giá thể sau thu hoạch nấm được tận dụng cho việc gì?', ['Làm thức ăn cho trùn quế','Trộn vào món ăn','Thay bao bì sản phẩm','Bỏ toàn bộ đi'],0,'Giá thể sau thu hoạch được tận dụng làm thức ăn cho trùn quế.',cycleSource),
 q('castings','Phân trùn được dùng vào đâu trong vòng tuần hoàn?', ['Đóng bịch nấm tươi','Bón cây trồng','Làm thức ăn cho người','Làm vật liệu nhà trồng'],1,'Phân trùn được dùng để bón cây và bổ sung nguồn dinh dưỡng hữu cơ cho đất.',cycleSource),
 q('order','Bước nào nối tiếp việc chuẩn bị giá thể?', ['Bón cây bằng phân trùn','Thu gom bao bì','Nuôi trồng và thu hoạch nấm','Nuôi trùn trước khi trồng nấm'],2,'Giá thể sau khi được chuẩn bị phù hợp sẽ phục vụ quá trình nuôi trồng nấm.',cycleSource),
 q('harvest','Nấm thu hoạch tại trang trại được dùng theo cách nào?', ['Chỉ dùng để bón cây','Chỉ dùng trang trí','Dùng tươi và chế biến thành sản phẩm khác','Chỉ làm thức ăn cho trùn'],2,'Nấm được thu hoạch để phục vụ nhu cầu sử dụng nấm tươi và chế biến.',cycleSource),
 q('oyster','Trong ảnh sản phẩm của Hiền Nương, chùm nấm bào ngư mọc từ đâu?', ['Bịch phôi trên kệ nhà trồng','Chậu nước không có giá thể','Cành chuối','Mặt tấm pin mặt trời'],0,'Ảnh sản phẩm cho thấy chùm nấm bào ngư mọc từ bịch phôi xếp trên kệ trong nhà trồng.',productSource),
 q('line','Loại nào thuộc bốn dòng nấm chính của trang trại?', ['Nấm không rõ nguồn gốc','Nấm mối đen','Nấm hái ngẫu nhiên trong rừng','Mọi loại nấm ngoài tự nhiên'],1,'Bốn dòng chính là nấm mối đen, nấm linh chi, đông trùng hạ thảo và nấm bào ngư.', 'src/pages/nong-nghiep-tuan-hoan/index.astro — vi.produceBody'),
 q('lingzhi','Ảnh nấm linh chi trên website cho thấy tai nấm phát triển từ đâu?', ['Bịch phôi đặt trên lớp rơm','Bát nước sạch','Cây rau trong vườn','Bề mặt đá'],0,'Chú thích ảnh đã duyệt mô tả tai nấm linh chi mọc từ bịch phôi đặt trên lớp rơm.',productSource),
 q('loop','Điều gì tiếp nối vòng tuần hoàn sau khi nuôi trùn quế?', ['Bỏ giá thể chưa xử lý vào món ăn','Chỉ thu hoạch thêm nấm','Sử dụng phân trùn để bón cây','Ngừng tận dụng phụ phẩm'],2,'Phân trùn trở lại với cây trồng, tiếp nối giá trị từ nguồn phụ phẩm ban đầu.',cycleSource),
];
