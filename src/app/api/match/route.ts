import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // リクエストボディから career と jd を抽出
    const { career, jd } = await request.json();
    if (!career || !jd) {
      return NextResponse.json(
        { error: 'career と jd の両方の入力が必要です。' },
        { status: 400 }
      );
    }

    // --------------------------------
    // gpt-3.5-turbo 用の仮料金（要公式ドキュメント確認）
    // --------------------------------
    const promptPricePer1k = 0.0015;     // 入力(プロンプト)単価
    const completionPricePer1k = 0.002;  // 出力(回答)単価

    // --------------------------------
    // 高精度なプロンプト
    // --------------------------------
    const prompt = `
あなたは「日本市場に詳しいキャリアアドバイザー兼 外資企業の採用コンサルタント」です。日本における外資系企業の採用動向や職種呼称に精通しており、営業系・マーケティング系・プロダクト系・ソリューションエンジニア系まで幅広く理解しています。

以下の【職務経歴】と【求人内容（JD）】を読み込み、以下を行ってください。

1. **外資系企業でよく使われる職種タイトルを最大3つ** 提案  
   - 応募者の職務経歴やスキルセットから推測されるもっとも妥当な役職名を、できるだけ正確に提示  
   - 必ずしもエンジニア職に偏らず、営業/マーケ/PM/CSなど多方面を検討  
   - 例：Product Specialist, Solutions Engineer, Sales Executive, Technical Account Manager, Product Marketing Manager など

2. **求人要件へのマッチ度** を**体系的**に評価し、0〜100点で示す  
   - JDを要素ごとに分解した上で、応募者がどの程度要件をカバーしているかを加点方式で論理的に算出  
   - 数値に加え、その理由を簡潔にまとめる

3. **アピールすべき経験・スキル**  
   - 応募者が強みとして訴求すべきポイントを箇条書きで示す  
   - できるだけ具体的に（英語でのコミュニケーション経験、プロダクトデモ、数値実績 など）

4. **不足している部分を補うには？**  
   - マッチ度が完全でない場合、追加で身につけるべきスキルや知識を具体的に提案  
   - 例：データ分析ツールの習得、英語ドキュメント作成の強化 など

### 出力形式（日本語、Markdown）
- **以下の見出しのみ**を使い、簡潔にわかりやすく書いてください。
\`\`\`md
## 【あなたの経歴は以下のタイトルが外資系企業でよく使われる！】
- 1: ...
- 2: ...
- 3: ...

## 【マッチ度評価】
**スコア**: XX  
**理由**: …

## 【アピールすべき経験・スキル】
- …

## 【不足している部分を補うには？】
- …
\`\`\`

- それ以外の段落やステップの解説は不要。必ず上記見出しだけを使い、余計な文章を加えないこと。

-------------------------
【職務経歴】
${career}

【求人内容（JD）】
${jd}
-------------------------
`;

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API キーが設定されていません。' },
        { status: 500 }
      );
    }

    // --------------------------------
    // OpenAI API呼び出し
    // --------------------------------
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();

    // AIからの回答本文
    const aiResult = data.choices?.[0]?.message?.content || 'No result returned.';

    // --------------------------------
    // トークン使用量 & コスト計算
    // --------------------------------
    const usage = data.usage || {};
    const promptTokens = usage.prompt_tokens || 0;
    const completionTokens = usage.completion_tokens || 0;
    const totalTokens = usage.total_tokens || 0;

    const costPrompt = (promptTokens * promptPricePer1k) / 1000;
    const costCompletion = (completionTokens * completionPricePer1k) / 1000;
    const costUSD = costPrompt + costCompletion;

    // --------------------------------
    // 結果を返却
    // --------------------------------
    return NextResponse.json({
      result: aiResult,
      usage: {
        promptTokens,
        completionTokens,
        totalTokens,
        costUSD
      }
    });

  } // 旧：catch (error: any)
　catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
  
}
