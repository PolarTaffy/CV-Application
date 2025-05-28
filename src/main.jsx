import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GeneralInfoSection from './components/generalInfo'
import EducationSection from './components/education'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <GeneralInfoSection/> */}
    <EducationSection/>

  </StrictMode>,
)
