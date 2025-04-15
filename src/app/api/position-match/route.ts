// src/app/api/position-match/route.ts
import { NextResponse } from 'next/server';
import { categorizedDictionary } from '../../dictionary/data';

export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    if (!description) {
      return NextResponse.json(
        { error: '仕事内容の入力が必要です。' },
        { status: 400 }
      );
    }
    
    // 入力文字数を計算
    const charCount = description.length;

    // 料金（仮）
    const promptPricePer1k = 0.0015;
    const completionPricePer1k = 0.002;

    // 辞書候補リストの作成（各項目の term を改行付きでリスト化）
    let candidateList = '';
    Object.values(categorizedDictionary).forEach((entries) => {
      entries.forEach((entry) => {
        candidateList += `- ${entry.term}\n`;
      });
    });

    // 高精度なプロンプト作成
    const prompt = `
あなたは外資系企業の採用コンサルタントです。以下の「仕事内容」を読み、外資系企業で実際に採用で使われているポジション名を、下記の候補リストから3～5件選んでください。
また、記入された仕事内容がどのポジションに最も適しているか、簡潔に要約してください。

回答は以下のMarkdown形式に従って出力してください。

\`\`\`md
## 【提案された外資系ポジション】
- 1: （例: AE (Account Executive)）
- 2: （例: Product Specialist）
- 3: （例: Marketing Manager）

## 【ポジション適合要約】
- …（要約を記入）
\`\`\`

【候補リスト】  
${candidateList}

【仕事内容】  
${description}
    `;

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API キーが設定されていません。' },
        { status: 500 }
      );
    }

    // OpenAI API 呼び出し
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    const aiResult = data.choices?.[0]?.message?.content || 'No result returned.';

    // トークン使用量・コスト計算
    const usage = data.usage || {};
    const promptTokens = usage.prompt_tokens || 0;
    const completionTokens = usage.completion_tokens || 0;
    const totalTokens = usage.total_tokens || 0;
    const costPrompt = (promptTokens * promptPricePer1k) / 1000;
    const costCompletion = (completionTokens * completionPricePer1k) / 1000;
    const costUSD = costPrompt + costCompletion;

    return NextResponse.json({
      result: aiResult,
      charCount,  // 入力された文字数を含める
      usage: {
        promptTokens,
        completionTokens,
        totalTokens,
        costUSD,
      },
    });
  } // 旧：catch (error: any)
  catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
  
  }
