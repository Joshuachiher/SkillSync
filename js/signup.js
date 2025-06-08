document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.querySelector(".auth-form")
  
    if (authForm) {
      authForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Ambil data form
        const formData = new FormData(authForm)
        const formValues = Object.fromEntries(formData.entries())
  
        // Validasi sederhana
        let isValid = true
        clearError()
  
        const firstName = formValues.firstName?.trim()
        const lastName = formValues.lastName?.trim()
        const email = formValues.email?.trim()
        const password = formValues.password
        const confirmPassword = formValues.confirm_password
        const termsChecked = authForm.querySelector("#terms").checked
  
        if (!firstName) {
          showError("First name is required")
          isValid = false
        }
  
        if (!lastName) {
          showError("Last name is required")
          isValid = false
        }
  
        if (!email || !validateEmail(email)) {
          showError("Please enter a valid email address")
          isValid = false
        }
  
        if (!password || password.length < 8) {
          showError("Password must be at least 8 characters long")
          isValid = false
        }
  
        if (password !== confirmPassword) {
          showError("Passwords do not match")
          isValid = false
        }
  
        if (!termsChecked) {
          showError("You must agree to the Terms of Service and Privacy Policy")
          isValid = false
        }
  
        if (isValid) {
          showLoading()
  
          // Simulate API call / processing
          setTimeout(() => {
            // Setelah sukses, arahkan ke halaman login atau dashboard
            window.location.href = "login.html"
          }, 1500)
        }
      })
    }
  
    // Helpers
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }
  
    function showError(message) {
      let errorElement = document.querySelector(".auth-error")
  
      if (!errorElement) {
        errorElement = document.createElement("div")
        errorElement.className = "auth-error"
        const submitButton = authForm.querySelector("button[type='submit']")
        authForm.insertBefore(errorElement, submitButton)
      }
  
      errorElement.textContent = message
    }
  
    function clearError() {
      const errorElement = document.querySelector(".auth-error")
      if (errorElement) errorElement.remove()
    }
  
    function showLoading() {
      const submitButton = authForm.querySelector("button[type='submit']")
      const originalText = submitButton.textContent
  
      submitButton.disabled = true
      submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating account...'
  
      submitButton.dataset.originalText = originalText
    }
  })
  