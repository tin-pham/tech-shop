const getForm = document.querySelector('.form-get');

getForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const limit = getForm.limit.value;
  const page = getForm.page.value;

  const endpoint = `http://localhost:8000/api/v0.2/phones?page=${page}&limit=${limit}`;

  location.assign(endpoint);
});

getForm.addEventListener('change', (e) => {
  const endPointUrl = document.querySelector('.form .endpoint__url a');

  const paramsObj = {
    limit: getForm.limit.value,
    page: getForm.page.value,
    name: getForm.name.value,
    priceFrom: getForm.priceFrom.value,
    priceTo: getForm.priceTo.value,
    quantity: getForm.quantity.value,
  };

  Object.keys(paramsObj).forEach(
    (key) => paramsObj[key] === '' && delete paramsObj[key]
  );

  console.log(paramsObj);

  const searchParams = new URLSearchParams(paramsObj);

  const route = `/api/v0.2/phones?${searchParams.toString()}`;
  endPointUrl.href = route;
  endPointUrl.textContent = route;
});
