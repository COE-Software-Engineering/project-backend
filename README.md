# project-backend

This is the backend of the virtual classroom project.
The technoologies used are nodejs, express and postgresql

### NOTE!!

After clonning the backend, run "npm install" or "yarn" to install the packages used in the project.

### Starting the backend

Just run "npm run start" or "npm start" or "yarn run start" depending on the package manager you used for installing the modules.
port is "localhost://3000"

### End point explanations

#### <ins>Lecturer endpoints</ins>

- **http://localhost:3001/lecturers/signup** <br>
  - Parameters:
    - `staff_id` - The staff id of the lecturer
    - `email` - The email address of lecturer
  - Returns:
    - json containing `array` of `error codes`. In the event where all user inputs were valid and the user request was successful, an empty list is returned

<br>

- **http://localhost:3001/lecturers/signin** <br>
  - Parameters:
    - `email` - The email address of the lecturer
    - `password` - The password of the lecturer
  - Returns:
    - json containing object with two properties `errorCodes`, the errors if any and `userInfo`, the information of the user.
      Note that the userInfo is empty if an error was encountered during sign up

<br>

- **http://localhost:3001/lecturers/change_password** <br>
  - Parameters:
    - `staff_id` - Staff id of lecturer
    - `current_password` - The current account password
    - `new_password` - the new password to change to
    - `new_password_confirm` - must match the `new_password`
  - Returns:
    - json containing `array` of `error codes`. In the event where all user inputs were valid and the user request was successful, an empty list is returned

<br>

- **http://localhost:3001/lecturers/make_announcements** <br>
  - Parameters:
    - `title` - the title of the announcement
    - `content` - the content of the announcement
    - `id` - the id of the lecturer posting the announcement
  - Returns:
    - json containing `array` of `error codes`. In the event where all user inputs were valid and the user request was successful, an empty list is returned

<br>

#### <ins>Student endpoints</ins>

- **http://localhost:3001/students/signup** <br>
  - Parameters:
    - `index_number` - The index number of the student
    - `email` - Email address of student
  - Returns:
    - json containing `array` of `error codes`. In the event where all user inputs were valid and the user request was successful, an empty list is returned

<br>

- **http://localhost:3001/students/sign** <br>
  - Parameters:
    - `email` - Email address of student
    - `password` - Password of student
  - Returns:
    - json containing object with two properties `errorCodes`, the errors if any and `userInfo`, the information of the user.
      Note that the userInfo is empty if an error was encountered during sign up

<br>

- **http://localhost:3001/lecturers/change_password** <br>
  - Parameters:
    - `index_number` - Index number of student
    - `current_password` - The current account password
    - `new_password` - the new password to change to
    - `new_password_confirm` - must match the `new_password`
  - Returns:
    - json containing `array` of `error codes`. In the event where all user inputs were valid and the user request was successful, an empty list is returned

<br>
