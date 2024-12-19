'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showCustomShare, setShowCustomShare] = useState(false);

  useEffect(() => {
    // 模拟计算得分
    const finalScore = Math.floor(Math.random() * 31) + 70; // 70-100之间的随机数
    
    // 动画效果：逐步显示分数
    let currentScore = 0;
    const timer = setInterval(() => {
      if (currentScore < finalScore) {
        currentScore += 1;
        setScore(currentScore);
      } else {
        clearInterval(timer);
        setShowScore(true);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const getScoreComment = () => {
    if (score >= 90) return "天生一对！你们的缘分简直是天注定的！";
    if (score >= 80) return "非常般配！你们有很大的发展潜力！";
    if (score >= 70) return "还不错哦！继续培养感情吧！";
    return "正在分析...";
  };

  const getDetailAnalysis = () => {
    if (!showScore) return [];
    return [
      "性格互补指数：" + (Math.floor(Math.random() * 11) + 90) + "%",
      "共同话题指数：" + (Math.floor(Math.random() * 11) + 85) + "%",
      "默契程度指数：" + (Math.floor(Math.random() * 11) + 88) + "%",
      "发展潜力指数：" + (Math.floor(Math.random() * 11) + 87) + "%"
    ];
  };

  const handleShare = () => {
    // 直接显示自定义分享菜单
    setShowCustomShare(true);
  };

  const handleSystemShare = async () => {
    const shareData = {
      title: 'AI恋爱契合度测试结果',
      text: `我在AI恋爱契合度测试中获得了${score}分！${getScoreComment()}`,
      url: window.location.href
    };

    try {
      await navigator.share(shareData);
    } catch (_error) {
      console.log('系统分享失败');
    }
  };

  const copyToClipboard = async () => {
    const text = `我在AI恋爱契合度测试中获得了${score}分！${getScoreComment()}\n快来测试你们的缘分吧：${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('结果已复制到剪贴板！');
      setShowCustomShare(false);
    } catch (_error)  {
      alert('复制失败，请手动复制');
    }
  };

  const handleSocialShare = (platform: string) => {
    const shareText = `我在AI恋爱契合度测试中获得了${score}分！${getScoreComment()}`;
    const shareUrl = encodeURIComponent(window.location.href);
    
    switch (platform) {
      case 'wechat':
        // 生成微信分享二维码或提示在微信中打开
        alert('请截图后，打开微信扫描分享');
        break;
      case 'weibo':
        window.open(`http://service.weibo.com/share/share.php?url=${shareUrl}&title=${encodeURIComponent(shareText)}`);
        break;
      case 'xiaohongshu':
        // 小红书目前没有直接分享接口，可以复制内容
        copyToClipboard();
        alert('已复制内容，请打开小红书 App 发布');
        break;
      default:
        copyToClipboard();
    }
    setShowCustomShare(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          你们的缘分测试结果
        </h1>

        {/* 分数显示 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-6xl font-bold text-pink-500 mb-4">
            {score}
            <span className="text-2xl">分</span>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            {getScoreComment()}
          </p>

          {/* 详细分析 */}
          {showScore && (
            <div className="space-y-4 mt-8">
              <h2 className="text-xl font-semibold text-pink-600 mb-4">
                详细分析
              </h2>
              {getDetailAnalysis().map((item, index) => (
                <div 
                  key={index}
                  className="bg-pink-50 p-3 rounded-lg text-gray-700"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            重新测试
          </button>
          <button
            onClick={handleShare}
            className="px-6 py-2 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            分享结果
          </button>
        </div>

        {/* 自定义分享菜单 */}
        {showCustomShare && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
            onClick={() => setShowCustomShare(false)}
          >
            <div 
              className="bg-white rounded-lg p-6 w-80 animate-fade-up"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4 text-center">分享方式</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {navigator.share && (
                  <button
                    onClick={handleSystemShare}
                    className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-2xl mb-2">📱</span>
                    <span className="text-sm">系统分享</span>
                  </button>
                )}
                <button
                  onClick={() => handleSocialShare('wechat')}
                  className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-2xl mb-2">💚</span>
                  <span className="text-sm">微信</span>
                </button>
                <button
                  onClick={() => handleSocialShare('weibo')}
                  className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-2xl mb-2">❤️</span>
                  <span className="text-sm">微博</span>
                </button>
                <button
                  onClick={() => handleSocialShare('xiaohongshu')}
                  className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-2xl mb-2">📘</span>
                  <span className="text-sm">小红书</span>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-2xl mb-2">📋</span>
                  <span className="text-sm">复制链接</span>
                </button>
              </div>
              <button
                onClick={() => setShowCustomShare(false)}
                className="w-full py-2 text-gray-500 hover:text-gray-700 border-t border-gray-100"
              >
                取消
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}