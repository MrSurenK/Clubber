# Clubber
A club CRM app created to help managers in clubs manage their membership status and keep track of payments <br/>
![Dashboard](front-end/Clubber-CRM/screenshots/Dashboard.png)

## Table of Contents:
1. Getting Started
2. Link to API documentation
3. Technologies Used
4. Front-End Libraries used
5. Back-End libraries used
6. Key Features
7. Credits 
8. Future Improvements 


## Getting Started 
1. Setup Back-End:
   >Create a .env file with the following varibles
     ```
     SERVER=5001
     DATABASE="Key in your MongoDB database"
     ACCESS_SECRET="YOU RANDOMLY GENERATED STRING"
     REFRESH_SECRET="YOU RANDOMLY GENERATED STRING"
     ```
      
   *In backend terminal:(Clubber
/back-end/)*
   ```
   npm i
   ```
   
   ```
   npm run dev
   ```
3. Setup Front-End:
   >Creat a .env file with the following variables
   ```
   VITE_SERVER=http://localhost:5001
   ```

   *In frontend terminal:(Clubber/front-end
/Clubber-CRM/)*
   ```
   npm i
   ```
   
   ```
   npm run dev
   ```
   
  
5. Login Credentials 
   - Manager Account <br/>
     Email: ```manager@test.com``` <br/>
     Password: ```123456``` <br/>
     
   - Minion Account <br/>
     Email: ```minion@test.com``` <br/>
     Password: ```123456``` <br/>
   - Member Account <br/>
     Email: ```member@test.com``` <br/>
     Password: ```12345678```

   >Login Page
   ![Login Page](front-end/Clubber-CRM/screenshots/LoginPage.png)
   

  
6.  To set up your own accounts before trying out the CRM system:
    - Download and install Postman
    - npm run dev the server folder 
    - Creat a new environment variable with initial and current value ```http://127.0.0.1:5001```
    - Creat a new collection and select ```PUT``` followed by ```{{server}}/auth/register```
    - In the body, feed the JSON as follows: *(More information regarding the input constraints and user modal schema and the auth validators)*
 ```
   {
      "email": string,
      "hash",
      "isActive": boolean,
      "name": string,
      "isStaff": boolean,
      "staffRank": string,
      "isMember": boolean,
      "memberRank": string,
      "barTabActive": boolean,
}

  ```
   - If you see ``` { status: "success", msg: "registration successful" } ``` in Postman then the account has been successfully created.

8. After, setting up the above, use any of the login credentials to access the site. Login credentials grant/deny access to features of the web applicaition.
   - **Manager Account**: Full access to CRM *(staffRank:Manager)*
   - **Minion Account**: Same access to CRM but does not have the option to delete staff or members *(staffRank:Minion)* <br/>
     ![Manager Member Portal](front-end/Clubber-CRM/screenshots/ManagerMember.png)
     ![Minon Member Portal](front-end/Clubber-CRM/screenshots/MinionMember.png)
   - **Customer Account**: Access to Customer portal only *(isMember:true)* <br/><br/>
     ![Customer Portal](front-end/Clubber-CRM/screenshots/CustomerDashboard.png) <br/>
    *Staff accountsabove also have access to customer accounts as they are customers of Clubber. Once logged in Staff can switch to the customer portal through the available buttons in the header*

9. Navigate through the site with the sidebar and the top navigation menue.
10. To get back to the login page or switch accounts, delete all the endpoints except for the local host. eg.```http://localhost:5173/```

## Link to API documentation
https://docs.google.com/spreadsheets/d/1FmVztUn2-Sr114CnifQ51lseAS8ftadl1j_gChNGzxg/edit#gid=0

## Technologies Used:
**Front-End**
- React
- Material UI <br/><br/>

**Back-End**
- Express.js
- Mongoose
- MongoDB (NoSQL)

## Front-End Libraries Used: 
1. React Router Dom v6.15.0
```
npm i react-router-dom
```
3. Material UI v5.14.5
```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/x-date-pickers
```
6. UUID v9.0.0
```
npm install uuidv4
```
8. qrcode.react v3.1.0
```
npm install qrcode.react
```
10. Chart.js v4.3.3
```
npm install chart.js
```
12. jwt-decode v3.1.2
```
npm i jwt-decode
```


## Back-End Libraries Used: 
1. express v4.18.2
```
npm install express
```
2. express-validator v7.0.1
```
npm install express-validator
```
3. dotenv v16.3.1
```
npm install dotenv --save
```
4. cors v2.8.5
```
npm install cors
```
5. bcrypt v5.1.1
```
npm install bcrypt
```
6. helmet v7.0.0
```
npm i helmet
```
7. jswonwebtoken v9.0.1
```
npm i jsonwebtoken
```
8. moment-timezone v0.5.43
```
npm i moment-timezone
```
9. mongoose v7.4.3
```
npm i mongoose
```
10. UUID v9.0.0
```
npm install uuidv4
```
11. nodemon v3.0.1 (dev dependency)
```
npm i nodemon -D
```

## Key Features:
- Login & Registration w/ Access & Refresh Tokens
- Authentication
- User Management: View Users, Update Users, Delete Users
- Customer Interface:
  - Allows for customer to view membership details including QR code with their memberID
  - can change their password too.
- Staff Interface:
  - Bar Tab: View & Update purchases placed on a bar tab made by a member
  - Revenue & Payables Tracking: using the transactions that are logged, managers can keep track of overdue payments
  - Reservations: Help manage reservations
  - Dashboard: Helps manager get a snapshot of how the club is doing at a glance

## Credits 
@Professed5733 <br/>
@melho87 <br/> 
@MrSurenK <br/>

## Current Bugs:


## Future Improvements:
- Customer Interface to include view of their own transactions and their own reservations
