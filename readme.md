Accessibility features incoming !


This pure JavaScript script allows you to perform some action to scroll you website vertically page by page :
- Scroll wheel with mouse
- Up and down keys on keyboard
- Hyperlinks clicks
- Swipe on touchscreens (may be out of date)

If JavaScript is desactivated, page by page scroll stills works with **scroll-snap** CSS properties.

/!\ Only for Chrome > 69, Firefox > 68, IE > 11*, Edge > 75, Safari > 11 /!\

### You can add as many pages as you want as long as they keep this structure ###
```
<section id="page1">
  <div>
    <!-- Content of page goes here -->
  </div>
</section>
```
Number in ```<section id="page1">``` must be incremented by 1 as long as you add pages below.

This way, links to inner pages will still work if JavaScript is desactivated.

### If you want a link that scrolls nicely to another of your inner page, give it a "links" class ###
```
<a href="#page1" class="links">Go to page 1</a>
```

### If you want an element to be scrollable inside the scroll page, add it a "scrollable" class ###
```
<div class="lorem scrollable">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan at augue in euismod.<br/>
  Suspendisse hendrerit quis tortor vel tincidunt.<br/>
  Proin dignissim, massa in pharetra euismod, dui nisl mollis lectus, vel molestie nisl elit ac libero.<br/>
  Vivamus ut sapien consequat, tincidunt nisl eu, tempus nunc.
</div>
```

### In the "another-scrollpage.js" file, you can change the scroll speed ###

Just change the value of the variable ```scrollspeed``` (1000 by default and value in milliseconds)

### In the "another-scrollpage.js" file, you can trigger actions when leaving or arriving on a page. ###

This is an example of an action triggered when **leaving page 3**. In that case, stoping of video playing :
```
function callbefore(n) {
    switch (n + 1) {
      case 3: document.getElementById("myVideo").pause(); break;
    }
}
```

This is an example of an action triggered when **arriving on page 5**. In that case, focus a text input :
```
function callback(n) {
    switch (n + 1) {
      case 5: document.getElementById("nickname").focus(); break;
    }
}
```
