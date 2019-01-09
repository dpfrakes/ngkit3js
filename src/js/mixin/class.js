import {addClass, hasClass} from 'ngkit-util';

export default {

    connected() {
        !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
    }

};
