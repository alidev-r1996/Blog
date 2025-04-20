"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { RotateCw, Trash2 } from "lucide-react";
import { removePost } from "@/lib/actions/post-action";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type RemovePostButtonPropsType = {
  postId: string;
  authorId: string;
};

const RemovePostButton: React.FC<RemovePostButtonPropsType> = ({
  postId,
  authorId,
}) => {
  const [loading, setLoading] = useState(false);

  const removePostHandler = async () => {
    setLoading(true);
    try {
      await removePost(authorId, postId);
      toast.success("Post removed successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="!cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95">
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
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="pulse-animation !cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={removePostHandler}
            className="pulse-animation !cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemovePostButton;
