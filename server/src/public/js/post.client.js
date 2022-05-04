// Prevent Submit from enter
const form = document.querySelector('.form-post');
const endpointForm = form.dataset.form;

function displayErrors(errors) {
  const errorContainers = document.querySelectorAll('.errors');

  errorContainers.forEach((container) => {
    container.textContent = errors[container.dataset.name];
  });
}

function getVariations() {
  const variations = [];
  const variationElements = form['variations[]'];
  for (let i = 0; i < variationElements.length; i++) {
    variations.push(variationElements[i].value);
  }

  return variations;
}

function getBundles() {
  const bundles = [];
  const bundleNameElements = form['bundle-name[]'];
  const bundlePriceElements = form['bundle-price[]'];

  const bundleLength = bundleNameElements.length;
  for (let i = 0; i < bundleLength; i++) {
    bundles.push({
      name: bundleNameElements[i].value,
      price: bundlePriceElements[i].value,
    });
  }

  return bundles;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let name, category, brand, price, quantity, variations, bundles, description;

  let content, rating, productId, productModel;

  let data;

  if (endpointForm === 'phones') {
    name = form.name.value;
    category = form.category.value;
    brand = form.brand.value;
    price = form.price.value;
    quantity = form.quantity.value;
    variations = getVariations();
    bundles = getBundles();
    description = form.description.value;

    data = {
      name,
      category,
      brand,
      price,
      quantity,
      variations,
      bundles,
      description,
    };
  } else if (endpointForm === 'reviews') {
    content = form.content.value;
    rating = form.rating.value;
    productId = form.productId.value;

    data = {
      content,
      rating,
      product: {
        _id: productId,
        // FIXED
        model: 'Phone',
      },
    };
  }

  const API_URL = `http://localhost:8000/api/v0.3/${endpointForm}`;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    } else {
      const newData = await res.json();
      location.assign(API_URL + `/${newData._id}`);
    }
  } catch (err) {
    displayErrors(err);
  }
});
