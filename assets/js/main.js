class Typewriter extends HTMLElement {

    type(wrapper, text, speed) {
        const textArray = text.split('');
        textArray.forEach((char, i) => this.timeout = setTimeout(() => (wrapper.textContent += char), speed * i));
    }

    render() {
        this.innerHTML = '';
        const wrapper = document.createElement(`${this.attributes.tag ? this.attributes.tag.value: 'h1'}`);
        this.appendChild(wrapper);
        return wrapper;
    }

    connectedCallback() {  
        this.text = this.getAttribute('text') || '';
        this.speed = +this.getAttribute('speed') || 70;
        const wrapper = this.render();

        this.type(wrapper, this.text, this.speed);
    }

    disconnectedCallback() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.text !== newValue) {
            this.text = newValue;
            const wrapper = this.render();
            this.type(wrapper, this.text, this.speed);
        }
    }
}
customElements.define('dg-typewriter', Typewriter);

