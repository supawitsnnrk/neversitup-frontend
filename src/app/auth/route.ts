import { cookies } from "next/headers";

export async function GET() {
  cookies().delete("token");
  const token = cookies().getAll();
  return Response.json({ success: true });
}
