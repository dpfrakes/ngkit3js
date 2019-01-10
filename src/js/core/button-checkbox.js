import Class from '../mixin/class';


export default {

    mixins: [Class],

    args: 'animation',

    props: {

    },

    data: {
        selButton: '.ng-button'
    },

    connected() {
        const buttonGrp = this.$el.querySelectorAll('.ng-button');
        for (let i = 0; i < buttonGrp.length; i++) {
            if (buttonGrp[i].classList.contains('ng-active')) {
                buttonGrp[i].setAttribute('aria-checked', 'true');
            } else {
                buttonGrp[i].setAttribute('aria-checked', 'false');
            }
        }
    },

    events: [

        {

            name: 'click',

            delegate() {
                return this.selButton;
            },

            handler(e) {
                e.preventDefault();
                this.click(e);
            }

        }

    ],

    methods: {

        click(ev) {
            const btn = ev.target;
            if (btn.classList.contains('ng-active')) {
                btn.classList.remove('ng-active');
                btn.setAttribute('aria-checked', 'false');
                btn.blur();
            } else {
                btn.classList.add('ng-active');
                btn.setAttribute('aria-checked', 'true');
            }

        }

    }

};
