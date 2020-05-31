import {} from'./PlayerComponent.js'

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
                    <div class='buttons'></buttons>
                        <button class="btn-clear-changes">C</button>
                        <button class="btn-add-player">+</button>
                    </div>
                </div>
                <div class='player-list'><div class='placeholder-players'>Please add some players</div></div>
            </div>
        `
        this.shadow.innerHTML = template

        this.playersPlaceholder = this.shadow.querySelector('.placeholder-players')
        this.playerList = this.shadow.querySelector('.player-list')

        this.addPlayerBtn = this.shadow.querySelector('.btn-add-player')
        this.addPlayerBtn.onclick = e => this._addNewPlayer()
        this.addPlayerBtn.setAttribute('tab-index', -1)

        this.clearChangesBtn = this.shadow.querySelector('.btn-clear-changes')
        this.clearChangesBtn.onclick = e => this._clearChanges()
        this.clearChangesBtn.setAttribute('tab-index', -1)

        //TODO: remove these debugging statments
        this._appendPlayer('Hakuna')
        this._appendPlayer('Matata')
    }

    _addNewPlayer(){
        let msg = 'Player Name'
        let name = null
        while(!name){
            name = prompt(msg, '')
            msg = 'Please give the player a name.'
            if(name == null) return;
        }
        this._appendPlayer(name)
    }

    /** @param {String} name The name of the player */
    _appendPlayer(name){
        const player = document.createElement('point-counter-player')
        player.setAttribute('player', name)

        this.playersPlaceholder.style.display = 'none'
        this.playerList.appendChild(player)
    }

    recalculateScore(){
        this.playerScore = Array
            .from(this.changeList.children)
            .reduce((total, element) => total + element.value, 0)

        this.playerScoreHolder.innerHTML = this.playerScore
    }

    _clearChanges(){
        Array
            .from(this.playerList.children)
            .forEach(player => {
                if(player === this.playersPlaceholder) return
                player.clearChanges()
            })
    }
}

//registration requires the tag to contain a hyphen
window.customElements.define('point-counter-application', ApplicationComponent)