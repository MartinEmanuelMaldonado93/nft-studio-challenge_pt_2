declare module "*.module.scss";
declare module "*.glsl" {
	const shaderCode: string;
	export default shaderCode;
}
