// api route 파일 : GET, POST, PUT, DELETE 함수를 관리

import { NextResponse } from 'next/server';

// mockup data
const helloPosts = [
  { id: 1, title: '안녕하세요' },
  { id: 2, title: '하이' },
  { id: 3, title: 'hello' },
];

// 서버 생성
export async function GET() {
  return NextResponse.json(helloPosts);
}
