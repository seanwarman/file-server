# File Server
Add a page to `app/userhome` and you can go to it in the browser.

You can give it any extension, including no extension, it'll always render as
html.

You can also import any js file within the same dir by using the path as if
where in the home dir:

```html
<script src='./home.js'></script>
```

You can also make a directory and add files there, they will turn up in the
http address under that same dir.

You can also import any of the files in a script using `fetch`, rather than
using a relative path you'd use the http address of the file:

```js
fetch('/userhome/home.js')
```

## Template Support

Myserve supports [ejs](https://github.com/mde/ejs) and
[markdown](https://www.markdownguide.org) rendering. Just add either .ejs or
.md to the file and it'll get converted to html before it's sent.

## Assets and Modules

Anything inside the *assets* directory can be fetched using
`fetch('/assets/my-file.png')` and anything installed into *node_modules* or
*bower_modules* can be loaded using
`fetch('/modules/<node_modules|bower_moules>/path/to/my/module.js')`.

These directories are project-wide, meaning they're not controlled by the users
making them effectively read only. But nothing's stopping users from installing
their own modules and fetching them.

## Deployment

This project's kept in the cd3k dir on my server at the moment, just ssh in
and run `npm start` inside the project root. This'll start the app on port
8080, it'll also be backgrounded so you can go about your business.

Use `npm run stop` to stop it.

## Client

The app is being run on port 8080 at the moment so you can go to the server's
ip and port and see any file based in the dir structure of any
user's home dir.

For example Yuri has a home dir with *home.html* inside so we can go to
**http://<ip-addr>:8080/yuri/home.html** to see that file served.

## Server

Run the gotty terminal emulator with:

```posix
./gotty-server.sh
```

This will use up a terminal so you'll prob want to do it in tmux. I'll add this
to the app start command at some point.

It's set to run on 3005.

## Users

The server for each user can be accessed through the browser using gotty.

Make a new user container with the **docker-useradd.sh** script...

```posix
./docker-useradd.sh yuri
```

This makes a container called `yuri-server` with a user and home dir in it
called `yuri`. It also makes and binds that dir to another one inside the app's
home dir.

Now you can go to the browser and run that container inside gotty. Add the
user's name, the container name and the process you want to run as arguments...

http://myserve.org/?arg=yuri&arg=yuri-server&arg=bash
