server {
	listen 80;
	listen [::]:80;
	server_name localdemo.good-loop.com;
	root /home/team/winterwell/demo/web-demo;
	index index.html;

	location / {
		try_files $uri $uri/ /;
	}
#	access_log /var/log/nginx/localdemo.good-loop.com/access.log;
#	error_log /var/log/nginx/localdemo.good-loop.com/error.log;
}
