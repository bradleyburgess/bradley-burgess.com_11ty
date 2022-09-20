[1mdiff --git a/netlify.toml b/netlify.toml[m
[1mindex 8891c08..e467fd7 100644[m
[1m--- a/netlify.toml[m
[1m+++ b/netlify.toml[m
[36m@@ -5,7 +5,7 @@[m
 [[headers]][m
   for = "/*"[m
   [headers.values][m
[31m-    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' youtube.com www.youtube.com do-shynet.bombarde32.net; frame-src youtube.com www.youtube.com; media-src 'self' dl.dropboxusercontent.com; connect-src 'self' cdn.plyr.io noembed.com; img-src 'self' i.ytimg.com"[m
[32m+[m[32m    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' youtube.com www.youtube.com do-shynet.bombarde32.net; frame-src youtube.com www.youtube.com; media-src 'self' dl.dropboxusercontent.com; connect-src 'self' cdn.plyr.io noembed.com do-shynet.bombarde32.net; img-src 'self' i.ytimg.com"[m
 [m
 [[plugins]][m
     package = "netlify-plugin-11ty"[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 78c22d8..f75536a 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -44,6 +44,7 @@[m
     "md5": "^2.3.0",[m
     "netlify-plugin-11ty": "^1.1.0",[m
     "npm-run-all": "^4.1.5",[m
[32m+[m[32m    "os-browserify": "^0.3.0",[m
     "parcel": "^2.6.2",[m
     "path-browserify": "^1.0.1",[m
     "prettier": "^2.7.1",[m
[1mdiff --git a/src/js/lib/shoppingCart.js b/src/js/lib/shoppingCart.js[m
[1mindex 951e2b7..65488e0 100644[m
[1m--- a/src/js/lib/shoppingCart.js[m
[1m+++ b/src/js/lib/shoppingCart.js[m
[36m@@ -1,7 +1,7 @@[m
[31m-const SERVER_URL =[m
[31m-  process.env === "production" ? process.env.SERVER_URL_PROD : process.env.SERVER_URL_DEV;[m
[31m-[m
[31m-const CHECKOUT_ENDPOINT = `${SERVER_URL.replace(/\/$/, "")}/api/checkout`;[m
[32m+[m[32mconst CHECKOUT_ENDPOINT = require("../../_data/endpoints").checkout;[m
[32m+[m[32m// const SERVER_URL =[m
[32m+[m[32m//   process.env === "production" ? process.env.SERVER_URL_PROD : process.env.SERVER_URL_DEV;[m
[32m+[m[32m// const CHECKOUT_ENDPOINT = `${SERVER_URL.replace(/\/$/, "")}/api/checkout`;[m
 class ShoppingCart extends HTMLElement {[m
   constructor() {[m
     super();[m
[1mdiff --git a/yarn.lock b/yarn.lock[m
[1mindex 6e983cb..a071686 100644[m
[1m--- a/yarn.lock[m
[1m+++ b/yarn.lock[m
[36m@@ -4032,6 +4032,11 @@[m [mordered-binary@^1.2.4:[m
   resolved "https://registry.npmjs.org/ordered-binary/-/ordered-binary-1.3.0.tgz"[m
   integrity sha512-knIeYepTI6BDAzGxqFEDGtI/iGqs57H32CInAIxEvAHG46vk1Di0CEpyc1A7iY39B1mfik3g3KLYwOTNnnMHLA==[m
 [m
[32m+[m[32mos-browserify@^0.3.0:[m
[32m+[m[32m  version "0.3.0"[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/os-browserify/-/os-browserify-0.3.0.tgz#854373c7f5c2315914fc9bfc6bd8238fdda1ec27"[m
[32m+[m[32m  integrity sha512-gjcpUc3clBf9+210TRaDWbf+rZZZEshZ+DlXMRCeAjp0xhTrnQsKHypIy1J3d5hKdUzj69t708EHtU8P6bUn0A==[m
[32m+[m
 p-finally@^1.0.0:[m
   version "1.0.0"[m
   resolved "https://registry.npmjs.org/p-finally/-/p-finally-1.0.0.tgz"[m
