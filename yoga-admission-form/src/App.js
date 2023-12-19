import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdmissionForm from './AdmissionForm'; // Import the AdmissionForm component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Removed the default content and replaced it with AdmissionForm */}
        <AdmissionForm />
      </header>
    </div>
  );
}

export default App;
