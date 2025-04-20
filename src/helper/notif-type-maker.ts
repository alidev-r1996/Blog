export function notifType(type: string) {
    switch (type) {
      case "LIKE":
        return "liked your post.";
      case "COMMENT":
        return "commented on your post.";
      case "FOLLOW":
        return "started following you.";
      default:
        return "";
    }
  }