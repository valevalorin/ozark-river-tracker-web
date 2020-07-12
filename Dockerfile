from nginx:alpine

workdir /usr/share/nginx/html

copy dist/ozark-river-tracker-web /usr/share/nginx/html