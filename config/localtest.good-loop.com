server {
    listen 80;
    listen [::]:80;
    server_name localtest.good-loop.com;
    rewrite ^ https://$server_name$request_uri? permanent;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name localtest.good-loop.com;

    ssl_certificate /home/winterwell/ssl-certs/wildcard.good-loop.com/fullchain1.pem;
    ssl_certificate_key /home/winterwell/ssl-certs/wildcard.good-loop.com/privkey1.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_dhparam /home/winterwell/config/etc/ssl/dhparams.pem;


    root /home/winterwell/demo/web-test;
    index index.html;

    location / {
            try_files $uri $uri.html $uri/ =404;
            add_header 'Access-Control-Allow-Origin' "$http_origin";
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Cache-Control' 'no-cache';
    }
}
