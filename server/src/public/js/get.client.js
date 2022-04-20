const form = document.querySelector('.form-get');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const limit = form.limit.value;
  const page = form.page.value;

  const endpoint = `http://localhost:8000/api/v0.2/phones?page=${page}&limit=${limit}`;

  location.assign(endpoint);
});
