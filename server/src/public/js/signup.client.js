const signUpForm = document.querySelector('.form-signup');

function displayErrors(errors) {
  const errorContainer = document.querySelectorAll('.errors');

  errorContainer.forEach((container) => {
    container.textContent = errors[container.dataset.name];
  });
}

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = signUpForm.username.value;
  const password = signUpForm.password.value;

  try {
    const res = await fetch('/api/v0.3/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
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
