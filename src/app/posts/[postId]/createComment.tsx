"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RotateCw, SendIcon } from "lucide-react";
import { createComment, userAction } from "@/lib/actions/user-action";
import { userType } from "./page";
import toast from "react-hot-toast";

const CreateComment = ({
  user,
  postId,
}: {
  user: userType;
  postId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const post = await createComment(postId, content);

      if (post?.message === "success") {
        setContent("");
        setLoading(false);
      }
      toast.success("comment succesfully added!");
    } catch (error) {
      toast.error("something get wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded col-span-1 lg:col-span-6 mt-6 border-t pt-2"
    >
      <div className="flex items-start gap-1 w-full">
        <Avatar className="size-10 shadow border">
          {user?.img && <AvatarImage src={user.img} alt="@shadcn" />}
          <AvatarFallback>{user?.name?.split("")[0]}</AvatarFallback>
        </Avatar>
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full outline-none resize-none px-4 py-2 pb-5 text-sm border rounded"
          placeholder="Write a comment..."
        ></textarea>
      </div>

      <div className="flex justify-end mt-2">
        <Button
          disabled={loading || !content}
          type="submit"
          className="disabled:opacity-60 rounded px-4 hover:!cursor-pointer"
        >
          {loading ? (
            <p className="flex items-center gap-1">
              <RotateCw className="animate-spin" /> Sending...
            </p>
          ) : (
            <p className="flex items-center gap-1">
              <SendIcon /> Comment
            </p>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateComment;
