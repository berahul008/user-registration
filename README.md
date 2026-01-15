```text
#Project Structure

frontend
├── package.json
├── public
│   └── index.html
└── server.js

backend
├── pom.xml
└── src
    └── main
        ├── java
        │   └── com
        │       └── example
        │           └── userapp
        │               ├── controller
        │               │   └── UserController.java
        │               ├── entity
        │               │   └── User.java
        │               ├── repository
        │               │   └── UserRepository.java
        │               ├── service
        │               │   └── UserService.java
        │               └── UserAppApplication.java
        └── resources
            └── application.properties


# Install the mysql server on Ubuntu
sudo apt-get install -y mysql-server
sudo service mysql status
sudo service mysql start
sudo mysql_secure_installation

# Change the permission
SET GLOBAL validate_password.policy = 0;
SET GLOBAL validate_password.length = 4;

# Change the root user pass
sudo mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'Admin@123';"
sudo mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;"
sudo mysql -u root -e "FLUSH PRIVILEGES;"

# Create new user for project.
sudo mysql -u root -e "CREATE USER IF NOT EXISTS 'rahul'@'localhost' IDENTIFIED BY 'Admin@2';"
sudo mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'rahul'@'localhost' WITH GRANT OPTION;"
sudo mysql -u root -e "FLUSH PRIVILEGES;"

# Create database for project.
sudo mysql -u root -e "CREATE DATABASE IF NOT EXISTS userdb; USE userdb; CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), email VARCHAR(150));"

# Clone project :

git clone https://github.com/berahul008/user-registration.git

# Execute project:
for backend :
option 1:
cd user-registration/backend/
nohup mvn spring-boot:run > backend.log 2>&1 &

option 2:
cd user-registration/backend/
mvn clean package
java -jar target/userapp-0.0.1-SNAPSHOT.jar

check the backend : 
curl -X POST http://localhost:8080/api/users/register \
-H "Content-Type: application/json" \
-d '{"username":"test","email":"test@email.com"}'

# Execute frontend :
node -v
npm -v

cd user-registration/frontend/
npm install <-- 1st time only
npm install express axios

node server.js   OR

nohup npm start > frontend.log 2>&1 &
