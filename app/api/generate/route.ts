import { createUIMessageStreamResponse, streamText, toUIMessageStream } from 'ai';
// import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { JobDescription } from '@/app/types'; // Đường dẫn import có thể thay đổi tùy setup của bạn
import { openai } from '@ai-sdk/openai';

// Cho phép API chạy tối đa 30 giây (tránh bị timeout khi AI viết dài)
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // 1. Lấy dữ liệu từ Client gửi lên (chính là formData từ JobForm)
    const { title, companyName, skillsRequired } = (await req.json()) as JobDescription;

    // 2. Viết System Prompt - Nghệ thuật "cấy não" cho AI
    const systemPrompt = `Bạn là chuyên gia viết Cover Letter (Thư xin việc) đẳng cấp thế giới. Viết một bức thư ngắn gọn, chuyên nghiệp và đầy sức thuyết phục cho ứng viên, dựa trên các thông tin được cung cấp:
    - Vị trí ứng tuyển: ${title}
    - Tên công ty ứng tuyển: ${companyName}
    - Danh sách kỹ năng ứng viên: ${skillsRequired.join(', ')}

    Yêu cầu quan trọng:
    - Sử dụng ngôn ngữ trang trọng nhưng tự nhiên, không sáo rỗng.
    - Làm nổi bật sự phù hợp giữa bộ kỹ năng của ứng viên và công ty/đối tượng tuyển dụng.
    - Không thêm kinh nghiệm hoặc kỹ năng ngoài những gì đã liệt kê.
    - Giữ bức thư ngắn gọn và súc tích.

    Cấu trúc thư cần tuân theo thứ tự:
    1. Lời chào trang trọng;
    2. Đoạn mở bài giới thiệu ngắn gọn về bản thân và bày tỏ sự hứng thú với vị trí ứng tuyển;
    3. Thân bài: Giải thích tại sao các kỹ năng của ứng viên phù hợp với vị trí và công ty, nêu ví dụ ngắn minh họa sự phù hợp (nếu có thể);
    4. Kết luận và lời kêu gọi hành động (ví dụ: mong được liên hệ phỏng vấn, sẵn sàng trao đổi thêm...).

    # Output Format

    - Đáp án là một bức thư xin việc hoàn chỉnh bằng tiếng anh, theo cấu trúc đã nêu, dài không quá 300 từ.
    - Sử dụng markdown, tách các đoạn rõ ràng.
    - KHÔNG phát sinh thông tin hoặc kỹ năng không có trong danh sách cung cấp.

    # Examples
    
    **Ví dụ:**
    Xin chào Ban Tuyển dụng ${companyName},

    Tôi tên là [Tên ứng viên], rất vui khi được ứng tuyển vị trí ${title}. Tôi tin rằng với các kỹ năng như ${skillsRequired.join(', ')}, tôi hoàn toàn phù hợp với yêu cầu của vị trí này và có thể đóng góp tích cực vào sự phát triển của công ty.

    Đặc biệt, kỹ năng [nêu 1 kỹ năng tiêu biểu] đã giúp tôi [giải thích ngắn gọn về sự phù hợp với công việc hoặc công ty]. Điều này cho phép tôi đáp ứng tốt các nhiệm vụ mà vị trí ${title} yêu cầu tại ${companyName}.

    Tôi rất mong có cơ hội trao đổi và trình bày rõ hơn về khả năng của mình với Quý công ty. Xin cảm ơn và mong sớm nhận được phản hồi từ ${companyName}.

    Trân trọng,
    [Tên ứng viên]
    (Lưu ý: Ví dụ trên chỉ mang tính tham khảo; thực tế hãy điều chỉnh linh hoạt cho phù hợp từng trường hợp.)

    # Notes

    - TUYỆT ĐỐI không suy diễn hoặc thêm bớt kỹ năng ngoài danh sách.
    - Nếu thiếu thông tin (ví dụ: không có tên ứng viên), để trống hoặc sử dụng đại từ phù hợp.
    - Luôn duy trì văn phong chuyên nghiệp.
    - Đáp ứng đúng trình tự cấu trúc thư đã đề ra.`;

    // 3. Gọi OpenAI với tính năng Streaming
    const result = await streamText({
      model: openai('gpt-4o-mini'), // Dùng model mini cho rẻ và nhanh, đủ tốt cho tác vụ này
      // model: google('gemini-3.5-flash'), // Dùng model mini cho rẻ và nhanh, đủ tốt cho tác vụ này
      system: systemPrompt,
      messages: [
        { role: 'user', content: 'Hãy viết thư xin việc cho tôi dựa trên thông tin trên.' }
      ],
      temperature: 0.7, // Độ sáng tạo (0 là cứng nhắc, 1 là bay bổng)
    });

    // 4. Trả dòng chảy dữ liệu (stream) về lại cho Client
    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });

  } catch (error) {
    console.error("🔥 LỖI THỰC SỰ LÀ:", error);

    return new Response(JSON.stringify({ error: 'Đã có lỗi xảy ra' }), { status: 500 });
  }
}