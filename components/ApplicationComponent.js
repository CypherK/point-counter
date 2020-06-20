import {} from'./PlayerComponent.js'

class ApplicationComponent extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'closed'})
        this.gameName = "Points Counter"
        window.addEventListener('beforeunload', e => {debugger;this._savePlayers()})
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

        this._restorePlayers()
    }

    /** Asks the user for a name and then constructs a {Player} from it
     * @returns {Player} the created player
     */
    _addNewPlayer(){
        let msg = 'Player Name'
        let name = null
        while(!name){
            name = prompt(msg, '')
            msg = 'Please give the player a name.'
            if(name == null) return;
        }
        return this._appendPlayer(name)
    }

    /** Creates a new player and appends it to the player list
     *  @param {String} name The name of the player 
     *  @returns {Player} the appended player
    */
    _appendPlayer(name){
        const player = document.createElement('point-counter-player')
        player.setAttribute('player', name)

        this.playersPlaceholder.style.display = 'none'
        this.playerList.appendChild(player)
        return player
    }

    _savePlayers(){
        const playerData = Array
            .from(this.playerList.querySelectorAll('point-counter-player'))
            .map(player => { return {
                name : player.name,
                changes : player.changes
            }})
        console.log(playerData)
        localStorage.players = JSON.stringify(playerData)
        debugger 
    }

    _restorePlayers(){
        const encodedPlayers = localStorage.players
        if(!encodedPlayers) return
        const players = JSON.parse(encodedPlayers)
        console.log(players)
        players.forEach(p => {
            console.log(p)
            this._restorePlayer(p)
        })
    }

    _restorePlayer({name, changes}){
        const player = this._appendPlayer(name)
        changes.forEach(change => player.prependChange(change, false))
        player.recalculateScore()
    }
}

//registration requires the tag to contain a hyphen
window.customElements.define('point-counter-application', ApplicationComponent)