# helloworld_docker
quick js webserver to test deploying in a docker container

sudo docker build -t \<tag> .  # note the trailing "."

sudo docker run -d -p 80:80 \<tag>
