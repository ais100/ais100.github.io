document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-theme') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    } else {
        // Default to dark theme if no preference saved
        body.classList.add('dark-theme'); // Explicitly add dark-theme class
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme'); // Remove light-theme if present
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                const projectImage = document.createElement('img');
                projectImage.src = project.image;
                projectImage.alt = project.title;

                const projectContent = document.createElement('div');
                projectContent.classList.add('project-content');

                const projectTitle = document.createElement('h3');
                projectTitle.textContent = project.title;

                const projectDescription = document.createElement('p');
                projectDescription.textContent = project.description;

                projectContent.appendChild(projectTitle);
                projectContent.appendChild(projectDescription);

                if (project.link) {
                    const projectLink = document.createElement('a');
                    projectLink.href = project.link;
                    projectLink.textContent = 'View Project';
                    projectLink.classList.add('button');
                    projectLink.target = '_blank'; // Open in new tab
                    projectContent.appendChild(projectLink);
                }

                if (project.technologies && project.technologies.length > 0) {
                    const technologiesList = document.createElement('ul');
                    technologiesList.classList.add('technologies-list');
                    project.technologies.forEach(tech => {
                        const techItem = document.createElement('li');
                        techItem.textContent = tech;
                        technologiesList.appendChild(techItem);
                    });
                    projectContent.appendChild(technologiesList);
                }

                projectCard.appendChild(projectImage);
                projectCard.appendChild(projectContent);
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));

    
});