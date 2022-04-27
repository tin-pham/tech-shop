// Prevent Submit from enter
const phoneForm = document.querySelector('.form-phone');

function displayErrors(errors) {
  const errorContainers = document.querySelectorAll('.errors');

  errorContainers.forEach((container) => {
    container.textContent = errors[container.dataset.name];
  });
}

function getVariations() {
  const variations = [];
  const variationElements = phoneForm['variations[]'];
  for (let i = 0; i < variationElements.length; i++) {
    variations.push(variationElements[i].value);
  }

  return variations;
}

function getBundles() {
  const bundles = [];
  const bundleNameElements = phoneForm['bundle-name[]'];
  const bundlePriceElements = phoneForm['bundle-price[]'];

  const bundleLength = bundleNameElements.length;
  for (let i = 0; i < bundleLength; i++) {
    bundles.push({
      name: bundleNameElements[i].value,
      price: bundlePriceElements[i].value,
    });
  }

  return bundles;
}

phoneForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = phoneForm.name.value;
  const category = phoneForm.category.value;
  const brand = phoneForm.brand.value;
  const price = phoneForm.price.value;
  const quantity = phoneForm.quantity.value;
  const variations = getVariations();
  const bundles = getBundles();
  const description = phoneForm.description.value;

  const phone = {
    name,
    category,
    brand,
    price,
    quantity,
    variations,
    bundles,
    description,
  };

  const API_URL = 'http://localhost:8000/api/v0.2/phones';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(phone),
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
