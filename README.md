# File Server
Add a page to `app/userhome` and you can go to it in the browser.

You can give it any extension, including no extension, it'll always render as
html.

You can also import any js file within the same dir by using the path as if
where in the root:

```html
<script src='/home.js'></script>
```

## Socket.io
Add socket.io and an edit page. The user should be able to go to /edit in the
browser and add text to an input field that is sent to the backend and recieved
again via the websocket connection.

## DB Strings to HTML
Replace the file structure in `app/userhome` into a db structure that stores
the html and filename as strings. Then render the html string in the same way
as it is now.

## Live Updates
Allow the rendered html to update as changes are being made from the /edit
input field.

## Script Updates
Re-run a html file's script when that's updated as well.
