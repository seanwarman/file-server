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

### Env Vars

The app reads a variable from your bashrc/zshrc if you have it, it's called
FILE_SERVER_ROOT and should be set to the equivelent of the /home dir on a
Linux system.

If it's not set the app will look in the app dir instead, which is fine for
local developement.

## Deployment

This project's kept in the cd3k dir on my server at the moment, just ssh in
and run `npm start` inside the project root. I'm using tmux to run it in a
detached session at the moment but will look into using docker in future, which
will also include work for user scopes...

## Users

To add a new user log into the server as cd3k and run `adduser` to make them a
home dir. The user will be able to see all files but only change their own.

Run a new tmux session as that user, then start gotty:

```posix
gotty -w -p <port-number> -c <user:password> /bin/bash
```

Now the user will be able to log in on their browser.

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



## Docker Updates
Build the docker image using the script I've added:

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
well keep the user folders within the project, which is cleaner ayway.

