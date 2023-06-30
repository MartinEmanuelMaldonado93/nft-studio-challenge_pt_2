/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["three"],
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.glsl/,
			type: "asset/source",
		});
		return config;
	},
	experimental : {
		serverActions: true,
	},
};

module.exports = nextConfig;
