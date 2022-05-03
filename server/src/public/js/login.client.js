const loginForm = document.querySelector('.form-login');

function displayErrors(errors) {
  const errorContainers = document.querySelectorAll('.errors');

  errorContainers.forEach((container) => {
    container.textContent = errors[container.dataset.name];
  });
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = loginForm.username.value;
  const password = loginForm.password.value;

  try {
    const res = await fetch('/api/v0.3/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    });
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
