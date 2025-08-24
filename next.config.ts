import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      /* allowing https://placeholder.co/48x48 profile placeholder */
    images:{
        dangerouslyAllowSVG:true,
        remotePatterns:[
            {
                protocol:'https',
                hostname:'*'
            }
        ]
    }
};

export default nextConfig;
