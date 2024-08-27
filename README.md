# helpm8

To start working on the project you can either: 
  - clone the repository from Github
  - use the ZIP file attached

# Client Setup
1. Navigate to the client directory:
 - cd client

IMPORTANT: Steps 2 and 3 are mandotory only if pulling the repo from Github.

2. Install node modules:
 - npm install

3. Install Tailwind CSS and DaisyUI:
 - npm install tailwindcss daisyui

 # Server Setup
 1. Navigate to the server directory:
  - cd ../server
  - npm install
  - npm install express mysql2 cors jsonwebtoken

# Application start

1. You need to first start the server-side application. The database will be initialised automatically.
 - node index.js

2. You can now start the client-side application, as well.
- cd ../client
- npm start 