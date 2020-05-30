import {} from'./SlidingCheckboxComponent.js'

class PlayerComponent extends HTMLElement{
    /** @param {String} name the player's name*/
    constructor(name){
        super()
        this.shadow = this.attachShadow({mode: 'closed'});
        this.playerName = name
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
                break
        }
    }

    /** called when element is added to the DOM */
    connectedCallback(){
        const template = `
            <link rel='stylesheet' href='./css/components/player.css'>
            <div class='player'>
                <div class='header'>
                    <span class='player-name'>${this.playerName}</span>
                    <span class='player-score'>${this.playerScore}</span>
                    <button class='btn-delete-player'>X</button>
                </div>
                <div class='score-adder'>
                    <sliding-checkbox class='change-is-positive'></sliding-checkbox>
                    <input class='change-amount' type='number' min='0' siza='1'>
                    <button class='btn-add-change'>OK</button>
                </div>
                <div class='score-changes'></div>
            </div>
        `
        this.shadow.innerHTML = template

        const deleteButton = this.shadow.querySelector('.btn-delete-player')
        deleteButton.onclick = e => this.parentElement.removeChild(this)

        this.positiveChange = this.shadow.querySelector('.change-is-positive')
        this.positiveChange.checked = true

        this.changeAmount = this.shadow.querySelector('.change-amount')
        this.changeList = this.shadow.querySelector('.score-changes')

        const changeOkButton = this.shadow.querySelector('.btn-add-change')
        changeOkButton.setAttribute('tab-index', -1)
        changeOkButton.onclick = e => this.addChange()
    }

    addChange(){
        const amount = this.changeAmount.value
        if(!amount) return
        this.changeAmount.value = null
        
        //TODO: replace with actual component
        const changeText = document.createTextNode((this.positiveChange.checked ? '+' : '-') + amount)
        const change = document.createElement('div')
        change.appendChild(changeText)

        this.changeList.prepend(change)
    }
}

//registration requires the tag to contain a hyphen
window.customElements.define('point-counter-player', PlayerComponent)