const userForm = document.getElementById('user-form');
const radio = document.getElementById('radio');
const radioLabel = document.getElementById('radio-label');
const idField = document.getElementById('id');
const idContainer = idField.parentNode;
const submitBtn = document.getElementById('submit-btn');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');

userForm.addEventListener('submit', submitForm);
radio.addEventListener('change', handleRadio);

function getUserData() {
  return JSON.stringify({
    id: idField.value,
    name: nameField.value,
    email: emailField.value
  })
}
async function sendUserData(user) {
  try {
    const response = await fetch('/users', {
      method: radio.checked ? 'PUT' : 'POST',
      body: user,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw Error(response.message)
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
function clearForm() {
  nameField.value = '';
  emailField.value = '';
}
function submitForm(evt) {
  evt.preventDefault()
  const user = getUserData()
  sendUserData(user)
    .then(console.log)
    .catch(console.log)
    .finally(clearForm)
}
function handleRadio(evt) {
  if ( evt.target.checked ) {
    radioLabel.textContent = 'Update an existing user';
    idContainer.classList.remove('d-none');
    idContainer.classList.add('d-block');
  } else {
    radioLabel.textContent = 'Create new user';
    idContainer.classList.remove('d-block');
    idContainer.classList.add('d-none');
  }
}