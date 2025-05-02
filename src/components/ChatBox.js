import React from 'react';

export default function ChatBox({ messages, scrollRef }) {
  return (
    <div className="card bg-black text-light mb-3" style={{ height: '700px', overflowY: 'auto', borderColor: '#333' }}>
      <div className="card-body d-flex flex-column gap-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${msg.from === 'bot' ? 'bg-secondary align-self-start' : 'bg-success align-self-end'}`}
            style={{ maxWidth: '75%' }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div ref={scrollRef} />
    </div>
  );
}