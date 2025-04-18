// src/utils/supabase/server.ts
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export function createServerSupabase() {
  // サーバーコンポーネント／API から呼ぶときに利用
  return createServerComponentClient({ cookies });
}
