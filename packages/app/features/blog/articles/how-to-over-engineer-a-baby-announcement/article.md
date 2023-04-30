---
title: 'How to Over-Engineer a Baby Announcement'
publishedDate: '2020-08-12T20:00:00.000Z'
articleReadTimeMinutes: 5
imageBanner: '/blog/how-to-over-engineer-a-baby-announcement/banner.jpg'
metaDescription: 'How do you announce a baby? I built a viral react site to tell our story, and it really took off!'
metaKeywords: 'game, baby. baby announcement, web development, react, react, javascript, bristol'
metaImageFacebook: '/blog/how-to-over-engineer-a-baby-announcement/banner.jpg'
metaImageTwitter: '/blog/how-to-over-engineer-a-baby-announcement/banner.jpg'
---

How did you start the pandemic? Just 2 days before the start of the UK-wide lockdown back in March I was sat in my lounge one morning, trying my best to understand what was happening to the world when I got a shout from my wife, Lucy, from upstairs. I found her outside the bathroom beaming from ear-to-ear, holding a certain prophetic message inscribed in chemistry, that in 9 months time, we would be parents.

As the world was descending into chaos we had a secret to keep for a while, but eventually we would need to tell our friends and family. Here began the baby announcement plans.

I’m a software engineer, and I do love to solve problems with technology, so much so that I knew this baby announcement malarkey needed, no, deserved to be massively over engineered.

I began by brainstorming. After ruling out my dabbling in robotics, and concluding my recent foray in becoming a [mobile game publisher](https://semicolon.mckirgan.com) as a [Christmas present for my brother](/blog/i-turned-my-brother-into-an-app-for-secret-santa) was a step too far, I decided to ground things a little by continuing my venture into pixel-art and storytelling.

Undoubtedly, the best game of all time is Pokemon. Specifically, the original Pokemon Red/Blue release on the gameboy original. The graphic style, fade-in animations, storying telling through “speech boxes”, and that unforgettable introduction scenes - it was a groundbreaking visionary masterpiece for it’s day. I wanted to emulate that success in my own graphical retelling our own journey and this new chapter. This is the style I wanted to aim to capture the feel of;

![https://i.imgur.com/dywOZLn.gif](https://i.imgur.com/dywOZLn.gif)

After deciding on our key points; meeting each other, getting engaged, married, buying our first home, and now this new chapter I story-boarded them before reaching out to an old artist friend, [Archipix](https://twitter.com/archi_pix) to turn my vision into reality, and boy did he deliver! Individual assets were animated into 6 key frames and delivered as jpegs in true 16 bit colour art - I intended to bring that old Pokemon style art to full life.

Now the real challenge began. I had the plan, the story board, assets and the all important motivator - a 2 week deadline. I decided a microsite as the best delivery medium, primarily because it’s so easily shareable over a mobile app. Now I needed to bring these animations to life in the form of a webpage that is equally impactful on all devices, from mobile, tablet to desktop. Furthermore I needed a tech stack that is going to enable me to manage the scene transition and other page interactions, and finally a way of managing the animations beyond the minor 6 keyframe animations such as a falling chimney, fade effects etc.

Having worked on a small variety of React/React Native projects and wanting to seize the opportunity to further develop my working knowledge of the framework, I chose React as the frontend framework for the job. In all honesty, I know this probably is an overkill for this type of project, but equally when I’m working on “unimportant” projects, deciding to use it at a learning opportunity is a very worthwhile reason.

I chose to use:

- [react](https://reactjs.org/)
- [react-router](https://reactrouter.com/web/guides/quick-start) for navigation
- [react-cookie](https://www.npmjs.com/package/react-cookie) for a basic persistent storage of state (if someone shares the last scene the new user is sent to the start, others are sent to the scene the router determines),
- [CSS3 animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations), to animate the scenes
- [ness-css](https://nostalgic-css.github.io/NES.css/) for some of the retro-style animations

I chose CSS3 over the likes of react-animation mainly because I wanted to spend some time learning animation frames and see if I could create my own timing sequences (by far the most challenging part of this project).

After a lot of hard work and a few late nights I landed with a working prototype, I ran this through some real devices for testing the rendering which threw up a few issues in iOS which led me to refactor the final progress bar, as my particular usage broke the nes-css implementation.

The exciting part of this was announcing it via Facebook to friends and family, which took off far more than I anticipated. I decided to share it via a reddit pregnancy group, and to my surprise it went viral for around 3 days, in the peak it Google Analytics was reporting 1 unique hit/second! That all tailed off after about a week, as expected of a cute little project really.

This was an extremely fun project to work on, it gave me further experience in using the React framework, I learnt new skills with CSS3 animations, and enjoyed sharing our utter joy through this fun little project. Now we just have to wait for him to arrive!

Checkout the announcement for yourself! You can find the site below, or why not go checkout [the project on Github](https://github.com/kirgy/baby-announcement), it's opened sourced.

- Baby Announcement site:
- [https://loading.mckirgan.com](https://loading.mckirgan.com)
- Code on Github:
- [https://github.com/kirgy/baby-announcement](https://github.com/kirgy/baby-announcement)
