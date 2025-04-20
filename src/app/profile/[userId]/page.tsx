import { GetUserId, GetUserProfile } from "@/lib/actions/user-action";
import Profile from "./main";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFavoritePostByUserId, getPostByUserId } from "@/lib/actions/post-action";
import Post from "@/components/posts/post";


export type userProfileType = {
  user: Awaited<ReturnType<typeof GetUserProfile>>;
};

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const user = await GetUserProfile(params.userId);
  return {
    title: user?.name + " | Profile",
  };
}


const Page = async (props: Props) => {
  const params = await props.params;
  const [user, posts, likedPost, userID] = await Promise.all([
    GetUserProfile(params.userId),
    getPostByUserId(params.userId),
    getFavoritePostByUserId(params.userId),
    GetUserId()
  ])


  if (user == null) return null;

  return (
    <div className="flex flex-col gap-2">
      <Profile user={user} />
      <div className="shadow border rounded p-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="posts" className="px-3 py-1 !cursor-pointer">
              Posts
            </TabsTrigger>
            <TabsTrigger value="likes" className="px-3 py-1 !cursor-pointer">
              Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="w-full">
            <div className="flex flex-col gap-2 w-full">
              {posts?.map((post:(typeof posts)[number]) => {
                return <Post key={post.id} post={post} userId={userID}/>;
              })}
            </div>
          </TabsContent>
          <TabsContent value="likes" className="w-full">
            <div className="flex flex-col gap-2 w-full">
              {likedPost?.map((post) => {
                return <Post key={post.id} post={post} userId={userID}/>;
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
