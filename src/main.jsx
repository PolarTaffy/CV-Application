import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GeneralInfoSection from './components/generalInfo'
import EducationSection from './components/education'
import JobSection from './components/jobexperience'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <GeneralInfoSection/> */}
    <JobSection/>

  </StrictMode>,
)
