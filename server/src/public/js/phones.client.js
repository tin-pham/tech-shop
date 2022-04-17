// Prevent Submit from enter
const form = document.querySelector('.form-phone');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const category = form.category.value;
  const brand = form.brand.value;
  const price = form.price.value;
  const quantity = form.quantity.value;

  const API_URL = 'http://localhost:8000/api/v0.2/phones';

  try {
    await fetch(API_URL, {
      methods: 'POST',
      body: JSON.stringify({ name, category, brand, price, quantity }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
  }
});
