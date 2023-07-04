module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    rules: {
		'testing-library/prefer-presence-queries': [
			'error',
			{ absence: false, presence: true },
		],
	},
  };