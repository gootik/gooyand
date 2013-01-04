Gooyand
================

A remake of [gooya.com][1] by [commeng.org][2].  
Web should be clean, simple, and beautiful.

To Run
================
    git clone https://github.com/shezarkhani/gooyand.git
    cd gooyand
    cd app
    npm install
    node app

Note
================
Sample data is provided to get the site running. To import the data into your mongoDB instance, do the following:

1. Open `app.js`
2. Inside `get('/')` add the line `linkProvider.importLinks()`;
3. Run the app and go to `localhost:3000` with your browser
4. Make sure to remove the added line


[1]: http://www.gooya.com
[2]: http://web.commeng.org
