---
title: 'Getting Started with Google Slides API in PHP'
publishedDate: '2018-12-29T10:00:00.000Z'
articleReadTimeMinutes: 4
imageBanner: '/blog/getting-started-with-google-slides-api-in-php/banner.png'
metaDescription: 'Learn how to use the Google Slides API with PHP'
metaKeywords: 'google slides, powerpoint, api, ppt, pptx, tutorial, setup, walkthrough'
metaImageFacebook: '/blog/getting-started-with-google-slides-api-in-php/banner.png'
metaImageTwitter: '/blog/getting-started-with-google-slides-api-in-php/banner.png'
---

Automatically creating powerpoint files has a tonne of potential uses, from company front-of-house news displays, weekly sales reports, to live statistic feeds.

I spent a month working with the Google Slides API to programatically turn a meeting plan from a MySQL database into a powerpoint. It had layers of complexity such as adding styling (background images, fonts, colours), adding and scaling images, importing slides from an existing `.pptx` file amoung others.

Using Google Slides to programmatically generate powerpoint files is straight forward, but isnt without its pitfuls. It requires some setup, configuration and some understanding of how OAuth 2 works in the Google environment.

The following is what is required:

- Create Google Cloud Account
- Create Google Cloud project
- Enable Google Cloud APIs:
- Google Slides API
- Setup OAuth
- Initialised access tokens

Let's get started

# Create Google Cloud Account

First up you will need to create a Google Cloud Account. The Google Cloud service is what is used to access Google APIs. The Google Account you use to create your Google Cloud Account will be tied together, that will mean you will need to use that account to login in the future.

