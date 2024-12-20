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
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 背景层 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-white" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      {/* 漂浮的心形 */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-pink-500 animate-float-up pointer-events-none"
          style={heart.style}
        >
          ❤️
        </div>
      ))}

      {/* 内容层 */}
      <div style={{
        position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '600px',
        padding: '0 20px',
        textAlign: 'center'
        zIndex: '10' 
      }}>
        {/* 标题 */}
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#db2777',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          AI恋爱契合度测试
        </h1>
        
        {/* 描述文字 */}
        <div style={{marginBottom: '3rem', textAlign: 'center'}}>
          <p style={{
            fontSize: '1.5rem',
            color: '#4b5563',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            💘 想知道你们的缘分有多深吗？
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            基于先进的AI算法，深入分析你们的相处模式、性格特征和价值观
          </p>
        </div>

        {/* 特点卡片 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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

        {/* 按钮 */}
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
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
              display: 'inline-block'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#be185d'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#db2777'}
          >
            开始测试你们的缘分
          </button>
        </div>

        {/* 底部文字 */}
        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          textAlign: 'center'
        }}>
          已有超过10000对情侣完成测试 ❤️
        </p>
      </div>
    </div>
  );
}