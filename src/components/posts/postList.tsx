import { getPost } from "@/lib/actions/post-action";
import Post from "./post";
import { GetUserId } from "@/lib/actions/user-action";


const PostList = async () => {
  const posts = await getPost();
  const userId = await GetUserId();

  return (
    <div className="flex flex-col gap-2">
      {posts?.map((post:(typeof posts)[number]) => {
        return <Post key={post.id} post={post} userId={userId}/>;
      })}
    </div>
  );
};

export default PostList;
