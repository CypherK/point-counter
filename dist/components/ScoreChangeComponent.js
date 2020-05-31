class ScoreChangeComponent extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'closed'})
        this._value = 0
    }

    set value(v){
        this._value = v
        if(!!this.change) this.updateChangeStatusClasses()
    }

    get value(){
        return this._value
    }

    connectedCallback(){
        const template = `
            <link rel='stylesheet' href='./css/components/score-change.css'>
            <div class='score-change'>
                <div class='number'>
                    <span class='sign'>${this._value < 0 ? '-' : '+'}</span>
                    <span class='amount'>${this._value < 0 ? -this._value : this._value}</span>
                </div>
                <button class='btn-delete-change'>X</button>
            </div>
        `
        this.shadow.innerHTML = template
        this.change = this.shadow.querySelector('.score-change')
        this.updateChangeStatusClasses()

        const deleteButton = this.shadow.querySelector('.btn-delete-change')
        deleteButton.onclick = e => this.parentElement.removeChild(this)
    }

    updateChangeStatusClasses(){
        this.change.classList.remove('positive')
        this.change.classList.remove('negative')

        if(this._value < 0){
            this.change.classList.add('negative')
        }else{
            this.change.classList.add('positive')
        }
    }

}

//registration requires the tag to contain a hyphen
window.customElements.define('score-change', ScoreChangeComponent)