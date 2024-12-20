// ... 保持 import 和 useEffect 部分不变 ...

return (
  <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
    {/* 背景遮罩 - 降低透明度，增加模糊效果 */}
    <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-[1]" />
    
    {/* 浮动心形 - 调整层级 */}
    <div className="floating-hearts fixed inset-0" style={{ 
      pointerEvents: 'none',
      zIndex: 0  // 降低层级，让它在内容和遮罩后面
    }} />

    {/* 主内容容器 - 使用 fixed 定位确保不受背景影响 */}
    <div className="fixed inset-0 z-[2] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-4">
        {/* 所有内容使用 text-center 确保居中 */}
        <div className="text-center">
          {/* 标题 */}
          <h1 className="text-5xl font-bold text-pink-600 mb-8">
            AI恋爱契合度测试
          </h1>
          
          {/* 描述文字 */}
          <div className="space-y-6 mb-12">
            <p className="text-2xl text-gray-600 hover:text-pink-500 transition-colors">
              💘 想知道你们的缘分有多深吗？
            </p>
            <p className="text-lg text-gray-500">
              基于先进的AI算法，深入分析你们的相处模式、性格特征和价值观
            </p>
          </div>

          {/* 特点卡片 */}
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

          {/* 按钮 */}
          <div className="mb-8">
            <button 
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-4 px-12 rounded-full transform transition-all hover:scale-105 hover:shadow-lg active:scale-95 mx-auto"
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
    </div>
  </main>
);