import CreatePost from "@/components/posts/create-post";
import WhoToFollow from "@/components/who-to-follow";
import { userAction } from "@/lib/actions/user-action";
import PostList from "@/components/posts/postList";
import { redirect } from "next/navigation";

export type userTypeAction = Awaited<ReturnType<typeof userAction>>;

export default async function Home() {
  const user = await userAction();
  if (!user) redirect('/login');
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6 flex flex-col gap-2">
        {user != null && <CreatePost user={user} />}
        <PostList />
      </div>
        <WhoToFollow />
    </div>
  );
}
