import { posts } from "@/data/posts";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// 특정 게시글 조회 - GET
export async function GET(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);

    // 게시글 ID가 유효한 MongoDB ObjectId 형식인지 검사
    if (!isValidObjectId(resolvedParams.id)) {
      return NextResponse.json(
        { error: "유효하지 않은 게시글 ID입니다." },
        { status: 400 }
      );
    }

    // Post 모델을 사용해 특정 ID의 게시글 찾기
    const post = await Post.findById(resolvedParams.id);

    if (!post) {
      return NextResponse.json(
        { error: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "게시글을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// 특정 게시글 수정 - PUT
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);

    // 게시글 ID가 유효한 MongoDB ObjectId 형식인지 검사
    if (!isValidObjectId(resolvedParams.id)) {
      return NextResponse.json(
        { error: "유효하지 않은 게시글 ID입니다." },
        { status: 400 }
      );
    }

    const data = await req.json();

    const post = await Post.findByIdAndUpdate(
      resolvedParams.id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!post) {
      return NextResponse.json(
        { error: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "게시글 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

// 특정 게시글 삭제
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);

    if (!isValidObjectId(resolvedParams.id)) {
      return NextResponse.json(
        { error: "유효하지 않은 게시글 ID입니다." },
        { status: 400 }
      );
    }

    // findByIdAndDelete: ID로 게시글을 찾아 삭제
    const post = await Post.findByIdAndDelete(resolvedParams.id);

    if (!post) {
      return NextResponse.json(
        { error: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "게시글이 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "게시글 삭제 실패" }, { status: 500 });
  }
}
