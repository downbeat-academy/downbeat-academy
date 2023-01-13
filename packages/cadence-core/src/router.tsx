import { Routes, Route } from "react-router-dom";

import ComponentsPage from "./pages/components";
import BadgePage from './pages/components/badge'
import ButtonPage from './pages/components/button'
import ButtonSetPage from './pages/components/buttonSet'
import LogoPage from './pages/components/logo'
import TextPage from './pages/components/text'
import AvatarPage from './pages/components/avatar'

export const Router = () => {
  return (
    <Routes>
      <Route path='/components' element={<ComponentsPage />} />
      <Route path='/components/badge' element={<BadgePage />} />
      <Route path='/components/button' element={<ButtonPage />} />
      <Route path='/components/button-set' element={<ButtonSetPage />} />
      <Route path='/components/logo' element={<LogoPage />} />
      <Route path='/components/text' element={<TextPage />} />
      <Route path='/components/avatar' element={<AvatarPage />} />
    </Routes>
  )
}