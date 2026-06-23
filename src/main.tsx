import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import '../styles/index.css'
import Preview from './pages/Preview'
import ReleaseNotes from './pages/ReleaseNotes'
import All_teams from './pages/app/All_teams'
import Candidate from './pages/app/Candidate'
import Hiring_campaign from './pages/app/Hiring_campaign'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/preview" replace /> },
  { path: '/preview', element: <Preview /> },
  { path: '/preview/release-notes', element: <ReleaseNotes /> },
  { path: '/release-notes', element: <ReleaseNotes /> },
  // pages mirror Figma frame names
  { path: '/pages/all_teams', element: <All_teams /> },
  { path: '/pages/candidate', element: <Candidate /> },
  { path: '/pages/hiring_campaign', element: <Hiring_campaign /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
