"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { toggleFollow } from "@/lib/actions/user-action";
import toast from "react-hot-toast";
import { RotateCw } from "lucide-react";

const FollowButton = ({ userID }: { userID: string }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
     const res = await toggleFollow(userID)
     if (res?.message === "followed") {
      toast.success("Followed successfully")
     }else{
        toast.success("UnFollowed successfully")
     }
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleFollow} className="!cursor-pointer hover:scale-105 transition-all duration-200 active:scale-90">
      {loading ? <p className="flex items-center gap-1"><RotateCw className="animate-spin"/> Following...</p> : <p className="flex items-center gap-1">  Follow</p>}
    </Button>
  );
};

export default FollowButton;
