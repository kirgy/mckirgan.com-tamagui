---
title: 'Christmas with React Native Web & WebSockets'
publishedDate: '2021-01-17T11:00:00.000Z'
articleReadTimeMinutes: 7
imageBanner: '/blog/christmas-with-react-native-web-and-websockets/banner.png'
metaDescription: 'A pandemic Christmas made more interesting with React Native Web.'
metaKeywords: 'react native web, react native, expressjs, ES6, Javascript, pandemic, christmas'
metaImageFacebook: '/blog/christmas-with-react-native-web-and-websockets/banner.png'
metaImageTwitter: '/blog/christmas-with-react-native-web-and-websockets/banner.png'
---

_Note: the image for this article was generated using DALL-E 2_

# Solving the problem of a pandemic Christmas

Christmas 2020 was always going to be a different kind of Christmas. Apart from an hour of distanced meeting in my mum's garden, our family decided to do Christmas remotely this year - given the growing danger of the pandemic. As with many families this was challenging, and I wanted to make this somewhat special so I put on my dev hat and got planning.

In the era of Zoom quizzes I wanted to reinvent this tried and tested method of remote fun and put my own twist. Using zoom as a platform for hosting a game show of sorts seemed like a fun idea, but Zoom doesn't naturally lend itself to that. Many different formats of gameshows run through the use of a buzzer button, opening a variety of doors in how to potentially operate a gameshow. I decided implementing a button buzz-in system would enable me to host a game show where guests could buzz-in, the game would understand who buzzed-in and record their buzz order.

