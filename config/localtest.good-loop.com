server {
	listen 80;
	listen [::]:80;
	server_name localtest.good-loop.com;
	root /home/winterwell/demo/web-test;
	index index.html;

	# If there's no static file matching the URI, route it to $index and let preact-router handle it
	location / {
		try_files $uri $uri/ /;
	}
	# access_log /var/log/nginx/localdemo.good-loop.com/access.log;
	# error_log /var/log/nginx/localdemo.good-loop.com/error.log;
}
