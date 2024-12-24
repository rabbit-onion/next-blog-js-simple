'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const WritePage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/posts', { title, content });

      if (res.status === 201) {
        alert('새 글 등록 완료');
        router.push('/posts');
      } else {
        alert('글쓰기 실패');
      }
    } catch (error) {
      console.log(error);
      alert('오류 발생');
    }
  };

  return (
    <div className='container m-auto p-10'>
      <h2 className='text-6xl font-bold mb-10'>포스트 글쓰기</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* 제목 */}
        <div>
          <label htmlFor='tit' className='text-3xl font-bold sr-only'>
            제목
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => {
              return setTitle(e.target.value);
            }}
            name='tit'
            id='tit'
            placeholder='제목을 입력하세요.'
            className='border-b-4  w-full text-2xl p-3'
          />
        </div>

        {/* 본문 */}
        <div>
          <label htmlFor='cont' className='text-3xl font-bold sr-only'>
            내용
          </label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} name='cont' id='cont' rows={20} placeholder='내용을 입력하세요.' className='w-full text-lg px-3'></textarea>
        </div>

        {/* 확인, 취소 */}
        <div className='flex gap-3'>
          <button className='bg-slate-300 px-3 py-2 rounded-md'>취소</button>
          <button type='submit' className='bg-blue-300 px-3 py-2 rounded-md'>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;
