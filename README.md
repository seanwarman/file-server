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
