# 🚀 Organizador Digital Full-Stack

Um **Organizador Digital** desenvolvido com arquitetura **Full-Stack** que visa automatizar a limpeza de diretórios e a padronização da estrutura de pastas de projetos profissionais.

Este projeto demonstra a integração de um Backend Python (Flask) para manipulação de arquivos no sistema operacional com um Frontend React para uma interface de usuário amigável.

---

## ✨ Funcionalidades Principais

Seu projeto oferece duas funcionalidades cruciais para a organização digital:

| Funcionalidade | Descrição | Backend (Flask) | Frontend (React) |
|---|---|---|---|
| **Criar Estrutura Padrão** | Cria uma arquitetura de pastas hierárquica e padronizada (Ex: ESCRITÓRIO, PROJETOS, DOCUMENTOS), baseada em modelos de organização profissional. | Rota: `/criar_estrutura` (POST) | Componente: `FolderCreator` |
| **Organizar Arquivos** | Classifica e move automaticamente arquivos de um diretório alvo (ex: Downloads) para subpastas com base em suas extensões predefinidas. | Rota: `/organizar` (POST) | Componente: `FileOrganizer` |

---

## 🛠️ Arquitetura e Tecnologias

O projeto é estruturado de forma modular e limpa, dividido em dois diretórios principais:

* **Backend (API):** Python com **Flask** para expor as funcionalidades de manipulação do sistema de arquivos (`os`, `shutil`).
    * Arquivos principais: `api_server.py`, `core.py`, `config.py`.
* **Frontend (UI):** JavaScript com **React** (via Vite) para a interface gráfica, que se comunica com o Backend via requisições HTTP (CORS ativado).
    * Localização: Subpasta `frontend-organizador/`.

---

## 📦 Requisitos

Você precisará ter as seguintes ferramentas instaladas globalmente:

* **Python 3.x** e **pip** (para o Backend)
* **Node.js** e **npm** (para o Frontend)

### 1. Dependências do Backend (Python)

Na pasta raiz (`Organizador-de-Arquivos/`), instale as dependências:

```bash
pip install Flask Flask-CORS
```

### 2. Dependências do Frontend (React)

Na subpasta frontend-organizador/, instale as dependências do React:

```bash
cd frontend-organizador
npm install
```

## ⚙️ Como Executar o Projeto

Você deve rodar o Backend e o Frontend em terminais separados para que a comunicação funcione.

### 1. Iniciar o Backend (API Flask) 🐍

Abra o Terminal 1 no diretório raiz (Organizador-de-Arquivos/) e execute:

```bash
python api_server.py
```

### 2. Iniciar o Frontend (React) ⚛️

Abra o Terminal 2, navegue até a subpasta do frontend (frontend-organizador/) e execute:

```bash
cd frontend-organizador
npm run dev
```

## 🧪 Teste Rápido

Após iniciar os dois servidores:

* **Verificar API: Acesse http://127.0.0.1:5000/ no navegador. Se o JSON de status for exibido (status: API Organizador Full-Stack Ativa), a comunicação está pronta.**
* **Teste de Funcionalidade: Use a interface do React para fornecer o caminho de um diretório de teste (ex: C:\Users\Downloads_Teste) e execute as duas funcionalidades. Verifique o resultado no seu sistema de arquivos e nos logs de sucesso na tela.**

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 💻 Autor

-   **Luis Batista**
-   **GitHub:** `@Luis-Batista-Code`

