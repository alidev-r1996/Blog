// ts-nocheck

import Post from "@/components/posts/post";
import { getPostById } from "@/lib/actions/post-action";
import {userAction } from "@/lib/actions/user-action";
import CreateComment from "./createComment";
import CommentList from "./commentList";
import React from "react";


export type userType = Awaited<ReturnType<typeof userAction>>


type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const [user, post] = await Promise.all([
    userAction(),
    getPostById(params.postId),
  ]);


  return (
    <div className="flex flex-col">
      <Post post={post} userId={user?.id}/>
      <hr className="w-full h-[1px] mx-auto my-2 bg-border border-0 rounded-sm" />
      <div className="border p-4 shadow rounded">
        <CommentList postAuthorId={post.authorId} postId={params.postId} />
        <CreateComment user={user} postId={post.id} />
      </div>
    </div>
  );
}