![Preview of the app](https://media2.giphy.com/media/nmmA8UfEOkA0O2ky0Y/giphy.gif)

# The MVP

In order to realistically develop an MVP I chose to implement the following as a basic product specification;

- Admin can create a game
- Admin can share a game so guests can join
- Admin can enable/disabled buzzers
- Admin can clear buzzers (buzzer list is emptied)
- Admin can increment/decrement score against a guest
- Admin can share a list of guests, guest score, guest buzz status, guest buzz order
- Guests can join the game on their phone
- Guest can buzz in
- Guest can see names, scores, buzz status, buzz orders of other guests

# Unique architecture challenges

There were unique challenges with this project, the foremost was the issue of guests and the admin getting fast real-time responses of the buzz-ins. It wouldn't cut it having network delays causing one guests' to arrive at the hosted admin in a non-chronological order. Likewise, guests should receive updates of guests instantly in order for the system to be fair.

In my eyes this is not a good use of HTTP. HTTP does not simply allow peer-to-peer (P2P) communication channels. There are ways in which to achieve real-time communication through HTTP, such as long-polling in which a HTTP connection remains open until there is a response. Although this method is used by mammoths such as Facebook, it is largely done so for backwards compatibility reasons, not because of the technical advantages. My user base would all be using modern mobile devices.

The solution I chose was using WebSockets. Websockets enable a client to create an open connection with a server and receive messages over the open TCP connection without the addition workarounds of repeat-polling or long-polling to overcome the synchronous nature of HTTP.

As a largely PHP developer websockets bring other challenges. PHP is a synchronous language, and does not lend well to websockets. It can be done, but it felt like a square pen and a round hole. Instead I chose to use Javascript ES6 in the form of ExpressJS. I chose a message-based architecture as this closely matched the pattern used by Websockets.

Essentially the client and server shared a set of constants which described request messages, and response messages. A client would send a request message to server, the server added the message to a Redis persistent queue, a Redis queue listener routed a message to a controller, the controller processed the message, and finally the controller routed responses to clients.

# Creating learning opportunities

I stand by the philosophy that everything should be a learning opportunity, and when we're doing something that's not important, we should be creating learning opportunities. If we are not creating learning opportunities we are not making valuable use of our time.

For this project I chose to build the client app using React Native Web (RNW). React & React Native to me is the cross-platform utopia we've been waiting for, well, perhaps not but it comes close. React Native Web is a build platform from React Native which builds web applications in ReactJS. It seems somewhat counter intuitive to build a web application by writing web code designed to compile to native code - a kind of 2-layer abstraction. But the result is you have one source code for your web, android, iOS, OSX, even Tizen TV applications. It does take more effort, and in a real world the advantages would need to far outway the costs of additional abstraction. Nonetheless, for this learning opportunity, it's perfect.

I've written ExpressJS applications before, most notably a home-brewed Philip Hue light and automation system - my first attempt are websocket based hardware communication (a post for another day). As I wanted more ES6 experience, especially on the server-side, I chose to expand my ExpressJS experience with this project.

Redis is a queue system that's fairly simple, and I've had more than my share of experience with other queue systems, but I hadn't had much practical experience with Redis first hand, so Redis seemed like a good marrying of meeting my MVP and learning opportunity needs.

# The Beta Test

When Christmas day rolled around I kept this little app as a surprise. Partly so guests had a bit more fun thinking this was just going to be yet another Zoom quiz (lower their expectations!), but also to use this as a learning opportunity in itself.

Further to the learning aspect, I chose to break the quiz down into rounds which instead of hosting different topics, instead hosted different game types. The premise was the same - buzz in when you're ready, and if multiple people buzz-in then we go down the list one and a time. Here's a list of some of the rounds and the rules;

- Christmas movie questions
  -- obscure questions from Christmas movies, 1st to know the answer - buzz in
  -- _Verdict_: This worked well, it was familiar to what they expected and the buzzers worked perfectly.
- Celebrity impressions
  -- I had written an obscure biography of various famous people (mostly Christmas related). The descriptions start off very obscure and grow more obvious as they are read. Guests buzz-in once they think they know the answer - but instead of giving me the name, they have to do an impression. I.e. Father Christmas, Arnold Schwarzenegger, Donald Trump.
  -- _Verdict_: This was the best round in my opinion. People were listening intently and were racing to buzz in. Where people made mistakes it gave others opportunity to confer. It naturally worked with the presentation method and the platform.
- Finish the Christmas song
  -- I read out the start of a lyric, once they know, they buzz in and have to sing the rest.
  -- _Verdict_: This worked, but didn't let too well to the platform, people kept singing with their mic muted! Ooops.
- Anagrams
  -- Players were presented with anagrams on Countdown style and had to buzz in once they had it.
  -- _Verdict_: This was very fun for the players, one of the better options.
- Scavenger Hunt
  -- I would list an item, first player back holding it as they buzzed won
  -- _Verdict_: Surprisingly engaging! Didn't work well for my wheelchair bound mother, however...

# Conclusions

As an experimental platform this functioned as expected. We had no bugs on the night which surprised me a lot given the cramped timeframe I had to build it, and that tested was largely manual. This system worked well with a game admin that knew the limitations of the system, had planned well in advance and was able to assist and answer questions at the start.

This is where it falls down. The issues were developing this further - selling this concept is difficult. People host zoom quizzes because the barrier to entry is small. They don't need to learn something or become an IT technical support guru. If I were to develop upon this, I would first try to better understand how to guide admins through the system. One way to do this may be to implement the quiz steps which I had done via a word document, and read off of through Zoom. If this was a guided process in the software the admin user would be better equipped to host with significantly less barriers to entry.

A further way to do this would be to entirely automate the admin process - an admin would then become a player and be able to play along, and the system would automate the judging process. This would rule out some game types, such as the scavenger hunt - and for others - change their judging method. For example in the anagram round the player may enter their answer in a box on their phone.

# Finding the source code

At this time I'm debating whether to continue development, and ultimately publish a mobile app to the app stores so unfortunately source code is not public. If this plan drops within the next year, I'll publish it on my github. So check there, future readers!
[https://github.com/kirgy](https://github.com/kirgy)
