export default {
	entry: 'dist/index.js', // target file for rollup to process;
	dest: 'dist/bundles/angular-actions.umd.js', // location where processed scripts are saved
	sourceMap: true, // option adds a sourcemap inside the generated file
	format: 'umd', // 
	moduleName: 'angularActions',
	external: [ 'angular-rules-engine' ],
	globals: {
		'angular-rules-engine': 'angular-rules-engine'
	}
}
