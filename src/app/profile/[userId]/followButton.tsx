"use client";

import { useState } from "react";
import { toggleFollow } from "@/lib/actions/user-action";
import toast from "react-hot-toast";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const FollowButton = ({
  userID,
  isFollow,
  children
}: {
  userID: string;
  isFollow: boolean;
  children: React.ReactNode
}) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const res = await toggleFollow(userID);
      if (res?.message === "followed") {
        toast.success("Followed successfully");
      } else {
        toast.success("UnFollowed successfully");
      }
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleFollow}
      className="!cursor-pointer hover:scale-105 transition-all duration-200 active:scale-90 w-full my-4"
    >
      {loading ? (
        <p className="flex items-center gap-1">
          <RotateCw className="animate-spin" /> {isFollow ? "UnFollowing..." : "Following..."}
        </p>
      ) : (
        <p className="flex items-center gap-1">
          {" "}
         {children}
        </p>
      )}
    </Button>
  );
};

export default FollowButton;
