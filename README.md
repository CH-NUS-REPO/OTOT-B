# Running locally

```sh
$ docker-compose up --build
```

# Deployed Endpoint

https://otot-b-4zvqq6zmhq-as.a.run.app/

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