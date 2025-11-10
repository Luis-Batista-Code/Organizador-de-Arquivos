import React, { useState } from 'react';
import ResultDisplay from './ResultDisplay';

function FolderCreator({ apiUrl }) {
    const [directory, setDirectory] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch(`${apiUrl}/criar_estrutura`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ diretorio: directory }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult({ success: true, ...data });
            } else {
                setResult({ success: false, ...data });
            }

        } catch (error) {
            setResult({
                success: false,
                erro: 'Erro de conexão ou rede.',
                detalhe: 'Verifique se o servidor Flask está rodando na porta 5000 e se o CORS está ativado.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Creator-container">
            <h3>Criar Arquitetura de Pastas Padronizada</h3>
            <p>Com base no seu modelo de Escritório/Projetos.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Caminho Raiz:
                    <input
                        type="text"
                        value={directory}
                        onChange={(e) => setDirectory(e.target.value)}
                        placeholder="Ex: C:\Users\SeuNome\ProjetoNovo"
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Criando Estrutura...' : 'Criar Pastas Padrão'}
                </button>
            </form>

            <ResultDisplay result={result} type="create" />
        </div>
    );
}

export default FolderCreator;