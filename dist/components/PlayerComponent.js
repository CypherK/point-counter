class PlayerComponent extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'closed'});
        this.playerName = null
        this.playerScore = 0
    }

    /** sttribute names returned here will trigger a call to {@link #attributechangedCallback}  */
    static get observedAttributes(){
        return ['player',]
    }

    /** handles changes to observed attributes */
    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case 'player':
                if(oldValue === newValue) return
                this.playerName = newValue
                this.updateComponent()
                break
        }
    }

    /** called when element is added to the DOM */
    connectedCallback(){
        this.updateComponent()
    }

    updateComponent(){
        const template = `
            <link rel='stylesheet' href='./css/components/player.css'>
            <div class='player'>
                <div class='header'>
                    <span class='player-name'>${this.playerName}</span>
                    <span class='player-score'>${this.playerScore}</span>
                    <button class='btn-delete-player'>X</button>
                </div>
                <div class='score-adder'>TODO: allow adding score changes</div>
                <div class='score-changes'>TODO: display past changes</div>
            </div>
        `
        this.shadow.innerHTML = template

        const deleteButton = this.shadow.querySelector('.btn-delete-player')
        deleteButton.onclick = e => this.parentElement.removeChild(this)
    }
}

//registration requires the tag to contain a hyphen
window.customElements.define('point-counter-player', PlayerComponent)