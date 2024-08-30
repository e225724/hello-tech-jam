/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "imgfp.hotp.jp",  // 許可するホスト名を追加
          port: "",                  // 必要に応じてポート番号を指定
          pathname: "/**",            // パスのパターンを指定、すべてのパスを許可する場合は '/**'
        },
      ],
    },
  }
  
  module.exports = nextConfig;
  