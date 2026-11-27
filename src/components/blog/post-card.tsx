import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { formatPostDate } from '@/lib/blog'
import { blogCover, blogCoverAlt } from '@/lib/blog-cover'
export function PostCard({post,featured=false}:{post:BlogPost;featured?:boolean}){return <article className={`alcor-post-card min-w-0 ${featured?'xl:col-span-2':''}`}><Link href={`/blog/${post.slug}`}><div className="alcor-post-cover shrink-0"><Image src={blogCover(post)} alt={blogCoverAlt(post)} fill sizes={featured?'(min-width:1280px) 65vw, (min-width:700px) 48vw,95vw':'(min-width:1280px) 32vw, (min-width:700px) 48vw,95vw'} unoptimized/></div><div className="alcor-post-body min-w-0 [overflow-wrap:anywhere]"><div className="alcor-post-meta flex-wrap"><span>{post.category}</span><span>{post.readingTimeMinutes} Min.</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><div className="alcor-post-footer flex-wrap"><time dateTime={post.date}>{formatPostDate(post.date)}</time><span className="inline-flex items-center gap-2">Beitrag lesen<ArrowUpRight size={16} className="shrink-0" aria-hidden="true"/></span></div></div></Link></article>}
