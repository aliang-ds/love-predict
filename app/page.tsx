'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // 确保这行导入存在

export default function Home() {
  const router = useRouter();  // 确保这行定义在组件顶部

  // ... 其他代码保持不变 ...

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 添加半透明背景遮罩 */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-[1]" />
      
      {/* 调整浮动心形的层级 */}
      <div className="floating-hearts fixed inset-0" style={{ 
        pointerEvents: 'none',
        zIndex: 2
      }} />

      {/* 提高主要内容的层级 */}
      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* ... 其他内容保持不变 ... */}
        
        <button 
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-3 px-8 rounded-full transform transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          onClick={() => router.push('/test')}  // 现在 router 已经定义了
        >
          开始测试你们的缘分
        </button>

        {/* ... 其他内容保持不变 ... */}
      </div>
    </main>
  );
}