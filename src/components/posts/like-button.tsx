"use client";

import { toggleLike } from "@/lib/actions/user-action";
import { Heart } from "lucide-react";
import { FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback  } from 'use-debounce';

type LikeButtonPropsType = {
  likes: number;
  postId: string;
  isLike: boolean;
  userId: string;
};

const LikeButton: FC<LikeButtonPropsType> = ({
  likes,
  postId,
  isLike,
  userId,
}) => {
  const [like, setLike] = useState(isLike);
  const likeRef = useRef(likes);

  const likehandler = useDebouncedCallback(async () => {
    if (!userId) {
      toast.error("Please login first");
    } else {
      if (like) {
        likeRef.current = likeRef.current - 1;
      } else {
        likeRef.current = likeRef.current + 1;
      }
      setLike(!like);
      try {
        const res = await toggleLike(postId);
        if (res?.message === "liked") {
        } else {
          setLike(false);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  },1000);

  return (
    <p
      onClick={likehandler}
      className={`text-muted-foreground flex items-center gap-1 text-xs  transition-all duration-200 hover:scale-110 cursor-pointer active:scale-90`}
    >
      <Heart className={`${like && "fill-rose-500"} size-5`} />
      {likeRef.current}
    </p>
  );
};

export default LikeButton;
