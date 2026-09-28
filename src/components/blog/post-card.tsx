import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { formatPostDate } from '@/lib/blog'
import { blogCover, blogCoverAlt } from '@/lib/blog-cover'
export function PostCard({post,featured=false}:{post:BlogPost;featured?:boolean}){return <article className={`alcor-post-card ${featured?'md:col-span-2':''}`}><Link href={`/blog/${post.slug}`}><div className="alcor-post-cover"><Image src={blogCover(post)} alt={blogCoverAlt(post)} fill sizes={featured?'(min-width:768px) 65vw, 95vw':'(min-width:1000px) 32vw, (min-width:700px) 48vw,95vw'} unoptimized/></div><div className="alcor-post-body"><div className="alcor-post-meta"><span>{post.category}</span><span>{post.readingTimeMinutes} Min.</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><div className="alcor-post-footer"><time dateTime={post.date}>{formatPostDate(post.date)}</time><span className="inline-flex items-center gap-2">Beitrag lesen<ArrowUpRight size={16} aria-hidden="true"/></span></div></div></Link></article>}
