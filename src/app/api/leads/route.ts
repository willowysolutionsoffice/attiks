import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const backendRes = await fetch(`${BACKEND_URL}/api/leads?${searchParams.toString()}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data, { status: backendRes.status });
    }
    const errData = await backendRes.json().catch(() => ({}));
    return NextResponse.json(
      { success: false, error: errData.error || errData.message || 'Failed to fetch leads', data: [] },
      { status: backendRes.status || 500 }
    );
  } catch {
    return NextResponse.json({ success: true, data: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendRes = await fetch(`${BACKEND_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(6000),
    });
    const data = await backendRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Unable to submit lead to backend' },
      { status: 500 }
    );
  }
}

