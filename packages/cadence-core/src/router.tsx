import { Routes, Route } from "react-router-dom";

import ButtonPage from './pages/button'
import ButtonSetPage from './pages/buttonSet'

export const Router = () => {
  return (
    <Routes>
      <Route path='/button' element={<ButtonPage />} />
      <Route path='/button-set' element={<ButtonSetPage />} />
    </Routes>
  )
}