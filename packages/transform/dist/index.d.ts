import { PluginOption } from 'vite';

interface DevtoolsPluginOptions {
    /** Add automatic name when creating signals, memos, stores, or mutables */
    name?: boolean;
    /** Inject location attributes to jsx templates */
    jsxLocation?: boolean;
    /** Inject location information to component declarations */
    componentLocation?: boolean;
}
declare const devtoolsPlugin: (options?: DevtoolsPluginOptions) => PluginOption;

export { DevtoolsPluginOptions, devtoolsPlugin as default, devtoolsPlugin };
