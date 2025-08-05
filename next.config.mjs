// import withPWAInit from "next-pwa";
// const withPWA = withPWAInit({
//     dest: 'public'
// })


// export default withPWA({
//     pwa: {
//         dest: 'public',
//         register: true,
//         skipWaiting: true,
//     },
//     images: {
//         remotePatterns: [
//             {
//                 protocol: "https",
//                 hostname: "**",
//             },
//         ],
//     }, experimental: {
//         missingSuspenseWithCSRBailout: false,
//     }
// })
import withPWAInit from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd,  // disables PWA in dev mode to avoid warnings
});

export default withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
});
