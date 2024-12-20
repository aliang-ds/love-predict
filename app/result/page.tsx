'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Analysis {
  text: string;
  level: string;
  positive: string[];
  challenges: string[];
  recommendation: string;
}

export default function Result() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [analysis, setAnalysis] = useState<Analysis>({
    text: '',
    level: '',
    positive: [],
    challenges: [],
    recommendation: ''
  });
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
    }, 100);
  }, [router]);

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
          const meetMethodNum = parseInt(data.meetMethod);

          console.log('[Result] 解析的数值:', {
            timeTogetherNum,
            commonInterestsNum,
            meetMethodNum
          });

          if (isNaN(timeTogetherNum) || isNaN(commonInterestsNum)) {
            throw new Error('无效的数值数据');
          }

          // 基础分数计算
          let baseScore = 60;
          const timeScore = timeTogetherNum * 5;
          const interestScore = commonInterestsNum * 8;
          
          // 相识方式加分
          let meetMethodScore = 0;
          if (meetMethodNum === 1) meetMethodScore = 5; // 校园认识
          else if (meetMethodNum === 3) meetMethodScore = 3; // 朋友介绍
          
          console.log('[Result] 计算过程:', {
            baseScore,
            timeScore,
            interestScore,
            meetMethodScore
          });

          let finalScore = Math.min(100, baseScore + timeScore + interestScore + meetMethodScore);
          
          // 生成详细分析
          let analysisText = '';
          let compatibilityLevel = '';
          let recommendation = '';
          let positivePoints = [];
          let challengePoints = [];

          // 契合度等级
          if (finalScore >= 90) {
            compatibilityLevel = '天作之合';
            analysisText = '你们的契合度非常高！无论是相处时间、共同兴趣还是相识方式，都展现出极强的默契度。';
            positivePoints = ['三观高度一致', '有共同的生活目标', '沟通顺畅'];
            challengePoints = ['要继续保持', '不要忽视对方的小情绪'];
            recommendation = '继续保持当前的相处模式，适时增加一些小惊喜，让感情保持新鲜感。';
          } else if (finalScore >= 80) {
            compatibilityLevel = '良缘佳配';
            analysisText = '你们的关系非常稳定，有很好的发展基础。共同的兴趣爱好让你们的感情更加牢固。';
            positivePoints = ['有共同话题', '相处融洽', '互相理解'];
            challengePoints = ['可以多创造共同回忆', '增加互动频率'];
            recommendation = '可以尝试培养更多共同兴趣，让感情升温。';
          } else if (finalScore >= 70) {
            compatibilityLevel = '潜力伙伴';
            analysisText = '你们的关系正在稳步发展，虽然还有提升空间，但已经建立了不错的感情基础。';
            positivePoints = ['相处和谐', '有发展潜力'];
            challengePoints = ['需要更多沟通', '增加共同话题'];
            recommendation = '建议多创造共处时光，增进彼此了解。';
          } else if (finalScore >= 60) {
            compatibilityLevel = '初期发展';
            analysisText = '你们的关系处于探索阶段，需要更多时间和互动来增进了解。';
            positivePoints = ['有基本吸引力', '愿意相互了解'];
            challengePoints = ['需要更多耐心', '增加互动频率'];
            recommendation = '多创造独处机会，培养共同兴趣爱好。';
          } else {
            compatibilityLevel = '需要努力';
            analysisText = '你们的关系还需要更多的培养和经营，不要着急，慢慢来。';
            positivePoints = ['有改善空间', '双方都有意愿'];
            challengePoints = ['需要更多理解', '增加共同话题'];
            recommendation = '建议从培养共同兴趣开始，慢慢增进了解。';
          }

          setScore(finalScore);
          setAnalysis({
            text: analysisText,
            level: compatibilityLevel,
            positive: positivePoints,
            challenges: challengePoints,
            recommendation: recommendation
          });
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
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {score}分
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#db2777',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              契合度：{analysis.level}
            </div>

            {/* 详细分析 */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}>
              <p style={{
                fontSize: '1.125rem',
                color: '#4b5563',
                marginBottom: '1.5rem',
                textAlign: 'left'
              }}>
                {analysis.text}
              </p>

              {/* 优势 */}
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#059669',
                  marginBottom: '0.5rem'
                }}>
                  ✨ 亮点
                </h3>
                <ul style={{ color: '#4b5563', paddingLeft: '1.5rem' }}>
                  {analysis.positive.map((point, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 挑战 */}
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '0.5rem'
                }}>
                  💪 需要努力
                </h3>
                <ul style={{ color: '#4b5563', paddingLeft: '1.5rem' }}>
                  {analysis.challenges.map((point, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 建议 */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '0.5rem'
                }}>
                  💡 建议
                </h3>
                <p style={{ color: '#4b5563' }}>
                  {analysis.recommendation}
                </p>
              </div>
            </div>
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
              localStorage.removeItem('loveTest');
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
                  text: `我和TA的契合度测试结果是${score}分！契合度：${analysis.level}`,
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