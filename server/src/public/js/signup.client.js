const form = document.querySelector('.form-signup');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = form.username.value;
  const password = form.password.value;
  console.log(username, password);

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
  }
});
