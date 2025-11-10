import os
import sys 
from flask import Flask, request, jsonify
from flask_cors import CORS 

from core import organizar_arquivos, criar_estrutura_pastas
from config import CATEGORIAS_PADRAO

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def health_check():
    """Retorna um status simples para verificar se o servidor está ativo."""
    return jsonify({
        "status": "API Organizador Full-Stack Ativa", 
        "versao": "1.0",
        "instrucoes": "Use os endpoints /organizar ou /criar_estrutura com o método POST a partir do frontend React."
    }), 200

@app.route('/criar_estrutura', methods=['POST'])
def criar_estrutura_endpoint():
    """Recebe o diretório e chama a lógica para criar a arquitetura padronizada."""
    data = request.get_json()
    print(f"Dados recebidos do Frontend: {data}")
    if not data or 'diretorio' not in data:
        return jsonify({"erro": "Diretório não fornecido no corpo da requisição."}), 400

    diretorio_alvo = data.get('diretorio')
    
    try:
        pastas_criadas = criar_estrutura_pastas(diretorio_alvo)

        return jsonify({
            "mensagem": "Estrutura de pastas criada com sucesso!",
            "diretorio_raiz": diretorio_alvo,
            "pastas_criadas": pastas_criadas
        }), 200

    except FileNotFoundError as e:
         return jsonify({
             "erro": str(e),
             "detalhe": "O diretório especificado não existe ou está inacessível."
         }), 404
    except Exception as e:
        return jsonify({
            "erro": f"Erro interno ao criar estrutura: {str(e)}",
            "detalhe": "Verifique as permissões do sistema."
        }), 500

@app.route('/organizar', methods=['POST'])
def iniciar_organizacao_endpoint():
    """Recebe o diretório e as categorias e inicia a organização dos arquivos."""
    data = request.get_json()
    print(f"Dados recebidos do Frontend: {data}")
    if not data or 'diretorio' not in data:
        return jsonify({"erro": "Diretório não fornecido no corpo da requisição."}), 400

    diretorio_alvo = data.get('diretorio')
    usar_padrao = data.get('usarPadrao', True)
    categorias_customizadas = data.get('categorias', {}) 

    categorias_usar = CATEGORIAS_PADRAO if usar_padrao else categorias_customizadas
        
    try:
        logs_movimentos = organizar_arquivos(diretorio_alvo, categorias_usar)
        
        return jsonify({
            "mensagem": "Organização concluída com sucesso!",
            "diretorio": diretorio_alvo,
            "logs": logs_movimentos
        }), 200

    except FileNotFoundError as e:
         return jsonify({
             "erro": str(e),
             "detalhe": "O diretório especificado não existe ou está inacessível."
         }), 404
    except Exception as e:
        return jsonify({
            "erro": f"Erro interno durante a organização: {str(e)}",
            "detalhe": "Verifique permissões de acesso ao diretório."
        }), 500


if __name__ == '__main__':
    print("--- 📂 API Servidor de Organização (Flask) ---")
    print("Rotas GET: / (Health Check)")
    print("Rotas POST: /organizar, /criar_estrutura")
    print("Acesse em: http://127.0.0.1:5000/")
    app.run(debug=True, port=5000)