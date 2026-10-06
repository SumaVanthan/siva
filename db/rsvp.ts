import { env } from "cloudflare:workers";
type Entry={id:string;name:string;guests:number;attendance:string;message:string};
export async function storeRSVP(entry:Entry){
 if(!env.DB)throw new Error("RSVP storage unavailable");
 await env.DB.prepare("INSERT INTO rsvps (id, name, guests, attendance, message, created_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING").bind(entry.id,entry.name,entry.guests,entry.attendance,entry.message,new Date().toISOString()).run();
}
