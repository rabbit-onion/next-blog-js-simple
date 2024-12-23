// 특정 게시글 조회 - GET

import { posts } from '@/data/posts';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  // response의 params 값만 필요 => params만 구조분해해서 받음
  // params = {id: "1"}
  // params.id = "1"
  // parseInt(params.id) = 1

  try {
    // id에 해당하는 게시글 찾기
    const post = posts.find((post) => {
      // post = {id: 1, ...}
      return parseInt(params.id) === post.id;
    });

    // 게시글이 없을 경우 404 응답
    if (!post) {
      return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: '게시글을 불러오는데 실패했습니다.' }, { status: 500 });
  }
}

// 특정 게시글 수정 - PUT
export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    // data = { title: '수정된 제목', content: '수정된 내용' }

    // id와 일치하는 게시글의 인덱스 찾기
    const index = posts.findIndex((post) => post.id === parseInt(params.id));

    // 게시글이 없을 경우
    if (index === -1) {
      return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 게시글 업데이트 - 제목이나 내용이 없으면 기존 값 유지
    // posts[0] =
    // {
    // id: 1, title: '첫 번째 글', content: '안녕하세요!', createdAt: '2024-01-01',
    // title: '수정된 제목',
    // content: '수정된 내용'
    // }
    posts[index] = {
      ...posts[index],
      title: data.title || posts[index].title,
      content: data.content || posts[index].content,
    };

    // 클라이언트에게 수정된 게시글 (post[0]) 반환
    return NextResponse.json(posts[index]);
  } catch (error) {
    return NextResponse.json({ error: '게시글 수정에 실패했습니다.' }, { status: 500 });
  }
}

// 특정 게시글 삭제
export async function DELETE(req, { params }) {
  try {
    // id에 해당하는 게시글의 인덱스 번호 찾기
    const index = posts.findIndex((post) => post.id === parseInt(params.id));

    // 게시글이 없을 경우
    if (index === -1) {
      return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 서버 데이터베이스의 글 삭제
    posts.splice(index, 1);

    // 클라이언트 응답
    return NextResponse.json({ message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '게시글 삭제 실패' }, { status: 500 });
  }
}
