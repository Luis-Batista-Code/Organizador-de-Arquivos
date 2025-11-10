import React, { useState } from 'react';
import './index.css';
import FileOrganizer from './components/FileOrganizer';
import FolderCreator from './components/FolderCreator';

const API_BASE_URL = 'http://127.0.0.1:5000'; 

function App() {
  const [currentView, setCurrentView] = useState('organize');
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>📁 Organizador Digital Full-Stack</h1>
        <p>Frontend React ⚛️ comunicando-se com Backend Flask 🐍</p>
      </header>

      <div className="Menu-tabs">
        <button 
          onClick={() => setCurrentView('organize')}
          className={currentView === 'organize' ? 'active' : ''}
        >
          Organizar Arquivos (por extensão)
        </button>
        <button 
          onClick={() => setCurrentView('create')}
          className={currentView === 'create' ? 'active' : ''}
        >
          Criar Estrutura Padrão (Pastas)
        </button>
      </div>

      <div className="Content-area">
        {currentView === 'organize' ? (
          <FileOrganizer apiUrl={API_BASE_URL} />
        ) : (
          <FolderCreator apiUrl={API_BASE_URL} />
        )}
      </div>

    </div>
  );
}

export default App;