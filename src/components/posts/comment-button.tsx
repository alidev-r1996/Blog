"use client"

import { MessageCircleMore } from "lucide-react";
import { FC } from "react";

type CommentButtonPropsType = {
    comments: number;
    postId: string;
};

const CommentButton: FC<CommentButtonPropsType> = ({comments,postId}) => {

    return ( 
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MessageCircleMore  className="size-5" />
          {comments}
        </p>
     );
}
 
export default CommentButton;