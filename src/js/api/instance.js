import {hyphenate, remove, within} from 'ngkit-util';

export default function (ngkit) {

    const DATA = ngkit.data;

    ngkit.prototype.$mount = function (el) {

        const {name} = this.$options;

        if (!el[DATA]) {
            el[DATA] = {};
        }

        if (el[DATA][name]) {
            return;
        }

        el[DATA][name] = this;

        this.$el = this.$options.el = this.$options.el || el;

        if (within(el, document)) {
            this._callConnected();
        }
    };

    ngkit.prototype.$emit = function (e) {
        this._callUpdate(e);
    };

    ngkit.prototype.$reset = function () {
        this._callDisconnected();
        this._callConnected();
    };

    ngkit.prototype.$destroy = function (removeEl = false) {

        const {el, name} = this.$options;

        if (el) {
            this._callDisconnected();
        }

        this._callHook('destroy');

        if (!el || !el[DATA]) {
            return;
        }

        delete el[DATA][name];

        if (!Object.keys(el[DATA]).length) {
            delete el[DATA];
        }

        if (removeEl) {
            remove(this.$el);
        }
    };

    ngkit.prototype.$create = function (component, element, data) {
        return ngkit[component](element, data);
    };

    ngkit.prototype.$update = ngkit.update;
    ngkit.prototype.$getComponent = ngkit.getComponent;

    const names = {};
    Object.defineProperties(ngkit.prototype, {

        $container: Object.getOwnPropertyDescriptor(ngkit, 'container'),

        $name: {

            get() {
                const {name} = this.$options;

                if (!names[name]) {
                    names[name] = ngkit.prefix + hyphenate(name);
                }

                return names[name];
            }

        }

    });

}
