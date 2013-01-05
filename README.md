Gooyand
================

A remake of [gooya.com][1] by [commeng.org][2].  
Web should be clean, simple, and beautiful.

To Run
-----------------
    git clone https://github.com/shezarkhani/gooyand.git
    cd gooyand
    cd app
    npm install
    node app

Note
------------------
Sample data is provided to get the site running. To import the data into your mongoDB instance, do the following:

1. Run the app and go to `localhost:3000/setup` with your browser
2. *optional* Remove `app.get('/setup')` 
3. *optional* Disable the setup page in `app.js` `CONFIG`

Created By
---------------------
Sasan Hezarkhani  
Kousha Talebian

License
-----------------------


The MIT License (MIT)

Copyright © 2013 Sasan Hezarkhani and Kousha Talebian (http://github.com/shezarkhani, http://github.com/ktalebian)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: http://www.gooya.com
[2]: http://web.commeng.org
