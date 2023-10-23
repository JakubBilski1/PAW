const form = document.querySelector('#contactForm')
    form.addEventListener('submit', e=> {
      e.preventDefault()
      alert('Nie można wysłać wiadomości')
})