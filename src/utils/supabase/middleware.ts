// src/utils/supabase/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function updateSession(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  // 毎リクエストごとにトークンをリフレッシュ
  await supabase.auth.getUser();
  return res;
}
