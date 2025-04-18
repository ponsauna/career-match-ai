// src/utils/supabase/client.ts
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export function createBrowserSupabase() {
  // 環境変数 NEXT_PUBLIC_SUPABASE_URL / ANON_KEY は自動で読み込み
  return createBrowserSupabaseClient();
}
