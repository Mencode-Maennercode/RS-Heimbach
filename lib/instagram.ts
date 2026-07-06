export interface InstagramComment {
  username: string;
  text: string;
}

export interface InstagramTile {
  id: string | number;
  type: "photo" | "reel" | "carousel";
  media: string | string[];
  mediaKinds?: Array<"image" | "video">;
  thumbnail: string;
  caption: string;
  likes: number;
  commentsCount: number;
  topComments: InstagramComment[];
  timestamp: string;
  url: string;
}

interface RawInstagramChild {
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  thumbnail_url?: string;
}

interface RawInstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  timestamp: string;
  thumbnail_url?: string;
  like_count?: number;
  comments_count?: number;
  comments_data?: InstagramComment[];
  children?: { data: RawInstagramChild[] };
}

interface RawInstagramData {
  last_updated: string;
  total_count: number;
  media: RawInstagramMedia[];
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "heute";
  if (days === 1) return "vor 1 Tag";
  if (days < 30) return `vor ${days} Tagen`;
  const months = Math.floor(days / 30);
  if (months < 12) return `vor ${months} Monat${months > 1 ? "en" : ""}`;
  const years = Math.floor(months / 12);
  return `vor ${years} Jahr${years > 1 ? "en" : ""}`;
}

function mapMedia(post: RawInstagramMedia): InstagramTile {
  const type: InstagramTile["type"] =
    post.media_type === "VIDEO"
      ? "reel"
      : post.media_type === "CAROUSEL_ALBUM"
        ? "carousel"
        : "photo";

  let media: string | string[] = post.media_url;
  let mediaKinds: Array<"image" | "video"> | undefined;
  let thumbnail = post.thumbnail_url || post.media_url;

  if (type === "carousel" && post.children?.data?.length) {
    media = post.children.data.map((c) => c.media_url);
    mediaKinds = post.children.data.map((c) =>
      c.media_type === "VIDEO" ? "video" : "image",
    );
    const firstChild = post.children.data[0];
    thumbnail = firstChild.media_type === "VIDEO"
      ? firstChild.thumbnail_url || firstChild.media_url
      : firstChild.media_url;
  } else if (type === "reel") {
    mediaKinds = ["video"];
  }

  return {
    id: post.id,
    type,
    media,
    mediaKinds,
    thumbnail,
    caption: post.caption || "",
    likes: post.like_count ?? 0,
    commentsCount: post.comments_count ?? 0,
    topComments: post.comments_data ?? [],
    timestamp: relativeTime(post.timestamp),
    url: post.permalink,
  };
}

export async function loadInstagramPosts(limit = 9): Promise<InstagramTile[]> {
  try {
    const res = await fetch("/data/instagram.json", { cache: "no-store" });
    if (!res.ok) throw new Error("instagram.json nicht erreichbar");
    const data: RawInstagramData = await res.json();
    return data.media.slice(0, limit).map(mapMedia);
  } catch {
    return [];
  }
}
