# Hostal Saez https://travis-ci.org/fquevedo/hostalsaez.svg?branch=master

Hostal Saez its the first version of a project web page developed for a small hostel business

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Also will give you an example of how to running the project on cloud services using heroku and mLab as database service. 

### Prerequisites

#### Local
* Node.js + npm [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* GIT installed [https://git-scm.com/downloads](https://git-scm.com/downloads)

#### Heroku
* Heroku account [https://signup.heroku.com/](https://signup.heroku.com/)
* Heroku command line interface (CLI) [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

#### Optional

* mLab [https://mlab.com](https://mlab.com)

#### Install via git clone

```
$ git clone https://github.com/fquevedo/hostalsaez
$ cd hostalsaez
$ npm install 
```

### Heroku configuration

We will use `examplename` as app heroku name

```
cd hostal saez
heroku login
heroku create examplename

git init
heroku git:remote -a examplename
git add .
git commit -m "first git heroku commit"
git push heroku master

```

#### Parameters Setting

Setup `url` and `mongodb` variables in [`server.js`] file located in root folder project

For use heroku set app domain  as url value:

```
url = 'https://examplename.herokuapp.com'
```

MLab mongodb database for test purpouses:

```
mongodb = 'mongodb://testuser:Test123@ds157819.mlab.com:57819/testing'
```

## Running the tests

For test in your local machine use [https://127.0.0.1:3001](https://127.0.0.1:3001).

For test in heroku use https://examplename.herokuapp.com

## Built With

* [Node.js](https://nodejs.org/es/) - JavaScript runtime built 
* [Heroku](https://www.heroku.com/) -  Cloud plataform services
* [GIT](https://git-scm.com/) -  Version control system
* [PostCSS](http://postcss.org/) -  Tool for transforming CSS with JavaScript

## Authors

* **Fernando J. Quevedo** - *Initial work* - [fquevedo](https://github.com/fquevedo)
