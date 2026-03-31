import { getDashboardData } from "@/lib/elearn-data";

export async function GET() {
  return Response.json(getDashboardData());
}
