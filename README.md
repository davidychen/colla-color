# colla-color

A cooperative color filling game, which uses meteor, react.js and mongodb. You can fill color in the areas of a painting, view all paintings edited by all and create your own color filling template.

# Deployment

Deployment is using heroku. The link is here: https://colla-color-app.herokuapp.com.

# Requires

Node
meteor
react

# Usage

Clone the repo, then open the terminal on the folder created and run

```
git clone https://github.com/davidychen/colla-color.git
cd colla-color
meteor npm install
meteor reset
meteor
```


Which will run the front-end development server on the port 3000, then visit (http://localhost:3000) and you should see the app running. The database is running on port 3001.

# Database

You can either use a local meteor database or a cloud database. If you need to use a cloud database, Just set your database url as variable MONGO_URL in .env as an environment variable. It has 2 collections: area, colorBoard.


# Author
[Shuomin Wu](https://simonwux.github.io/)
[Yifei Chen](http://davidychen.com/HomepageDavidChen/)

# Screenshots
![ScreenShot](https://github.com/davidychen/colla-color/blob/master/screenshots/1.PNG)
![ScreenShot](https://github.com/davidychen/colla-color/blob/master/screenshots/2.PNG)
![ScreenShot](https://github.com/davidychen/colla-color/blob/master/screenshots/3.PNG)
![ScreenShot](https://github.com/davidychen/colla-color/blob/master/screenshots/4.PNG)

# Demonstration Video


# Class Link
[CS-5610 Web Development Spring 2019](http://johnguerra.co/classes/webDevelopment_spring_2019/)

# License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
