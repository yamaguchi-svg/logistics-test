// api/grade.js
// Vercel サーバーレス関数 - APIキーをサーバー側で安全に保管

export default async function handler(req, res) {
  // CORS ヘッダー設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, modelAnswer, userAnswer } = req.body;

  if (!question || !modelAnswer || !userAnswer) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `あなたは物流の試験採点官です。以下の問題・模範解答・受験者の解答を評価してください。

【問題】${question}
【模範解答のポイント】${modelAnswer}
【受験者の解答】${userAnswer}

採点基準：
- 4点：模範解答の核心を完全に捉えており、理解が十分に示されている
- 3点：概ね正しいが一部のポイントが不足または不正確
- 2点：部分的に正しいが重要なポイントが欠けている
- 1点：大きく間違っているか、的外れな回答

必ずJSON形式のみで返答してください（説明文不要）：
{"score": 数字(1-4), "feedback": "短い日本語フィードバック（50字以内）", "correct_point": "正しかった点（30字以内）", "missing_point": "不足・改善点（30字以内、完璧なら空文字）"}`
        }]
      })
    });

    const data = await response.json();
    const text = data.content.map(c => c.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Grading error:', error);
    return res.status(500).json({
      score: 2,
      feedback: '採点中にエラーが発生しました',
      correct_point: '',
      missing_point: '再度お試しください'
    });
  }
}
