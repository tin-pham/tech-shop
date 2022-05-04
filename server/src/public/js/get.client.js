const getForm = document.querySelector('.form-get');
const endpointForm = getForm.dataset.form;

getForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const limit = getForm.limit.value;
  const page = getForm.page.value;

  let endpoint;
  if (endpointForm === 'phones') {
    endpoint = `http://localhost:8000/api/v0.3/${endpointForm}?page=${page}&limit=${limit}`;
  } else if (endpointForm === 'reviews') {
    endpoint = `http://localhost:8000/api/v0.3/${endpointForm}?reviewsPage=${page}&reviewsLimit=${limit}`;
  }

  location.assign(endpoint);
});

getForm.addEventListener('input', (e) => {
  const endPointUrl = document.querySelector('.form .endpoint__url a');

  let paramsObj = {};

  if (endpointForm === 'phones') {
    Object.assign(paramsObj, {
      limit: getForm.limit.value,
      page: getForm.page.value,
      name: getForm.name.value,
      priceFrom: getForm.priceFrom.value,
      priceTo: getForm.priceTo.value,
      quantity: getForm.quantity.value,
    });
  } else if (endpointForm === 'reviews') {
    Object.assign(paramsObj, {
      reviewsLimit: getForm.reviewsLimit.value,
      reviewsPage: getForm.reviewsPage.value,
      productId: getForm.productId.value,
      minRating: getForm.minRating.value,
    });
  }

  Object.keys(paramsObj).forEach(
    (key) => paramsObj[key] === '' && delete paramsObj[key]
  );

  const searchParams = new URLSearchParams(paramsObj);

  const route = `/api/v0.3/${endpointForm}?${searchParams.toString()}`;
  endPointUrl.href = route;
  endPointUrl.textContent = route;
});
