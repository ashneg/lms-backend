# Assignment
For the given assignment the following tech-stack is suited best:

- **Nodejs** 
- **MongoDB**
- **Express**


### Way to replicate

 1. Clone the repo
 2. "npm i" to install dependencis
 3. "npm start" to run locally
 The backend is also hosted via heroku @ https://flurn.herokuapp.com


## API Endpoints



|         Operations                       |               routes                          
|------------------------------------------|---------------------------------------|
|(Get) the list of all loans			   |{host}/loans			        	   |
|(Get) loans with certain status/amounts   |{host}/loans?:status?:loanAmountGreater|
|(Get) loan with a particular id           |{host}/loans/:id                       |
|(Post) Save loans	         			   |{host}/loans                           |
|(Put) Approve/Deny status   		       |{host}/loans/:id                       |
|(Delete) Delete a loan      			   |{host}/loans/:id					   |


This is the base project and could be enhanced by using middleware so that user and admin could see have their accessibility range. Further validators like joi could be used for schema validation so that certain params like phone No. could be of required length.