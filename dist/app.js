import {} from'./components/GreetingComponent.js'
import {} from'./components/ApplicationComponent.js'

window.init = function() {
    const app = document.createElement('point-counter-application')
    const container = document.getElementById('application-container')
    container.appendChild(app)
}