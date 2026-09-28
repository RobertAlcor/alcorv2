import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { editorialImage, type VisualKind } from '@/lib/editorial-image'
export const runtime='nodejs'
export const dynamic='force-static'
export async function generateStaticParams(){return (await getAllPosts()).map(({slug})=>({slug}))}
export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=await getPostBySlug(slug);if(!post)return new Response('Not found',{status:404});const seed=[...slug].reduce((a,c)=>a+c.charCodeAt(0),0);const kind=(['design','strategy','technology'] as VisualKind[])[seed%3]!;return editorialImage(kind,post.title,post.category)}
