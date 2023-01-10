# File Server

Add a page to `app/userhome` and you can go to it in the browser.

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

ejs is the default view so, for example, if you had two files both named home...

```posix
$ ls
home.html home.ejs
```

...and you went to **/username/home**, the ejs file will be the one that's
served.

## Assets and Modules

Anything inside the *assets* directory can be fetched using
`fetch('/assets/my-file.png')` and anything installed into *node_modules* or
*bower_modules* can be loaded using
`fetch('/modules/<node_modules|bower_moules>/path/to/my/module.js')`.

These directories are project-wide, meaning they're not controlled by the users,
making them effectively read only. But nothing's stopping users from installing
their own modules and fetching them from their own user server.

## Development

Add an env.js file to the root with your own master password in it:

```js
module.exports = {
  MASTER_PASSWORD: 'mypassword'
}
```

If you're using a non-root user you'll have to make a docker group so sudo
isn't needed to run docker commands... [docker linux post
install](https://docs.docker.com/engine/install/linux-postinstall/)

Run the app on port 3000 with:

```bash
npm run dev
```

Also start the gotty server by running:

```bash
./gotty-server.sh <username:password>
```

*Note* if you're on a Mac or Windows you'll have to install `gotty` first but the
binary is included in this app for Linux.

## Master Password and Server Creds

Whenever a user wants to make a new server they'll have to use the master
password you assigned to `MASTER_PASSWORD` to do it.

There's some basic auth on the servers which you set with the *gotty-server.sh*
command (username:password).

## Deployment

Add a couple of extra env vars to *env.js*:

```js
module.exports = {
  // ...
  BASE_URL: 'http://myserveraddress.org',
  GOTTY_PORT: '8080', // Or any port you want
}
```

Install docker and get it up and running. Also, if you're using a non-root user
you'll have to make a docker group so sudo isn't needed... [docker linux post
install](https://docs.docker.com/engine/install/linux-postinstall/).

I'm running the app in tmux (until I work out a single command for the gotty
server and the app).

Open a tmux session and do:

```posix
npm i && npm start
```

Then in another window do:

```posix
./gotty-server.sh username:password
```

## Client

The app is being run on port 3000 at the moment so you can go to the server's
ip and port and see any file based in the dir structure of any
user's home dir.

For example Yuri has a home dir with *home.html* inside so we can go to
**http://<ip-addr>:3000/yuri/home.html** to see that file served.

## Server

Run the gotty terminal emulator with:

```posix
./gotty-server.sh
```

This will use up a terminal so you'll prob want to do it in tmux. I'll add this
to the app start command at some point.

It's set to run on 8080.

## Users

The server for each user can be accessed through the browser using gotty.

Make a new user container with the **docker-useradd.sh** script...

```posix
./docker-useradd.sh yuri yurispassword
```

This makes a container called `yuri-server` with a user and home dir in it
called `yuri`. It also makes and binds that dir to another one inside the app's
home dir.

Now you can go to the browser and run that container inside gotty. Add the
user's name, the container name and the process you want to run as arguments...

http://myserve.org/?arg=yuri&arg=yuri-server&arg=bash
