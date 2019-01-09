import {$$, addClass, css, hasTouch, on, ready, removeClass, toMs, within} from 'ngkit-util';

export default function (ngkit) {

    ready(() => {

        ngkit.update();

        let scroll = 0;
        let started = 0;

        on(window, 'load resize', e => ngkit.update(null, e));
        on(window, 'scroll', e => {
            const {target} = e;
            e.dir = scroll <= window.pageYOffset ? 'down' : 'up';
            e.pageYOffset = scroll = window.pageYOffset;
            ngkit.update(target.nodeType !== 1 ? document.body : target, e);
        }, {passive: true, capture: true});
        on(document, 'loadedmetadata load', ({target}) => ngkit.update(target, 'load'), true);

        on(document, 'animationstart', ({target}) => {
            if ((css(target, 'animationName') || '').match(/^ng-.*(left|right)/)) {

                started++;
                css(document.body, 'overflowX', 'hidden');
                setTimeout(() => {
                    if (!--started) {
                        css(document.body, 'overflowX', '');
                    }
                }, toMs(css(target, 'animationDuration')) + 100);
            }
        }, true);

        if (!hasTouch) {
            return;
        }

        const cls = 'ng-hover';

        on(document, 'tap', ({target}) =>
            $$(`.${cls}`).forEach(el =>
                !within(target, el) && removeClass(el, cls)
            )
        );

        Object.defineProperty(ngkit, 'hoverSelector', {

            set(selector) {
                on(document, 'tap', selector, ({current}) => addClass(current, cls));
            }

        });

        ngkit.hoverSelector = '.ng-animation-toggle, .ng-transition-toggle, [ng-hover]';

    });

}
