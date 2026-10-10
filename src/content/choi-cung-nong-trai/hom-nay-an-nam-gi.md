---
flavor_question: Bạn muốn ăn kiểu nào?
time_question: Có bao nhiêu thời gian?
pantry_question: Bếp đang có gì?
pantry_note: Chọn những thứ có sẵn, hoặc bỏ qua.
submit: Gợi ý món cho tui
disclosure: Gợi ý biên tập cho căn bếp của bạn. Thời gian gồm sơ chế và nấu, dùng để tham khảo.
initial_eyebrow: Một bữa ngon bắt đầu từ đây
initial_title:
  - Để nấm ghé
  - vào bếp bạn.
initial_text: Chọn vị bạn thích và thời gian có sẵn. Một món nấm, vài nguyên liệu quen, vừa đủ cho hai người.
no_match_eyebrow: Chưa tìm được món phù hợp
no_match_title: Mình đổi một chút nhé?
no_match: Chưa có món {flavor} trong {time} phút. {name} cần khoảng {minutes} phút. Chọn “Thảnh thơi” để xem món này, hoặc đổi sang vị khác.
relax_button: Chọn Thảnh thơi
result_eyebrow: Món hợp với lựa chọn của bạn
recipe_meta: '{flavor} · {minutes} phút · {servings} người'
match_some: 'Dùng được nguyên liệu bạn đã chọn: {list}. Các nguyên liệu khác cần kiểm tra thêm.'
match_none: Món phù hợp với vị và thời gian đã chọn. Bạn cần kiểm tra đầy đủ nguyên liệu bên dưới.
shopping_title: Cần chuẩn bị thêm
shopping_note: Nấm và gia vị cũng được liệt kê để bạn tiện kiểm tra.
show_details: Xem cách nấu
hide_details: Thu gọn công thức
alternative_button: Thử món khác
alternative_one: Hiện có một món phù hợp. Đổi vị hoặc thời gian để tìm thêm món.
alternative_many: Có {count} món phù hợp; đang xem món {index}.
product_link: Khám phá nấm bào ngư tại Hiền Nương
suggested: 'Gợi ý: {name}. {minutes} phút, cho {servings} người.'
changed: Lựa chọn đã đổi. Bấm “Gợi ý món cho tui” để xem món phù hợp.
details_meta: '{minutes} phút gồm sơ chế và nấu · {servings} người'
ingredients_title: Nguyên liệu
steps_title: Cách nấu
noscript: Bật JavaScript để nhận gợi ý món và xem công thức.
flavors:
  - id: light
    name: Thanh nhẹ
  - id: rich
    name: Đậm đà
  - id: crisp
    name: Giòn vui
times:
  - id: '15'
    name: 15 phút
  - id: '30'
    name: 30 phút
  - id: leisure
    name: Thảnh thơi
pantry:
  - id: tofu
    name: Đậu hũ
  - id: greens
    name: Rau xanh
  - id: egg
    name: Trứng
  - id: rice
    name: Cơm