Start by visiting the [Google Cloud](https://console.cloud.google.com)site and create an account. Take note of this URL for later.

# Create Google Cloud project

Next up you need to create a Google Cloud project. A project is where you API actions are executed against, projects can be moved to other accounts and there are API limits, abuse and other factors which are applied to your requests on a project level. You can create multiple projects, and switch between them.

So go ahead, create a new project and fill in all the information required. You can always go back and edit the URL information later. After your create the project it can take a couple minutes to complete, this is normal in my experience.

# Enable Google Cloud APIs

Now you've create your project we need to enable the APIs that we want to use. In the Google Cloud you can access a variety of Google Cloud APIs such as Youtube, Docs, Maps, Calendar and much more. You'll find the API page hidden in the top-left hamburger menu under `APIs & Services`. Once you're there you'll see a bit blue link at the top of the page entitled "Enable APIs and services".

Once you're there you'll be able to search to enable the APIs. In our case we will just want to enable the `Google Slides API`.

# Setup OAuth

In short, OAuth is a modern standard of web-based API security using token-based authentication. The details of how this works are beyond the scope of this article but you can find more information [here](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) and a great introductory video [here](https://www.youtube.com/watch?v=BNEoKexlmA4). If you haven't used OAuth before, I'd strongly suggest spending a few minutes understanding it, otherwise you're not going to have a good time.

The task here is to setup OAuth settings which will tell Google where is valid for API requests to come from domain name wise. Additionally the information entered here is presented to the end user of the application.

To get started, whilst viewing your project click the main hamburger menu, select `APIs & Services` -> `Credentials`. Once you're on the credentials page, select `Create Credentials`, you'll want to use the selectable type `OAuth Client ID`, then use `Web application` in the following screen. The domain names listed here need to be real domain names used by your application. For the sake of this tutorial we'll be operating the API over the command line, so just use `localhost` as the domain.

Fill out all the information it asks as best as you can. You can always revisit this stage later.

You'll then need to download the configuration file by selecting the download button under: `APIs & Services` -> `Credentials` -> `OAuth 2.0 client IDs` -> `{download button}`

Retain the OAuth config files for later. At this point setup is done, let's get coding.

# Get authenticated with code

We're going to be working off of the base example Google provide in the form of an official sample library. You can find their full code on their [Github repo](https://github.com/gsuitedevs/php-samples/blob/master/slides/quickstart/quickstart.php). We're also going to be using composer - the PHP defacto dependency management tool, if you don't know what that is, pause for 5 minutes to install it and read up on it on their [official site](https://getcomposer.org/).

First install the official PHP library as a dependency in your project by running this on the command line:

```
composer require google/apiclient:^2.0
```

Copy the `credentials.json` file you downloaded in the previous step into the current directory. Then create a `slides_tutorial_01.php` file. Your project directory should look like this:

```
vendor/
credentials.json
slides_tutorial_01.php
```

Add the following to your `slides_tutorial_01_authenticate.php`:

<pre class="prettyprint linenums lang=php">
// create a google client
$client = new Google_Client();
// give the application a friendly name (for your benifit only)
$client->setApplicationName('Google Slides API PHP Quickstart');
/**
* this is the scope the application needs - the scopes defined here cannot exceed the scopes
* set in the `Enable Google Cloud APIs` step.
*/
$client->setScopes(Google_Service_Slides::PRESENTATIONS_READONLY);
// this is the file path to the `credentials.json` in our directory
$client->setAuthConfig('credentials.json');
/**
* by setting offline this will return an oauth token which will never expire (a refresh token)
* which will enable us to get more access tokens without require the user to accept again
*/
$client->setAccessType('offline');
$client->setPrompt('select_account consent');
</pre>

Add the following to the end of your existing file, read through the inline comments yourself to get a better understanding of what's happening here. This essentially is taking care of authenticating, and will require some interaction via command line inputs:

<pre class="prettyprint linenums:18 lang=php">
// Load previously authorized token from a file, if it exists.
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
$tokenPath = 'token.json';
if (file_exists($tokenPath)) {
    $accessToken = json_decode(file_get_contents($tokenPath), true);
    $client->setAccessToken($accessToken);
}

// If there is no previous token or it's expired.
if ($client->isAccessTokenExpired()) {
    // Refresh the token if possible, else fetch a new one.
    if ($client->getRefreshToken()) {
        $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
    } else {
        // Request authorization from the user.
        $authUrl = $client->createAuthUrl();
        printf("Open the following link in your browser:\n%s\n", $authUrl);
        print 'Enter verification code: ';
        $authCode = trim(fgets(STDIN));

        // Exchange authorization code for an access token.
        $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
        $client->setAccessToken($accessToken);

        // Check to see if there was an error.
        if (array_key_exists('error', $accessToken)) {
            throw new Exception(join(', ', $accessToken));
        }
    }
    // Save the token to a file.
    if (!file_exists(dirname($tokenPath))) {
        mkdir(dirname($tokenPath), 0700, true);
    }
    file_put_contents($tokenPath, json_encode($client->getAccessToken()));
}
</pre>

At this point, you're good to run the file and see how authentication flows! This is a rough rundown of what happens:

1.  Application loads the configuration file
2.  Application checks if an auth token has already been set
3.  Application generates the required URL to get auth token, then presents it on the command line
4.  User (you!) copy-paste that into your web browser
5.  You login with whatever Google account you want to run the Google Slides request against, and accept the API scope/auth the application
6.  You copy the token from the URL bar
7.  You past the token back into your command line application
8.  The application does some interaction with Google's servers to get access tokens and save them to a new `tokens.json` file, which is reused for future requests

At this point you finally have everything needed to make real requests against the Google Slides API.

# Creating a Google Slide presentation

First up, we're going to create a new slide presentation. This should give you a firm understanding on how the API works, once you understand the pattern everything else can be understood from the [Google Slides documentation](https://developers.google.com/slides/reference/rest/v1/presentations/create).

We're going to create a new file called slides_tutorial_02_create_slide.php:

<pre class="prettyprint linenums lang=php">
include_once('slides_tutorial_01_authenticate.php');

$slides_service = new Google_Service_Slides($this->google_client);

$pres_title = 'My example presentation title';
$slide_presentation = new Google_Service_Slides_Presentation([
    'title' => $pres_title,
]);

$created_presentation = $slides_service->presentations->create($slide_presentation);
print("Created presentation. Edit it here: https://docs.google.com/presentation/d/{$created_presentation->presentationId}/edit \n%s\n");
</pre>

If you now run this file on the command line, you should get that echo statement to your command line. If you copy that URL and visit it, you should see your new presentation - easy eh?

# Creating a new Google Slide

Now we've created a new presentation, we're going to add a new slide at the same time. Add the following lines to your file and run again:

<pre class="prettyprint linenums:12 lang=php">
$requests = [];
$slidesService = new Google_Service_Slides($client);

$slide_id = 'unique_slide_id_'.rand(1,9999999);
$slide_main_title_id = 'title_'.rand(1,9999999);
$requests[] = new Google_Service_Slides_Request([
        'createSlide' => [
            'objectId' => $slide_id,
            'slideLayoutReference' => [
                'predefinedLayout' => 'SECTION_HEADER'
            ],
            'placeholderIdMappings' => [ new Google_Service_Slides_LayoutPlaceholderIdMapping([
                'layoutPlaceholder' => new Google_Service_Slides_Placeholder([
                    'type' => 'TITLE',
                    'index' => 0,
                ]),
                'objectId' => $slide_main_title_id
            ])]
        ]
    ]
);

// set the title of the slide	
$requests[] = new Google_Service_Slides_Request([
    'insertText' => [
        'objectId' => $slide_main_title_id,
        'text' => 'my first added slide title'
    ]
]);

// Execute the request.
$batchUpdateRequest = new Google_Service_Slides_BatchUpdatePresentationRequest(array(
    'requests' => $requests
));

try {
    $response = $slidesService->presentations->batchUpdate($created_presentation->presentationId, $batchUpdateRequest);
	print("A new slide was added to the presentation \n%s\n";
} catch (\Exception $e) {
    print($e->getMessageAsString()." \n%s\n");
}
</pre>

If you run this you'll find that a new presentation is created, then a new slide is added to that presentation.

The basic idea here, is that you build up a series of "requests", then requests are sent in a batch to Google, and an itterable of responses are returned.

And that's it! There's a lot more to learn, you'll find all the best information on the official [Google PHP Slides documentation site](https://developers.google.com/slides/reference/rest/). If there is anything you think I could help with, why not drop me a [tweet](https://twitter.com/chrismckirgan)?
