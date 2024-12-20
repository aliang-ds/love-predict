'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const colors = ['#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#ffc0cb'];
    
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerHTML = '❤️';
      
      heart.style.left = Math.random() * 90 + 5 + '%';
      const size = Math.random() * 20 + 15;
      heart.style.fontSize = `${size}px`;
      const floatTime = Math.random() * 2 + 3;
      heart.style.setProperty('--float-time', `${floatTime}s`);
      heart.style.setProperty('--heart-color', colors[Math.floor(Math.random() * colors.length)]);
      
      const container = document.querySelector('.hearts-container');
      if (container) {
        container.appendChild(heart);
        setTimeout(() => heart.remove(), floatTime * 1000);
      }
    };

    const createHeartWithRandomInterval = () => {
      createHeart();
      const nextInterval = Math.random() * 500 + 500;
      setTimeout(createHeartWithRandomInterval, nextInterval);
    };

    createHeartWithRandomInterval();

    return () => {
      const container = document.querySelector('.hearts-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="main-container">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-white" />
      
      {/* 心形容器 */}
      <div className="hearts-container absolute inset-0" style={{ pointerEvents: 'none' }} />
      
      {/* 内容遮罩 */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      {/* 主要内容 */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-pink-600 mb-8">
              AI恋爱契合度测试
            </h1>
            
            <div className="space-y-6 mb-12">
              <p className="text-2xl text-gray-600 hover:text-pink-500 transition-colors">
                💘 想知道你们的缘分有多深吗？
              </p>
              <p className="text-lg text-gray-500">
                基于先进的AI算法，深入分析你们的相处模式、性格特征和价值观
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-white/90 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-xl text-pink-500 mb-2">✨ 准确率高</h3>
                <p className="text-gray-600">AI深度分析</p>
              </div>
              <div className="p-6 bg-white/90 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-xl text-pink-500 mb-2">🔒 隐私保护</h3>
                <p className="text-gray-600">数据安全加密</p>
              </div>
            </div>

            <div className="mb-8">
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-4 px-12 rounded-full transform transition-all hover:scale-105 hover:shadow-lg active:scale-95 mx-auto"
                onClick={() => router.push('/test')}
              >
                开始测试你们的缘分
              </button>
            </div>

            <p className="text-sm text-gray-400">
              已有超过10000对情侣完成测试 ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}