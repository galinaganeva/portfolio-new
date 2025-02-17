import './style.css';
import projectsData from './data/projects.json';

interface Project {
  id: number;
  number: string;
  name: string;
  tools: string[];
  previewImg: string;
  previewDesc: string;
}

document.addEventListener('DOMContentLoaded',() => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <header>
      <div class="logo-container">
        <a href="/portfolio-new/index.html" class="logo">GALINA GANEVA</a>
      </div>
      <nav>
        <ul>
            <li><a href="/portfolio-new/GalinaGaneva_CV.pdf" target="_blank">Resume</a></li>
            <li>
              <a href="/portfolio-new/GalinaGaneva_CV.pdf" target="_blank"
                ><img src="/portfolio-new/arrow.svg" width="32" height="32"
              /></a>
            </li>
        </ul>
      </nav>
    </header>
    <main id="main">
    </main>
    <footer>
      <p>2025</p>
      <p>Galina Ganeva</p>
    </footer>
  `;
});

// Hero section
const heroSection = `
  <section style="position: relative; width: 100%;">
    <div class="hero-container">
      <h1 class="hero-title left" style="animation-delay: 0s;">Less Noise,</h1>
      <h1 class="hero-title middle" style="animation-delay: 0.2s;">More Clarity,</h1>
      <h1 class="hero-title right" style="animation-delay: 0.4s;">Bold Impact.</h1>
    </div>
    <div class="spline-container" style="width: 100%; overflow:hidden">
      <div class="spline-container">
        <spline-viewer
          url="https://prod.spline.design/K-5M7t3eeTR7hjzy/scene.splinecode"
        ></spline-viewer>
      </div>
    </div>
  </section>
`;

// About section
const aboutSection = `
  <section class="about-section">
    <h1 class="about-text">
      I am a passionate designer in the iGaming industry, crafting
      visually engaging experiences that captivate players and enhance
      brand identity.
    </h1>
  </section>
`;

// Generate projects HTML
const generateProjectsHTML = () => {
  return `
    <section class="projects">
      ${projectsData.projects.map((project: Project) => `
        <a class="project-container" href="/portfolio-new/project/project.html?id=${project.id}" class="project-link">
          <div class="project" data-project-id="${project.id}">
            <h3 class="project-number">${project.number}</h3>
            <div class="project-info">
              <h2 class="project-name">${project.name}</h2>
              <div class="project-tools">
                ${project.tools.map(tool => `
                  <h4 class="project-item">${tool}</h4>
                `).join('')}
              </div>
            </div>
            <div class="project-preview">
              <img class="preview-img" src="${project.previewImg}" alt="${project.name}"/>
              <p class="preview-text">${project.previewDesc}</p>
            </div>
          </div>
        </a>
      `).join('')}
    </section>
  `;
};

// Add sections to main
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector<HTMLElement>('#main');
  if (main) {
    main.innerHTML += heroSection;
    main.innerHTML += aboutSection;
    main.innerHTML += generateProjectsHTML();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once animation is triggered
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // Observe about text element
  const aboutText = document.querySelector('.about-text');
  if (aboutText) {
    observer.observe(aboutText);
  }

  // Handle spline viewer logo removal
  const splineViewer = document.querySelector('spline-viewer');
  if (splineViewer) {
    const logoElement = splineViewer.shadowRoot?.querySelector('#logo');
    if (logoElement) {
      logoElement.remove();
    }
  }

  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('line-visible');
      }
    });
  }, {
    threshold: 0.2
  });

  const projectElements = document.querySelectorAll('.project');
  projectElements.forEach((projectElement) => {
    lineObserver.observe(projectElement);
  });

  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('line-visible');
      }
    });
  }, {
    threshold: 0.9
  });
  const projectsContainer = document.querySelector('.projects');
  if (projectsContainer) {
    projectObserver.observe(projectsContainer);
  }
});

