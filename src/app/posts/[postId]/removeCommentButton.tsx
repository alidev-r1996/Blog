"use client";

import { useState } from "react";
import { RotateCw, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { RemoveComment } from "@/lib/actions/user-action";

type RemoveCommentButtonType = {
  commentId: string;
  authorId: string;
  postAuthorId: string;
};

const RemoveCommentButton: React.FC<RemoveCommentButtonType> = ({
  commentId,
  authorId,
  postAuthorId,
}) => {
  const [loading, setLoading] = useState(false);

  const removeCommentHandler = async () => {
    setLoading(true);
    try {
      await RemoveComment(commentId, authorId, postAuthorId);
      toast.success("Post removed successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <Button
      onClick={removeCommentHandler}
      variant="outline"
      className="!cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      {loading ? (
        <p className="flex items-center gap-1">
          <RotateCw className="animate-spin" /> Removing...
        </p>
      ) : (
        <p className="flex items-center gap-1 text-rose-500">
          <Trash2 />
        </p>
      )}
    </Button>
  );
};

export default RemoveCommentButton;
