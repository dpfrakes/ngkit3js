import Accordion from './accordion';
import Alert from './alert';
import ButtonRadio from './button-radio';
import ButtonCheckbox from './button-checkbox';
import Core from './core';
import Cover from './cover';
import Drop from './drop';
import Dropdown from './dropdown';
import FormCustom from './form-custom';
import Gif from './gif';
import Grid from './grid';
import HeightMatch from './height-match';
import HeightViewport from './height-viewport';
import Icon, {IconComponent, Slidenav, Search, Close, Spinner} from './icon';
import Img from './img';
import Leader from './leader';
import Margin from './margin';
import Modal from './modal';
import Nav from './nav';
import Navbar from './navbar';
import Offcanvas from './offcanvas';
import OverflowAuto from './overflow-auto';
import Responsive from './responsive';
import Scroll from './scroll';
import Scrollspy from './scrollspy';
import ScrollspyNav from './scrollspy-nav';
import Sticky from './sticky';
import Svg from './svg';
import Switcher from './switcher';
import Tab from './tab';
import Toggle from './toggle';
import Video from './video';

export default function (ngkit) {

    // core components
    ngkit.component('accordion', Accordion);
    ngkit.component('alert', Alert);
    ngkit.component('buttonRadio', ButtonRadio);
    ngkit.component('buttonCheckbox', ButtonCheckbox);
    ngkit.component('cover', Cover);
    ngkit.component('drop', Drop);
    ngkit.component('dropdown', Dropdown);
    ngkit.component('formCustom', FormCustom);
    ngkit.component('gif', Gif);
    ngkit.component('grid', Grid);
    ngkit.component('heightMatch', HeightMatch);
    ngkit.component('heightViewport', HeightViewport);
    ngkit.component('icon', Icon);
    ngkit.component('img', Img);
    ngkit.component('leader', Leader);
    ngkit.component('margin', Margin);
    ngkit.component('modal', Modal);
    ngkit.component('nav', Nav);
    ngkit.component('navbar', Navbar);
    ngkit.component('offcanvas', Offcanvas);
    ngkit.component('overflowAuto', OverflowAuto);
    ngkit.component('responsive', Responsive);
    ngkit.component('scroll', Scroll);
    ngkit.component('scrollspy', Scrollspy);
    ngkit.component('scrollspyNav', ScrollspyNav);
    ngkit.component('sticky', Sticky);
    ngkit.component('svg', Svg);
    ngkit.component('switcher', Switcher);
    ngkit.component('tab', Tab);
    ngkit.component('toggle', Toggle);
    ngkit.component('video', Video);

    // Icon components
    ngkit.component('close', Close);
    ngkit.component('marker', IconComponent);
    ngkit.component('navbarToggleIcon', IconComponent);
    ngkit.component('overlayIcon', IconComponent);
    ngkit.component('paginationNext', IconComponent);
    ngkit.component('paginationPrevious', IconComponent);
    ngkit.component('searchIcon', Search);
    ngkit.component('slidenavNext', Slidenav);
    ngkit.component('slidenavPrevious', Slidenav);
    ngkit.component('spinner', Spinner);
    ngkit.component('totop', IconComponent);

    // core functionality
    ngkit.use(Core);

}
