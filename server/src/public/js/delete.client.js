const deleteForm = document.querySelector('.form-delete');

deleteForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const id = deleteForm.id.value;

  const API_URL = `/api/v0.2/phones`;
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errors = await res.json();
      throw errors;
    } else {
      const deletedPhone = await res.json();
      location.assign(API_URL + `/${deletedPhone._id}`);
    }
  } catch (errors) {
    console.error(errors);
  }
});
