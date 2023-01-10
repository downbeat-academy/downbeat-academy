import { Routes, Route } from "react-router-dom";

import BadgePage from './pages/badge'
import ButtonPage from './pages/button'
import ButtonSetPage from './pages/buttonSet'
import LogoPage from './pages/logo'

export const Router = () => {
  return (
    <Routes>
      <Route path='/badge' element={<BadgePage />} />
      <Route path='/button' element={<ButtonPage />} />
      <Route path='/button-set' element={<ButtonSetPage />} />
      <Route path='/logo' element={<LogoPage />} />
    </Routes>
  )
}