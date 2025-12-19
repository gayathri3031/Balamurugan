// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log('Fetching products.csv...');
// Dynamic product list loading
fetch('products.csv') // Adjust path if needed
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
        const productList = document.getElementById('product-list');
        rows.forEach((row, index) => {
            const [productName, description] = row.split(',');
            if (productName && description) {
                console.log(`Processing row ${index}:`, { productName, description });
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `<h3>${productName}</h3><p>${description}</p>`;
                productList.appendChild(productDiv);
            } else {
                console.warn(`Row ${index} is empty or invalid:`, row);
            }
        });
        console.log('Product list updated successfully.');
    })
    .catch(error => console.error('Error loading products:', error));