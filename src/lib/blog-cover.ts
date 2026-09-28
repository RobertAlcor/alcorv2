export function blogCover(post:{slug:string;ogImage?:string}):string {return `/media/blog/${encodeURIComponent(post.slug)}`}
export function blogCoverAlt(post:{title:string}):string {return `Beitragsillustration: ${post.title}`}
