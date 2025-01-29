"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelector('#projects .grid');
    const toggleButton = document.getElementById('showhideWF');  // Toggle button
    const mainElement = document.querySelector('main');          // Main content
    const svgContainer = document.getElementById('svgContainer');  // SVG container
    const projectsSection = document.getElementById('projects');  // Projects section
    const contactSection = document.getElementById('contact');    // Contact section

    // Clear any existing cards (if any)
    projects.innerHTML = '';

    // Fetch the project data from your JSON file
    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            const cardsHtml = data.projects.map((project, index) => {
                return `
                    <div 
                        class="project-card bg-white hover:bg-[url(./img/lines-bg.png)] border rounded-[0.5vw] p-4 hover:text-white transform transition-transform duration-300 cursor-pointer"
                        onclick="openPopout(${index})">
                        <img src="${project.img}" alt="${project.alt}" class="w-full h-48 object-cover">
                        <div class="px-1 py-3">
                            <div class="font-bold text-xl mb-2">${project.title}</div>
                            <div class="flex items-center justify-between">
                            <p class="text-base overflow-hidden text-ellipsis" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
                            ${project.desc}</p>
                            <a onclick="closePopoutOnOutsideClick(event)" target="_blank" class="bg-pink-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700">more</a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            projects.innerHTML = cardsHtml;
            window.projectData = data.projects;

            // Setup the toggle button event
            toggleButton.addEventListener('click', () => {
                const isHidden = mainElement.classList.contains('hidden');

                if (!isHidden) {
                    console.log('Hiding all main content');
                    mainElement.classList.add('hidden');
                    projectsSection.classList.add('hidden');
                    contactSection.classList.add('hidden');

                    // Load the SVG if not already loaded
                    if (!svgContainer.querySelector("object")) {
                        const object = document.createElement("object");
                        object.type = "image/svg+xml";
                        object.data = './img/wf.svg';
                        object.classList.add("pt-28", "bg-[#111111]", "w-full", "h-full");
                        svgContainer.appendChild(object);
                    }

                    svgContainer.style.display = "block";  // Show SVG
                } else {
                    console.log('Restoring all main content');
                    mainElement.classList.remove('hidden');
                    projectsSection.classList.remove('hidden');
                    contactSection.classList.remove('hidden');
                    svgContainer.style.display = "none";  // Hide SVG
                }
            });
        })
        .catch(error => console.log('Error fetching data:', error));
});

// Open popout with project details
function openPopout(index) {
    const popout = document.getElementById('popout');
    const popoutContent = document.getElementById('popout-content');

    // Get the selected project data
    const project = window.projectData[index];

    // Inject project details into the popout
    popoutContent.innerHTML = `
        <img src="${project.img}" alt="${project.alt}" class="w-full h-64 object-cover rounded-lg mb-4">
        <h2 class="text-2xl mb-4 font-extrabold">${project.title}</h2>
        <p class="text-lg mb-4">${project.desc}</p>
        <div class="flex gap-5 items-center font-bold">
            <a href="${project.url}" target="_blank" class="flex bg-blue-600 text-white py-2 px-4 gap-3 pt-2 text-center rounded-md hover:bg-blue-700"><image src="./img/www.png">Live Site</a>
            <a href="${project.github}" target="_blank" class="flex bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900"><image src="./img/githubicon.png"></a>
        </div>
        <div class="mt-4 font-extrabold">
            <strong>Skills:</strong> ${project.skillset.join(', ')}
        </div>
    `;

    popout.classList.remove('hidden');
}

// Close popout function
function closePopout() {
    const popout = document.getElementById('popout');
    popout.classList.add('hidden');
}

// Close popout when clicking outside the content
function closePopoutOnOutsideClick(event) {
    const popout = document.getElementById('popout');
    if (event.target === popout) {
        closePopout();
    }
}

// Function to toggle the mobile menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.style.display === 'none' || !mobileMenu.style.display) {
        mobileMenu.style.display = 'block';  // Show menu
    } else {
        mobileMenu.style.display = 'none';  // Hide menu
    }
}
