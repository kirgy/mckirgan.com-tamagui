---
title: 'Coding emails is hard'
publishedDate: '2020-04-16T11:00:00.000Z'
articleReadTimeMinutes: 6
imageBanner: '/blog/coding-emails-is-hard/banner.png'
metaDescription: 'HTML email development is not for the faint-hearted'
metaKeywords: 'HTML email, bristol, email strategy'
metaImageFacebook: '/blog/coding-emails-is-hard/banner.png'
metaImageTwitter: '/blog/coding-emails-is-hard/banner.png'
---

Since 2012 I've been routinely coding bespoke HTML emails for SME's. Half of the time I get a phone call from frustrated project managers and team leads who have found out the hard way that coding HTML emails is not like coding for the web. If you are one of those unfortunate souls, believe when when I say I understand your pain.

If you're considering taking on a custom HTML email build, hopefully this will act as a guide to why things are complicated and how you can go about coding your own HTML efficently and robustly as possible.

## It's about standards

Since the dawn of the World Wide Web there have been "standards" for HTML. This is largely thanks to the web being born in the world of CERN (home of the Large Hadron Collider). Now days these _standards_ are maintained by a open consortium called the [W3 Consortium](https://www.w3.org/).

A standard is all well and good, but why do they need to exist? Well it's to do with those individuals and companies who are progressing the technologies beyond the realm of the current specification as well as the software clients which render that code. Simply put - the client and the server need to consistantly agree that a circle is round.

If a server outputs HTML and says a circle is square, and the client says a circle is round, then we have a problem. That's inconsistancy, and inconsistancy leads to huge problems for both the server trying to meet client's expectations, and the client trying to understand the server's expectations.

Instead of clients and server fighting over whether a circle is round, a _standard_ dictates a circle is round. If a server or a client are _standard compliant_ then they will expect a circle to be round. This concept of standards, expectations and compliantcy is fundemental to any _protocol_ or language.

What is important to understand about standards is they don't just dictate between one client and one server, but they dictate that between _all servers_ and _all clients_. It means everyone is singing from the same hymbook. You can see an example of browser compliancy to various languages and protocols on [CanIUse](https://caniuse.com/#comparison).

## So what's up with email?

The world of web browsers is pretty good modern compliancy. This is because everyone is happy to agree to comply to the same standards, and those standards existed from early on. That means as time has gone on and the quantity of websites increased, those websites are generally aiming to conform to the same standards, the same is true of web browsers. _Everyone is heading in the same direction_.

That's almost opposite when it comes to HTML email.

HTML email has never officially followed a standard - this is a huge problem. Some email clients say a circle is round, some say a circle is square, some say a circle has 5 sides and others say a circle doesn't exist. When a developer is needs to write code for a circle this means there is no _standard_ to refer to for the definition of what a circle is.

As time has progressed some email clients have picked up some really cutting edge features largely taken from HTML and CSS standards, whereas others (namely Microsoft products, but not only them) have not progressed in the same direction. Some email clients have decided to go one route, then change their mind, then change their mind again. For example, Microsoft outlook used to use the Internet Explorer browser engine to render their email, then they decided to use the _Microsoft Word_ engine. Everyone had to change their code to make it work with those sudden changes, then Microsoft changed their minds and switched it back! This chaos of ever changing and diverted standards is a developer's nightmare. A developer can no longer code referring to a standard.

## How can ayone code emails then?

The same way anyone would code without checking standards - by testing output and doing good research. More specifically we can use use industry leading tools to test out emails render as we expect on other devices, and we can use templates as a starting point.

A lot of active email developers will have "known sets of code" they know from experience render well across some devices but not others. This sort of knowledge comes with practise, which makes it a difficult skill to acquire.

Checking email renders is not like checking HTML renders - refreshing the browser page. Emails need to be individually delivered and rendered to clients, and different recent versions of clients can be dramatically different so it is vital we use services to do some of that work for us, otherwise you're not going to have a fun time.

The industry leading SAAS product is [Litmus](http://litmus.com), but a good similar feature-rich competitor is [Email on Acid](https://www.emailonacid.com). The idea is you send your email to a special email address the service gives you, and they go away and automatically render the emails and return to you screenshots. You can then compare your email against the screenshots to determine if your code rendered as expected. This is obviously much slower than rendering a web page locally, but it is also significantly faster than checking every possible email client.

My suggestion would be to focus on some core popular clients, get the code working there and choose to encompass more as you see fit. You can determine this by looking at your previous email demographics in your campaign sending software, or else [doing a bit of research](https://www.campaignmonitor.com/resources/guides/most-popular-email-clients/).

The idea is instead of focusing on standards, you focus on uses proven tested templates, such as [those found on Github](https://github.com/leemunroe/responsive-html-email-template) and modify it from there by testing outputs.

## Email restrictions must dictate design

One important difference successful email marketing designers understand is that email restrictions much inform design from early on. If they don't, you're not going to have a fun time. If you're reading this and you're at this stage without design being informed by restrictions - go back to the drawing board.

Designers have a hard time understanding this because their environment has been a robust one, where there is little restrictions on their design. However, designers do understand technology limitations, for example, if the designer wanted the screen to project a hologram through HTML - that's just not going to be supported by the browsers. They know that, so they won't do it. Designers are often not used to working with emails, so they may not understand the rules of the game. Defining rules actually aids creatively rather than restricting it.

Be prepared to comprimise design. This needs to be known upfront. Things don't go to plan, and time restrictions for deliverables will mean you inevitably are going to have to comprimise somewhere. This isn't normal behavour when working with web pages, so make stake holders aware of this from day zero, don't try and explain it at the time of delivery.

My suggestion to teams begining in this way is to start
