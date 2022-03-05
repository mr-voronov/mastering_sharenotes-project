import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { Main, Create, Note, About, Error } from './pages/index.js';
// import Main from './components/Main';
// import Create from './components/Create';
// import Note from './components/Note';
// import About from './components/About';
// import Error from './components/Error';
import Footer from './components/Footer';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/create" element={<Create />} />
          <Route path="/note" element={<Note />} />
          <Route exact path="/note/:noteURL" element={<Note />} />
          <Route exact path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>      
    </div>
  );
}
