import { NextResponse } from "next/server";

/**
 * Stub endpoint for sprint planning chat.
 * The @integration.eng agent will implement the actual SSE proxy
 * to the FastAPI backend at POST /crew/execute.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "not_implemented",
      message:
        "Chat endpoint not yet connected. The integration agent will wire this to the FastAPI backend.",
    },
    { status: 501 }
  );
}
