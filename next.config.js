/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
       domains:['files.stripe.com']
    },
    async redirects(){
        return[
            {
                source:'/',
                destination:'/inventory',
                permanent:true
            }
        ]
    },
    webpack:  (config, { isServer }) => {
        // Add a rule to handle HTML files
        config.module.rules.push({
          test: /\.html$/,
          use: 'html-loader',
        });
        if (!isServer) {
            config.resolve.fallback = {
              child_process: false,
              fs: false,
              'aws-sdk': false,
              nock: false,
            };
          }
    
        // Important: return the modified config
        return config;
      },
}

module.exports = nextConfig
