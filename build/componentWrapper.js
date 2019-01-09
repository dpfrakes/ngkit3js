/* global NGkit, NAME */
import Component from 'component';

if (typeof window !== 'undefined' && window.NGkit) {
    window.NGkit.component(NAME, Component);
}

export default Component;
