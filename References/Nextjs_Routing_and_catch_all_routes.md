Dynamic routes in nextjs what are they
0:04
how do they work and then we're also
0:06
going to show you an example of how to
0:09
implement Dynamic routes here so first
0:12
off what what are Dynamic routes well
0:15
these are for when you don't know the
0:17
exact segment names ahead of time or you
0:21
don't know the exact route ahead of time
0:24
and you want to create these routes from
0:27
Dynamic data so for example in this
0:31
application here and I know it's looks
0:34
pretty dang gross here but this is just
0:37
fetching some mock data here from Json
0:58
placeholder.svg navigate us to a post
1:01
however like we don't we don't know
1:05
necessarily like what post ID that they
1:08
want to navigate to so do they want to
1:10
navigate to Post SL1 post sl3 post sl4
1:16
so on and so forth so if I click on this
1:20
you're going to see I navigated to post
1:22
for 6 because all we're doing in this
1:25
nextjs app is I'm getting these posts
1:28
from G some placeholder and I would
1:32
definitely recommend doing some air
1:33
handling here but I'm not for the sake
1:35
of this example but we get the post we
1:38
map over those and then we render a link
1:41
to that post at slost slome Dynamic ID
1:47
so we need to create Dynamic routes that
1:51
are going to match this Dynamic ID for a
1:55
given post because you know we don't
1:57
want to show them a not found page of
1:59
course we want to be able to click on a
2:02
post and then show them the page for
2:04
that post so in order to implement this
2:08
functionality like we don't want to
2:09
create in our application we don't want
2:12
to have to create all these different
2:14
routes like a new folder post SL1 post
2:18
SL2 post sl3 that would be frankly
2:24
ridiculous to do we want to create
2:26
Dynamic routes so how do we do this in
2:29
xjs well it is pretty straightforward if
2:33
you haven't seen my like fundamentals V
2:35
video on routing in xjs and you don't
2:39
know how like basic routing Works in xjs
2:42
that would be good to kind of watch
2:44
first but I'm going to assume a certain
2:46
level of knowledge there so the way that
2:49
this works is and we'll come back to the
2:51
docs here quick and I will have my
2:53
project Linked In the description below
2:55
as well as this page in the docs all we
2:57
need to do is create a route
3:00
that has square brackets around it so a
3:03
dynamic segment can be created by
3:05
wrapping a folder's name in square
3:07
brackets for example square brackets ID
3:11
square brackets slug so on and so forth
3:14
Dynamic segments are passed as the pr
3:17
prop to layout page route and generate
3:20
Med data functions so for example if you
3:23
create a route that is blog SL square
3:27
bracket slug square bracket and you have
3:29
a page.js file in that and we're looking
3:31
at that
3:32
page.js well you can get this Dynamic
3:37
value here using the pams object passed
3:42
as a prop to your page so this is their
3:46
page that is sitting in the folder
3:49
that's titled square bracket slug square
3:51
bracket so if someone goes to blog SLA
3:57
or blog SLB then this pams object here
4:02
the value of it at do Slug and this is
4:07
important as well the name that's within
4:10
square brackets is going to match the
4:12
name of the property on the primes
4:14
object that you're going to be able to
4:16
access to get the value that they're at
4:19
right here so this is going to be some
4:22
Dynamic value within square brackets and
4:24
you're going to access it using the
4:27
property on the PRS object that matches
4:30
the name that you put within the square
4:32
brackets so if they go to blog
4:35
SLA frames. slug is going to equal a and
4:40
they're showing this here if you go to
4:42
bloga the slug is going to be a on pr.
4:48
Slug and then if they go to blog SLB
4:53
well the value of frames. slug is going
4:56
to be B and then you can use that
4:59
information to show the correct blog
5:03
post so let's go ahead and implement
5:06
this if we come back to vs code here I
5:09
have my post page so I need to create a
5:12
dynamic route at post slash and then
5:17
some ID so here within our post folder
5:21
we're going to create a new folder and
5:23
I'm going to do left square bracket ID
5:26
right square bracket so now we have
5:28
created a a dyn iic route here and then
5:30
I'm going to create a new file and I'm
5:32
going to be page. jsx and then I'm just
5:35
going to export a default function
5:39
called post now as we just looked at in
5:42
the docs since this is a dynamic segment
5:45
we're going to be passed a
5:47
params object that is going to be on our
5:51
props or passed as a prop to this post
5:53
component and then we are going to
5:56
return well we are going to return just
6:00
some information regarding a post so
6:03
what this is going to be is I'm just
6:04
going to do a div and then an H1 and
6:08
eventually it's going to have the title
6:11
of our post and then I'm going to do a P
6:13
tag that's going to have the body of our
6:16
post but we first need to get our post
6:20
dynamically so let's for now just say
6:24
post title and then I'll say post body
6:30
and then all we'll do for now is let's
6:33
council. log the pams
6:37
object so if I go to posts SL1 SL2 we
6:43
should see different values counil log
6:46
here so let's start with that so I have
6:49
everything running here and then if we
6:52
come back and I click on a post you see
6:56
I see post title and post body nothing
6:59
fails here I click on a different one
7:02
post title post body and a different one
7:05
and now let's check our counil we can
7:08
see that on this params object it has an
7:12
ID property of the value of six and of
7:15
the value of 13 and of the value of 20
7:18
because that is matching the post ID
7:21
that we have we were navigating
7:24
to so now with that we can say const ID
7:29
is equal to rams. ID or maybe even
7:34
better is we can
7:37
destructure ID from the PRS
7:41
object and now we should have the ID of
7:45
our post so with that ID we can now make
7:49
a request to our Json placeholder API to
7:55
actually get the desired post so what I
7:58
can do now I can say cones is equal to
8:01
and let's make this an aing function
8:04
here so cones is equal to a weit fch and
8:09
then the URL is going to be
8:11
https colon SL Json Poli
8:17
holder. typic code.com
8:22
slps SL and then I need to do dollar
8:25
sign curly brace and then the ID but of
8:30
course this needs to be in back tis here
8:33
so it's actually a template string and
8:37
we pass the dynamic
8:39
ID and then we need to say const post is
8:43
equal to wait
8:45
res. Json and now that we have our post
8:48
here we can render and you can look at
8:52
the API for this but it's going to be
8:55
post. tile as well as post.
9:00
body for the title and body of the post
9:05
and then I'm just going to add a few
9:06
Styles here to make this look a little
9:09
less gross I'm going to copy and paste
9:11
them from just a demo project I did
9:15
earlier but I'm going to put those in
9:17
there you can of course if you're
9:18
following along you can copy and paste
9:21
from my GitHub repo now I'm going to
9:24
delete this Council log and now let's
9:26
head back to our application and already
9:29
you see at post
9:31
for20 looks like we see an ID as well as
9:35
the post body and if we go to a
9:38
different one we see a new title a new
9:42
body another different one A new title a
9:46
new body so it looks like we are
9:48
correctly implementing Dynamic segments
9:51
here now before you go a couple of other
9:55
things to know about so you can optimize
9:58
this a little bit by using the generate
10:00
static frames function you can do this
10:03
to build routes at build time instead of
10:07
on demand at request time which might
10:10
help your performance a little bit it
10:12
mentions the primary benefit of generate
10:14
static prams is a smart retrieval of
10:16
data if content is fetched with the
10:19
generate static prams function using a
10:22
fetch request the requests are
10:23
automatically memorized this means a
10:26
fetch request with the same arguments
10:27
across multiple generat static prams
10:30
layouts and pages will only be made once
10:33
which will decrease build times so this
10:36
is a performance optimization you can do
10:39
I've covered this in previous videos but
10:42
if you would like to see like just a
10:44
specific video on this let me know and
10:46
I'm happy to cover that now one more
10:49
thing I wanted to touch on here is catch
10:51
all routes so what if you wanted to do
10:57
something like this so you mention that
10:59
Dynamic segments can be extended to
11:01
catch all subsequent segments by adding
11:04
in ellipses inside the brackets for
11:07
example
11:10
atshop square bracket do do do slug will
11:14
match forshop for SL close but it will
11:18
also match forshop slcl SL Toops and
11:24
it'll match all these as
11:26
well so what
11:30
what does this kind of look like so for
11:33
example we have our post here for
11:36
sl22 but what if what if we also wanted
11:40
to see a different post on this page or
11:42
something well if I go to now if I add
11:47
sl22
11:49
SL2 what happens well this page cannot
11:52
be
11:53
found which isn't what we wanted here so
11:59
let's come back and let's make this a
12:02
catchall route so instead of just ID
12:06
let's rename this
12:08
to dot dot dot ID so we've now made this
12:12
a catchall route and now let's come back
12:15
and we see we we don't have any data
12:19
here so we're not getting a 404 so we
12:23
are matching this route but we're also
12:26
not getting any posts and that is
12:28
because is let me instead of doing this
12:33
here well we can keep doing that but
12:34
I'll just council. log our prams
12:38
now and if I hit the return statement a
12:42
little bit here what you're going to see
12:44
is that now we have PRS but our ID PR
12:50
it's now in Array of 22 and
12:54
two so this catchall route it's now in
12:59
of setting the ID as just 22 it's an
13:02
array of 22 and two and if we add three
13:05
here it's going to be an array of 22 2
13:10
and
13:11
three so if we wanted to show all these
13:14
post on the same page well then we could
13:19
instead of this logic here we could do
13:24
const posts is equal to a wait and then
13:28
we can use
13:29
promise.all our ID is going to be an
13:32
array so we can do id. map and then we
13:35
can do
13:36
async ID and then we can say const res
13:40
is equal to await and then this is going
13:42
to be our fetch request based on our
13:46
post so right there it's going to be the
13:49
same fetch request we had earlier and
13:51
then we can just return await res.
13:56
Json and then instead of of just
14:00
rendering
14:02
this we can
14:05
render JavaScript land I'm going to say
14:07
post. map I'm going to accept a post and
14:10
then we can return I'm going to cut and
14:14
paste this in here and I know this
14:17
doesn't look great and I'm also going to
14:19
wrap this in
14:21
a react fragment here and that
14:26
should do what I want here so let
14:29
come back and we do see all of our posts
14:31
here and if we add
14:33
another post here you see it's just kind
14:36
of appended to the bottom of this page
14:39
so we're doing just this big kind of
14:42
catch all route here to see all these
14:44
posts on the same page because now our
14:48
pams well our ID is going to point to an
14:52
array of different values we're getting
14:54
all the posts using promised. all and
14:57
then just mapping over those
15:00
posts so that is how you can Implement
15:03
Dynamic segments as well as catch all
15:07
segments Within nextjs

https://youtu.be/4BUIeofMuMs?si=P-SsCc18c5tFKAIK