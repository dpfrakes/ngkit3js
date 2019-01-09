import Togglable from '../mixin/togglable';
import {$$, addClass, attr, data, filter, getIndex, hasClass, index, isTouch, matches, queryAll, removeClass} from 'ngkit-util';

export default {

    mixins: [Togglable],

    args: 'connect',

    props: {
        connect: String,
        toggle: String,
        active: Number,
        swiping: Boolean
    },

    data: {
        connect: '~.ng-switcher',
        toggle: '> *',
        active: 0,
        swiping: true,
        cls: 'ng-active',
        clsContainer: 'ng-switcher',
        attrItem: 'ng-switcher-item',
        queued: true
    },

    computed: {

        connects({connect}, $el) {
            return queryAll(connect, $el);
        },

        toggles({toggle}, $el) {
            return $$(toggle, $el);
        }

    },

    events: [

        {

            name: 'click',

            delegate() {
                return `${this.toggle}:not(.ng-disabled)`;
            },

            handler(e) {
                e.preventDefault();
                this.show(e.current);
            }

        },

        {
            name: 'click',

            el() {
                return this.connects;
            },

            delegate() {
                return `[${this.attrItem}],[data-${this.attrItem}]`;
            },

            handler(e) {
                e.preventDefault();
                this.show(data(e.current, this.attrItem));
            }
        },

        {
            name: 'swipeRight swipeLeft',

            filter() {
                return this.swiping;
            },

            el() {
                return this.connects;
            },

            handler(e) {
                if (!isTouch(e)) {
                    return;
                }

                e.preventDefault();
                if (!window.getSelection().toString()) {
                    this.show(e.type === 'swipeLeft' ? 'next' : 'previous');
                }
            }
        }

    ],

    update() {

        this.connects.forEach(list => this.updateAria(list.children));
        this.show(filter(this.toggles, `.${this.cls}`)[0] || this.toggles[this.active] || this.toggles[0]);

    },

    methods: {

        index() {
            return !!this.connects.length && index(filter(this.connects[0].children, `.${this.cls}`)[0]);
        },

        show(item) {

            const {length} = this.toggles;
            const prev = this.index();
            const hasPrev = prev >= 0;
            const dir = item === 'previous' ? -1 : 1;

            let toggle, next = getIndex(item, this.toggles, prev);

            for (let i = 0; i < length; i++, next = (next + dir + length) % length) {
                if (!matches(this.toggles[next], '.ng-disabled, [disabled]')) {
                    toggle = this.toggles[next];
                    break;
                }
            }

            if (!toggle || prev >= 0 && hasClass(toggle, this.cls) || prev === next) {
                return;
            }

            removeClass(this.toggles, this.cls);
            attr(this.toggles, 'aria-expanded', false);
            addClass(toggle, this.cls);
            attr(toggle, 'aria-expanded', true);

            this.connects.forEach(list => {
                if (!hasPrev) {
                    this.toggleNow(list.children[next]);
                } else {
                    this.toggleElement([list.children[prev], list.children[next]]);
                }
            });

        }

    }

};
