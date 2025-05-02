import React from 'react';

export default function QuickSuggestions({ onSelect }) {
  const suggestions = ["Próximo jogo", "Elenco", "Ranking", "Placar ao vivo", "VAMO FURIA!"];
  return (
    <div className="mt-3">
      <p className="mb-2">Sugestões rápidas:</p>
      <div className="d-flex gap-2 flex-wrap">
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onSelect(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}