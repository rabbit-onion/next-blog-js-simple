import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// 전체 글 조회 - GET 요청 처리
export async function GET() {
  try {
    // mongodb 연결
    await connectDB();

    // post 모델을 이용해 전체 글 조회
    // sort() 메서드를 이용해 최신 글이 위로 오도록 정렬
    const posts = await Post.find({}).sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "게시글을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// 글 생성 - POST 요청 처리
export async function POST(req) {
  try {
    // mongodb 연결
    await connectDB();

    // data = {title: "새 글 제목", content: "새 글 내용"}
    const data = await req.json();

    // 제목이나 내용이 없는 경우
    if (!data.title || !data.content) {
      return NextResponse.json(
        // {메시지}, {상태}
        { error: "제목과 내용은 필수입니다." },
        { status: 400 } // bad request
      );
    }

    const newPost = await Post.create(data);

    // 클라이언트에게 새 글 응답
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      // client 전달 메시지
      { error: "게시글을 생성하는 데 실패했습니다." },
      // server에 상태 전달
      { status: 500 }
    );
  }
}
