const form = document.querySelector('.form-login');

function displayErrors(errors) {
  const errorContainers = document.querySelectorAll('.errors');

  errorContainers.forEach((container) => {
    container.textContent = errors[container.dataset.name];
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = form.username.value;
  const password = form.password.value;
  console.log(username, password);

  try {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res);
    if (!res.ok) {
      const json = await res.json();
      throw json;
    } else {
      location.assign('/');
    }
  } catch (err) {
    displayErrors(err);
  }
});