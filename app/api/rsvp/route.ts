import { z } from "zod";
import { storeRSVP } from "@/db/rsvp";
const schema=z.object({id:z.string().uuid(),name:z.string().trim().min(1).max(100),guests:z.number().int().min(0).max(10),attendance:z.enum(["yes","no"]),message:z.string().trim().max(1000),website:z.string().max(0)}).strict().refine(v=>v.attendance==="yes"?v.guests>=1:v.guests===0);
export async function POST(request:Request){
 const headers={"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"};
 if(request.headers.get("Origin")&&request.headers.get("Origin")!==new URL(request.url).origin)return Response.json({error:"invalid_origin"},{status:403,headers});
 if(!request.headers.get("Content-Type")?.includes("application/json"))return Response.json({error:"invalid_content"},{status:415,headers});
 let input:unknown;
 try{const body=await request.text();if(body.length>4096)return Response.json({error:"too_large"},{status:413,headers});input=JSON.parse(body);}catch{return Response.json({error:"invalid_request"},{status:400,headers});}
 const parsed=schema.safeParse(input);if(!parsed.success)return Response.json({error:"invalid_details"},{status:400,headers});
 try{await storeRSVP(parsed.data);return Response.json({saved:true,id:parsed.data.id},{status:201,headers});}catch(error){console.error("RSVP storage failure",error instanceof Error?error.name:"unknown");return Response.json({error:"temporarily_unavailable"},{status:503,headers});}
}
