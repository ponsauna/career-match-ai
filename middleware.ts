// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

/**
 * 認証が不要なパスを列挙
 * - /login, /signup は未ログインでもアクセス可
 * - Next.js の内部パス (_next/*, favicon.ico) は常にスルー
 */
export const config = {
  matcher: [
    /*
      - /login, /signup, /_next, /favicon.ico 以外は全て認証必須
      - /apiも認証必須（必要なら後で除外）
    */
    '/((?!login|signup|_next|favicon\\.ico).*)'
  ]
}

/**
 * ミドルウェア本体
 * - リクエストごとに Supabase セッションを確認し
 *   未ログインなら /login にリダイレクト
 */
export async function middleware(req: NextRequest) {
  // ミドルウェアが呼ばれたことをログ出力
  console.log('middleware.ts: called for', req.nextUrl.pathname)

  // ① レスポンス用オブジェクトを作成
  const res = NextResponse.next()

  // ② Supabase ミドルウェアクライアントを初期化
  const supabase = createMiddlewareClient({ req, res })

  // ③ セッション情報を取得
  const {
    data: { session }
  } = await supabase.auth.getSession()

  // ④ 未ログインならログインページへ
  if (!session) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // ⑤ ログイン済みなら通常通り処理を続行
  return res
}
