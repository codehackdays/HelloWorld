FROM heroku/heroku:16

RUN curl --location --silent https://github.com/gliderlabs/herokuish/releases/download/v0.3.28/herokuish_0.3.28_linux_x86_64.tgz \
		  | tar -xzC /bin
RUN herokuish buildpack install

# Create app directory
RUN mkdir -p /app/user
WORKDIR /app/user

# Install app dependencies
COPY package.json /app/user
#RUN npm install

# Bundle app source
COPY . /app/user

EXPOSE 8080
CMD [ "npm", "start" ]
