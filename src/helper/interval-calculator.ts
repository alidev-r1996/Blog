export  function intervalCalculator(date: Date | string) {
  const now = Date.now();
  const past = new Date(date).getTime();
  const diff = Math.abs(Math.floor((now - past) / 1000));

  const interval = [
    { label: "just now", seconds: 1 },
    { label: "minutes", seconds: 60 },
    { label: "hours", seconds: 3600 },
    { label: "days", seconds: 86400 },
    { label: "weeks", seconds: 604800 },
    { label: "months", seconds: 2592000 },
    { label: "years", seconds: 31536000 },
  ];

  if (diff <= 60) {
    return "just now";
  }
  if (diff >= 31536000) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }else{
    for (let i = 0; i < interval.length; i++) {
      const seconds = interval[i].seconds;
      if (diff <= seconds) {
        const count = Math.max(Math.floor(diff / seconds), 1);
        return `${count} ${interval[i].label} ago`;
      }
    }
  }

}
