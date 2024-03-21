/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   webpack(config) {
//     config.experiments = { ...config.experiments, topLevelAwait: true };
//     return config;
//   },
// };
// module.exports = nextConfig;

// webpack(){} 부분만 붙여넣으면 될텐데 근데 nodejs 버전이 낮으면 못쓰는 기능이라
// 나중에 클라우드로 서버 배포할 때 클라우드서비스에서 nodejs 높은버전 제공을 안해주면 못씁니다.
// 그래서 지금은 일반적으로는 쓰지 않습니다.
