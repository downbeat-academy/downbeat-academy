import { Routes, Route } from "react-router-dom";

import ButtonPage from './pages/button'

export const Router = () => {
  return (
    <Routes>
      <Route path='/button' element={<ButtonPage />} />
    </Routes>
  )
}