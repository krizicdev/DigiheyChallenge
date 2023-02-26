const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value.toLowerCase();
  const password = form.password.value;

  if (!validatePassword(password)) {
    alert("Password must be at least 6 characters long and include at least 1 number.");
    return;
  }

  // submit the form if validation passes
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({email, password})
  };

  fetch('http://localhost:3000/login', options)
    .then(response => { 
      if (!response.ok) alert(`${response.statusText} (${response.status})`)
      return response.json()
    })
    .then(response => { 
      if(response.token){
        localStorage.setItem('token', response.token);
        alert('Login Successfully')
        let navigateTo = window.location.href.split('/');
        navigateTo[navigateTo.length - 1] = 'encoder/encoder.html'
        window.location.href = navigateTo.join('/')
      } else {
        alert(response)
      }
    })
    .catch(err => { 
      console.log(`Error While Login ===>`, err)
    });
});

function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 6 && /\d/.test(password);
}
