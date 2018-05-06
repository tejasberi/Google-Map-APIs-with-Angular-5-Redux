# Taxi booking form
 
- Web application that will query Google Maps API to get route, distance and travel time between 2 locations across australia.

## features

- Web page created as per the suggested design
- Pick-up and drop address has autocomplete feature which fetches the data from google map APIs
- Accepts only Australian addresses
- Pick date and time can only be within next 48 hours
- Accepts only Australian mobile numbers
- Displays a map with markers at pickup and drop, map also shows the route
- Trip can be saved on clicking the save button
- Saved trip is displayed in a tabular format which reads data from Redux store
- Only 1 trip can be saved from each timezone
- Save button also triggers validations on empty or invalid fields
- Version controlled using GIT
- Web page is made responsive using Bootstrap 

# Technologies used

- Angular 5
- Redux
- Bootstrap 3
- Jasmine
- Google map APIs

# Technical features

- Have added sample Jasmine unit tests on app.component.
- Generates a code coverage report using istanbul-reporter
- Use of common component for address search fields
- Use of pipes to format the data on UI
- Separation on concern by decoupling business logic from controllers into Services
- Use of Redux demonstrating actions and reducers
- Code could be compiled for production using command `ng build --prod`. This generates a package which can be deployed on servers/ AWS

# Pre-requisites

1. Install node
2. Install angular CLI

# Steps of use:

1. Clone the project
2. Run command 'npm install'
3. Run command 'npm serve' to serve the project
4. Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

# Running unit tests

- Run ng test to execute the unit tests via Karma. Sample jasmine-unit-tests have been written for the app-component.

