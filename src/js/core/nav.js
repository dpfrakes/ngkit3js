import Accordion from './accordion';

export default {

    extends: Accordion,

    data: {
        targets: '> .ng-parent',
        toggle: '> a',
        content: '> ul'
    }

};
