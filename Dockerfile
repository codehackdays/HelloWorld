FROM heroku/heroku:16

RUN curl --location --silent https://github.com/gliderlabs/herokuish/releases/download/v0.3.28/herokuish_0.3.28_linux_x86_64.tgz \
		  | tar -xzC /bin
RUN herokuish buildpack install https://github.com/heroku/heroku-buildpack-nodejs

COPY . /

RUN /tmp/buildpacks/heroku-buildpack-nodejs/bin/compile / /cache /env

ENV PATH="/.heroku/node/bin:${PATH}"

EXPOSE 8080
CMD [ "npm", "start" ]
