# Twitter BioCloud

Twitter BioCloud is a small project that is aimed to paint a picture of a Twitter user by using the Twitter bios of all the accounts a user follows. A word cloud is created that highlights the most commonly used words in all the bios.

![Alt text](/screenshot.png?raw=true "BioCloud Screenshot")

## Installation

Twitter BioCloud uses the node package twit for communicating with Twitter's API. Before running the server, install twit using ```npm install twit```

## Usage

Execute run.js to start the node web server ```node run.js```. Then go to ```http://localhost:8000``` in your browser.

## Contributing

1. Fork it🍴
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request🍕

## History

I often find myself stumbling upon new Twitter accounts and wondering what that person's intersets are before I follow them. More often than not, Twitter bios alone don't do justice. One day I had the idea of using the bios of all the accounts a user follows to create a word cloud highlighting most commonly used words amongst them all. Based on my limited testing, this has proven to paint quite an accurate picture of a user's true interests.

## Future plans
* Research Twitter's API rate limiting more deeply and see if I can host this web app publicly

## Credits

* Thanks to [timdream](https://github.com/timdream) for his awesome [wordcloud2.js](https://github.com/timdream/wordcloud2.js) javascript library
* Thanks to [ttezel](https://github.com/ttezel) for his awesome node twitter API client [twit](https://github.com/ttezel/twit)
* Thanks to [Bootstrap](http://getbootstrap.com/) for making it easy to make a little web app look kind of OK
* Thanks to [jessety](https://github.com/jessety) for helping me get over an initial speedbump

## License

The MIT License (MIT)

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
