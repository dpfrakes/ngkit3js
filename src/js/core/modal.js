import Modal from '../mixin/modal';
import {$, addClass, assign, css, hasClass, height, html, isString, on, Promise, removeClass} from 'ngkit-util';

export default {

    install,

    mixins: [Modal],

    data: {
        clsPage: 'ng-modal-page',
        selPanel: '.ng-modal-dialog',
        selClose: '.ng-modal-close, .ng-modal-close-default, .ng-modal-close-outside, .ng-modal-close-full'
    },

    events: [

        {
            name: 'show',

            self: true,

            handler() {

                if (hasClass(this.panel, 'ng-margin-auto-vertical')) {
                    addClass(this.$el, 'ng-flex');
                } else {
                    css(this.$el, 'display', 'block');
                }

                height(this.$el); // force reflow
            }
        },

        {
            name: 'hidden',

            self: true,

            handler() {

                css(this.$el, 'display', '');
                removeClass(this.$el, 'ng-flex');

            }
        }

    ]

};

function install (ngkit) {

    ngkit.modal.dialog = function (content, options) {

        const dialog = ngkit.modal(`
            <div class="ng-modal">
                <div class="ng-modal-dialog">${content}</div>
             </div>
        `, options);

        dialog.show();

        on(dialog.$el, 'hidden', ({target, currentTarget}) => {
            if (target === currentTarget) {
                Promise.resolve(() => dialog.$destroy(true));
            }
        });

        return dialog;
    };

    ngkit.modal.alert = function (message, options) {

        options = assign({bgClose: false, escClose: false, labels: ngkit.modal.labels}, options);

        return new Promise(
            resolve => on(ngkit.modal.dialog(`
                <div class="ng-modal-body">${isString(message) ? message : html(message)}</div>
                <div class="ng-modal-footer ng-text-right">
                    <button class="ng-button ng-button-primary ng-modal-close" autofocus>${options.labels.ok}</button>
                </div>
            `, options).$el, 'hide', resolve)
        );
    };

    ngkit.modal.confirm = function (message, options) {

        options = assign({bgClose: false, escClose: true, labels: ngkit.modal.labels}, options);

        return new Promise((resolve, reject) => {

            const confirm = ngkit.modal.dialog(`
                <form>
                    <div class="ng-modal-body">${isString(message) ? message : html(message)}</div>
                    <div class="ng-modal-footer ng-text-right">
                        <button class="ng-button ng-button-default ng-modal-close" type="button">${options.labels.cancel}</button>
                        <button class="ng-button ng-button-primary" autofocus>${options.labels.ok}</button>
                    </div>
                </form>
            `, options);

            let resolved = false;

            on(confirm.$el, 'submit', 'form', e => {
                e.preventDefault();
                resolve();
                resolved = true;
                confirm.hide();
            });
            on(confirm.$el, 'hide', () => {
                if (!resolved) {
                    reject();
                }
            });

        });
    };

    ngkit.modal.prompt = function (message, value, options) {

        options = assign({bgClose: false, escClose: true, labels: ngkit.modal.labels}, options);

        return new Promise(resolve => {

            const prompt = ngkit.modal.dialog(`
                    <form class="ng-form-stacked">
                        <div class="ng-modal-body">
                            <label>${isString(message) ? message : html(message)}</label>
                            <input class="ng-input" autofocus>
                        </div>
                        <div class="ng-modal-footer ng-text-right">
                            <button class="ng-button ng-button-default ng-modal-close" type="button">${options.labels.cancel}</button>
                            <button class="ng-button ng-button-primary">${options.labels.ok}</button>
                        </div>
                    </form>
                `, options),
                input = $('input', prompt.$el);

            input.value = value;

            let resolved = false;

            on(prompt.$el, 'submit', 'form', e => {
                e.preventDefault();
                resolve(input.value);
                resolved = true;
                prompt.hide();
            });
            on(prompt.$el, 'hide', () => {
                if (!resolved) {
                    resolve(null);
                }
            });

        });
    };

    ngkit.modal.labels = {
        ok: 'Ok',
        cancel: 'Cancel'
    };

}
