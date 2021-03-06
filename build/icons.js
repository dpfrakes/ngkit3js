/* eslint-env node */
const glob = require('glob');
const util = require('./util');
const args = require('minimist')(process.argv);

const custom = args.c || args.custom || 'custom/*/icons';
const match = args.n || args.name || '([a-z]+)/icons$';

glob(custom, (err, folders) =>
    folders.forEach(folder => {

        const [, name] = folder.toString().match(new RegExp(match, 'i'));
        util.icons(`{src/images/icons,${folder}}/*.svg`).then(ICONS =>
            util.compile('src/js/icons.js', `dist/js/ngkit-icons-${name}`, {name, replaces: {ICONS}})
        );

    })
);