recipes:
  - id: soup
    name: Canh nấm đậu hũ
    flavors:
      - light
    minutes: 15
    image: /images/farm-play/soup.webp
    alt: Minh họa bát canh nấm bào ngư, đậu hũ và rau xanh
    ingredients:
      - name: Nấm bào ngư
        quantity: 200 g
        key: mushrooms
      - name: Đậu hũ
        quantity: 200 g
        key: tofu
      - name: Rau cải
        quantity: 100 g
        key: greens
      - name: Nước
        quantity: 700 ml
        key: water
      - name: Hành lá
        quantity: 2 nhánh
        key: scallion
      - name: Muối
        quantity: ½ thìa cà phê
        key: salt
      - name: Nước tương
        quantity: 1 thìa cà phê
        key: soy
    steps:
      - Rửa nhanh nấm và rau, để ráo. Xé nấm vừa ăn; cắt đậu hũ và hành lá.
      - Đun sôi nước với muối. Cho nấm vào, nấu 5 phút.
      - Thêm đậu hũ và rau, nấu thêm 3–4 phút đến khi rau chín. Nêm nước tương, thêm hành và dùng nóng.
    substitution: Có thể thay rau cải bằng cải thìa hoặc cải ngọt.
  - id: eggs
    name: Trứng xào nấm bào ngư
    flavors:
      - rich
    minutes: 15
    image: /images/farm-play/eggs.webp
    alt: Minh họa đĩa trứng xào nấm bào ngư và hành lá
    ingredients:
      - name: Nấm bào ngư
        quantity: 200 g
        key: mushrooms
      - name: Trứng
        quantity: 3 quả
        key: egg
      - name: Hành lá
        quantity: 2 nhánh
        key: scallion
      - name: Dầu ăn
        quantity: 1 thìa canh
        key: oil
      - name: Nước tương
        quantity: 2 thìa cà phê
        key: soy
      - name: Tiêu
        quantity: ¼ thìa cà phê
        key: pepper
    steps:
      - Rửa nhanh, để ráo và xé nấm. Đánh trứng cùng 1 thìa cà phê nước tương; cắt hành.
      - Làm nóng dầu, xào nấm 5–6 phút cho chín và bớt nước.
      - Rót trứng vào, đảo nhẹ 2–3 phút đến khi trứng chín hoàn toàn. Thêm nước tương còn lại, tiêu và hành.
    substitution: Không có hành lá thì bỏ qua; dùng cùng cơm có sẵn nếu thích.
  - id: greens
    name: Nấm xào rau cải
    flavors:
      - light
    minutes: 25
    image: /images/farm-play/greens.webp
    alt: Minh họa đĩa nấm bào ngư xào rau cải xanh
    ingredients:
      - name: Nấm bào ngư
        quantity: 250 g
        key: mushrooms
      - name: Rau cải
        quantity: 250 g
        key: greens
      - name: Tỏi
        quantity: 2 tép
        key: garlic
      - name: Dầu ăn
        quantity: 1 thìa canh
        key: oil
      - name: Nước tương
        quantity: 1 thìa canh
        key: soy
      - name: Nước
        quantity: 2 thìa canh
        key: water
    steps:
      - Rửa rau và nấm, để ráo. Cắt rau, xé nấm; băm tỏi.
      - Làm nóng dầu, phi tỏi 30 giây. Cho nấm vào xào 6–8 phút.
      - Cho phần cọng rau vào trước, thêm nước và xào 2 phút. Thêm lá, nước tương; đảo thêm 2–3 phút đến khi chín.
    substitution: Dùng cải thìa, cải ngọt hoặc bông cải; bông cải cần thêm thời gian cho chín.
  - id: braise
    name: Nấm kho đậu hũ
    flavors:
      - rich
    minutes: 30
    image: /images/farm-play/braise.webp
    alt: Minh họa nồi nấm bào ngư và đậu hũ kho nước tương
    ingredients:
      - name: Nấm bào ngư
        quantity: 250 g
        key: mushrooms
      - name: Đậu hũ
        quantity: 200 g
        key: tofu
      - name: Nước tương
        quantity: 2 thìa canh
        key: soy
      - name: Đường
        quantity: 1 thìa cà phê
        key: sugar
      - name: Dầu ăn
        quantity: 1 thìa canh
        key: oil
      - name: Hành tím
        quantity: 2 củ
        key: shallot
      - name: Nước
        quantity: 100 ml
        key: water
      - name: Tiêu
        quantity: ¼ thìa cà phê
        key: pepper
    steps:
      - Rửa nhanh và xé nấm; cắt đậu hũ thành miếng, băm hành tím.
      - Làm nóng dầu, áp chảo đậu hũ 6–8 phút, trở nhẹ. Thêm hành và nấm, đảo 4 phút.
      - Thêm nước, nước tương và đường. Kho lửa nhỏ 10–12 phút cho nấm chín và nước sánh nhẹ; rắc tiêu.
    substitution: Đậu hũ đã chiên có thể dùng thay đậu hũ trắng; giảm thời gian áp chảo.
  - id: crispy
    name: Nấm bào ngư chiên giòn
    flavors:
      - crisp
    minutes: 35
    image: /images/farm-play/crispy.webp
    alt: Minh họa đĩa nấm bào ngư tẩm bột chiên giòn
    ingredients:
      - name: Nấm bào ngư
        quantity: 250 g
        key: mushrooms
      - name: Bột mì
        quantity: 80 g
        key: flour
      - name: Bột bắp
        quantity: 40 g
        key: cornstarch
      - name: Nước
        quantity: 140 ml
        key: water
      - name: Muối
        quantity: ½ thìa cà phê
        key: salt
      - name: Dầu ăn
        quantity: 300 ml để chiên
        key: oil
    steps:
      - Rửa nhanh nấm, thấm thật khô. Xé thành miếng vừa; trộn bột mì, bột bắp, muối và nước thành bột phủ.
      - Làm nóng dầu trên lửa vừa. Nhúng từng miếng nấm vào bột rồi thả cẩn thận vào dầu.
      - Chiên từng mẻ nhỏ 4–5 phút, trở miếng nấm để vàng đều và chín bên trong. Vớt ra giá cho ráo dầu, dùng ngay.
    substitution: Có thể dùng bột chiên giòn pha theo hướng dẫn trên bao bì thay hỗn hợp bột.
  - id: rice
    name: Cơm nấm áp chảo
    flavors:
      - crisp
      - rich
    minutes: 45
    image: /images/farm-play/rice.webp
    alt: Minh họa cơm áp chảo có nấm bào ngư, trứng và rau xanh
    ingredients:
      - name: Nấm bào ngư
        quantity: 200 g
        key: mushrooms
      - name: Cơm chín
        quantity: 350 g
        key: rice
      - name: Trứng
        quantity: 2 quả
        key: egg
      - name: Rau cải
        quantity: 100 g
        key: greens
      - name: Dầu ăn
        quantity: 2 thìa canh
        key: oil
      - name: Nước tương
        quantity: 1 thìa canh
        key: soy
      - name: Tỏi
        quantity: 2 tép
        key: garlic
    steps:
      - Rửa, để ráo và cắt nấm, rau; băm tỏi. Đánh trứng. Thời gian này dùng cơm đã nấu sẵn.
      - Dùng 1 thìa canh dầu xào tỏi, nấm 6–8 phút; thêm rau 3 phút. Cho trứng vào đảo đến khi chín, trộn nước tương.
      - Thêm dầu còn lại vào chảo chống dính. Dàn cơm thành lớp mỏng, áp lửa vừa nhỏ 8–10 phút đến khi đáy vàng; chia hai mẻ nếu chảo nhỏ.
      - Cho hỗn hợp nấm lên cơm, làm nóng thêm 2 phút rồi dùng.
    substitution: Không có rau cải thì dùng rau xanh sẵn có; cơm nguội phải được bảo quản lạnh đúng cách trước khi dùng.
---
