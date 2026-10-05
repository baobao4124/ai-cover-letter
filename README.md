# 🚀 AI Cover Letter Generator

Một ứng dụng **Micro SaaS** cho phép tự động tạo thư xin việc (Cover Letter) được cá nhân hóa 100% dựa trên vị trí ứng tuyển, tên công ty và bộ kỹ năng của ứng viên. Ứng dụng tích hợp mô hình AI thế hệ mới với khả năng **Real-time Streaming** mượt mà.

🔗 **Live Demo:** [https://ai-cover-letter-sable.vercel.app](https://ai-cover-letter-sable.vercel.app)

---

## ✨ Tính năng nổi bật (Key Features)

* **Real-time Text Streaming:** Sử dụng Vercel AI SDK để hiển thị kết quả theo thời gian thực (chữ chạy mượt như ChatGPT) thay vì bắt người dùng chờ đợi.
* **Cá nhân hóa sâu (Tailored Prompting):** Thiết kế System Prompt tối ưu để AI phân tích chính xác kỹ năng ứng viên và viết thư chuẩn phong cách doanh nghiệp.
* **Giao diện chuẩn Responsive:** Tương thích hoàn hảo trên cả máy tính, tablet và điện thoại di động nhờ Tailwind CSS.
* **An toàn & Bảo mật:** Toàn bộ kết nối API Key được bảo vệ tuyệt đối ở phía Server (Server-side rendering / Route Handlers).

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router & React Server Components)
* **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/) (Strict Type Safety)
* **AI Provider:** [Google Gemini API](https://ai.google.dev/) (`gemini-1.5-flash`)
* **AI SDK:** [Vercel AI SDK](https://sdk.vercel.ai/docs) (`@ai-sdk/google`)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🧠 Điểm sáng về Kỹ thuật (Engineering Highlights)

1. **Phân tách Server/Client rõ ràng:** 
   * Client Component (`JobForm.tsx`) quản lý trạng thái form và tương tác người dùng.
   * Server Route Handler (`app/api/generate/route.ts`) bảo mật `GOOGLE_GENERATIVE_AI_API_KEY` tuyệt đối, không lộ ra phía browser.
2. **Xử lý dữ liệu với TypeScript:** 
   * Định nghĩa chặt chẽ `interface JobDescription` và tự động chuyển đổi chuỗi kỹ năng phân cách bằng dấu phẩy thành mảng `string[]` đã qua xử lý chuẩn hóa (trim, filter).
3. **Cơ chế Streaming Data:** 
   * Tận dụng `streamText` và `toDataStreamResponse()` để truyền luồng dữ liệu liên tục về Client qua kết nối HTTP.

---

## 💻 Cài đặt & Chạy cục bộ (Local Setup)

### Yêu cầu tiên quyết
* Node.js phiên bản 18.x trở lên
* Thẻ Google AI Studio API Key

### Các bước cài đặt

1. **Clone dự án:**
   ```bash
   git clone [https://github.com/baobao4124/ai-cover-letter](https://github.com/baobao4124/ai-cover-letter)
   cd ai-cover-letter