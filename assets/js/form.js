export default function() {
  const form = document.querySelector('.contact-form')
  const formInputs = form.querySelectorAll('.contact-form__item-input')
  const formSubmit = form.querySelector('.contact-form__item-submit')
  const formAction = form.getAttribute('action')

  for ( let i = 0; i < formInputs.length; i++ ) {
    formInputs[i].addEventListener('focus', () => {
      formInputs[i].parentNode.classList.add('is-focus')
    })

    formInputs[i].addEventListener('blur', () => {
      if (!(formInputs[i].value)) {
        formInputs[i].parentNode.classList.remove('is-focus')
      }
    })

    formSubmit.addEventListener('click', (e) => {
      e.preventDefault()
      if (!(formInputs[i].value)) {
        formInputs[i].parentNode.classList.add('is-error')
      } else {
        FormSubmit()
      }
    })
  }

  function FormSubmit() {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        formSubmit.classList.add('is-disabled')
        if (xhr.status == 200) {
          // console.log('OK'); //通信成功時
        } else {
          // console.log('NO'); //通信失敗時
        }
      }
    }
    xhr.onload = () => {
      alert('complete'); //通信完了時
      formSubmit.classList.remove('is-disabled')
    }

    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const message = document.getElementById('message')
    let postData = encodeURIComponent('name') + '=' + encodeURIComponent(name.value) + '&' + encodeURIComponent('email') + '=' + encodeURIComponent(email.value) + '&' + encodeURIComponent('message') + '=' + encodeURIComponent(message.value)
    postData = postData.replace(/%20/g, '+')

    xhr.open('POST', formAction, true)
    xhr.send(postData)
  }
}