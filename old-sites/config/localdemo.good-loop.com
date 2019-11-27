server {
	listen 80;
	listen [::]:80;
	server_name localdemo.good-loop.com;
	root /home/irina/winterwell/demo/webroot;
	index index.html;
#	access_log /var/log/nginx/localdemo.good-loop.com/access.log;
#	error_log /var/log/nginx/localdemo.good-loop.com/error.log;
}
