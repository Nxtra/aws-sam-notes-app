# AWS SAM notes app


## Description
AWS serverless demo application using SAM, API-gateway, Lambda and Dynamo DB

## Why use gradle?
* Build both nodejs and java modules with minimal prerequisites (only Java is required)
* Gradle makes it easy to transparently download and start a local Dynamo DB

## Build
Run `gradlew build`

The tests start a local Dynamo instance that requires native libraries. These libraries are downloaded by the
 gradle build in _build/test-libs_.
 
The local Dynamo instance also requires (dummy) credentials. Either create a file in your user home dir
 _${user.home}/.aws/credentials_ (fake credentials suffice for local development):
 
 ```
[default]
	aws_access_key_id ="id"
	aws_secret_access_key ="key"
```

or set the _AWS_ACCESS_KEY_ID_ and _AWS_SECRET_ACCESS_KEY_ environment variables.

## Run local dev
* Create a docker network so that sam can connect to the dynamodb docker: `docker network create lambda-local`
* Create a docker network for local DynamoDB: `docker run -d -v "./build":/dynamodb_local_db -p 8000:8000 --network lambda-local --name dynamodb cnadiminti/dynamodb-local`
* Start local DynamoDB: `docker start dynamodb`
* Start sam local: `sam local start-api --docker-network lambda-local`
* Start the watch task ik a terminal (continuous build): `gradlew watch`
* Navigate to http://127.0.0.1:3000/info
