const updateForm = document.querySelector('.form-update');

updateForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const id = updateForm.id.value;
  const name = updateForm.id.name;
  const price = updateForm.id.price;

  const newPhone = { name, price };
  const API_URL = `/api/v0.3/phones/${id}`;
  try {
    const res = await fetch(API_URL, {
      method: 'PUT',
      body: JSON.stringify(newPhone),
    });

    if (!res.ok) {
      const errors = await res.json();
      throw errors;
    } else {
      location.assign(API_URL);
    }
  } catch (errors) {
    console.error(errors);
  }
});
