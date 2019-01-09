function plugin(ngkit) {

    if (plugin.installed) {
        return;
    }

    ngkit.icon.add(ICONS);

}

if (typeof window !== 'undefined' && window.ngkit) {
    window.ngkit.use(plugin);
}

export default plugin;
