# MERN Assessment Project

## Developers

After individual works done on individual workstations, all works are submitted to the central repository https://github.com/ahkoh/mern-tryout . There could be separate branches for production and development purposes.

## System Administrators

System admin can manage deployments from Netlify and Heroku online console, and both are integrated to Github. MongoDB is managed online also via management console.

## End Users

User navigates to https://koh-web.netlify.app/ in web browser for all the user interface (UI). Underhood the action requests are sent to https://koh-app.herokuapp.com/, while UI responses will be handled at client-side at https://koh-web.netlify.app/ .

![Diagram](https://raw.githubusercontent.com/ahkoh/mern-tryout/main/README_diagram.jpg)

## localhost instructions
1. git clone this repo
1. copy .env-sample into .env then edit
1. run "npm install"
1. inside session.js, change secure cookie to false
1. run "npm start"
