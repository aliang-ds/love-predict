'use client';
import { useRouter } from 'next/navigation';

export default function Result() {
  const router = useRouter();

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

        {/* 分数 */}
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#db2777',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          0分
        </div>

        {/* 分析状态 */}
        <p style={{
          fontSize: '1.25rem',
          color: '#6b7280',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          正在分析...
        </p>

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