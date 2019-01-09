import {$$, assign, camelize, fastdom, hyphenate, isPlainObject, startsWith} from 'ngkit-util';

export default function (ngkit) {

    const DATA = ngkit.data;

    const components = {};

    ngkit.component = function (name, options) {

        if (!options) {

            if (isPlainObject(components[name])) {
                components[name] = ngkit.extend(components[name]);
            }

            return components[name];

        }

        ngkit[name] = function (element, data) {

            const component = ngkit.component(name);

            if (isPlainObject(element)) {
                return new component({data: element});
            }

            if (component.options.functional) {
                return new component({data: [...arguments]});
            }

            return element && element.nodeType ? init(element) : $$(element).map(init)[0];

            function init(element) {

                const instance = ngkit.getComponent(element, name);

                if (instance) {
                    if (!data) {
                        return instance;
                    } else {
                        instance.$destroy();
                    }
                }

                return new component({el: element, data});

            }

        };

        const opt = isPlainObject(options) ? assign({}, options) : options.options;

        opt.name = name;

        if (opt.install) {
            opt.install(ngkit, opt, name);
        }

        if (ngkit._initialized && !opt.functional) {
            const id = hyphenate(name);
            fastdom.read(() => ngkit[name](`[ng-${id}],[data-ng-${id}]`));
        }

        return components[name] = isPlainObject(options) ? opt : options;
    };

    ngkit.getComponents = element => element && element[DATA] || {};
    ngkit.getComponent = (element, name) => ngkit.getComponents(element)[name];

    ngkit.connect = node => {

        if (node[DATA]) {
            for (const name in node[DATA]) {
                node[DATA][name]._callConnected();
            }
        }

        for (let i = 0; i < node.attributes.length; i++) {

            const name = getComponentName(node.attributes[i].name);

            if (name && name in components) {
                ngkit[name](node);
            }

        }

    };

    ngkit.disconnect = node => {
        for (const name in node[DATA]) {
            node[DATA][name]._callDisconnected();
        }
    };

}

export function getComponentName(attribute) {
    return startsWith(attribute, 'ng-') || startsWith(attribute, 'data-ng-')
        ? camelize(attribute.replace('data-ng-', '').replace('ng-', ''))
        : false;
}
