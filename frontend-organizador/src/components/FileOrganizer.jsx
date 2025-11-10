import React, { useState } from 'react';
import ResultDisplay from './ResultDisplay';

function FileOrganizer({ apiUrl }) {
    const [directory, setDirectory] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const usarPadrao = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch(`${apiUrl}/organizar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    diretorio: directory,
                    usarPadrao: usarPadrao,

                }),
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
                detalhe: 'Verifique se o servidor Flask está rodando na porta 5000.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Organizer-container">
            <h3>Organizar Arquivos por Extensão</h3>
            <p>Usando Categorias Padrão (Imagens, Documentos, Vídeos, etc.)</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Caminho do Diretório a Organizar:
                    <input
                        type="text"
                        value={directory}
                        onChange={(e) => setDirectory(e.target.value)}
                        placeholder="Ex: C:\Users\SeuNome\Downloads"
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Organizando...' : 'Iniciar Organização'}
                </button>
            </form>

            <ResultDisplay result={result} type="organize" />
        </div>
    );
}

export default FileOrganizer;