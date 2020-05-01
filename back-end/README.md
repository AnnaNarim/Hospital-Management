<h1>Hospital-managment back-end</h1>

In the project directory you can run: 

<code>node server.js</code> - for running the server side of the back-end on [http://localhost:3030](http://localhost:3030).

<code>npm test</code> - for running the unit tests

<i>As the project assumes that this is a platform for doctors, it is assumed that before doctor's use, some data is already added by admin. That is why, before the doctor is enabled to login, the following steps are done by us as admins:</i>

<ol>
  <li>For creating the database - run db.js file with uncommenting 105th line. This will allow to create the schemas which are defined in schemas folder</li>
  <li>For inserting the inital data (departments, doctors, patients, nurses, headDoctors, etc.) which must be added by admin- run dataInsertInHospital.sql file from schemas folder</li>
  <li>For signing up doctors, who can later login to their pages - use <a href="http://localhost:3030/users/signup">http://localhost:3030/users/signup</a> endpoint, which takes the email of doctor and password, checks that there is a doctor in our database with specified password and also checks that specified doctor does not already have an account, then, if everything is right, it creates the account, thus doctor can already login his/her page.</li>
</ol> 

<h2>Technologies Used</h2>

<ul>
  <li>Server side is <a href="https://github.com/nodejs">Node.js</a> with <a href=https://github.com/expressjs/express>Express</a> framework</li>
  <li><a href="https://sequelize.org/">Sequelize</a> is used as Node js ORM for mapping information between database (MySQL) and Node.js</li>
  <li><a href="http://www.passportjs.org/">Passport</a> (authentication middleware for Node.js) and <a href="https://jwt.io/JSON "> JWT Web Token</a> are used for authenitication</li>
  <li>MySQL is used as Relational Database management system</li>
</ul>

<h2>Folder Structure</h2>

<ul>
  <li>schemas - definintion of schemas and relationships among them</li> 
  <ul>
     <li>department.js, doctors.js, doctorsNurses.js, headDoctors.js, nurses.js, patients.js,treatment.js, users.js - defining raw schemas (tables) with their specific attributes i.e. without any foreignKeys</li> 
     <li>db.js  - defining all relationships between tables and sync-ing them</li>
     <li>dataInsertsInHospital.sql - admin side, inserting data in tables</li> 
  </ul>
  <li>services - main services used for fetching needed information about hospital which doctor will need to see and edit</li> 
   <ul>
     <li>department.js, doctors.js, nurses.js, patients.js- the main functions which are called for showing information about hospital for doctor in font-end</li> 
     <li>users.js  -  singup and login (with JWT)</li>
   </ul>
  <li>passport - creating part of authentication </li> 
  <li>errors - separatly defining the errors which can be thrown </li> 
  <li>routes</li>
   <ul>
     <li>users.js - endpoints for login page</li> 
     <li>home.js -  endpoints after login</li> 
   </ul>
  <li>server.js- running server side of the bak-end</li> 
  <li>tests - some unit tests for testing the work of services </li> 
</ul>