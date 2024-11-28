0:00
today we're going to bring things back
0:02
to the fundamentals a little bit here in
0:03
nextjs I've been making some kind of
0:07
more specific videos maybe slightly more
0:11
advanced on like building full stack
0:13
applications and you getting into some
0:16
like specific tips of next Jaz and stuff
0:19
and I've received some comments that
0:21
people would appreciate maybe kind of
0:24
revisiting some of the fundamentals so
0:26
I'm going to do that a little bit here
0:28
going over the routing fundamentals of
0:30
next Jazz now if there are specific
0:33
topics that you would like me to cover
0:36
please leave a comment down below and
0:38
kind of let me know sometimes you know I
0:42
can create videos that you know are most
0:46
interesting to me and it might be over
0:48
this like specific unique feature of
0:50
nextjs which might not be that
0:52
applicable to you watching or listening
0:54
to this so just let me know in the
0:56
comments below if there's anything
0:58
specifically I can help with but let's
1:01
cover some routing fundamentals of
1:03
course we're going to show some examples
1:05
here in vs code as well so first off it
1:08
is important to understand some
1:10
terminology here when it comes to
1:12
routing in next Jazz now I am right on
1:16
the nextjs docks here so I I tend to
1:19
treat the docks as like my my source of
1:22
Truth here but let's first cover just a
1:25
little bit of terminology here so here
1:27
they cover different kind of things
1:30
related to routing so first off if you
1:32
have your tree it's a convention for
1:35
visualizing a hierarchal structure for
1:38
example a component tree with parent and
1:40
children components a folder structure
1:43
Etc so the overall tree of our
1:45
application is basically going to be
1:48
everything within our app folder it's
1:50
going to start with our kind of root
1:53
tree here or a root folder which is app
1:56
and then we have a route for blog a
1:59
route for de dashboard and then we have
2:02
different segments within that tree and
2:05
this is a sub tree within the overall
2:08
tree so trees are something that you're
2:11
going to hear a lot of with programming
2:13
in general so we have the overall tree
2:16
which kind of encompasses everything
2:18
here within this app folder and then
2:21
here can be considered a sub tree and
2:24
then even here with settings can also be
2:27
considered a sub tree down here so a sub
2:31
tree is part of a tree starting at a new
2:34
root and ending at the leaves so that
2:37
brings us to roots and leaves so leaves
2:41
are nodes in a sub tree that have no
2:44
children such as the last segment in a
2:46
URL path so password profile analytics
2:51
this Dynamic route here the slug this
2:54
would be a leaf and then a root would be
2:57
the first node in a tree or sub tree so
3:00
app right here this could be considered
3:03
a rout dashboard here could be
3:06
considered a root even settings here
3:09
this is like a little subtree this
3:12
settings could be considered a root and
3:14
this would be a leaf and a leaf because
3:17
they have no children so just a quick
3:19
overview of a little bit of terminology
3:21
there you also have URL segments so part
3:25
of the URL path eliminated by slashes so
3:29
if we have acme.com
3:32
dasboard settings SL dashboard is a
3:36
segment for SL settings is a segment and
3:40
then the URL path that is anything after
3:43
the domain so acme.com is the domain and
3:47
the path is for SL dasboard SL settings
3:51
so the path
3:52
encompasses all the URL segments so it's
3:57
composed of segments and then down here
3:59
a little bit further we have roles of
4:01
folders and files nextjs uses a file
4:04
system based router where folders are
4:07
used to define routes a route is a
4:10
single path of nested folders following
4:14
the file system hierarchy down to the
4:16
final leave that includes a
4:19
page.js file files are used to create UI
4:22
that is shown for Route segments so when
4:25
creating a route in njs you use folders
4:29
so let's go ahead here within vs code
4:32
I'm going to run MPX create hyphen next
4:34
hyphen app at latest and then I'm just
4:38
going to say
4:39
routing
4:42
fundamentals we're not going to use
4:43
typescripts no ESN I will use Tailwind
4:46
but we're not going to do any styling no
4:48
SRC yes app router no import Alias so
4:53
I'll let this create and then we will
4:55
open this with file open and then I'll
4:58
open this Within vs code so we just have
5:01
this template project opened up here now
5:03
within VSS code and here within our app
5:05
directory we're going to do what it just
5:07
said in the docs there so we create a
5:10
new route using a folder with a page.js
5:14
file in it so here within the app tree
5:20
you can already see it has a page.js
5:23
file so and I'm going to rename this to
5:26
jsx just because I frankly like the Icon
5:30
better so this is going to be our
5:32
homepage because it's the rot route or
5:37
the root page within our app folder so
5:40
this is just going to be shown this code
5:43
right here is going to be shown when we
5:45
just go to forward slash so if we open
5:49
the terminal and run mpm run Dev and it
5:52
starts it up at localhost 3000 and I
5:55
come over to locost 3000 and I refresh
5:58
this page you're going to see this is
6:01
our root page we are just at local 3000
6:06
the the root page here you're going to
6:08
see like get started by
6:09
editing and if I see right here get
6:13
started by editing so this is the page
6:15
that shows here but if we want to create
6:18
another route well all we need to do is
6:20
create a folder so I'll do new folder
6:23
and I'll just say
6:26
dashboard and this doesn't create a
6:29
route yet yet because we also need to
6:31
create a
6:33
page. jsx file within this route so I'm
6:37
going to do exports default
6:39
function and I'm going to say dashboard
6:42
and I'm just going to return in each one
6:43
that says dashboard this is going to be
6:46
a beautifully styled page but it'll get
6:49
the point across so since I added a
6:52
folder with a page. jsx file that's
6:56
going to create a new route at whatever
6:59
name name of this folder so app is our
7:03
root route here so it's just forward
7:05
slash we're going to show this UI here
7:09
when we go to forward slash but since we
7:12
created a folder within our app
7:14
directory and created a page. jsx file
7:17
within that folder that means that
7:20
whatever folder name that we choose
7:22
we're going to create a new route a new
7:25
public route because we added a page.
7:27
jsx file within it so so at appdashboard
7:31
we should see whatever we're returning
7:35
from this function here and of course
7:38
this could be not just an H1 this could
7:41
be a whole bunch of different other
7:42
components that you would render for
7:44
your dashboard
7:46
page so if I go to for
7:49
slash dashboard we see dashboard but
7:53
what if I add another folder and say say
7:56
I want to add a folder that just stores
7:58
components to use in our app and we
8:01
create a title. jsx file and then we
8:06
export a default
8:08
function title that takes some text and
8:13
then it just returns in each one that
8:16
has that text what if we just create a
8:19
basic component like this does that mean
8:20
that we just created a new route at SL
8:24
components and it's going to
8:26
show this component here
8:30
well let's go ahead and
8:32
see if I go
8:34
to slash
8:37
components and I I think I used plural
8:41
you see this page cannot be
8:43
found because we did not add a page. jsx
8:46
file within this component's folder so
8:48
now if I do do that and I do a new file
8:51
and I do page. jsx I export a default
8:55
function and we'll just call it
8:57
components and then let's just return
9:00
our title component and we'll pass to
9:03
text prop and just say components page
9:08
well this is going to work now at least
9:10
it should because we just added a page.
9:13
jsx file within this components folder
9:16
so we should just
9:18
see this components page be rendered
9:21
here with a title of components
9:25
page and we do see that it kind of hot
9:27
reloaded so we see this components page
9:30
that's like the fundamentals of adding
9:32
different routes within your application
9:35
you use folders and the name of that
9:37
folder is going to be the name of your
9:41
route segment here then here it kind of
9:44
covers route segments each folder in a
9:46
route represents a route segment each
9:49
route segment is mapped to a
9:50
corresponding segment in a URL path so
9:54
here for/ dashboard you see we have a
9:57
dashboard folder this would have a page.
9:59
jsx file within it if you wanted just
10:02
a/ dashboard page and then you can see
10:07
it also shows nested routes here which
10:09
we'll cover in a second if you have a
10:12
folder within the dashboard folder well
10:15
that's going to create a nested route so
10:17
for SL dashboard SL settings so you just
10:20
Nest folders within each other when you
10:22
want to create Leaf segments within a
10:26
segment so we have nested routes to
10:28
create a Ned route you can Nest folders
10:30
inside each other for example SL
10:32
dashboard SL settings by nesting two new
10:34
folders in the app directory the for SL
10:38
dashboard for/ settings route is
10:40
composed of three segments for slash
10:43
which is just the root segment that's at
10:45
your app folder that is your root
10:47
segment and then for SL dashboard is
10:50
going to be another segment and for SL
10:53
settings is an additional segment here
10:56
if we look at this we have our dashboard
10:58
folder
10:59
so now to create a nested route segment
11:04
within dashboard so say we want to
11:06
create for SL dashboard SL settings
11:11
we're going to create a new folder we're
11:13
going to call it
11:14
settings and then we need to create a
11:16
page. jsx file within this and then I'm
11:18
going to export a default function and
11:21
call it
11:23
settings and then let's just return a
11:26
title component here as well and then we
11:28
will do Tex next is going to
11:30
be dashboard for slass settings and then
11:35
we'll return that so here our app folder
11:38
is our root segment and then we have a
11:42
dashboard segment that has a page. jsx
11:45
file in it so that means we're going to
11:46
show this at for/ dasboard and then
11:50
within dashboard within this dashboard
11:52
folder we have a settings folder that
11:56
has a page. jsx file so at
12:00
slash
12:02
dashboard slash settings we're going to
12:05
show this page so if we go back to Local
12:10
Host and we try this out and I go to
12:12
dashboard we see
12:14
dashboard but then if I go to for/
12:17
settings we see dashboard SL
12:20
settings and then we can keep going with
12:23
this within our settings folder I can
12:25
create admin hyphen settings
12:29
and then create a page. jsx file within
12:32
this and then export a default function
12:36
admin settings and then return our title
12:40
component that has the text
12:43
of SL dboard SL settings slash
12:49
admin settings and then here we'll see
12:51
if we go to slash
12:54
dashboard slash settings slash admin
12:58
settings we should see what whatever we
13:01
return within this page. jsx file here
13:04
so now if I go
13:06
to admin settings and add that to our
13:10
URL we see what we return within this
13:14
page so that is how you can create
13:17
nested routes you just keep creating
13:19
folders within folders to create new
13:21
segments within your url now what's the
13:26
what's the leaf segment in our exam
13:29
example well remember Leafs aren't going
13:32
to have children so here in our example
13:36
settings it's still has a child it has
13:39
admin settings so admin settings is
13:41
going to be the leaf segment here then
13:44
nextjs has additional file conventions I
13:46
have a video all on file conventions but
13:50
essentially we showed you the file
13:52
convention when it comes to creating a
13:53
page.js file so a page it's going to be
13:58
a unique UI of a route and it's going to
14:01
make it publicly accessible so creating
14:04
a page.js file within a folder makes
14:07
that folder name a route that's publicly
14:11
accessible but you have a very similar
14:13
thing when it comes to creating layouts
14:16
so it's shared UI for a segment and its
14:19
children loading Pages not found errors
14:23
Global air routes templates so on and so
14:27
forth so we're not going to hit all of
14:29
these but just know nextjs it follows
14:33
similar file conventions that it does
14:35
for like page.js files for layouts
14:38
loading Pages air pages and all that
14:41
stuff so if you want me to cover that
14:43
just let me know if there's anything
14:45
specifically here you'd like to see but
14:47
just know that it is a fundamental of
14:49
next Jazz that it uses these different
14:51
file conventions and then also you have
14:55
component hierarchy so the react
14:58
components Define in special files of
15:00
Route segments are rendered in a
15:01
specific hierarchy layouts templates
15:05
errors loading not found in page.js so
15:10
what that means is that if you have a
15:13
route segment or a
15:15
folder that has all these different file
15:19
conventions a layout page a template
15:21
page an air. JS a loading. JS and not
15:25
found a page.js if you put all those
15:28
within a folder
15:29
so here within our app directory you see
15:33
we have a page and a layout but we could
15:35
also have like an air. JS and a whole
15:38
bunch of different other of these file
15:39
conventions if you have all these in the
15:42
same directory well they're going to
15:44
have a certain hierarchy so the layout
15:47
is going to be your kind of a root file
15:51
that's going to wrap everything else so
15:53
your layout page is going to wrap around
15:56
your template page but then your temp
15:59
play page is going to wrap around your
16:00
air page and then your air page is going
16:03
to wrap around your loading page and
16:05
then your loading page is going to wrap
16:07
around your not found page and then your
16:09
not found page is going to wrap around
16:11
your
16:13
page.js so just keep that in mind like
16:17
you don't have to be constantly thinking
16:18
about this but it can be good to know
16:22
how
16:23
nextjs renders these and how nextjs kind
16:27
of structures these different different
16:29
files when you have all these different
16:30
files and components within certain
16:33
folder within your application and then
16:36
it says in a nested route the components
16:38
of a segment will be nested inside the
16:41
components of a parent segment so this
16:43
is the hierarchy all within one segment
16:47
but what if you had a like what if this
16:50
was our dashboard folder with all these
16:53
different files in it but then we had a
16:55
settings folder within our dashboard
16:57
folder that had a bunch of these
16:59
different files in it well here we can
17:03
see that if we have a settings folder
17:07
within a dashboard folder you're going
17:10
to see that this dashboard folder it's
17:12
going to render out all of its files so
17:14
a layout here and air and a loading so
17:18
layout air and a
17:20
loading then our settings folder is
17:23
going to render its layout within the
17:28
loading of the
17:30
parent and then it's going to render its
17:32
hierarchy so air suspense page so on and
17:36
so forth so
17:39
basically if this was our dashboard
17:41
layout and we had our dashboard page
17:45
well we would render our entire settings
17:48
route segment here including its layout
17:52
within the like as a child of the leaf
17:57
most component
17:59
in its parent route so if the parent has
18:02
a page.js file it's going to be rendered
18:05
as a child or within the
18:09
page.js and then same thing if if the
18:12
leaf most was a loading page which it is
18:16
in this example the suspense component
18:19
here is going to be the loading page
18:21
well we're going to render the entire
18:24
child segment inside the leaf most
18:27
component of the par current segment and
18:30
then here covers collocation in addition
18:32
to special files you have the option to
18:35
collocate your files and this is because
18:38
while folders Define routes only the
18:41
contents returned by page.js or route.
18:43
JS are publicly accessible so like I
18:47
showed you earlier you can have a
18:50
components folder with a button.js file
18:54
but you're not going to be able to
18:56
access like for SL components or SL
19:00
components SLB buttons or if you have a
19:02
lib folder with a constants file in it
19:05
you're not going to be able to access
19:07
that lib folder with that constants file
19:10
it's only going to become
19:12
accessible when you add a page.js file
19:15
within it so here it shows if we have
19:18
dashboard with page.js in it and
19:26
nav.png file with in our application our
19:30
components folder we can't go to for/
19:33
components tile because that's not a
19:36
publicly accessible route so if I try to
19:39
do that here you're going to get a not
19:41
found page because that's not going to
19:43
be a publicly accessible route which
19:45
means that you can include a bunch of
19:49
different files that are within a
19:52
certain folder but you're not going to
19:54
make those publicly accessible routes
19:57
because it doesn't follow the like
19:59
page.js file
20:01
convention and then here it shows some
20:03
more advanced patterns that I do have
20:06
videos on so those are some fundamentals
20:10
here of routing in nextjs I hope you
20:13
found this helpful this is like a good
20:16
refresher if you're already familiar
20:17
with an xjs but it's also especially
20:20
helpful if you're just getting into
20:22
routing in xjz to know how all this
20:24
works so let me know in the comments
20:27
below like I mentioned earlier if
20:28
there's anything else specifically you
20:29
want me to to cover here um but thanks
20:32
for tuning into to this and I will see
20:34
you in that next one

https://youtu.be/YcOcibWXvco?si=dzfS0yy9K_9633Eo