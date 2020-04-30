## Technologies used

<h2>Folder Structure</h2>

<ul>
  <li>schemas</li> - definintion of schemas and relationships among them
  <ul>
     <li>department.js, doctors.js, doctorsNurses.js, headDoctors.js, nurses.js, patients.js,treatment.js, users.js</li> - defining raw schemas (tables) with their specific attributes i.e. without any foreignKeys
     <li>db.js</li> - defining all relationships between tables and sync-ing them
     <li>dataInsertsInHospital.sql</li> - admin side, inserting data in tables
  </ul>
  <li>services</li> - main services used for fetching needed information about hospital
   <ul>
     <li>department.js, doctors.js, nurses.js, patients.js</li> - the main functions which are called for showing information about hospital for doctor in font-end
     <li>users.js</li> -  singup and login (with JWT)
   </ul>
  <li>passport</li> - creating part of authentication 
  <li>errors</li> - separatly defining the errors which can be thrown 
  <li>routes</li> - routing
   <ul>
     <li>users.js</li> - endpoints for login page
     <li>home.js</li> -  endpoints after login
   </ul>
  <li>server.js</li> - runnin server side of the bak-end on [http://localhost:3030](http://localhost:3030)
</ul>