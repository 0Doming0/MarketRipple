import type { APIRoute } from 'astro';

// Força o Astro a renderizar este endpoint no servidor (Edge da Cloudflare)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Tipagem implícita ao desestruturar o JSON enviado
    const { title, summary, url, imageUrl } = await request.json() as {
      title: string;
      summary: string;
      url: string;
      imageUrl?: string;
    };

    // No Astro, o recomendado para acessar variáveis de ambiente locais/build é import.meta.env
    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return new Response(
        JSON.stringify({ error: 'Configuração de variáveis de ambiente ausente no servidor.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const messageHtml = `
<b>🚀 Novo post no MarketRipple!</b>

🔥 <b>${title}</b>
<i>${summary}</i>

👉 <a href="${url}">Clique aqui para ler o artigo completo</a>
    `.trim();

    let telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // Tipando o objeto de payload dinâmico para aceitar propriedades de ambas as APIs do Telegram
    let bodyData: Record<string, any> = {
      chat_id: chatId,
      text: messageHtml,
      parse_mode: 'HTML',
      disable_web_page_preview: false
    };

    if (imageUrl) {
      telegramUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;
      bodyData = {
        chat_id: chatId,
        photo: imageUrl,
        caption: messageHtml,
        parse_mode: 'HTML'
      };
    }

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });

    const result = await response.json() as { ok: boolean; description?: string };

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.description || 'Erro na API do Telegram' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Notificação enviada com sucesso!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Erro interno ao processar a requisição.', details: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};