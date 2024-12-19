'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    age1: '',
    age2: '',
    meetWay: '',
    together: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name1 || !formData.name2)) {
      alert('请填写双方的名字');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    // 这里后续会添加提交逻辑
    router.push('/result');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* 进度指示器 */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-500 mt-2">
            第 {step} / 3 步
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-6 text-pink-600">基本信息</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">你的名字</label>
                  <input 
                    type="text"
                    name="name1"
                    value={formData.name1}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入你的名字"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">对方的名字</label>
                  <input 
                    type="text"
                    name="name2"
                    value={formData.name2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入对方的名字"
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-6 text-pink-600">了解更多</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">你们是如何相识的？</label>
                  <select
                    name="meetWay"
                    value={formData.meetWay}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">请选择</option>
                    <option value="school">学校</option>
                    <option value="work">工作</option>
                    <option value="friend">朋友介绍</option>
                    <option value="social">社交软件</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">在一起多久了？</label>
                  <select
                    name="together"
                    value={formData.together}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">请选择</option>
                    <option value="0">还没在一起</option>
                    <option value="1">1-6个月</option>
                    <option value="2">6个月-1年</option>
                    <option value="3">1-3年</option>
                    <option value="4">3年以上</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-6 text-pink-600">最后一步</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  请确认你填写的信息：
                </p>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p>你的名字：{formData.name1}</p>
                  <p>对方名字：{formData.name2}</p>
                  <p>相识方式：{formData.meetWay}</p>
                  <p>相处时间：{formData.together}</p>
                </div>
              </div>
            </>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="px-6 py-2 text-pink-500 border border-pink-500 rounded-full hover:bg-pink-50"
              >
                上一步
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 ml-auto"
              >
                下一步
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 ml-auto"
              >
                提交测试
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}