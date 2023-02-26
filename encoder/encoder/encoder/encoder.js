const token = localStorage.getItem("token");
if (!token) {
  let navigateTo = window.location.href.split('/');
  navigateTo[navigateTo.length - 2] = 'index.html'
  navigateTo.splice(navigateTo.length - 1, 1)
  window.location.href = navigateTo.join('/')
} else {
  const form = document.querySelector('#encoderForm');
  const inputString = document.querySelector('#inputString');
  const encodedString = document.querySelector('#encodedString');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = inputString.value;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': token },
      body: JSON.stringify({ stringToEncode: inputValue })
    };

    fetch('http://localhost:3000/encode', options)
      .then(response => {
        if (!response.ok) alert(`${response.statusText} (${response.status})`)
        return response.json()
      })
      .then(response => {
        encodedString.textContent = response.encodedString;
      })
      .catch(err => {
        console.error(`Error While Encoding ===> ${err}`)
      });
  });
}