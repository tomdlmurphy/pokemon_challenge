import { useEffect, useState } from 'react';
import { buildGeneratedAnswer, SearchEngine } from '@coveo/headless';

interface GeneratedAnswerProps {
  engine: SearchEngine;
}

const GeneratedAnswer = ({ engine }: GeneratedAnswerProps) => {
  const controller = buildGeneratedAnswer(engine);
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setState(controller.state);
    });
    return unsubscribe;
  }, []);

  if (!state.isVisible || !state.answer) {
    return null;
  }

  return (
    <div style={{
      background: '#f0f4ff',
      border: '1px solid #c0d0ff',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px'
    }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#555' }}>
        ✨ AI-Generated Answer
      </h3>
      <p style={{ margin: 0 }}>{state.answer}</p>

      {state.citations && state.citations.length > 0 && (
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#666' }}>
          <strong>Sources:</strong>
          <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
            {state.citations.map((citation) => (
              <li key={citation.id}>
                <a href={citation.uri} target="_blank" rel="noreferrer">
                  {citation.title || citation.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GeneratedAnswer;
