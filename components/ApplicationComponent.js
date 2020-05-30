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
                <div class='player-list'><div class='placeholder-players'>Please add some players</div></div>
            </div>
        `
        this.shadow.innerHTML = template

        this.addPlayerBtn = this.shadow.querySelector('.btn-add-player')
        this.playersPlaceholder = this.shadow.querySelector('.placeholder-players')
        this.playerList = this.shadow.querySelector('.player-list')

        this.addPlayerBtn.onclick = e => this._addNewPlayer()
    }

    _addNewPlayer(){
        let msg = 'Player Name'
        let name = null
        while(!name){
            name = prompt(msg)
            msg = 'Please give the player a name.'
        }

        const player = document.createElement('div') //TODO: create a player, instead, and set property
        player.innerHTML = name

        this.playersPlaceholder.style.display = 'none'
        this.playerList.appendChild(player)
    }
}

//registration requires the tag to contain a hyphen
window.customElements.define('point-counter-application', ApplicationComponent)