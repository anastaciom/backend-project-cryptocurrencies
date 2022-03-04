# Backend built in nodejs, through TDD tests.

### Routes:

- #### Jwt authentication routes (SignIn, SignUp with email sending)
- #### Admin user route
- #### "Forgot password" route (Sending recovery token by user's email.) and "reset password" route
- #### Dashboard route, where Coingecko cryptocurrency API is used

---

### Data base:

- **MongoDB**

---

## Dependencies:

- **axios**
- **bcryptjs**
- **cors**
- **dotenv**
- **express**
- **googleapis**
- **jsonwebtoken**
- **mongoose**
- **nodemailer**
- **nodemailer-express-handlebars**
---
## DevDependencies:

- **@shelf/jest-mongodb**
- **jest**
- **nodemon**
- **supertest**
---

## Git Clone:

### First run the command to clone the project on your machine:

    git clone  https://github.com/anastaciom/backend-project-cryptocurrencies.git

### Enter the project folder:

    cd backend-project-cryptocurrencies

### Inside the "backend-project-cryptocurrencies" folder, install all dependencies by running:

    npm install


### Now, to run the project:

    npm start or npm run dev (nodemon) 

### ⚠️⚠️ Don't forget to add your values in the environment variables. The variable names are in the ".env.example" file. ⚠️⚠️
### will run at http://localhost:3001/
---

## Test Report

![](./readmeAssets/imgTests.png)


---
