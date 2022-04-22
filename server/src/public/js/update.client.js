window.addEventListener('DOMContentLoaded', async function() {
  const page = 1;
  const limit = 5;
  const API_URL = `http://localhost:8000/api/v0.2/phones?page=${page}&limit=${limit}`;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      const error = await res.json();
      throw error;
    } else {
      const phones = await res.json();
      renderIphones(phones);
    }
  } catch (errors) {
    console.error(errors);
  }
});

function renderIphones(phones) {
  phones.forEach((phone) => {
    console.log(phone);
    const phoneDom = `
      <li class="phone">
        <h2 class="phone__title">${phone.title}</p>
        <p class="phone__price">${phone.price}</p>
      </li>
    `;
    document.querySelector('.phones').innerHTML += phoneDom;
  });
}
