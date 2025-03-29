import React from 'react'
import ProjectsHeader from './Components/ProjectsHeader/projectsHeader'
import ProjectsContent from './Components/ProjectsContent/projectsContent'
import ProjectsFooter from './Components/ProjectsFooter/projectsFooter'
import './Components/projects.css'
export default function Projects() {
    return (
        <>
            <ProjectsHeader />
            <ProjectsContent />
            <ProjectsFooter/>
        </>
    )
}