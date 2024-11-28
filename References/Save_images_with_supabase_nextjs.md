0:00
if you want to add some images or files
0:02
to your database you don't use a
0:04
database you have to use a storage
0:06
bucket so I'm going to show you how to
0:07
do that with super base let's do it all
0:09
right so right here I already got a
0:11
nextjs project set up and over here I've
0:13
already got my super base project set up
0:15
if you want to know how to do that watch
0:17
this video right here so first thing
0:18
we're going to do we're going to come in
0:20
here we're going to go to storage let me
0:22
make this a little bit larger and we're
0:23
going to create a new bucket and you can
0:25
call this whatever you want I'm going to
0:27
call it dank pic and you're going to
0:29
want to make this a public bucket we're
0:31
going to add some rules so that it's a
0:33
little bit more secure though so we're
0:35
going to save this and then we're going
0:36
to click on policies and right here dank
0:39
picks we're going to click new policy
0:41
and then we're going to say for full
0:42
customization so there's a lot of stuff
0:45
you can do for this I'm going to just
0:46
call this all and I'm going to say
0:49
select insert update delete and we're
0:52
just going to allow everyone to do
0:54
anything if you want to watch a more
0:55
in-depth video on this let me know and I
0:57
can make one so we're just going to
0:59
allow everything then we're going to
1:00
click review and then we're going to
1:02
save the policy so now our bucket is set
1:04
up it's that simple so now we're going
1:06
to come back over here we're going to
1:09
open our website and we're going to add
1:10
some code to add some images so right
1:13
here I'm going to add an input and this
1:15
is going to be of type file and we're
1:17
going to say multiple and then below
1:19
this we're going to add a button it's
1:22
going to say
1:24
upload images and then we're going to
1:26
add some styling to this we're going to
1:28
say BG slate 600 a py of two a width of
1:33
40 and rounded of large and so now you
1:37
can see we've got our ability to choose
1:39
our
1:40
files and then a button that says upload
1:43
images this is not going to do anything
1:44
and this right here this looks very ugly
1:47
so we're going to make this look a
1:48
little bit better first thing we're
1:49
going to do we're going to say const and
1:51
we're going to say
1:53
image input ref and we're going to say
1:56
equals use ref we need to import that
1:59
from react and this is a type HTML input
2:02
element and we set it to null so now we
2:04
can come here and we can say ref equals
2:08
image input ref and now we can add a
2:11
button that says select images and then
2:15
we can take this class name right here
2:18
and we can add it right here and then we
2:21
can also
2:22
say on click and we're going to add a
2:25
call back function this going to say
2:28
image input ref
2:30
do current question mark. click and so
2:35
now when we click this button select
2:37
images it's going to pop it up and so
2:39
now we can come to this input and we can
2:41
say hidden and so now we don't have to
2:44
see this stupid looking input so now
2:46
we're going to come here and we're going
2:47
to say on change we're going to add a
2:50
function called handle image change so
2:53
we're going to come up here and we're
2:55
going to say const handle image change
2:59
and we're going to create an arrow
3:01
function and this function is going to
3:04
expect an event which is of type change
3:08
event we're going to have to import that
3:10
from react and then we're going to say
3:11
HTML input element and if you want to
3:15
know how to get this type and types
3:17
script all you have to do is you come
3:18
over here to this on change and instead
3:21
of just passing in this function
3:23
directly you come here and you put an e
3:28
in here and then if you hover over this
3:30
it tells you exactly the type so you can
3:31
just copy that paste it in there so now
3:34
we can come in this function and we can
3:36
say if e. target. files then we're going
3:41
to say const files array equals array.
3:46
from e. target. files and then we're
3:49
going to say const New Image URLs equals
3:54
files array.map
3:59
F and then from this file we're going to
4:01
get
4:02
url. create object URL and we're going
4:06
to pass in the file and then we're going
4:08
to set some state so we have to create
4:11
some state with use State and we're
4:13
going to call this image URLs and we're
4:16
going to set this to an empty array and
4:19
then we need to come in here we need to
4:21
say string with these brackets to say
4:23
that this is going to be an array where
4:26
everything is a string because it's it's
4:28
not able to infer that when you pass and
4:30
just the brackets so now we can come
4:31
back to this function and we can say set
4:34
image URLs and we're going to set it to
4:37
dot dot dot image URLs so whatever the
4:40
current image URLs are and then we're
4:42
going to add in the new ones as well and
4:45
so now if we come down here we can
4:49
create a div we're going to give this a
4:51
class name we're going to say flex and
4:53
gap of four and then we can say image
4:57
url. map we're going to get the URL and
5:00
the index and then we're going to return
5:03
an image import this from next SL image
5:06
and then we're going to say key equals
5:08
URL Source equals URL we're just going
5:12
to say width equals 300 and we'll do the
5:15
same for height and then we need an alt
5:18
and we will make this Dynamic we'll make
5:20
this image Dash index so now when we
5:23
select some images these should show up
5:27
so now we can see we've got our images
5:29
right here so now we want to be able to
5:31
upload these images to the storage
5:33
bucket so we're going to come to this
5:34
button and we're going to say onclick
5:38
and then we're going to say handle click
5:41
upload images button so now we have to
5:43
come up here we're going to say handle
5:46
click upload images button it's going to
5:48
be an async function and we need to come
5:50
up here and we're going to say use
5:54
transition we're going to say const and
5:57
inside brackets we're going to say is
5:59
pending and then we're going to say
6:01
start transition and so we don't
6:04
actually need to use this for the
6:05
example that I'm setting up but if we
6:06
want to talk to our database we're going
6:08
to have to use a server action so I'm
6:09
going to just set it up with the used
6:10
transition because this is how I
6:12
actually do it in the real world if you
6:14
aren't trying to communicate with the
6:15
database you don't need this and you'll
6:17
see why I'm using it in a second so
6:19
we're going to come inside this upload
6:20
image function we're going to say start
6:23
transition and we're going to say async
6:26
actually now we can come up here we can
6:27
remove this async because this is async
6:30
and then we're going to create a
6:31
callback function and we're going to say
6:33
let
6:34
URLs equals an empty array and then
6:37
we're going to say for const URL of
6:41
image URLs we're going to say const
6:43
image file equals
6:46
await convert blob URL to file and we're
6:52
going to pass in this URL and so I've
6:54
already written this function so I'm
6:56
going to import it and if we come over
6:58
here and look at it so basically when we
7:00
select the images and then this saves
7:03
the image I just selected to the image
7:06
URLs this just converts the quote
7:09
unquote image URL to a file and we need
7:12
a file so you can just copy this code
7:14
right here the GitHub repo is also in
7:16
the description so now we can come back
7:18
into this function and we can say cons
7:21
and we can say image URL comma error is
7:25
going to equal await upload image and
7:29
we're going to write this function in a
7:30
second inside of this function it's
7:32
going to expect a file which is image
7:36
file and then also a bucket we're going
7:40
to call this dank pic because that is
7:43
what we called it earlier when we
7:45
created the bucket in super base and
7:47
then after this we can say if error
7:50
we're just going to console error the
7:51
error and return and then I'm going to
7:54
say url. push image URL and then down
7:58
here I'm going to say console log the
8:00
URLs and then we're going to set the
8:01
image URLs to blank and so if you were
8:04
actually doing this let's say a user is
8:06
updating their profile or something
8:07
they're updating their profile pictur so
8:09
we're going to upload the image to the
8:11
storage bucket but then you also have to
8:14
update the user with the new image URL
8:17
so that's why I use this used transition
8:20
hook right here because instead of this
8:22
URLs push image URL what I would do is
8:27
add this image URL to the user in the
8:29
database but for this we're just going
8:31
to keep it simple so now we can write
8:33
this upload image function so we're
8:34
going to come over here to this
8:35
superbase folder and you can see we
8:38
already have this client function which
8:39
I explained how to do in the other video
8:41
I also have these docs right here which
8:43
you just basically copy and paste this
8:46
and so once we do that we're going to
8:48
create a new file and we're going to
8:50
call this storage SL client. TS and so
8:55
you can use both the client and the
8:57
server for this however I would recom
8:59
recommend using the client because if
9:01
you use the server then you have to pass
9:04
all of the image data from the client
9:07
pass all that to the server and then
9:10
send it to your storage instead we can
9:12
just go directly from the client to the
9:14
storage and if you use something like
9:16
versell they have limits on the amount
9:17
of data that you can send from the
9:19
client to the server so I found that
9:22
it's always best to go directly from the
9:24
client to storage so we're going to come
9:26
to this client. TS file and we're going
9:28
to say export
9:30
function upload image this is actually
9:33
going to be an async function and so we
9:35
can come into this upload image and it's
9:38
going to expect a file a
9:41
bucket and a folder and then we can pass
9:44
in some props we'll call this upload
9:47
props and so now we have to say type
9:50
upload props equals and this is going to
9:54
be this right here a file of type file a
9:57
bucket of type string folder of type
9:59
string and so now inside of this
10:01
function we're going to say const file
10:04
name equals file. name we're going to
10:07
say con file extension equals the file
10:10
name and we're just going to get
10:12
everything to the right of the final
10:14
period so like PNG or PDF or whatever
10:18
and then we're going to say const path
10:20
equals and we're going to say if they
10:24
pass in a folder then it's going to be
10:25
the folder slash and then we're going to
10:28
use a uuid so we're going to say you can
10:31
say
10:32
pnpm add uuid or npm I uid and then also
10:38
to get the types if you're using
10:39
typescript you're going to use
10:41
pmpm add and I'm going to say
10:44
dashd and I'm going to say at types SL
10:49
uid so once you do that we can now
10:52
import this uu ID right here so we're
10:55
going to say import uu ID
10:59
V4 as uuid from uuid and this needs to
11:05
be V4 and this should be uuid V4 and so
11:10
you can do this however you want how I
11:12
have decided to do it is every single
11:14
file that I upload I just give it a
11:17
random name using a uuid so once we get
11:20
the path we're going to create a TR
11:22
catch block and we're going to say file
11:25
equals a weit and we're going to say
11:28
image
11:29
compression and we're going to pass in
11:31
the file and then we're going to say Max
11:34
size MB equal 1 so we're going to
11:38
compress this and this right here we get
11:40
from browser image compression so you
11:43
just come down here and you just simply
11:45
add this so you say pmpm add browser
11:48
image compression and so now if someone
11:51
on your app tries to upload like a 2
11:53
gigabyte file this is going to compress
11:54
it so it's no larger than 1 Megabyte and
11:57
you're going to want to make sure that
11:58
you do that CU if people are uploading
12:01
and viewing large large files that's
12:03
going to use up all your bandwidth and
12:05
that they'll eventually charge you for
12:06
that so you're definitely going to want
12:07
to compress these images so right here
12:09
we're then we're going to say catch
12:12
error and we're just going to console
12:14
error the error and we're going to
12:16
return we're going to return this object
12:18
right here so once we compress the image
12:20
we're going to say con storage equals
12:23
get storage and so I'm going to come up
12:26
here and I'm going to write a function
12:29
called function get storage
12:34
and we're going to import this so this
12:37
is using this is how we create our
12:40
superbase client right here so you can
12:43
import the database the off there's a
12:46
lot of things so we're importing storage
12:48
and I've just made this simple function
12:50
get storage so now right here we've got
12:52
our storage and so now we can
12:55
say const data comma error equals await
13:00
storage. from bucket and then we're
13:04
going to sayt
13:06
upload the path and the file and so if
13:09
you want to know all of the different
13:11
methods available the docs right here
13:13
and I've linked them in the description
13:14
so we're going to attempt to add it to
13:16
the storage and then we're going to say
13:17
if there's an error return no image URL
13:20
and this error message otherwise we're
13:22
going to say const image URL equals and
13:27
it's going to be set equal to to the
13:29
next public superbase URL which you get
13:32
when you create your superbase project
13:34
and then it's going to be SL storage
13:37
slv1 objectpublic and then the bucket
13:41
and then the data. paath and then once
13:44
we do this we can just simply return the
13:46
image URL with no error so now we can
13:49
come back over here and we can import
13:52
this so now this should work first I'm
13:54
going to do is I'm going to add these is
13:56
pendings I'm going to make these all
13:58
disabled
13:59
if this transition is pending which
14:02
means the images are being uploaded so
14:04
we're going to add this to all of these
14:08
and then also right here I'm going to
14:10
make this say is pending it's going to
14:13
say uploading dot dot dot otherwise it's
14:15
going to say upload image so now if we
14:17
have done this correctly we can select a
14:19
couple of images and then we click
14:22
upload images uploading and boom so now
14:25
we can come over here to our bucket and
14:28
we can now see that we have these three
14:31
images that we just added and so how you
14:34
see these images so if we come back over
14:36
here I logged the URLs for all of these
14:39
so I'm going to take one of them and
14:42
we're just going to
14:44
add another image right here we're going
14:47
to say Source equals the name of this
14:50
URL right here and then we're also going
14:52
to come right here and we're going to
14:56
paste this information just change this
14:59
this
14:59
to that and so now it's showing the
15:02
image that is in our storage bucket and
15:05
so what you would do is in your database
15:07
for whatever user you would save this
15:10
right here with that user and then so
15:13
when you want to see that image you just
15:15
create an image source equals the URL of
15:19
the image and so also one thing you have
15:21
to do to make this work is you have to
15:23
come in here to your next. config file
15:26
and you have to add this code right here
15:28
you have to basically tell nextjs that
15:32
it's okay to view things that come from
15:35
this domain so just copy this code right
15:38
here and put it in and so also if you
15:39
want to delete an image I've added right
15:42
here to the client file this code right
15:45
here which I use to delete an image so
15:47
if you just want to copy this code the
15:50
concepts are exactly the same instead of
15:52
using
15:53
storage. from bucket upload we just do
15:56
storage. from bucket remove and then you
15:59
pass in the path of all the files you
16:01
want to remove so there it is you
16:02
learned something subscribe you want to
16:04
learn some more watch this video right
16:06
here see you next time

https://youtu.be/87JAdYPC2n0?si=MB9jiRQUeqN4O2sy