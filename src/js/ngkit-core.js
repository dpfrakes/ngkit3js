import ngkit from './api/index';
import core from './core/index';
import boot from './api/boot';

ngkit.version = VERSION;

core(ngkit);

if (!BUNDLED) {
    boot(ngkit);
}

export default ngkit;
