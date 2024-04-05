const { getRemotes, getRemoteUrl } = require('../remotes');

class RemoteLoaderPlugin {
  static defaultOptions = {};

  // Any options should be passed in the constructor of your plugin,
  // (this is a public API of your plugin).
  constructor(options = {}) {
    // Applying user-specified options over the default options
    // and making merged options further available to the plugin methods.
    // You should probably validate all the options here as well.
    this.options = { ...RemoteLoaderPlugin.defaultOptions, ...options };
  }

  /** @type {import('webpack').WebpackPluginInstance['apply']} */
  apply(compiler) {
    const pluginName = RemoteLoaderPlugin.name;

    // webpack module instance can be accessed from the compiler object,
    // this ensures that correct version of the module is used
    // (do not require/import the webpack or any symbols from it directly).
    const { webpack } = compiler;

    // Compilation object gives us reference to some useful constants.
    const { Compilation } = webpack;

    // RawSource is one of the "sources" classes that should be used
    // to represent asset sources in compilation.
    const { RawSource } = webpack.sources;

    // Tapping to the "thisCompilation" hook in order to further tap
    // to the compilation process on an earlier stage.
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      // Tapping to the assets processing pipeline on a specific stage.
      compilation.hooks.processAssets.tapPromise(
        {
          name: pluginName,

          // Using one of the later asset processing stages to ensure
          // that all assets were already added to the compilation by other plugins.
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        async () => {
          const emitAsset = (file, source) => {
            compilation.emitAsset(file, new RawSource(source));
          };

          await this.loadRemotes(emitAsset);
        },
      );
    });
  }

  async loadRemotes(emitAsset) {
    const remotes = getRemotes();
    await Promise.all(
      remotes.flatMap(async ({ name, entry }) => {
        // --- Get original remote url
        const basePath = `static/chunks/${name}`;
        const newPublicPath = `_next/${basePath}/`;
        const oldUrl = getRemoteUrl(entry, name, false);

        // --- Load mf-manifest.json
        const manifest = await fetch(oldUrl).then((res) => res.json());
        const oldPublicPath = manifest.metaData.publicPath;
        const manifestString = JSON.stringify(manifest, null, 2).replace(
          oldPublicPath,
          newPublicPath,
        );
        const outputFile = `${basePath}/mf-manifest.json`;
        emitAsset(outputFile, manifestString);

        // --- Load remoteEntry.js
        const data = manifest.metaData;
        const entryUrl = data.publicPath + data.remoteEntry.name;
        const entryFile = await fetch(entryUrl).then((res) => res.text());
        const newEntryFile = entryFile.replace(oldPublicPath, newPublicPath);
        const entryPath = `${basePath}/${data.remoteEntry.name}`;
        emitAsset(entryPath, newEntryFile);

        // --- Load all remote exposes
        const exposes = manifest.exposes.flatMap((e) => [
          ...e.assets.js.sync,
          ...e.assets.css.sync,
        ]);
        await Promise.all(
          exposes.map(async (path) => {
            const url = oldPublicPath + path;
            const expose = await fetch(url).then((res) => res.text());
            const file = `${basePath}/${path}`;
            emitAsset(file, expose);
          }),
        );
      }),
    );
  }
}

module.exports = RemoteLoaderPlugin;
