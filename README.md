# Auth-Server

### Overview
Auth-Server is a small API server that allows its users to create, authenticate, login, and delete a user from a local JSON file (*local database - users.json*).
It has four API end point:
|  API Endpoint  |                Expected Value               |               Retruned Value               |        Error Message       |
|----------------|---------------------------------------------|--------------------------------------------|----------------------------|
| ``/createUser``| ``{ username: Stirng, password: String }``  |              ``jwt = String``              |   ``{ message: String }``  |
| ``/login``     | ``{ username: Stirng, password: String }``  |              ``jwt = String``              |   ``{ message: String }``  |
| ``/auth``      |             ``{ jwt: String }``             |    ``{ uid: String, username: String }``   |   ``{ message: String }``  |
| ``/removeUser``| ``{ username: Stirng, password: String }``  | ``{ message: username + " is removed." }`` |   ``{ message: String }``  |

### Installation
The following steps explain the simple steps to run this server:

1. Clone the project into your machine
2. Make sure the **users.json** is just an empty array ``[]``
3. Open the **.env** file and replace ``"INSERT_SECRET_KEY"`` with your own secret key <ins>**(NO QUOTES)**</ins>
4. Open terminal ``cd`` into your directory and run ``node .``

### Testing
In order to run make sure that my tests are passing, make sure the that *users.json* is just an empty array ``[]``. After that, ``cd`` into the director and run ``npm run test``

### Notes to be aware of
in the file **db.js** there is a function named ``deleteUser(uid, username)`` on line 52. This function is responsible for receiving the uid and the username of a user and check it across the local databse (*users.json*) then removes the user. However, after removing it, it returns an array of all users as well as a boolean to confirm if the user is deleted or not ``return { newUsers, deleted };``. The ``newUsers`` array is returned for testing pusposes only. If this is being used to run the server, than it should only return the deleted variable in the object as follows ``return { deleted };``
