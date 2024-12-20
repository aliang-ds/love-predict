'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Result() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [analysis, setAnalysis] = useState('');
  const [testData, setTestData] = useState<any>(null);

  useEffect(() => {
    // 从localStorage获取测试数据
    const data = localStorage.getItem('loveTest');
    if (!data) {
      router.push('/test');
      return;
    }

    const parsedData = JSON.parse(data);
    setTestData(parsedData);

    // 模拟分析过程
    calculateResult(parsedData);
  }, [router]);

  // 计算结果的函数
  const calculateResult = (data: any) => {
    setIsLoading(true);
    
    // 模拟API调用或计算过程
    setTimeout(() => {
      // 基础分数计算逻辑
      let baseScore = 60; // 基础分数
      
      // 根据相处时间加分
      const timeScore = parseInt(data.timeTogether) * 5;
      
      // 根据共同兴趣加分
      const interestScore = parseInt(data.commonInterests) * 8;
      
      // 计算总分
      let finalScore = Math.min(100, baseScore + timeScore + interestScore);
      
      // 生成分析文本
      let analysisText = '';
      if (finalScore >= 90) {
        analysisText = '你们是天生一对！有很高的契合度。';
      } else if (finalScore >= 80) {
        analysisText = '你们很般配，继续保持！';
      } else if (finalScore >= 70) {
        analysisText = '你们有不错的基础，还可以更进一步。';
      } else if (finalScore >= 60) {
        analysisText = '你们需要更多了解对方，有提升空间。';
      } else {
        analysisText = '建议多花时间互相了解，培养共同兴趣。';
      }

      setScore(finalScore);
      setAnalysis(analysisText);
      setIsLoading(false);
    }, 2000); // 2秒后显示结果
  };

  // 分享功能
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI恋爱契合度测试结果',
        text: `我和TA的契合度测试结果是${score}分！${analysis}`,
        url: window.location.href
      }).catch((error) => console.log('分享失败:', error));
    } else {
      alert('您的浏览器不支持分享功能');
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 背景层 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-white" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      {/* 内容层 */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '500px',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        {/* 标题 */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#db2777',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          你们的缘分测试结果
        </h1>

        {isLoading ? (
          <>
            {/* 加载状态 */}
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#db2777',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              ...
            </div>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              正在分析...
            </p>
          </>
        ) : (
          <>
            {/* 结果显示 */}
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#db2777',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              {score}分
            </div>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              {analysis}
            </p>
          </>
        )}

        {/* 按钮组 */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => router.push('/test')}
            style={{
              backgroundColor: '#db2777',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#be185d'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#db2777'}
          >
            重新测试
          </button>
          
          <button
            onClick={handleShare}
            style={{
              backgroundColor: '#db2777',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#be185d'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#db2777'}
          >
            分享结果
          </button>
        </div>
      </div>
    </div>
  );
}