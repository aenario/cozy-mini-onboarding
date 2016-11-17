function displayRegisterForm (registerToken) {
  document.getElementByID('no-token').style.display = 'none'
  document.getElementByID('register-form').style.display = 'block'
  document.getElementByID('registerToken').value = registerToken
}

function redirectHome () {
  window.location = window.location.href.replace('onboarding', 'home')
}

function alertNoToken () {
  document.getElementByID('no-token').style.display = 'block'
  document.getElementByID('register-form').style.display = 'none'
}

function getRegisterTokenFromURL () {
  var registerToken = null
  var params = window.location.search.substr(1).split('&')
  for (var i = 0, l = params.length; i < l; i++) {
    var namevalue = params[i].split('=')
    if (namevalue[0] === 'registerToken') {
      registerToken = decodeURIComponent(namevalue[1])
    }
  }
  return registerToken
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (document.body.dataset.cozyToken) {
    return redirectHome()
  }

  var registerToken = getRegisterTokenFromURL()
  if (registerToken != null) {
    displayRegisterForm(registerToken)
  } else {
    alertNoToken()
  }
})
