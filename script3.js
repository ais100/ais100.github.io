document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === "dark-theme") {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  } else {
    // Default to dark theme if no preference saved
    body.classList.add("dark-theme"); // Explicitly add dark-theme class
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light-theme");
    } else {
      body.classList.remove("light-theme"); // Remove light-theme if present
      body.classList.add("dark-theme");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark-theme");
    }
  });

  fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
      const projectsContainer = document.getElementById("projects-container");
      projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        // Front
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const projectImage = document.createElement("img");
        projectImage.src = project.image;
        projectImage.alt = project.title;

        const projectContent = document.createElement("div");
        projectContent.classList.add("project-content");

        const projectTitle = document.createElement("h3");
        projectTitle.textContent = project.title;

        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;

        projectContent.appendChild(projectTitle);
        projectContent.appendChild(projectDescription);

        if (project.link) {
          const projectLink = document.createElement("a");
          projectLink.href = project.link;
          projectLink.textContent = "View Project";
          projectLink.classList.add("button");
          projectLink.target = "_blank";
          projectContent.appendChild(projectLink);
        }

        if (project.technologies && project.technologies.length > 0) {
          const technologiesList = document.createElement("ul");
          technologiesList.classList.add("technologies-list");
          project.technologies.forEach((tech) => {
            const techItem = document.createElement("li");
            techItem.textContent = tech;
            technologiesList.appendChild(techItem);
          });
          projectContent.appendChild(technologiesList);
        }

        cardFront.appendChild(projectImage);
        cardFront.appendChild(projectContent);

        // Back
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        const backContent = document.createElement("div");
        backContent.classList.add("project-content");

        const backTitle = document.createElement("h3");
        backTitle.textContent = project.title;

        backContent.appendChild(backTitle);

        if (project.challenges) {
          const challenges = document.createElement("p");
          challenges.innerHTML = `<strong>Challenges</strong><br> ${project.challenges}`;
          backContent.appendChild(challenges);
        }

        if (project.lessons_learned) {
          const lessons = document.createElement("p");
          lessons.innerHTML = `<strong>Lessons Learned</strong><br> ${project.lessons_learned}`;
          backContent.appendChild(lessons);
        }

        cardBack.appendChild(backContent);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        projectCard.appendChild(cardInner);

        // Click to flip
        // projectCard.addEventListener('click', () => {
        //     projectCard.classList.toggle('flipped');
        // });

        // Flip button
        const flipBtn = document.createElement("button");
        flipBtn.classList.add("flip-btn");
        flipBtn.innerHTML = '<i class="fas fa-sync-alt"></i>'; // FontAwesome rotate icon
        projectCard.appendChild(flipBtn);

        flipBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // prevent bubbling
          projectCard.classList.toggle("flipped");
        });

        const backFlipBtn = document.createElement("button");
        backFlipBtn.classList.add("flip-btn");
        backFlipBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
        cardBack.appendChild(backFlipBtn);

        backFlipBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          projectCard.classList.remove("flipped");
        });

        projectsContainer.appendChild(projectCard);
      });
    })
    .catch((error) => console.error("Error loading projects:", error));
});
