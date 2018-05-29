let myNotification = new Notification('Agrimonia', {
  body: 'Hello Everybody!'
})
myNotification.onclick = () => {
  console.log('Click!')
}