import { PluginKind, declareValuePlugin } from '@stryker-mutator/api/plugin';

const ignoreConstructor = declareValuePlugin(PluginKind.Ignore, 'constructor', {
	shouldIgnore(path) {
		if (path.node.kind === 'constructor') {
			return "We're not interested in testing `Constructor` statements";
		}
	},
});

const ignorePluginThisLogger = declareValuePlugin(PluginKind.Ignore, 'this.logger', {
	shouldIgnore(path) {
		// Define the conditions for which you want to ignore mutants
		if (
			path.isExpressionStatement() &&
			path.node.expression.type === 'CallExpression' &&
			path.node.expression.callee.type === 'MemberExpression' &&
			path.node.expression.callee.object.type === 'MemberExpression' &&
			path.node.expression.callee.object.object.type === 'ThisExpression' &&
			path.node.expression.callee.object.property.type === 'Identifier' &&
			path.node.expression.callee.object.property.name === 'logger'
		) {
			// Return the ignore reason
			return "We're not interested in testing `NestJS Logger` statements";
		}
	},
});

export const strykerPlugins = [ignorePluginThisLogger, ignoreConstructor];
