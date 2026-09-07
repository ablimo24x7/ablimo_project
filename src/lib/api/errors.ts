import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiErrorShape = { error: string; details?: unknown };

export function toErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

export function toApiError(err: unknown): ApiErrorShape {
  if (err instanceof ZodError) {
    return { error: "Validation error", details: err.flatten() };
  }
  return { error: toErrorMessage(err) };
}

export async function parseJsonBody(req: Request): Promise<Record<string, any> | NextResponse> {
  try {
    const body = await req.json();
    return body ?? {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
