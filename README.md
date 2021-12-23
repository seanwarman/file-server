# File Server
Add a page to `app/userhome` and you can go to it in the browser.

You can give it any extension, including no extension, it'll always render as
html.

You can also import any js file within the same dir by using the path as if
where in the root:

```html
<script src='/home.js'></script>
```

You can also make a directory and add files there.

## Deployment

This project's kept in the cd3k dir on my server at the moment, just ssh in
and run `npm start` inside the project root. This'll start the app on port
8080, it'll also be backgrounded so you can go about your business.

Use `npm run stop` to stop it.

## Client

The app is being run on port 8080 at the moment so you can go to the server's
ip (which changes) and port and see any file based in the dir structure of any
user's home dir.

For example Yuri has a home dir with *home.html* inside so we can go to
**http://<ip-addr>:8080/yuri/home.html** to see that file served.

## Server

Using the `<port-number>` we defined with Gotty earlier, Yuri can go to
**http://<ip-addr>:<port-number>** to log into his home dir and edit
*home.html*.

## Users

If you're ssh'd in as the root of admin user you can run a new container using
the *docker-build* script:

```posix
./docker-build <username> <password> <port>
```

This will build the image, if it's not already, then it'll run a new docker
container, making a user folder in home/ where they can start making files
and folders.

Each user has to have their own port at the moment, which isn't ideal but might
be a limitation for gotty rather than this project. I'll have a think about it
either way.

We don't need to worry about changing the home dir anymore (from above) because
each container doesn't have access to the underlying system anyway. We might as
well keep the user folders within the project, which is cleaner.
