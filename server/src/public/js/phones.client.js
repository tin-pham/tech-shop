// Prevent Submit from enter
const form = document.querySelector('.form-phone');

function displayErrors(errors) {
  const errorContainers = document.querySelectorAll('.errors');

  errorContainers.forEach((container) => {
    container.textContent = errors[container.dataset.name];
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const category = form.category.value;
  const brand = form.brand.value;
  const price = form.price.value;
  const quantity = form.quantity.value;

  const API_URL = 'http://localhost:8000/api/v0.2/phones';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ name, category, brand, price, quantity }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    } else {
      const newPhone = await res.json();
      location.assign(API_URL + `/${newPhone._id}`);
    }
  } catch (err) {
    displayErrors(err);
  }
});
