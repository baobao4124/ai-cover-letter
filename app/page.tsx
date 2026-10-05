"use client";

import { useCompletion } from '@ai-sdk/react';
import JobForm from '@/app/components/JobForm'; // Đường dẫn tùy thuộc vào nơi bạn lưu JobForm
import { JobDescription } from './types';

export default function Home() {
  // useCompletion tự động quản lý trạng thái loading và kết quả trả về
  const { completion, complete, isLoading } = useCompletion({
    api: '/api/generate', // Trỏ đúng vào API route ta vừa tạo
  });

  const handleGenerateLetter = async (jobData: JobDescription) => {
    // Truyền dữ liệu formData xuống API
    await complete('', { body: jobData });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Cột trái: Form nhập liệu */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Trợ lý Viết Thư Xin Việc</h1>
          <p className="text-gray-500 mb-6 text-sm">Điền thông tin vị trí bạn muốn ứng tuyển để AI tự động soạn thảo Cover Letter cá nhân hóa.</p>
          
          <JobForm onSubmit={handleGenerateLetter} />
        </section>

        {/* Cột phải: Khung hiển thị kết quả Streaming */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Kết quả của bạn:</h2>
          
          {isLoading && !completion && (
            <div className="flex items-center space-x-2 text-blue-500">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span>AI đang phân tích và soạn thảo...</span>
            </div>
          )}

          {/* Vùng hiển thị text. whitespace-pre-wrap giúp giữ lại các ký tự xuống dòng của đoạn văn */}
          <div className="prose prose-blue max-w-none whitespace-pre-wrap text-gray-700">
            {completion ? completion : (
               <p className="text-gray-400 italic">Bức thư xin việc hoàn hảo của bạn sẽ xuất hiện ở đây...</p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}