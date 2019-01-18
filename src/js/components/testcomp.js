import Class from '../mixin/class';
import {
    $,
    $$,
    addClass,
    ajax,
    append,
    assign,
    attr,
    css,
    getImage,
    html,
    index,
    once,
    pointerDown,
    pointerMove,
    removeClass,
    startsWith,
    Transition,
    trigger
} from 'ngkit-util';

export default {

    mixins: [Class],

    // functional: true,  // not sure what this is for

    props: {
        message: String,
    },

    data: {
        message: 'This is a test message',
        counter: 1,
        template: `<div class="test-div"></div>`,
        selBtn: '.ng-btn',

    },

    computed: {
        /**
         * there seems to be two ways to do computed properties:
         * 1) passing the value into the function as an object:
         *      completeMessage({counter})
         * 2) Not passing a value in:
         *      completeMessage()
         *
         * Not clear what the difference does.
         */





        btnSelector({selBtn}) {
            return `${selBtn}`;
        },
    },

    created() {
        console.log("Inside created...");
        /**
         * Believe this is just when the object is instantiated....Probally not part of the real lifecycle
         */
    },

    beforeConnect() {
        /**
         * beforeConnect seems to be called many, many times in the beginning of the lifecycle
         * For now, just do initialization in connected.
         */
    },

    connected() {
        console.log('Inside connected time: ',  new Date().getTime());

        /**
         * This code appends the template markup into the components main element
         * and then calls mount to insert the updated markup into the DOM and activate
         * components via data attribute declarations
         */
        // this.$mount(append(this.$el, this.template));

        /**
         * Since main element ($el) has no child attributes and doesn't have any components defined
         * in the template, instead of calling this.$mount(append(this.$el, this.template));
         * we could just do the equivalent of innerHTML:
         */

        html(this.$el, this.template);

        /**
         * Now lets query the updated element's DOM and add some more markup inside div.test-div
         * To query the main element ($el), we will use the $ function...which is like using the vanilla querySelector
         * If we wanted to match multiple elements, we would use the $$ function which is like using querySelectorAll
         */

        const elm = $(this.$el, '.test-div');
        console.log('Found element', elm);

        const innerTemplate = `
            <button class="ng-btn">Click Me</button>
            <div class="results-div"></div>
        `;

        this.$mount(append(elm, innerTemplate));

        trigger(this.$el, 'showmessageonload', null);


    },

    update: {

        /**
         * To determine when to refresh to component, we supply events.
         * In this case on load and resize events, first the read call is made and then
         * the write call is made.  These are hooks into the fastdom API
         * See:  src/js/util/fastdom.js
         */

        read() {
            console.log('Inside update=>read time: ',  new Date().getTime());
        },

        write() {
            console.log('Inside update=>write time: ',  new Date().getTime());

        },

        events: ['load', 'resize']

    },

    disconnected() {
        console.log('Inside disconnected time: ',  new Date().getTime());
    },

    events: [
        /**
         * This first event is custom and is triggered at the end of connected()
         */
        {
            showmessageonload() {
                alert("Conponent is loaded!");
            }
        },

        /**
         * This is a standard event attached an element in the component
         */

        {

            name: 'click',

            self: true,  // Not sure what this is for...maybe the event is isolated this component or binds this in the event?

            delegate() {
                return this.btnSelector;
            },

            handler(e) {
                e.preventDefault();
                this.click(e);  // See the menthods section at the end of this component.
            }

        }
    ],



    methods: {

        click(ev) {
            alert("Message: " + this.message + " " + this.counter);
            this.counter = this.counter + 1;

        }


    }

};
