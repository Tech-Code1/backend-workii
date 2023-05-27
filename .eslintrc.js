module.exports = {
	root: true,
	ignorePatterns: ['projects/**/*', 'src/app/**/*.spec.ts', '.eslintrc.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
	env: {
		node: true,
		jest: true
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				format: ['StrictPascalCase'],
				prefix: ['I'],
				trailingUnderscore: 'allow',
				selector: 'interface'
			}
		]
	}
};
