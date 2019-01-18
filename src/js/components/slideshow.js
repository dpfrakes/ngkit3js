/**
 * bmiller: Jan, 2019:
 *
 * Added viewHeight property.  This is to allow to specify the component in the css view height (vh) property
 * However its passed in as a number -- no "vh" appended to the value should be specified
 * viewHeight takes precedence over maxHeight in update calculations
 */


import Class from '../mixin/class';
import Slideshow from '../mixin/slideshow';
import Animations from './internal/slideshow-animations';
import SliderReactive from '../mixin/slider-reactive';
import {$, boxModelAdjust, css, toNodes, vh} from 'ngkit-util';
import {speedUp} from "../mixin/slider";

export default {

    mixins: [Class, Slideshow, SliderReactive],

    props: {
        ratio: String,
        minHeight: Boolean,
        maxHeight: Boolean,
        viewHeight: Number
    },

    data: {
        ratio: '16:9',
        minHeight: false,
        maxHeight: false,
        viewHeight: false,
        selList: '.ng-slideshow-items',
        attrItem: 'ng-slideshow-item',
        selNav: '.ng-slideshow-nav',
        Animations
    },


    update: {

        read() {

            let [width, height] = this.ratio.split(':').map(Number);

            height = height * this.list.offsetWidth / width;

            if (this.minHeight) {
                height = Math.max(this.minHeight, height);
            }


            if (this.maxHeight) {
                height = Math.min(this.maxHeight, height);
            }

            if(this.viewHeight) {
                height = vh(this.viewHeight, document);
            }

            return {height: height - boxModelAdjust(this.list, 'content-box')};
        },

        write({height}) {
            css(this.list, 'minHeight', height);
        },

        events: ['load', 'resize']

    },

};
