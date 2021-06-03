module.exports = {
	extends: [
		'react-app',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				semi: true,
				trailingComma: 'es5',
				useTabs: true,
			},
		],
		'prefer-const': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'off',
	},
};
