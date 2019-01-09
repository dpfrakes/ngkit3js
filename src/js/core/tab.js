import Switcher from './switcher';
import Class from '../mixin/class';
import {hasClass} from 'ngkit-util';

export default {

    mixins: [Class],

    extends: Switcher,

    props: {
        media: Boolean
    },

    data: {
        media: 960,
        attrItem: 'ng-tab-item'
    },

    connected() {

        const cls = hasClass(this.$el, 'ng-tab-left')
            ? 'ng-tab-left'
            : hasClass(this.$el, 'ng-tab-right')
                ? 'ng-tab-right'
                : false;

        if (cls) {
            this.$create('toggle', this.$el, {cls, mode: 'media', media: this.media});
        }
    }

};
