import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import MainMenu from './Pages/MainMenu.jsx'
import GameSetup from './Pages/GameSetup.jsx'
import Game from './Pages/Game.jsx'
import Settings from './Pages/Settings.jsx'
import HowToPlay from './Pages/HowToPlay.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/mainmenu" element={<MainMenu />} />
          <Route path="/gamesetup" element={<GameSetup />} />
          <Route path="/game" element={<Game />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
) 