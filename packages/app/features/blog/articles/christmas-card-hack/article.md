---
title: 'Christmas with React Native Web & WebSockets'
publishedDate: '2016-01-05T09:12:00.000Z'
articleReadTimeMinutes: 7
imageBanner: '/blog/christmas-card-hack/banner.jpg'
metaDescription: 'What`s better than receiving a Christmas card from your digital agency? Receiving a Christmas card that hacks a game onto your computer and makes you compete for your Christmas presents.'
metaKeywords: 'arduino, christmas, christmas card, hack, arduino leonardo, marketing, raspberry pi, electronics'
metaImageFacebook: '/blog/christmas-card-hack/banner.jpg'
metaImageTwitter: '/blog/christmas-card-hack/banner.jpg'
---

What's better than receiving a Christmas card from your digital agency? Receiving a Christmas card that hacks a game onto your computer and makes you compete for your Christmas presents.

Kerve are a boutique marketing agency developing unique experiences as well as catering for more traditional digital marketing needs. I was contracted to work with Kerve on a variety of projects, one of these such projects was creating an engaging Christmas card for Kerve's clients.

As an experienced electronics hobbyist, I took immediate advantage of my experience working with arduinos to conjure up a prototype USB hacking device - all in the spirit of Christmas of course. The device ran on a arduino leonardo. This is a super compact arduino capable of emulating keyboards programmatically. When plugged into a computer, and the computer type was selected via a simple input button, a series of keyboard strokes were run - so fast that a user doesn't have time to react.

In a split second a command prompt is opened, a synthesised personalised Christmas greeting is sung, and then a unique URL is opened where the user is presented with a simple game and the rules are explained. The connected "Christmas card" now acts as a controller for the game.

An open source web-game was modified and themed to become a competitive game, at the end of the month the top 3 clients would get special prizes, and #1 would get the grand hamper prize.
This was a risky marketing move, and you would think that there could be a mass rejection or outcry from "hack tech", but actually, only 1 single client didn't play the game and that was due to technical reasons rather than desire. Almost all clients wrote to the agency in admiration of the creativity, and it further cemented Kerve on their client's books.

The biggest challenge for this project was mass-producing such a device for a large number of clients and maintaining the distributed source code. A lot of testing had to go into the code prior to uploading to the arduinos. The solution we created involved writing a compiled-step of the source code which modified the URL to attach a client-specific authentication token as a URL parameter. This URL was then used to download a shell script which was then in turn executed - enabling us to update one common set of source code without the long upload step to the devices.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/ZqvEaLZrMhw' frameborder='0' allowfullscreen></iframe></div>
