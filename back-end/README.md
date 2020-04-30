<h1>Hospital-managment back-end</h1>

In the project directory you can run: 

<code>node server.js</code> - this will the server side of the back-end on [http://localhost:3030](http://localhost:3030).

For runing the unit tests, you can run: <code>npm test</code>

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