class ApplicationComponent extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'closed'});

        this.gameName = "Points Counter"
    }

    /** called when element is added to the DOM */
    connectedCallback(){
        const template = `
            <link rel='stylesheet' href='./css/components/application.css'>
            <div class='application'>
                <div class='menubar'>
                    <span><b>${this.gameName}</b></span>
                    <button type="button" class="btn-add-player">+</button>
                </div>
                <div class='player-list'>
                    <div>Hello World</div>
                    <div>Hakuna Matata</div>
                </div>
            </div>
        `
        this.shadow.innerHTML = template
    }
}

//registration requires the tag to contain a hyphen
window.customElements.define('point-counter-application', ApplicationComponent)