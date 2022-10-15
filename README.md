# Running locally

```sh
$ docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build
```

# Deployed Endpoint

This app is also deployed on Google Cloud Run, which could be accessed through this url: https://otot-b-4zvqq6zmhq-as.a.run.app/. 

The deployed process is as follows:
1. Create a MongoDB free tier cluster on [MongoDB cloud](https://cloud.mongodb.com/). Whitelist the connection of `0.0.0.0/0` to allow all external connections.
1. Build the Docker image and push it to Google Artifact Registry.
1. Setup Google Secret Manager and input the MONGO_URI to be the url of the mongodb cluster we just created (with username and password).
1. Configure Cloud Run to pull from that image and use the secret we just created. Make sure the service account has the permission to the secret.

After that, Travis CD is setup to update the artifact registry. The steps to setup are as follows:
1. Download the json key of the service account, encrypt it and add it to `.travis.yml` using `travis encrypt-file client-secret.json --add`. Make sure the service account has the role `roles/run.invoker`. Add the encrpted json file to this repo.
1. Update the `env` fields in `.travis.yml` to corresponding Cloud Run project details. 
1. Once travis CI passes the tests, the updated image will be deployed to Cloud Run automatically.

# API
- `GET /user/all` - List all the registered users
- `POST /user/add` - Create and add a user
    - Expected data (json): 
        ```json
        {
            "first_name": "first_name", 
            "last_name": "last_name", 
            "email": "email"
        }
        ```
- `PUT /user/update` - Update the user data for user with the provided email
    - Expected data (json):
        ```json
        {
            "first_name": "first_name", 
            "last_name": "last_name", 
            "email": "email"
        }
        ```
- `DELETE /user/delete` - Delete the user that associates with the email
    - Expceted data (json):
        ```json
        {
            "email": "email"
        }