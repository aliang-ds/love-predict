'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [hearts, setHearts] = useState<Array<{ id: number; style: any }>>([]);
  const [nextHeartId, setNextHeartId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: nextHeartId,
        style: {
          position: 'absolute',
          left: `${Math.random() * 90 + 5}%`,
          bottom: '-20px',
          fontSize: `${Math.random() * 1.5 + 0.5}rem`,
          opacity: Math.random() * 0.5 + 0.5,
          color: '#db2777'
        }
      };

      setHearts(prev => {
        const maxHearts = 15;
        const newHearts = [...prev, newHeart];
        return newHearts.slice(-maxHearts);
      });
      setNextHeartId(prev => prev + 1);

      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 3000);
    }, 200);

    return () => clearInterval(interval);
  }, [nextHeartId]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      {/* 心形动画容器 */}
      <div className="fixed inset-0 pointer-events-none">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="animate-float-up"
            style={heart.style}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* 内容容器 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[600px] mx-auto px-6">
          <h1 className="text-5xl font-bold text-pink-600 mb-4 text-center">
            AI情侣测试
          </h1>

          <p className="text-xl text-gray-600 mb-12 text-center">
            通过AI深度分析，测试你们的缘分指数
          </p>

          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            <div className="flex-1 min-w-[240px] max-w-[280px] p-6 bg-white/90 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-pink-600 mb-2">✨ 准确率高</h3>
              <p className="text-gray-600">AI深度分析</p>
            </div>

            <div className="flex-1 min-w-[240px] max-w-[280px] p-6 bg-white/90 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-pink-600 mb-2">🔒 隐私保护</h3>
              <p className="text-gray-600">数据安全加密</p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => router.push('/test')}
              className="bg-pink-600 hover:bg-pink-700 text-white px-12 py-4 rounded-full text-xl font-bold transition-colors duration-200 mb-8 shadow-lg hover:shadow-xl"
            >
              开始测试你们的缘分
            </button>

            <p className="text-gray-400 text-sm">
              已有超过10000对情侣完成测试 ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}