console.log('Fetching products.csv...');
document.addEventListener("DOMContentLoaded", () => {

  fetch('../products.csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n').slice(1);
      const productList = document.getElementById('product-list');

      rows.forEach(row => {
        const [productName, description, imageName] = row.split(',');

        if (!productName || !description) return;

        const imagePath = imageName && imageName.trim()
          ? `images/${imageName.trim()}`
          : 'images/placeholder.jpg';

        const productDiv = document.createElement('div');
        productDiv.className = "product-card";
        productDiv.innerHTML = `
          <img src="${imagePath}" alt="${productName}">
          <h3>${productName}</h3>
          <p>${description}</p>
        `;
        productList.appendChild(productDiv);
      });

      // ✅ INIT SLIDER AFTER PRODUCTS LOAD
      initSlider();
    });

  function initSlider() {
    const slider = document.getElementById("product-list");
    const prevBtn = document.querySelector(".nav-prev");
    const nextBtn = document.querySelector(".nav-next");

    if (!slider || !prevBtn || !nextBtn) return;

    const card = slider.querySelector(".product-card");
    if (!card) return;

    const cardWidth = card.offsetWidth + 24;
    let index = 0;

    const maxIndex = Math.max(
      0,
      slider.children.length -
      Math.floor(slider.parentElement.offsetWidth / cardWidth)
    );

    nextBtn.onclick = () => {
      if (index < maxIndex) {
        index++;
        slider.style.transform = `translateX(-${index * cardWidth}px)`;
      }
    };

    prevBtn.onclick = () => {
      if (index > 0) {
        index--;
        slider.style.transform = `translateX(-${index * cardWidth}px)`;
      }
    };

    setInterval(() => {
      index = index >= maxIndex ? 0 : index + 1;
      slider.style.transform = `translateX(-${index * cardWidth}px)`;
    }, 4000);
  }

});



const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    } else {
      entry.target.classList.remove("reveal");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".cap-card, .timeline li")
  .forEach(el => observer.observe(el));

function submitForm(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) return;

    document.getElementById("successMsg").innerText =
        "Thank you! We will contact you shortly.";

    // Optional: open email client
    window.location.href =
        `mailto:balaa646@gmail.com?subject=Inquiry from ${name}&body=${message}`;

    e.target.reset();
}
console.log('Fetching stats.csv...');
fetch('../stats.csv')
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('CSV data received:', data);
        const rows = data.split('\n').slice(1); // Skip header row
        console.log('Parsed rows:', rows);
        const statsSection = document.getElementById('stats');
        rows.forEach((row, index) => {
            const [category, value] = row.split(',');
            if (category && value) {
                console.log(`Processing row ${index}:`, { category, value });
                const statDiv = document.createElement('div');
                statDiv.className = 'stat';
                statDiv.innerHTML = `
                    <div class="circle">${value.trim()}</div>
                    <p>${category.trim()}</p>
                `;
                statsSection.appendChild(statDiv);
            } else {
                console.warn(`Row ${index} is empty or invalid:`, row);
            }
        });
        console.log('Stats updated successfully.');
    })
    .catch(error => console.error('Error loading stats:', error));

document.getElementById('get-in-touch-btn').addEventListener('click', function() {
    const contactSection = document.getElementById('contact');
    contactSection.classList.remove('hidden');
    contactSection.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const serviceID = 'service_57crhoc';
    const templateID = 'template_py65rzr';

    const form = e.target;
    const formData = new FormData(form);

    emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
            document.getElementById('successMsg').textContent = 'Message sent successfully!';
            form.reset();
        })
        .catch(error => {
            console.error('Failed to send message:', error);
            document.getElementById('successMsg').textContent = 'Failed to send message. Please try again later.';
        });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('show');
});



