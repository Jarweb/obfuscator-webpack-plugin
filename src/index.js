const JavaScriptObfuscator = require('javascript-obfuscator')
const transferSourceMap = require("multi-stage-sourcemap").transfer
const { RawSource, SourceMapSource } = require('webpack-sources')

class CodeObfuscatorWebpackPlugin {
	constructor(config) {
		const {options, chunks} = config
		this.obfuscatorOptions = options
		this.chunks = chunks
	}

	apply(compiler) {
		compiler.hooks.emit.tap(this.constructor.name, (compilation) => {
			compilation.chunks.forEach(chunk => {
				chunk.files.forEach(filename => {
					if (filename.endsWith('.js') && this.checkInclude(filename)) {
						const asset = compilation.assets[filename]
						let codeSource = ''
						let codeSourceMap = ''

						if (asset.sourceAndMap) {
							const { source, map } = asset.sourceAndMap()
							codeSource = source
							codeSourceMap = map
						}
						else {
							codeSource = asset.source()
							codeSourceMap = asset.map()
						}

						const obfuscationResult = JavaScriptObfuscator.obfuscate(codeSource, this.obfuscatorOptions)
						const obfuscatedCodeSource = obfuscationResult.getObfuscatedCode()
						const obfuscatedCodeSourceMap = obfuscationResult.getSourceMap()

						if (this.obfuscatorOptions.sourceMap && codeSourceMap) {
							const transferredSourceMap = transferSourceMap({
								fromSourceMap: obfuscatedCodeSourceMap,
								toSourceMap: inputSourceMap
							})

							compilation.assets[filename] = new SourceMapSource(
								obfuscatedCodeSource,
								filename,
								transferredSourceMap,
								codeSource,
								codeSourceMap
							)
						}
						else {
							compilation.assets[filename] = new RawSource(obfuscatedCodeSource)
						}
					}
				})
			})
		})
	}

	checkInclude (file) {
		let result = false

		for(let c of this.chunks) {
			if (file.startsWith(c)) {
				result = true
				break;
			}
		}
		
		return result
	}
}

module.exports = CodeObfuscatorWebpackPlugin