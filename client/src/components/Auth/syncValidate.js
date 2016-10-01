export default function syncValidate (values) {
  const errors = {}
  const requiredFields = ['name', 'email', 'password']

  // Make all fields required
  requiredFields.forEach(field => {
    if (!values[field]) { errors[field] = 'Required field' }
  })

  if (values.name) {
    if (values.name.length < 5) {
      errors.name = 'Must be at least 5 characters long'
    }
  }

  // Validate email
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  // Validate password
  if (values.password) {
    const password = values.password

    for (let i = 0, length = password.length; i < length; i++) {
      if (password.length < 8) { errors.password = 'Must be at least 8 characters long' }
      if (!/\d/.test(password)) { errors.password = 'Must have at least 1 number' }
      if (!/[a-z]/.test(password)) { errors.password = 'Must have at least 1 lowercase letter' }
      if (!/[A-Z]/.test(password)) { errors.password = 'Must have at least 1 uppercase letter' }
      if (/[^0-9a-zA-Z]/.test(password)) { errors.password = 'Must have 1 uppercase 1 lowercase and 1 number' }
    }
  }

  return errors
}
