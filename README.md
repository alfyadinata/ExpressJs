<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h4>Express.js Application Setup</h4>

  <p>This guide will walk you through the steps to set up and run an Express.js application on your local machine.</p>

  <h2>Prerequisites</h2>
  <p>Before you start, make sure you have the following software installed on your computer:</p>
  <ul>
    <li>Node.js (version 12 or higher)</li>
    <li>npm (Node Package Manager)</li>
  </ul>

  <h2>Installation</h2>
  <ol>
    <li>Clone the repository:</li>
    <pre><code>git clone (https://github.com/alfyadinata/ExpressJs)</code></pre>
    <li>Navigate to the project directory:</li>
    <pre><code>cd express-app</code></pre>
    <li>Install the dependencies:</li>
    <pre><code>npm install</code></pre>
  </ol>

  <h2>Starting the Application</h2>
  <p>To start the Express.js server, use the following command:</p>
  <pre><code>nodemon start</code></pre>
  <p>This will launch the server, and you should see the following message in the console:</p>
  <pre><code>Server listening on port 3000</code></pre>

  <h2>Testing</h2>
  <p>To run the tests for the application, use the following command:</p>
  <pre><code>npx jest</code></pre>
  <p>This will execute the test cases defined in the <code>test/</code> directory.</p>

  <h2>Usage</h2>
  <p>Once the server is running, you can access the application by opening your web browser and visiting <a href="http://localhost:3000">http://localhost:3000</a>. You should see the application running and can interact with it as needed.</p>

  <h2>API Docs (don't forget to create env file based on .env.example)</h2>
  <h4> Sign Up </h4>
<img width="1349" alt="image" src="https://github.com/alfyadinata/ExpressJs/assets/42163566/714b7f3c-20d0-4ac9-977f-17fe413c5069">
  <h4> Sign In (past crud and import api with <i> Authorization myToken </i>) </h4>
  <img width="1356" alt="image" src="https://github.com/alfyadinata/ExpressJs/assets/42163566/06cbee6e-e049-4c78-b44b-62599ae19c84">
  <h4>Create User</h4>
  <img width="1347" alt="image" src="https://github.com/alfyadinata/ExpressJs/assets/42163566/55822ee3-1c7d-4d00-b746-67083d00bff1">
  <h4>Update User</h4>
  <img width="1361" alt="image" src="https://github.com/alfyadinata/ExpressJs/assets/42163566/d3bdc5d0-712f-47f1-9be4-470f5d1004e0">
  <h4>Import Csv User</h4>
  <img width="1440" alt="image" src="https://github.com/alfyadinata/ExpressJs/assets/42163566/57958376-45b6-40d0-b73d-5b01148f68d1">

  <h2>Contributing</h2>
  <p>Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.</p>

  <h2>License</h2>
  <p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>
</body>
</html>
