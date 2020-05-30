import {} from'./components/GreetingComponent.js'

window.init = function() {
    const greeting = document.createElement('x-greeting')
    document.body.appendChild(greeting)
}