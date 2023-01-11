import { Routes, Route } from "react-router-dom";

import BadgePage from './pages/badge'
import ButtonPage from './pages/button'
import ButtonSetPage from './pages/buttonSet'
import LogoPage from './pages/logo'
import TextPage from './pages/text'
import AvatarPage from './pages/avatar'

export const Router = () => {
  return (
    <Routes>
      <Route path='/badge' element={<BadgePage />} />
      <Route path='/button' element={<ButtonPage />} />
      <Route path='/button-set' element={<ButtonSetPage />} />
      <Route path='/logo' element={<LogoPage />} />
      <Route path='/text' element={<TextPage />} />
      <Route path='/avatar' element={<AvatarPage />} />
    </Routes>
  )
}