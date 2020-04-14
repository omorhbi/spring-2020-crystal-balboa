# Supperwhere

Supperwhere is an application that allows users to figure out dining recommendations based on their dietary preferences and meal history. The app will help locate restaurants for the user based on those preferences. The application aims for making the dining experience more convenient for the user by providing quick and easy options for them to use to tailor their preferences. 

## History

The idea for Supperwhere comes from a commonly recurring dillema: What do I eat for dinner? The decision making process for what to get for dinner can be a huge time-sink, and often times leaving the decision to chance can result in regret or second guesses. The idea for supperware was to use data to justify an optimal dinner decision, rather than just a random suggestion, or flipping a coin.

## Contributing to the Project

[Contributing](https://github.com/nyu-software-engineering/spring-2020-crystal-balboa/blob/master/CONTRIBUTING.md)

## Prototype Link

[Prototype on Invision](https://projects.invisionapp.com/share/MGW6PTTJ4HP#/screens/407491823_Login_Page)

## Running the Project for Sprint 2

1. Go to [Zomato's API credentials](https://developers.zomato.com/api#headline2) page to generate a free key.
2. cd into the front-end folder from the app directory. npm install to make sure you have all the dependencies on that folder. Then input npm start to start the react portion of the app, which will send you to the homepage.
3. cd back to the back-end folder from the app directory.
4. To run the back-end, first export the API key into the root directory of the back-end folder. Type in verbatim export ZOMATO_API_KEY="insert_api_key_here". 'Insert_api_key_here' means the API key must be pasted here inside quotes.
5. Once it's exported, npm install on the back-end folder to be safe in terms of having all the dependencies for express and Zomato.
6. Once that's set up, do npx nodemon server to start the server, and you're all set.