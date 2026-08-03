let lazyImageObserver;

document.addEventListener('DOMContentLoaded', () => {
  if ("IntersectionObserver" in window) {
    lazyImageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
  }

  fetch('members.json')
    .then(response => response.json())
    .then(data => {
      const sectionMapping = {
        "Executive Committee": "executive-committee",
        "Executive Teams": "executive-teams",
        "EDC & IIC": "edc-iic",
        "Impact Cafe™": "impact-cafe"
      };

      for (const [sectionName, sectionId] of Object.entries(sectionMapping)) {
        if (data[sectionName]) {
          const container = document.getElementById(sectionId);
          if (container) {
            container.innerHTML = ''; // Clear any existing content
            
            // Iterate through roles in the section
            for (const [role, members] of Object.entries(data[sectionName])) {
              members.forEach(member => {
                const card = createMemberCard(member, role);
                container.appendChild(card);
              });
            }
          }
        }
      }
    })
    .catch(error => console.error('Error loading members:', error));
});

function createMemberCard(member, role) {
  const container = document.createElement('div');
  container.className = 'container';

  // Image Section
  const imageSection = document.createElement('div');
  imageSection.className = 'image-section';
  
  const img = document.createElement('img');
  
  // Setup lightweight placeholder and actual source
  img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";
  img.dataset.src = member.image;
  
  // Native lazy loading attributes
  img.setAttribute("loading", "lazy");
  img.setAttribute("decoding", "async");

  // Generate CSS-friendly class name from first name (lowercase, no spaces)
  const firstName = member.name.split(' ')[0].toLowerCase();
  img.className = `profile profile-${firstName} img-loading`;
  img.alt = member.name;
  
  // Handle successful load for fade-in effect
  img.onload = function () {
    if (this.src !== "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E") {
      this.classList.remove("img-loading");
    }
  };

  // Handle image load error - gracefully fallback
  img.onerror = function() {
    this.onerror = null; // Prevent infinite loop
    this.src = '../logos/alchemy.png'; // Fallback if image not found
    this.classList.remove("img-loading");
  };

  // Observe for lazy loading or fallback to immediate load
  if (typeof lazyImageObserver !== "undefined") {
    lazyImageObserver.observe(img);
  } else {
    img.src = img.dataset.src;
    img.removeAttribute("data-src");
  }

  imageSection.appendChild(img);
  container.appendChild(imageSection);

  // Text Content
  const textContent = document.createElement('div');
  textContent.className = 'text-content';

  const nameSpan = document.createElement('span');
  nameSpan.textContent = member.name;
  
  const roleSpan = document.createElement('span');
  roleSpan.textContent = role;

  textContent.appendChild(nameSpan);
  textContent.appendChild(roleSpan);
  container.appendChild(textContent);

  // Social Media
  const socialMedia = document.createElement('div');
  socialMedia.className = 'social-media';

  const socialIcons = {
    linkedin: 'fa-brands fa-linkedin',
    instagram: 'fa-brands fa-instagram',
    github: 'fa-brands fa-github',
    // Add more if needed based on JSON keys
    twitter: 'fa-brands fa-twitter',
    facebook: 'fa-brands fa-facebook'
  };

  if (member.links) {
    for (const [platform, url] of Object.entries(member.links)) {
      if (url && url.trim() !== "") {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        
        const icon = document.createElement('i');
        icon.className = socialIcons[platform.toLowerCase()] || 'fa-solid fa-link';
        
        link.appendChild(icon);
        socialMedia.appendChild(link);
      }
    }
  }

  container.appendChild(socialMedia);

  return container;
}
