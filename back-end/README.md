## Technologies used

<h2>Folder Structure</h2>

<ul>
  <li>schemas - definintion of schemas and relationships among them</li> 
  <ul>
     <li>department.js, doctors.js, doctorsNurses.js, headDoctors.js, nurses.js, patients.js,treatment.js, users.js - defining raw schemas (tables) with their specific attributes i.e. without any foreignKeys</li> 
     <li>db.js  - defining all relationships between tables and sync-ing them</li>
     <li>dataInsertsInHospital.sql - admin side, inserting data in tables</li> 
  </ul>
  <li>services - main services used for fetching needed information about hospital</li> 
   <ul>
     <li>department.js, doctors.js, nurses.js, patients.js- the main functions which are called for showing information about hospital for doctor in font-end</li> 
     <li>users.js  -  singup and login (with JWT)</li>
   </ul>
  <li>passport- creating part of authentication </li> 
  <li>errors - separatly defining the errors which can be thrown </li> 
  <li>routes</li> - routing
   <ul>
     <li>users.js - endpoints for login page</li> 
     <li>home.js -  endpoints after login</li> 
   </ul>
  <li>server.js- running server side of the bak-end on [http://localhost:3030](http://localhost:3030)</li> 
</ul>