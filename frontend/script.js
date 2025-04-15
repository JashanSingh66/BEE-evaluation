function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Here you can add your registration logic (e.g., API call)

  // Show the popup
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}