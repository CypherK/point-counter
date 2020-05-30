class GreetingComponent extends HTMLElement{
    constructor(){
        super()
        this._greeting = 'Hello World'
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    /** sttribute names returned here will trigger a call to {@link #attributechangedCallback}  */
    static get observedAttributes(){
        return [] //no observed attributes
    }

    /** handles changes to observed attributes */
    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            //no attributes observed
        }
    }

    /** called when element is added to the DOM */
    connectedCallback(){
        const template = `
            <link rel='stylesheet' href='./css/components/greeting.css'>
            <span class='greeting'>${this._greeting}</span>
        `
        this.shadow.innerHTML = template
        this.shadow.querySelector('.greeting')
    }

    /** called when elementis moved to a different DOM */
    adoptedCallback(){
        //noop
    }

    /** called when element is removed from DOM */
    disconnectedCallback(){
        //noop
    }
}

//registration requires the tag to contain a hyphen
window.customElements.define('x-greeting', GreetingComponent)