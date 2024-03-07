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
    }
}

module.exports = nextConfig
