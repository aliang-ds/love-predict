'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  // ... 保持现有的 useEffect 和其他逻辑不变 ...

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
        {/* 其余内容保持不变 */}
        <h1 className="text-5xl font-bold text-pink-600 mb-4">
          AI恋爱契合度测试
        </h1>
        
        <div className="space-y-4">
          <p className="text-xl text-gray-600 hover:text-pink-500 transition-colors">
            💘 想知道你们的缘分有多深吗？
          </p>
          <p className="text-lg text-gray-500">
            基于先进的AI算法，深入分析你们的相处模式、性格特征和价值观
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="p-4 bg-white/80 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="font-bold text-pink-500">✨ 准确率高</h3>
            <p className="text-gray-600">AI深度分析</p>
          </div>
          <div className="p-4 bg-white/80 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="font-bold text-pink-500">🔒 隐私保护</h3>
            <p className="text-gray-600">数据安全加密</p>
          </div>
        </div>

        <button 
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-3 px-8 rounded-full transform transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          onClick={() => router.push('/test')}
        >
          开始测试你们的缘分
        </button>

        <p className="text-sm text-gray-400 mt-4">
          已有超过10000对情侣完成测试 ❤️
        </p>
      </div>
    </main>
  );
}