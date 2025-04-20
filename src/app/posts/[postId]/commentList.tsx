import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { intervalCalculator } from "@/helper/interval-calculator";
import { GetUserId, getPostComment } from "@/lib/actions/user-action";
import RemoveCommentButton from "./removeCommentButton";


const CommentList = async ({
  postId,
  postAuthorId,
}: {
  postId: string;
  postAuthorId: string;
}) => {
  const comments = await getPostComment(postId);
  const userId = await GetUserId();

  if (!comments) return null;

  return (
    <div className="flex flex-col gap-3 ">
      {comments.map((cm:(typeof comments)[number]) => {
        return (
          <div key={cm.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Avatar className="size-12 shadow border">
                  {cm && cm?.author?.img && (
                    <AvatarImage src={cm.author.img} alt="@shadcn" />
                  )}
                  <AvatarFallback>
                    {cm.author?.name?.split("")[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col  md:items-center md:gap-1 md:flex-row">
                  <h1 className="font-bold text-sm md:text-lg text-primary px-1">
                    {cm.author?.name}
                  </h1>
                  <p className="md:text-sm text-xs text-muted-foreground px-1">
                    {cm.author?.username}
                  </p>
                  <p className="text-muted-foreground px-1 pb-2 md:block hidden">
                    .
                  </p>
                  {cm && cm.createdAt && (
                    <p className="text-muted-foreground md:text-xs text-[10px]">
                      {intervalCalculator(cm.createdAt)}
                    </p>
                  )}
                </div>
              </div>
              {(cm.author.id === userId || postAuthorId === userId) && (
                <RemoveCommentButton
                  authorId={cm.authorId}
                  commentId={cm.id}
                  postAuthorId={postAuthorId}
                />
              )}
            </div>
            <p className="text-sm  pl-14">{cm.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
