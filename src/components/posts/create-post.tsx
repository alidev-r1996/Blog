"use client";

import { useState } from "react";
import { Image as ImageIcon, Send as SendIcon, RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { postAction } from "@/lib/actions/post-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import UploadImage from "./upload-image";
import { userTypeAction } from "@/app/page";

const CreatePost = ({ user }: {user: userTypeAction} ) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [imgLoading, setImgLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    if (img) formData.append("img", img);
    if (user) formData.append("authorId", user.id);
    

    try {
      const post = await postAction(formData);

      if (post.message === "success") {
        setContent("");
        setImg("");
        setLoading(false);
      }
      toast.success("new post succesfully created!");
    } catch (error) {
      toast.error("something get wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  p-4 border rounded shadow col-span-1 lg:col-span-6"
    >
      <div className="flex items-start gap-1 w-full">
        <Avatar className="size-12 shadow border">
          {user.img && <AvatarImage src={user.img} alt="@shadcn" />}
          <AvatarFallback>{user.name?.split("")[0]}</AvatarFallback>
        </Avatar>
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full outline-none resize-none px-4 py-2 pb-5 text-sm"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      {imgLoading && <UploadImage 
        onChange={(url)=>setImg(url)}
        value={img}
        endpoint="imageUploader"
      />}

      <div className="flex items-center justify-between gap-1 rounded border p-4">
        <div onClick={()=>setImgLoading(true)} className="flex items-center gap-1 p-2 px-4 dark:hover:bg-slate-800 dark:hover:text-slate-400 hover:bg-slate-100 transition-all duration-200 cursor-pointer rounded ">
        <ImageIcon />
        <p>Photo</p>
        </div>

        <Button
          type="submit"
          disabled={loading || !content || !img}
          className="disabled:opacity-60 rounded px-4 hover:!cursor-pointer"
        >
          {loading ? (
            <p className="flex items-center gap-1">
              <RotateCw className="animate-spin" /> Posting...
            </p>
          ) : (
            <p className="flex items-center gap-1">
              {" "}
              <SendIcon /> Post
            </p>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;
