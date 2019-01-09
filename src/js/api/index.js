import globalAPI from './global';
import hooksAPI from './hooks';
import stateAPI from './state';
import instanceAPI from './instance';
import componentAPI from './component';
import * as util from 'ngkit-util';

const ngkit = function (options) {
    this._init(options);
};

ngkit.util = util;
ngkit.data = '__ngkit__';
ngkit.prefix = 'ng-';
ngkit.options = {};

globalAPI(ngkit);
hooksAPI(ngkit);
stateAPI(ngkit);
componentAPI(ngkit);
instanceAPI(ngkit);

export default ngkit;
