---
title: 'The Foursquare Clock'
publishedDate: '2012-04-14T00:00:00.000Z'
articleReadTimeMinutes: 4
imageBanner: '/blog/the-foursquare-clock/banner.png'
metaDescription: 'Foursquare is a platform that has always interested me. Since it`s creation I`ve been watching with a keen eye, and when it started taking off here in the UK I jumped head first into the geolocation madness that is foursquare. Although I`m actually...'
metaKeywords: 'foursquare clock, foursquare, arduino, electronics, hardware, hacking'
metaImageFacebook: '/blog/the-foursquare-clock/banner.png'
metaImageTwitter: '/blog/the-foursquare-clock/banner.png'
---

Foursquare is a platform that has always interested me. Since it’s creation I’ve been watching with a keen eye, and when it started taking off here in the UK I jumped head first into the geolocation madness that is foursquare.

Although I’m actually a theology student at Moorlands Theology College, England, I’ve always had a sharp and active interest in computing, especially electronics and server security. My dad from a toddler taught me the works of PC, from the age of 11 I had started developing websites. I was the ICT Executive for a partnership at age 15, and signed my first freelance website contract at age 17. This computing world has been so much an interest it’s been generating me some extra cash developing online systems part time whilst I’m studying my Applied Theology Degree.

Being a student in a house share, I found an every day problem could be resolved simply using foursquare; if my house mates wanted to know where I am, they could log onto foursquare. But there’s this separation of the phone and the home that I didn’t like. Why should my house mates have to get out their phone to know where I am?

That’s when the idea hit me; an analogue device that connects to foursquare could be made that sits on mantle that shows my last foursquare check-in and how long its been since I was there. With foursquare day quickly approaching, what better excuse was there to celebrate the day than to hack together a foursquare clock?

The foursquare clock is an idea I’ve been working on since around November 2011 when I took up a deeper interest in electronics. I began to think of ways in which I could bridge the digital world with the analogue world because, let’s face it, an LCD display on your mantle piece doesn’t have the same class as an old-style mantle clock.

Why do we have to have a separation of the digital and analogue? Often we hit a stumbling block; to quote Family Guy parodying The Six Million Dollar Man, “We have the technology, we just don’t have a lot of money.”

Foursquare offer an amazing service that lets you log your visits to venues across the globe, and for hackers like myself, the best asset of their service is the API. The Foursquare API allows anyone to bridge their software creations with the foursquare databases, enabling infinite possibilities. And it’s free for the standard developer.

Powering the foursquare clock is a device known as an arduino, a small and extremely cheap chunk of hardware that allows you to easily merge your electronics with an easy-to-use programming library. After learning some basic electronic computing from the guys at NerdKits a couple years ago, I acquired a arduino uno, and shortly after, a stacked ethernet shield. Having specialised in server programming, the server side of things was a breeze. It took a few months to pull it all off as I have been doing this degree; papers and flying off to Canada for a month, but now It’s finished It’s just pure awesome.

On the clock face, there are two sections. The top section shows how long, in segments of hours, since my last check-in at a favourite venue, capping at 3 hours. The bottom section shows an array of eight of, what I consider, my favourite venues, such as: home, library, university, the pub and church. When I check into one of these favourite venues within a few seconds the top hand resets to zero, and the bottom hand moves to the correct venue icon. As time progresses, so does the top-hand on the clock face.

If you’d like to hear more about the technology behind the device, subscribe using the RSS feed at the top of this blog or ask a comment below. If you’d like to contact me personally, leave a comment below and I’ll respond via email ASAP.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/Qm-EvXCydJ0' frameborder='0' allowfullscreen></iframe></div>
