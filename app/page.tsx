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
          animationDuration: `${Math.random() * 2 + 2}s`,
          fontSize: `${Math.random() * 1.5 + 0.5}rem`,
          opacity: Math.random() * 0.5 + 0.5,
          zIndex: '0'
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
    <div className="relative w-full min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* 心形动画容器 */}
      <div className="hearts-container">
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
      <div className="content-layer flex items-center justify-center min-h-screen">
        <div style={{
          width: '100%',
          maxWidth: '600px',
          padding: '0 20px',
          textAlign: 'center',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#db2777',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              AI情侣测试
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              通过AI深度分析，测试你们的缘分指数
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              padding: '0 10px',
              width: '100%'
            }}>
              {/* 特性卡片 */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                flex: '1 1 200px',
                maxWidth: '250px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#db2777',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>✨ 准确率高</h3>
                <p style={{color: '#4b5563', textAlign: 'center'}}>AI深度分析</p>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                flex: '1 1 200px',
                maxWidth: '250px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#db2777',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>🔒 隐私保护</h3>
                <p style={{color: '#4b5563', textAlign: 'center'}}>数据安全加密</p>
              </div>
            </div>

            <button 
              onClick={() => router.push('/test')}
              style={{
                backgroundColor: '#db2777',
                color: 'white',
                padding: '1rem 3rem',
                borderRadius: '9999px',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '2rem',
                border: 'none',
                textAlign: 'center'
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#be185d'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#db2777'}
            >
              开始测试你们的缘分
            </button>

            <p style={{
              fontSize: '0.875rem',
              color: '#9ca3af',
              textAlign: 'center'
            }}>
              已有超过10000对情侣完成测试 ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}