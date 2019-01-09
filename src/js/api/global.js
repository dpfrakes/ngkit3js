import {$, apply, createEvent, isString, mergeOptions, toNode} from 'ngkit-util';

export default function (ngkit) {

    const DATA = ngkit.data;

    ngkit.use = function (plugin) {

        if (plugin.installed) {
            return;
        }

        plugin.call(null, this);
        plugin.installed = true;

        return this;
    };

    ngkit.mixin = function (mixin, component) {
        component = (isString(component) ? ngkit.component(component) : component) || this;
        component.options = mergeOptions(component.options, mixin);
    };

    ngkit.extend = function (options) {

        options = options || {};

        const Super = this;
        const Sub = function ngkitComponent (options) {
            this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);

        Sub.super = Super;
        Sub.extend = Super.extend;

        return Sub;
    };

    ngkit.update = function (element, e) {

        e = createEvent(e || 'update');
        element = element ? toNode(element) : document.body;

        path(element).map(element => update(element[DATA], e));
        apply(element, element => update(element[DATA], e));

    };

    let container;
    Object.defineProperty(ngkit, 'container', {

        get() {
            return container || document.body;
        },

        set(element) {
            container = $(element);
        }

    });

    function update(data, e) {

        if (!data) {
            return;
        }

        for (const name in data) {
            if (data[name]._connected) {
                data[name]._callUpdate(e);
            }
        }

    }

    function path(element) {
        const path = [];

        while (element && element !== document.body && element.parentNode) {

            element = element.parentNode;
            path.unshift(element);

        }

        return path;
    }

}
