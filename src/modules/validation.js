class FormView {
    constructor () {
        this.form = document.querySelector('form');
        this.form.onsubmit = this.onSubmit;
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(e);        
    }
}

new FormView();