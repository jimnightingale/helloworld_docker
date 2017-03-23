FROM alpine:latest

MAINTAINER Jim Nightingale <nightingalejames@yahoo.co.uk>

RUN apk update
RUN apk add nodejs

COPY helloworld.js /usr/local/bin/

EXPOSE 80

ENTRYPOINT node /usr/local/bin/helloworld.js
