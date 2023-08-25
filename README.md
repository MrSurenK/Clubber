# Clubber
A club CRM app created to help managers in clubs manage their membership status and keep track of payments

##Table of Contents:
1. 

## Link to API documentation
https://docs.google.com/spreadsheets/d/1FmVztUn2-Sr114CnifQ51lseAS8ftadl1j_gChNGzxg/edit#gid=0

## Technologies Used:
- Mongoose DB
- React
- Material UI

## Libraries Used: 
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

## Current Bugs:


## Future Improvements:
- Customer Interface to include view of their own transactions and their own reservations
