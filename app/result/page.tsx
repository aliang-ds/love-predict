'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Test() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    timeTogether: '',
    meetMethod: '',
    commonInterests: ''
  });

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleNext = () => {
    console.log('当前步骤:', step); // 调试日志
    console.log('当前表单数据:', formData); // 调试日志

    if (step === 1) {
      if (!formData.name1.trim() || !formData.name2.trim()) {
        alert('请输入双方的名字');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.timeTogether || !formData.meetMethod || !formData.commonInterests) {
        alert('请回答所有问题');
        return;
      }
      setStep(3);
    } else {
      // 最终提交
      try {
        console.log('保存数据到localStorage:', formData); // 调试日志
        localStorage.setItem('loveTest', JSON.stringify(formData));
        
        // 验证数据是否保存成功
        const savedData = localStorage.getItem('loveTest');
        console.log('验证保存的数据:', savedData); // 调试日志
        
        if (!savedData) {
          throw new Error('数据保存失败');
        }

        // 确保数据保存成功后再跳转
        router.push('/result');
      } catch (error) {
        console.error('提交失败:', error);
        alert('提交失败，请重试');
      }
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
        {/* 步骤提示 */}
        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          第 {step} / 3 步
        </p>

        {step === 1 && (
          <>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#db2777',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              基本信息
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <input
                type="text"
                name="name1"
                value={formData.name1}
                onChange={handleInputChange}
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
                name="name2"
                value={formData.name2}
                onChange={handleInputChange}
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
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#db2777',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              了解你们的关系
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#4b5563',
                  textAlign: 'center'
                }}>
                  你们在一起多久了？
                </label>
                <select
                  name="timeTogether"
                  value={formData.timeTogether}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    textAlign: 'center'
                  }}
                >
                  <option value="">请选择</option>
                  <option value="0">还没在一起</option>
                  <option value="1">不到3个月</option>
                  <option value="2">3-6个月</option>
                  <option value="3">6个月到1年</option>
                  <option value="4">1-3年</option>
                  <option value="5">3年以上</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#4b5563',
                  textAlign: 'center'
                }}>
                  你们是如何认识的？
                </label>
                <select
                  name="meetMethod"
                  value={formData.meetMethod}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    textAlign: 'center'
                  }}
                >
                  <option value="">请选择</option>
                  <option value="1">校园认识</option>
                  <option value="2">职场相遇</option>
                  <option value="3">朋友介绍</option>
                  <option value="4">网络认识</option>
                  <option value="5">偶然相遇</option>
                  <option value="6">其他方式</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#4b5563',
                  textAlign: 'center'
                }}>
                  你们有多少共同兴趣爱好？
                </label>
                <select
                  name="commonInterests"
                  value={formData.commonInterests}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    textAlign: 'center'
                  }}
                >
                  <option value="">请选择</option>
                  <option value="1">几乎没有共同爱好</option>
                  <option value="2">1-2个共同爱好</option>
                  <option value="3">3-4个共同爱好</option>
                  <option value="4">5个以上共同爱好</option>
                  <option value="5">兴趣爱好高度一致</option>
                </select>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#db2777',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              确认提交
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              请确认信息无误，点击提交开始分析
            </p>
          </>
        )}

        {/* 按钮 */}
        <button
          onClick={handleNext}
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
          {step === 3 ? '提交' : '下一步'}
        </button>
      </div>
    </div>
  );
}