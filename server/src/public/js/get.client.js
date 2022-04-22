const form = document.querySelector('.form-get');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const limit = form.limit.value;
  const page = form.page.value;

  const endpoint = `http://localhost:8000/api/v0.2/phones?page=${page}&limit=${limit}`;

  location.assign(endpoint);
});

form.addEventListener('change', (e) => {
  const endPointUrl = document.querySelector('.form .endpoint__url a');

  const paramsObj = {
    limit: form.limit.value,
    page: form.page.value,
  };

  const searchParams = new URLSearchParams(paramsObj);

  const route = `/api/v0.2/phones?${searchParams.toString()}`;
  endPointUrl.href = route;
  endPointUrl.textContent = route;
});
