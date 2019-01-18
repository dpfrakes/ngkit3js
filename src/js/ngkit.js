import boot from './api/boot';
import ngkit from './ngkit-core';
import Countdown from './components/countdown';
import Filter from './components/filter';
import Lightbox from './components/lightbox';
import lightboxPanel from './components/lightbox-panel';
import Notification from './components/notification';
import Parallax from './components/parallax';
import Slider from './components/slider';
import SliderParallax from './components/slider-parallax';
import Slideshow from './components/slideshow';
import Sortable from './components/sortable';
import Tooltip from './components/tooltip';
import Upload from './components/upload';

// Custom Components ported over from custom components in NGKit 2
import Autocomplete from './components/autocomplete';

// TODO: Remove when understanding it understood
import Testcomp from './components/testcomp';

ngkit.component('countdown', Countdown);
ngkit.component('filter', Filter);
ngkit.component('lightbox', Lightbox);
ngkit.component('lightboxPanel', lightboxPanel);
ngkit.component('notification', Notification);
ngkit.component('parallax', Parallax);
ngkit.component('slider', Slider);
ngkit.component('sliderParallax', SliderParallax);
ngkit.component('slideshow', Slideshow);
ngkit.component('slideshowParallax', SliderParallax);
ngkit.component('sortable', Sortable);
ngkit.component('tooltip', Tooltip);
ngkit.component('upload', Upload);

// Custom Components ported over from custom components in NGKit 2
ngkit.component('autocomplete', Autocomplete);

// TODO: Remove when understanding it understood
ngkit.component('testcomp', Testcomp);

if (BUNDLED) {
    boot(ngkit);
}

export default ngkit;
