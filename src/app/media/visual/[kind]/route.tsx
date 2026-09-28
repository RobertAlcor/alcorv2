import { editorialImage, type VisualKind } from '@/lib/editorial-image'
export const runtime='nodejs'
export const dynamic='force-static'
export function generateStaticParams(){return ['design','strategy','technology'].map(kind=>({kind}))}
export async function GET(_request:Request,{params}:{params:Promise<{kind:string}>}){const {kind}=await params;if(!['design','strategy','technology'].includes(kind))return new Response('Not found',{status:404});return editorialImage(kind as VisualKind)}
