import { fetchAvantisPositions } from "@/lib/avantis";

export async function GET(request: Request) {
  const trader = new URL(request.url).searchParams.get("trader");
  if (!trader) {
    return Response.json(
      { positions: [], degraded: true, error: "Missing trader" },
      { status: 400 },
    );
  }
  const result = await fetchAvantisPositions(trader);
  return Response.json(result);
}
