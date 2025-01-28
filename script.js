document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelector('#projects .grid');  // Select the grid container
  
    // Clear any existing cards (if any)
    projects.innerHTML = '';
  
    // Fetch the project data from your JSON file
    fetch("data.json")  // Assuming your data is in data.json
      .then(response => response.json())
      .then(data => {
        // Generate the HTML for each project and append it to the container
        const cardsHtml = data.projects.map((project, index) => {
          return `
            <div class="bg-white hover:bg-[url(/img/lines-bg.png)] border rounded-[0.5vw] p-4 hover:text-white">
              <img src="${project.img}" alt="${project.alt}" class="w-full h-48 object-cover">
              <div class="px-1 py-3">
                <div class="font-bold text-xl mb-2">${project.title}</div>
                <p class="text-base">${project.desc}</p>
              </div>
              <div class="flex justify-center px-1 py-4 gap-5">
                <a href="${project.url}" class="rounded-[0.5vw] bg-blue-600 py-3 px-2 text-white hover:animate-pulse" target="_blank">Live Site</a>
                <a href="${project.github}" class="rounded-[0.5vw] bg-blue-600 py-3 px-2 text-white hover:animate-pulse" target="_blank">GitHub</a>
              </div>
              <div class="px-1 py-2">
                <strong>Skills:</strong> ${project.skillset.join(', ')}
              </div>
            </div>
          `;
        }).join('');  // Join the array into a single string
  
        // Inject the generated HTML into the container
        projects.innerHTML = cardsHtml;
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  
// Function to toggle the mobile menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.style.display === 'none' || !mobileMenu.style.display) {
        mobileMenu.style.display = 'block'; // Show menu
    } else {
        mobileMenu.style.display = 'none'; // Hide menu
    }
}