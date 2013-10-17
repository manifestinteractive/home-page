Home Page ( [Example](http://home.peterschmalfeldt.com) )
=========

This was a fun side project in preparation for the departure of iGoogle that I have been using as my home page for over 7 years.  It's setup as an aggregator of news, weather and bookmarks.  You should be able to take what I did here, and if you like it, make it into something useful for yourself.

Hit me up with questions or comments [@mrmidi](http://twitter.com/mrmidi)

-- Peter Schmalfeldt


![Sample 1](https://raw.github.com/manifestinteractive/home-page/master/img/sample/sample1.jpg "Sample 1")

![Sample 2](https://raw.github.com/manifestinteractive/home-page/master/img/sample/sample2.jpg "Sample 2")

** Background Image created, owned & all rights reserved by [Trey Ratcliff](http://www.stuckincustoms.com/trey-ratcliff/)

Demo URL
---

I use this for myself, so you can see my personal homepage here:

[**DEMO LINK:** http://home.peterschmalfeldt.com](http://home.peterschmalfeldt.com)

Weather
---

I have set this app up to use HTML GeoLocation to fetch your exact location so the weather you will see will always be for exactly where you are.

Fullscreen Support
---

I have built this to run as a fullscreen app for those that might have an extra monitor they want to throw this up on for something like a home automation system.

Responsive Design & Mobile Friendly
---

Great care was taken to make sure this worked on iOS & Android as well as varying Desktop screens.  In fact, if you are using iOS, you can add this app to your home screen and you'll get some nice icons and splash screens at launch.  I've also mimicked the iOS 7 3D wallpaper image so you can have fun playing with that.  If you hate it, that's cool too.  Just change the `use_ios7_bg_animate` in ./js/script.js to false and its gone.

Keyboard Shortcuts
---

You can use the following keyboard shortcuts to make things a little quicker:

	1 = Open Bookmarks
	2 = Open Google+ RSS Feed
	3 = Open Github RSS Feed
	4 = Open LinkedIn RSS Feed
	5 = Open Twitter RSS Feed
	6 = Open Technology RSS Feed

	r = Refresh Data
	f = Toggle Fullscreen
	m = Toggle Menu

RSS Feeds
---
I had to spend some time tracking down where to get reliable RSS feeds for my social networks.  Here are the ones I am using, and where to look for your RSS feed.


### Twitter

In order to get your Twitter working, you will first need to follow the instruction on this page:

[http://chrissimpkins.github.io/tweetledee/](http://chrissimpkins.github.io/tweetledee/)

Then, you just need to change the Twitter RSS URL in ./js/script.js to wherever you have your Tweedledee installed.  ( Look for the comment // Get my Twitter RSS Feed )

### Google+

I used a service I had heard good things about from people I trusted about [http://gplusrss.com](http://gplusrss.com/).

Setup there was pretty easy, I just had to approve their app request ( which was not asking for to much info ) and they gave me a URL.  Pretty straight forward.

### Github

Once you login to [Github](https://github.com/), go to the home page and look for the "News Feed" RSS link in the top right corner.  That's what you'll need.

### LinkedIn

The LinkedIn RSS feed is hard to find, but they do have a native RSS feed.

1. Login to [LinkedIn](https://www.linkedin.com)
2. Once you are logged in, mouse over your avatar in the top right corner and select the [Privacy & Settings](https://www.linkedin.com/settings/?trk=nav_account_sub_nav_settings) link
3. There will be a group of tabs under your profile info.  Click the **Account*** Tab
4. Click the link to **Get LinkedIn content in an RSS feed**
5. Choose **Enable** under **Turn on the feed for Network updates:**
6. The URL in the input field is what you need

### News

Here you can pretty much go wherever you want for news as most of them have an RSS link.  Just copy it and you're good to go.
