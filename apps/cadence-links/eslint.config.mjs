import nextConfig from "eslint-config-next";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	...nextConfig,
	{
		rules: {
			"react-hooks/error-boundaries": "warn",
			"react-hooks/set-state-in-effect": "warn",
		},
	},
];
