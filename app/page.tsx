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
      
      // 随机位置
      heart.style.left = Math.random() * 90 + 5 + '%';
      
      // 随机大小
      const size = Math.random() * 20 + 15;
      heart.style.fontSize = `${size}px`;
      
      // 随机动画时间
      const floatTime = Math.random() * 2 + 3;
      heart.style.setProperty('--float-time', `${floatTime}s`);
      
      // 随机颜色
      heart.style.setProperty('--heart-color', colors[Math.floor(Math.random() * colors.length)]);
      
      const container = document.querySelector('.floating-hearts');
      if (container) {
        container.appendChild(heart);
        
        // 动画结束后删除元素
        setTimeout(() => heart.remove(), floatTime * 1000);
      }
    };

    // 随机间隔创建爱心
    const createHeartWithRandomInterval = () => {
      createHeart();
      const nextInterval = Math.random() * 500 + 500;
      setTimeout(createHeartWithRandomInterval, nextInterval);
    };

    createHeartWithRandomInterval();

    return () => {
      const container = document.querySelector('.floating-hearts');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
      {/* 半透明背景遮罩 */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-[1]" />
      
      {/* 浮动心形 */}
      <div className="floating-hearts fixed inset-0" style={{ 
        pointerEvents: 'none',
        zIndex: 2
      }} />

      {/* 主要内容容器 - 添加 flex 布局 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {/* 内容区域 - 确保最大宽度和居中 */}
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* 标题部分 */}
          <h1 className="text-5xl font-bold text-pink-600 mb-8">
            AI恋爱契合度测试
          </h1>
          
          {/* 描述部分 */}
          <div className="space-y-6 mb-12">
            <p className="text-2xl text-gray-600 hover:text-pink-500 transition-colors">
              💘 想知道你们的缘分有多深吗？
            </p>
            <p className="text-lg text-gray-500 mx-auto max-w-xl">
              基于先进的AI算法，深入分析你们的相处模式、性格特征和价值观
            </p>
          </div>

          {/* 特点列表 - 使用 grid 确保居中对齐 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-xl mx-auto">
            <div className="p-6 bg-white/80 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-xl text-pink-500 mb-2">✨ 准确率高</h3>
              <p className="text-gray-600">AI深度分析</p>
            </div>
            <div className="p-6 bg-white/80 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-xl text-pink-500 mb-2">🔒 隐私保护</h3>
              <p className="text-gray-600">数据安全加密</p>
            </div>
          </div>

          {/* 按钮部分 */}
          <div className="flex justify-center mb-8">
            <button 
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-4 px-12 rounded-full transform transition-all hover:scale-105 hover:shadow-lg active:scale-95"
              onClick={() => router.push('/test')}
            >
              开始测试你们的缘分
            </button>
          </div>

          {/* 底部文字 */}
          <p className="text-sm text-gray-400">
            已有超过10000对情侣完成测试 ❤️
          </p>
        </div>
      </div>
    </main>
  );
}