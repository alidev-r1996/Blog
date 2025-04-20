"use server";

import { auth, signOut } from "@/auth";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export async function GetUserId() {
  const session = await auth();
  if (!session?.user) return null;
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  if (user) {
    return user.id;
  }
}

export async function userAction() {
  const session = await auth();
  if (!session?.user) return null;
  const existedUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    include: {
      posts: true,
      followers: true,
      followings: true,
    },
  });

  if (existedUser) {
    return existedUser;
  } else {
    const newUser = await prisma.user.create({
      data: {
        clerkId: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name as string,
        username: (session.user.email as string).toString().split("@")[0] ?? "",
        img: session.user.image as string,
      },
      include: {
        posts: true,
        followers: true,
        followings: true,
        likes: true,
        comments: true,
      },
    });

    return newUser;
  }
}

export async function suggestionUser() {
  const session = await auth();
  if (!session?.user) return null;
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });
  try {
    const newFollow = await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: user?.id,
            },
          },
          {
            NOT: {
              followers: {
                some: {
                  followerId: user?.id,
                },
              },
            },
          },
        ],
      },
      include: {
        followers: true,
        followings: true,
      },
      take: 5,
    });

    return { message: "success", follow: newFollow };
  } catch (error) {
    return { message: "error", follow: null, error };
  }
}

export async function toggleFollow(userID: string) {
  const userId = await GetUserId();
  if (!userId) return null;
  if (userId === userID) return null;

  const existedFollow = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: userID,
      },
    },
  });

  if (existedFollow) {
    // unfollow
    const unfollow = await prisma.$transaction([
      prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: userID,
          },
        },
      }),
      prisma.notification.deleteMany({
        where: {
          type: "FOLLOW",
          userId: userID, //user being followed
          creatorId: userId, //user following
        }, 
      })
    ])
    revalidatePath("/");
    return { message: "unfollow", follow: null, unfollow };
  } else {
    // follow
    const follow = await prisma.$transaction([
      prisma.follows.create({
        data: {
          followerId: userId,
          followingId: userID,
        },
      }),
      prisma.notification.create({
        data: {
          type: "FOLLOW",
          userId: userID, //user being followed
          creatorId: userId, //user following
        },
      }),
    ]);
    revalidatePath("/");
    return { message: "followed", follow };
  }
}

export async function toggleLike(postID: string) {
  const userId = await GetUserId();
  if (!userId) return null;

  const post = await prisma.post.findUnique({
    where: {
      id: postID,
    },
    select: {
      authorId: true,
    },
  });
  if (!post) return null;

  const existedLike = await prisma.like.findUnique({
    where: {
      postId_authorId: {
        authorId: userId,
        postId: postID,
      },
    },
  });

  if (existedLike) {
    // unlike
    const unlike = await prisma.$transaction([
      prisma.like.delete({
        where: {
          postId_authorId: {
            authorId: userId,
            postId: postID,
          },
        },
      }),
      prisma.notification.deleteMany({
        where: {
          type: "LIKE",
          userId: post.authorId, //recipient (post author)
          creatorId: userId, //person who like
        },
      }),
    ])
    revalidatePath("/");
    return { message: "unlike", like: null, unlike };
  } else {
    // like

    const like = await prisma.$transaction(async (tx) => {
      const like = await tx.like.create({
        data: {
          authorId: userId,
          postId: postID,
        },
      });
      if (post.authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "LIKE",
            userId: post.authorId, //recipient (post author)
            creatorId: userId, //person who like
            postId: postID,
          },
        });
      }
      return like;
    });
    revalidatePath("/");
    return { message: "liked", like };
  }
}

export async function createComment(postId: string, content: string) {
  const userId = await GetUserId();
  if (!userId) return null;
  if (!content) throw new Error("content is required!");

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("post not found!");

  try {
    const comment = await prisma.$transaction(async (tx) => {
      const newComment = await tx.comment.create({
        data: {
          authorId: userId,
          content,
          postId,
        },
      });
      if (post.authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "COMMENT",
            userId: post.authorId, //recipient (post author)
            creatorId: userId, //person who comment
            commentId: newComment.id,
            postId,
          },
        });
      }
      return newComment;
    });
    revalidatePath(`/posts/${postId}`);
    return { message: "success", comment };
  } catch (error) {
    console.error(error)
    return { message: "failed", comment: null };
  }
}

export async function getPostComment(postId: string) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
  });

  if (comments) return comments;
}

export async function RemoveComment(
  commentId: string,
  postAuthorId: string,
  authorId: string
) {
  const userId = await GetUserId();
  if (!userId) return null;
  if (!commentId) throw new Error("postId is required!");
  try {
    if (userId == postAuthorId || userId == authorId) {
      const comment = await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      return comment
    }
    revalidatePath(`/posts}`);
  } catch (error) {
    console.error(error)
    throw new Error("something went wrong!");
  }
}

export async function GetUserFollowers() {
  const userId = await GetUserId();
  if (!userId) return null;
  const followers = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      followers: true,
    },
  });

  return followers?.followers;
}

export async function GetUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      followers: true,
      followings: true,
      posts: true,
      likes: true,
    },
  });
  return user;
}

export async function updateUserProfile(formData: FormData) {
  const userId = await GetUserId();
  if (!userId) return null;

  const data = Object.fromEntries(formData.entries());

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name as string,
      username: data.username as string,
      bio: data.bio as string,
      location: data.location as string,
      website: data.website as string,
    },
  });

  revalidatePath(`profile/${userId}`);
  return { message: "success", user: updatedUser };
}

export async function LogoutUser(){
  await signOut();
  revalidatePath('/')
  redirect('/')
}
