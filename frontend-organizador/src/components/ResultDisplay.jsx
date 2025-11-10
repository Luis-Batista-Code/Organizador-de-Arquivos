import React from 'react';

function ResultDisplay({ result, type }) {
    if (!result) return null;

    if (result.success) {
        return (
            <div className="Result-success">
                <h4>✅ Sucesso!</h4>
                <p>{result.mensagem}</p>
                {type === 'create' && result.pastas_criadas && (
                    <>
                        <h5>Pastas Criadas:</h5>
                        <ul className="log-list">
                            {result.pastas_criadas.map((p, index) => <li key={index}>{p}</li>)}
                        </ul>
                    </>
                )}
                {type === 'organize' && result.logs && (
                    <>
                        <h5>Logs de Movimentação:</h5>
                        <ul className="log-list">
                            {result.logs.map((log, index) => <li key={index}>{log}</li>)}
                        </ul>
                    </>
                )}
            </div>
        );
    } else {
        return (
            <div className="Result-error">
                <h4>❌ Erro!</h4>
                <p><strong>Causa:</strong> {result.erro}</p>
                {result.detalhe && <p><strong>Detalhe:</strong> {result.detalhe}</p>}
            </div>
        );
    }
}

export default ResultDisplay;