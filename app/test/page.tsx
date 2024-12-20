'use client';
import { useRouter } from 'next/navigation';

export default function Test() {
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
        {/* 步骤提示 */}
        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          第 1 / 3 步
        </p>

        {/* 标题 */}
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: '#db2777',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          基本信息
        </h2>

        {/* 表单 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <input
            type="text"
            placeholder="你的名字"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              textAlign: 'center',
              backgroundColor: 'white'
            }}
          />
          <input
            type="text"
            placeholder="对方的名字"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              textAlign: 'center',
              backgroundColor: 'white'
            }}
          />
        </div>

        {/* 按钮 */}
        <button
          style={{
            backgroundColor: '#db2777',
            color: 'white',
            padding: '0.75rem 2rem',
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
          下一步
        </button>
      </div>
    </div>
  );
}