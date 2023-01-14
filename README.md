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

Add an .env file to the root with your own master user and password in it:

```posix
MASTER_USER=coolboy
MASTER_PASSWORD=cooltimes
PORT=8081 # to access the app in the browser
GOTTY_PORT=8080
EXPRESS_PORT=3000
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
./gotty-server.sh
```

*Note* if you're on a Mac or Windows you'll have to install `gotty` first but the
binary is included in this app for Linux.

## Master Password and Server Creds

Whenever a user wants to make a new server they'll have to use the master
user and password you added to the env file.

You'll also need these to access the gotty server for the first time.

## Deployment

Add a baseurl to the env file and change the port to 80

```js
// ...
PORT=80
BASE_URL=http://myserveraddress.org
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
./gotty-server.sh
```

# Roadmap

- OpenVscode option alternative to GoTTY
- Server build/startup scripts
- Allow .vue and .jsx files as template options
- Default template option for extention-less files (currently only ejs)
- Port exposure query param arguments (eg `?port=3000&port=3001&arg=perry&arg=perry-server&arg=bash`)
