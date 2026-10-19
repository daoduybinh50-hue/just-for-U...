# Our Little Universe · Tuyết Mai

Website chúc mừng 20/10 dạng static, viết bằng HTML/CSS/JavaScript thuần và có thể đăng bằng GitHub Pages.

## Các tệp
- `index.html`: nội dung và cấu trúc website.
- `style.css`: màu sắc, bố cục responsive, minh họa và hiệu ứng.
- `script.js`: mở phong bì, animation khi cuộn, mini quiz và điều khiển nhạc.

## Chạy thử trên máy
Mở `index.html` bằng trình duyệt. Không cần cài đặt hoặc chạy backend.

## Thêm nhạc piano của bạn
1. Chuẩn bị file âm thanh mà bạn có quyền sử dụng, ví dụ `piano.mp3`.
2. Đặt file cạnh `index.html` nếu muốn đưa nhạc vào kho GitHub cùng website.
3. Cách đơn giản nhất để người nhận chọn nhạc: giữ nguyên cơ chế hiện tại. Khi bấm nút **Nhạc: tắt**, trình duyệt sẽ cho chọn một file âm thanh từ thiết bị của người đang xem. File được chọn chỉ dùng trong phiên trình duyệt đó, không tải lên website.
4. Nếu muốn tự phát file nhạc đi kèm website, mở `script.js` và thay phần xử lý nút nhạc bằng cách gán `audio.src = "./piano.mp3"` khi tải trang. Lưu ý: trình duyệt thường chặn tự phát âm thanh cho đến khi có thao tác của người dùng.

## Đăng lên GitHub Pages
1. Đăng nhập GitHub và tạo repository mới, ví dụ `our-little-universe`.
2. Đặt repository ở chế độ **Public** nếu muốn dùng GitHub Pages miễn phí theo cách phổ biến nhất.
3. Chọn **Add file → Upload files**, tải lên `index.html`, `style.css`, `script.js` và các file tài nguyên bạn muốn dùng.
4. Bấm **Commit changes**.
5. Vào **Settings → Pages**.
6. Trong phần **Build and deployment**, chọn **Deploy from a branch**.
7. Chọn branch `main`, thư mục `/(root)`, rồi bấm **Save**.
8. Chờ GitHub triển khai xong. Đường dẫn website sẽ được hiển thị ngay trong mục Pages. Không cần tự đoán URL trước khi GitHub tạo trang.
9. Mở đường dẫn được cung cấp trên cả điện thoại và máy tính để kiểm tra trước khi gửi.

## Chỉnh nội dung
Mở `index.html`, tìm các đoạn văn trong phần `memory-section`, `qualities` và `final-letter`, rồi sửa trực tiếp. Tên, lời chúc và chữ ký hiện được viết sẵn cho Tuyết Mai và Bình.

## Ghi chú
- Website không gửi dữ liệu, không cần backend và không lưu câu trả lời mini quiz.
- Font chữ được gọi từ Google Fonts; nếu không có mạng, trình duyệt sẽ dùng font dự phòng.
- Không có ảnh hay nhạc ngoài nào được nhúng bằng URL giả.
