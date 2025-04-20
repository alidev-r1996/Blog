import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import RemovePostButton from "./remove-button";
import LikeButton from "./like-button";
import { getPost } from "@/lib/actions/post-action";
import { intervalCalculator } from "@/helper/interval-calculator";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { GetUserId } from "@/lib/actions/user-action";

type posts = Awaited<ReturnType<typeof getPost>>;
type post = posts[number]

const Post = async ({ post, userId}: { post: post, userId: string | null | undefined}) => {
  const postLike = post.likes.find((like: { authorId: string; }) => like.authorId === userId);
  const isLike = postLike ? true : false;



  return (
    <div className="w-full h-max border shadow p-4 rounded">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href={`profile/${post.authorId}`}>
          <Avatar className="size-14 shadow border">
            {post && post.author.img && (
              <AvatarImage src={post.author.img} alt="@shadcn" />
            )}
            <AvatarFallback>{post.author?.name?.split("")[0]}</AvatarFallback>
          </Avatar> 
          </Link>
          <div className="flex flex-col gap-0.5  md:items-center md:gap-1 md:flex-row">
          <Link href={`profile/${post.authorId}`}>
          <h1 className="font-bold text-sm md:text-lg text-primary px-1">
            {post.author?.name}
          </h1>
          </Link>
          <p className="md:text-sm text-xs text-muted-foreground px-1">
            {post.author?.username}
          </p>
          <p className="text-muted-foreground px-1 pb-2 md:block hidden">.</p>
          {post && post.createdAt && (
            <p className="text-muted-foreground md:text-xs text-[10px]">
              {intervalCalculator(post.createdAt)}
            </p>
          )}
          </div>
        </div>
        {post.author.id === userId && <RemovePostButton authorId={post.authorId} postId={post.id}/>}
      </div>
      {post.img  && <div className="relative w-full h-[350px] rounded shadow overflow-hidden my-4 ">
        <Image fill src={post.img} alt="profile" className="object-center object-cover" />
      </div>}
      <p className="text-sm mb-4">{post.content}</p>
      <div className="flex items-center gap-6">
        <LikeButton likes={post?._count?.likes ?? 0} postId={post.id} isLike={isLike} userId={userId ?? ""}/>
        <Link href={`/posts/${post.id}`} className="flex items-center gap-1 text-xs text-muted-foreground">
          <MessageCircleMore  className="size-5" />
          {post._count.comments}
        </Link>
      </div>
    </div>
  );
};

export default Post;
