"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { GetUserId } from "./user-action";

export async function getNotification() {
  const userId = await GetUserId();
  if (!userId) return [];

  try {
    const notifications = await prisma.notification.findMany({
        where: {
          userId,
        },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              username: true,
              img: true,
            },
          },
          post: {
            select: {
              id: true,
              content: true,
              img: true,
            },
          },
          comment: {
            select: {
              id: true,
              content: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        
      });
    
      return notifications;
  } catch (error) {
    throw new Error("something went wrong!");
  }
}

export async function markNotificationAsRead(userId: string) {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: userId,
      },
      data: {
        read: true,
      },
    });
    revalidatePath("/notifications");
    return { message: "success" };
  } catch (error) {
    return { message: "error", error };
  }
}

export async function RemoveNotification(notificationId: string) {
  try {
    await prisma.notification.deleteMany({
      where: {
        id: notificationId,
      },
    });
    return { message: "success" };
  } catch (error) {
    return { message: "error", error };
  }
}
