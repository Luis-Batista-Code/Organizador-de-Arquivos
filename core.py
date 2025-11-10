import os
import shutil
from config import CATEGORIAS_PADRAO, ESTRUTURA_PADRAO_PROFISSIONAL 

def classificar_arquivo(nome_arquivo, categorias=CATEGORIAS_PADRAO):
    """Retorna a categoria do arquivo com base em sua extensão."""
    _, extensao = os.path.splitext(nome_arquivo.lower())
    for categoria, extensoes in categorias.items():
        if extensao in extensoes:
            return categoria
    return "Outros"

def organizar_arquivos(diretorio_alvo, categorias):
    """
    Percorre o diretório e move arquivos para subpastas baseadas em suas categorias.
    """
    if not os.path.isdir(diretorio_alvo):
        raise FileNotFoundError(f"Diretório não encontrado: {diretorio_alvo}")

    movimentos = []
    
    for item in os.listdir(diretorio_alvo):
        caminho_completo = os.path.join(diretorio_alvo, item)

        if os.path.isfile(caminho_completo):
            try:
                categoria = classificar_arquivo(item, categorias)
                pasta_destino = os.path.join(diretorio_alvo, categoria)

                if not os.path.exists(pasta_destino):
                    os.makedirs(pasta_destino)

                shutil.move(caminho_completo, os.path.join(pasta_destino, item))
                movimentos.append(f"Movido: {item} -> {categoria}")
                
            except Exception as e:
                movimentos.append(f"ERRO ao mover {item}: {e}")
                
    return movimentos

def criar_estrutura_pastas(diretorio_alvo, estrutura=ESTRUTURA_PADRAO_PROFISSIONAL):
    """Cria uma estrutura de pastas padronizada dentro do diretório alvo."""
    
    if not os.path.isdir(diretorio_alvo):
        raise FileNotFoundError(f"Diretório raiz não encontrado: {diretorio_alvo}")
        
    pastas_criadas = []
    
    for pasta_principal, subpastas in estrutura.items():
        caminho_principal = os.path.join(diretorio_alvo, pasta_principal)
        
        if not os.path.exists(caminho_principal):
            os.makedirs(caminho_principal)
            pastas_criadas.append(pasta_principal)

        for subpasta_relativa in subpastas:
            caminho_completo = os.path.join(diretorio_alvo, subpasta_relativa)
            if not os.path.exists(caminho_completo):
                os.makedirs(caminho_completo, exist_ok=True) 
                pastas_criadas.append(subpasta_relativa)
                
    return pastas_criadas