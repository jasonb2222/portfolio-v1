"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelector('#projects .grid'); // Select the grid container

    // Clear any existing cards (if any)
    projects.innerHTML = '';

    // Fetch the project data from your JSON file
    fetch("./data.json") // Assuming your data is in data.json or what ever name refrenced 
        .then(response => response.json())
        .then(data => {
            // Generate the HTML for each project and append it to the container
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
                            <a onclick="closePopoutOnOutsideClick(event) target="_blank" class="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">more</a>
                            </div>
                        </div>
                    </div>
                `;
            }).join(''); // Join the array into a single string

            // Inject the generated HTML into the container
            projects.innerHTML = cardsHtml;

            // Store project data globally for popout usage
            window.projectData = data.projects;
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Open popout with project details
function openPopout(index) {
    const popout = document.getElementById('popout');
    const popoutContent = document.getElementById('popout-content');

    // Get the selected project data
    const project = window.projectData[index];

    // Inject the project details into the popout
    popoutContent.innerHTML = `
        <img src="${project.img}" alt="${project.alt}" class="w-full h-64 object-cover rounded-lg mb-4">
        <h2 class="text-2xl font-bold mb-4">${project.title}</h2>
        <p class="text-lg mb-4">${project.desc}</p>
        <div class="flex gap-5 items-center">
            <a href="${project.url}" target="_blank" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Live Site</a>
            <a href="${project.github}" target="_blank" class="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900">GitHub</a>
        </div>
        <div class="mt-4">
            <strong>Skills:</strong> ${project.skillset.join(', ')}
        </div>
    `;

    // Show the popout
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
        mobileMenu.style.display = 'block'; // Show menu
    } else {
        mobileMenu.style.display = 'none'; // Hide menu
    }
}