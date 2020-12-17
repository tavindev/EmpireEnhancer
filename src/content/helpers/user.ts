import select from 'select-dom'

export const isLoggedIn = () => select.exists('.status__logout')
