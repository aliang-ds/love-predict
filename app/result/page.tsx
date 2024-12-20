'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Result() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [analysis, setAnalysis] = useState('');
  const [testData, setTestData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 添加延迟确保 localStorage 可用
    setTimeout(() => {
      try {
        // 从localStorage获取测试数据
        const data = localStorage.getItem('loveTest');
        console.log('[Result] 从localStorage获取的原始数据:', data);

        if (!data) {
          console.log('[Result] 没有找到测试数据，准备重定向...');
          setError('未找到测试数据');
          setTimeout(() => {
            router.push('/test');
          }, 1000);
          return;
        }

        const parsedData = JSON.parse(data);
        console.log('[Result] 解析后的测试数据:', parsedData);

        // 验证数据完整性
        if (!parsedData.name1 || !parsedData.name2 || 
            !parsedData.timeTogether || !parsedData.commonInterests) {
          console.error('[Result] 数据不完整:', parsedData);
          setError('测试数据不完整，请重新测试');
          return;
        }

        setTestData(parsedData);
        calculateResult(parsedData);
      } catch (error) {
        console.error('[Result] 数据处理错误:', error);
        setError('数据处理出错，请重新测试');
      }
    }, 100); // 添加小延迟
  }, [router]); // 添加 router 到依赖数组

  const calculateResult = (data: any) => {
    console.log('[Result] 开始计算结果');
    try {
      setIsLoading(true);
      console.log('[Result] 使用数据计算:', data);
      
      setTimeout(() => {
        try {
          // 数据类型验证
          const timeTogetherNum = parseInt(data.timeTogether);
          const commonInterestsNum = parseInt(data.commonInterests);

          console.log('[Result] 解析的数值:', {
            timeTogetherNum,
            commonInterestsNum
          });

          if (isNaN(timeTogetherNum) || isNaN(commonInterestsNum)) {
            throw new Error('无效的数值数据');
          }

          let baseScore = 60;
          const timeScore = timeTogetherNum * 5;
          const interestScore = commonInterestsNum * 8;
          
          console.log('[Result] 计算过程:', {
            baseScore,
            timeScore,
            interestScore
          });

          let finalScore = Math.min(100, baseScore + timeScore + interestScore);
          
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

          console.log('[Result] 最终结果:', {
            score: finalScore,
            analysis: analysisText
          });

          setScore(finalScore);
          setAnalysis(analysisText);
          setIsLoading(false);
        } catch (error) {
          console.error('[Result] 计算过程错误:', error);
          setError('计算结果时出错，请重新测试');
          setIsLoading(false);
        }
      }, 2000);
    } catch (error) {
      console.error('[Result] calculateResult函数错误:', error);
      setError('处理过程出错，请重新测试');
      setIsLoading(false);
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
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#db2777',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          你们的缘分测试结果
        </h1>

        {error ? (
          <div style={{
            color: '#ef4444',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        ) : isLoading ? (
          <>
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
            onClick={() => {
              localStorage.removeItem('loveTest'); // 清除数据
              router.push('/test');
            }}
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
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'AI恋爱契合度测试结果',
                  text: `我和TA的契合度测试结果是${score}分！${analysis}`,
                  url: window.location.href
                }).catch((error) => console.log('分享失败:', error));
              } else {
                alert('您的浏览器不支持分享功能');
              }
            }}
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