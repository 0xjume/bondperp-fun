import { fetchAvantisPairs } from "@/lib/avantis";

export async function GET() {
  const result = await fetchAvantisPairs();
  return Response.json(result, {
    headers: { "cache-control": "public, s-maxage=30, stale-while-revalidate=120" },
  });
}
