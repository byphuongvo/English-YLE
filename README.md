# Trang lộ trình học theo ngày

File chính: `roadmap.html` (một file duy nhất, mở bằng trình duyệt hoặc đưa lên GitHub Pages).
Backend: `apps-script/lotrinh.gs`, một project Apps Script và Google Sheet riêng, không liên quan webinar hay ebook.

## Thử ngay, chưa cần Sheet
Mở `roadmap.html`, nhập tên và mã bất kỳ. Mã `gv` vào bằng tài khoản giáo viên. Tiến độ chỉ lưu trên máy đó.

## Nối với Google Sheet (project riêng, 4 bước)
1. Tạo Google Sheet mới, vào Tiện ích mở rộng > Apps Script, dán toàn bộ `apps-script/lotrinh.gs`.
2. Chạy hàm `lrKhoiTao` một lần để cấp quyền: tab "Hoc sinh" tự tạo kèm 2 dòng mẫu. Đổi mã mẫu `doi-ma-nay` của giáo viên.
3. Triển khai > Triển khai mới > Ứng dụng web (Thực thi bằng: Tôi, Quyền truy cập: Bất kỳ ai). Sao chép URL kết thúc bằng `/exec`.
4. Mở `roadmap.html`, tìm `var API_URL='';` và dán URL vào giữa hai dấu nháy. Chạy `lrTest` trong Apps Script để kiểm tra, kết quả `ok:true` là được.

## Quản lý học sinh
Mỗi dòng tab "Hoc sinh" là một bé: Họ tên, Mã lớp (bé dùng để vào), Vai trò (student hoặc teacher), Tuần đã mở, Ghi chú.
Ba cột cuối do trang tự ghi. Học xong tuần 1, đổi "Tuần đã mở" thành 2 để mở tuần tiếp theo.

## Lưu ý
- Mã lớp là mật khẩu đơn giản, phù hợp lớp nhỏ. Nhập sai 8 lần sẽ bị khoá 15 phút.
- Âm thanh: trang tìm `audio/<tên>.mp3`, chưa có thì dùng giọng đọc của trình duyệt. Giáo viên > Kịch bản thu âm liệt kê tên file cần thu.
- Mỗi tuần 6 ngày (Buổi 1, Về nhà 1, Về nhà 2, Buổi 2, Về nhà 3, Về nhà 4). Đổi thứ tự trong `DAYMAP`.
