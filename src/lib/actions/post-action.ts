"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { auth } from "@/auth";

export async function postAction(formData: FormData) {
  const content = formData.get("content") as string;
  const img = formData.get("img") as string;
  const authorId = formData.get("authorId") as string;

  if (!content || !authorId || !img) return { message: "error", post: null };

  try {
    const newPost = await prisma.post.create({
      data: {
        content: content,
        img: img,
        authorId: authorId,
      },
    });
    revalidatePath("/");
    return { message: "success", post: newPost };
  } catch (error) {
    return { message: "error", post: null, error };
  }
}

export async function getPost() {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          img: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              img: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      likes: {
        select: {
          id: true,
          authorId: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostById(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          img: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              img: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      likes: {
        select: {
          id: true,
          authorId: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  if (post) {
    return post;
  } else {
    throw new Error("something went wrong!");
  }
}

export async function removePost(authorId: string, postId: string) {
  const session = await auth();
  if (!session?.user) return null;
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  try {
    if (user?.id === authorId) {
      await prisma.post.delete({
        where: {
          id: postId,
        },
      });
    }

    revalidatePath("/");
    return { message: "succesfully delete!" };
  } catch (error) {
    return { message: "error", error };
  }
}

export async function getPostByUserId(userId: string) {
  try {
    return await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            img: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                img: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            id: true,
            authorId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(error)
    throw new Error("something went wrong!");
  }
}

export async function getFavoritePostByUserId(userId: string) {
  try {
    return await prisma.post.findMany({
      where: {
        likes: {
          some: {
            authorId: userId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            img: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                img: true,
              },              
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            id: true,
            authorId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(error)
    throw new Error("something went wrong!");
  }
}
