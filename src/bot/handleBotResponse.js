import MockData from '../data/MockData';

export default function handleBotResponse(userInput) {
  let response = '';

  if (/pr[oó]ximo jogo/i.test(userInput)) {
    const jogo = MockData.proximoJogo;
    response = `📆 O próximo jogo da FURIA é contra a ${jogo.adversario}, neste ${jogo.data} às ${jogo.horario}. Se liga! 🔥`;
  } else if (/elenco/i.test(userInput)) {
    response = `👥 Elenco atual da tropa: ${MockData.elenco.join(", ")}! VAMO FURIA! 🐆`;
  } else if (/ranking/i.test(userInput)) {
    response = `📊 No ranking mundial, a FURIA tá no TOP ${MockData.ranking}! Seguimos na luta! 💪`;
  } else if (/placar|ao vivo|jogo atual/i.test(userInput)) {
    const jogo = MockData.placarAoVivo;
    if (jogo.emAndamento) {
      response = `🎮 Jogo em andamento contra ${jogo.adversario} no mapa ${jogo.mapa}. Placar: 🖤 FURIA ${jogo.furia} x ${jogo.adversarioScore} ${jogo.adversario}. ⏱ Tempo restante: ${jogo.tempoRestante}`;
    } else {
      response = `❌ Nenhum jogo rolando agora. Fica ligado que já já tem FURIA na tela!`;
    }
  } else if (/vam[oó]+ furia/i.test(userInput)) {
    const gritos = [
      '🔥 VAMOOOOOO FURIAAAAAA! 🐆💣💥',
      '💥 É FURIA NA VEIA! 🖤🐆',
      '🐆🐆🐆 FURIAAAAAAAAAAAA! 🔥🔥🔥'
    ];
    response = gritos[Math.floor(Math.random() * gritos.length)];
  } else {
    response = '🤖 Ainda tô aprendendo... Pergunte sobre: "próximo jogo", "elenco", "ranking", ou mande um "VAMO FURIA"!';
  }

  return response;
}
