// Dados reais estruturados para o ambiente de produção
const postData = {
  title: "Baleias de Ethereum acumulam novo Token X",
  summary: "Movimentação atípica nas últimas 24h acende o radar do mercado de DeFi, impulsionando sinais de engajamento inicial.",
  
  // Rota exata do artigo em produção
  url: "https://marketripplenews.com/posts/fan-tokens-world-cup-2026",
  
  // Imagem real e pública hospedada diretamente no seu Cloudflare Pages (>1200px)
  imageUrl: "https://marketripplenews.com/assets/FAN-TOKENS-2026.jpg" 
};

async function dispararNotificacaoProducao() {
  // Rota exata do endpoint da sua API em produção
  const url = "https://marketripplenews.com/api/telegram-notify"; 

  console.log("🚀 Enviando postagem para produção no canal do Telegram...");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8" // Mantém a acentuação limpa
      },
      body: JSON.stringify(postData)
    });

    const resultado = await response.json();

    if (response.ok) {
      console.log("✅ Post enviado com sucesso para o Telegram!", resultado);
    } else {
      console.error("❌ O servidor recusou ou falhou na postagem:", resultado);
    }
  } catch (error) {
    console.error("💥 Erro crítico ao conectar com o servidor de produção:", error.message);
  }
}

dispararNotificacaoProducao();