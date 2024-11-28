now put this in a markdown code block

make this correct markdown code:

Intro
0:00
superbase is an open source Firebase alternative that I highly recommend you can manage your authentication even
0:06
adding oo providers so we can sign in with GitHub Google discord and all of the others and even managing files and
0:12
storage blobs and various other things as well so everything that you have in Firebase or anything you need for your database you can use it in superbase
0:18
today we're going to check out how we can build a site like this which essentially a very basic todos because what we're going to be learning is how
0:24
we can add super base or to our nextjs application using server side code so what we're going to be using is nextjs
0:30
server actions as well so how we can link up all of these forms with server actions and how we can add buttons like
0:35
this so we can log in with GitHub and then once we log in with GitHub what you'll notice is our todos and the other
0:40
thing we're going to explore as well is using these server actions how we can use the new react hooks so use form
0:45
status so that we can show essentially States so when if we add a new to-do here so let's say hello world like so
0:52
you'll notice this Grays out while it's essentially sending off and confirming with the database that it's done and then we're also going to use use
0:58
optimistic which is how you saw the immediately added there and if we click delete even if the server hasn't deleted
1:03
it yet we show the user essentially optimistically that it has been deleted so let's jump into it to get us started
Supabase Dashboard
1:09
what I actually have here is some example code for essentially the bare minimum for a to-do app except it
1:15
doesn't have the functionality obviously of actually working or anything here working but this is how we're going to
1:20
implement super base and the nextjs form actions just with this as a starting point as I don't want to cover obviously
1:26
creating components and stuff as that can be handled in a separate tutorial this tutorial is just going to focus on
1:31
adding superbase login and the database to this and then using some of those nextjs form actions use form stay and
1:37
use optimistic to make our website feel really good from that server side point of view so to get started what we're
1:43
going to want to do is create a project in super base so log in or sign up to super base hit new project and then
1:49
choose your organization for this we're going to give it a name so for me I'm going to give this super too generate a
1:55
password here and then save that to a password manager as it says this is going to be your database password password for postgress and then for your
2:01
region select a region that's close to where you're actually going to be hosting your website itself hit create
2:07
new project and this is going to go ahead and link us to the dashboard for this project and then we're going to
2:13
wait here until this setting up project bit is complete and then this page should change okay now that that's
2:18
complete your project should start to look like this and it should say welcome to your new project as it's been all set
2:24
up for us one of the first things we need to do is create some tables for it so you can actually use the table editor
2:30
here if you want sort of a nice gooey to set that all up but for us we're going to be using the SQL editor as we're
2:35
going to be using the same SQL so you can follow along with me having the exact same database now you can actually
2:41
use Quick Start and to-do list for this this should build out the exact same one but I'm going to go ahead and paste in
2:46
some SQL just to make sure that I've set up earlier for this application so if we do a new query here and paste this in
2:54
what you'll see is we're creating a todos table we're going to be using an ID with an integer just as our primary
2:59
key then we're going to have a user ID bit now what you might know is we haven't set up an or. users table but superbase
3:06
actually does this for us and it has an off users table that we can reference so user ID here is always going to be a
3:13
user that has been set up with super base authentication and we'll handle that bit in the next step now task here
3:19
is just again it's just going to be a string so this is actually the task bit that we set up and then is complete is
3:24
the Boolean for that checkbox there and then inserted that again is going to be another default that's just going to use
3:30
the time of now of when it's been inserted with UTC the really important
3:35
bit to know on this bit is this row level security here when you're using the SQL editor or you're doing any
3:41
migrations or something if you're using this bit it won't have row level security enabled by default as postgress
3:47
doesn't if you use the table editor here superbase will actually turn this on for us roow level security is essentially
3:53
how we're going to be checking whether the user actually has access to the rows in that database and whether they're able to perform some actions on this and
4:00
this is where we then set up our policies here so you'll see with create policy we have the individual can create a to- do so we're just going to check
4:06
that someone has an or. uid to make sure they can actually um create something in our database as we don't want someone
4:12
who doesn't have an authenticated user to be able to create anything in the database then we're going to do some
4:18
checks for whether they can view create an update or delete their actual todos here so this is just going to be
4:23
selecting the off. uid and equals to the user ID really cool thing about this is you'll see you later when we go ahead
4:30
and call to get the todos in our application we don't actually have to pass through the user ID as the database
4:35
knows once we do that get call and the user has a session in our nextjs application but that's all they have
4:41
access to so that's all it can return so that's really cool once you've got all of this out we're just going to hit run
4:47
here and that's going to say success no row return and that's because if we go back into our table editor here you'll
4:52
now see that we do have that todos table set up the next thing we can know as well is we go to Authentication and if
5:00
we click into providers by default superbase always enables the email provider for you and you'll see in the
5:05
email provider you just have some settings here the one I want to note here is confirm email confirm email this
5:10
is essentially we're going to be setting this up so when someone signs up with an email address it sends off obviously an
5:16
email to them and it has a confirm email link in there just to make sure they're are verified email and it's not spam the
5:22
important thing to know about this is you will need to bring your own SMTP server at some point for development
5:27
superbase only gives you three in a day which is a bit limiting so I do recommend if you're testing a load of signups to turn off this confirm email
5:34
step I'm going to leave it on as we're only setting up one user and I know that we're going to have that confirm email
5:40
bit sent back and we want to test that part of the chain as well but as I said you will have to look into setting up
5:46
your own SMTP server later on or you can just turn off email completely and then follow the next steps where we set up an
5:53
oo provider so we can use stuff like Google discord and GitHub to sign in with our application instead meaning you
5:59
don't have to man manage any of this but we'll go ahead and close that for now the last bit I do want to do as well is
6:05
if we go into the sidebar here you can go down to API docs now superbase docs are honestly really amazing they have so
6:12
much content and so much help for you so you can even click on your tables and Views and it will essentially tell you all of the functions that you can
6:18
perform on it and how to do that the one I want to know is if we go to introduction here on tables and views we
6:24
have this pile on generating types so if you're using typescript you can actually go ahead and download a file which which
6:29
is all of the types that you're going to need or you can set it up from the superbase command line interface now I'm
6:35
actually just going to be hitting this generate and download types here because I know that I'm not going to be changing my database as we've already set that up
6:41
and I know that this is the one that we're going to be using for todos if you're doing a lot of developments so you're adding tables as you go you may
6:47
want to set up this super based command line interface to generate this file for you the last thing we need to do is if
6:52
we go to home and we scroll down here you should see it says connecting to your new project and it's going to have
6:58
that project API where we have a URL and an API key we now need to implement this
7:03
in our application so we go into our super doodo as I said this code here will be in the link in the description
7:09
so you can go ahead and get started from this this is going to be on a branch called start as the master Branch will
7:15
be everything that we do today and you can follow along with my commits they should match up with the YouTube chapters as well so you can see what's
7:21
changed in each section first thing we're going to want to do here is you're going to want to copy and paste your EMV dolo here or em. example to a f here
7:29
called EMV dolo like I have and then you're going to want to copy and paste in those values instead so what you've
7:35
got here is the project API which is that project URL so I'm going to go ahead and copy this in like so and then
7:42
the API key as well I'm going to go ahead and copy and paste that in and replace the one that we had in there and
7:48
there you go you now set up to use your EMV variables with superbase there as it does note here the key is safe to use on
7:55
the browser as with superbase what you'll see in a minute is we set up two different types of clients we're only
8:00
going to be using the server client for this but technically you can use the browser to call off to super base to make changes for you I personally don't
8:07
like doing that as I like to essentially hide where our database is and hide it behind these actions like server actions
8:12
and this is sort of a similar pattern you'll see is where you implement your own API which then goes off and calls the database for you it's just a nice
8:19
way to essentially hide where the actual database is and hide the database functions themselves and it also allows
8:24
you to switch out the database later on as you only have to change your API end points now that we've got that let's
Supabase Setup (Step 1)
8:30
move on to step one which is essentially setting up super base within our application now to do that as I said
8:37
superbases documentation is really awesome we're going to be going to this link here which is Doc /gu or/ server
8:45
side- nextjs this will be a link in the description down below now this genuinely has everything that we need to
8:51
get set up with our application so I'm going to do is I'm just going to stop the server for a second as I have the
8:57
site up and running we're going to install theack packages so I'm going to be using pmpm that's going to be the
9:02
superbase at superbas superbas JS and at superbase SSR The Next Step here is it's
9:08
going to tell you to set up your environment variables which we've done but if you haven't done that already you can actually literally just select your project down here and it will give you
9:14
the exact environment variables we need so you'll see it will have them selected there for either demo project one or
9:20
that super too that we have there next we need to write our utility functions
9:26
as I mentioned earlier we have that client component so to access it from the client component you need to set up that client side one or we set up the
9:32
server one to do this we're going to scroll down though and as I said we're going to be ignoring this client. TS as we're only setting up the service ey
9:38
client as that's the only one I want to be using in this application to do that we're going to go into our uols folder
9:44
you can then going to go into a folder called superbase which you can create and then you're going to add server. TS
9:51
inside server. TS we literally just going to copy and paste this code here essentially what this code here is doing
9:58
is it's just creating a super based client for us and it's again it's going to go ahead and get those environment variables for us and then it's also
10:05
going to handle doing the cookie authentication for us so this bit is just making sure that we have that cookie store and then we're getting and
10:12
setting the operations for us the next bit we need to do is hook up middleware so middleware is how we're going to be
10:17
handling when someone goes to a page we essentially need to change that request to attach a cookie onto that to make
10:23
sure they're a verified user and since we're using server components as well we needed to be refreshing and checking
10:28
every time we go to a page just to make sure that the user is always authenticated to do that we go into our
10:34
super base first and then we add another new file called middleware dots for this
10:40
again scroll down past this bit here you'll see this utils /s superbas SL middle webit and we'll go ahead and copy
10:47
and paste this code as well as I said essentially what we're doing here is we take in the next request which will be
10:53
passed from the middleware we go ahead and get the cookie if we can or we go ahead and set the cookie as well and
10:59
this bit here is quite important for Server ey components essentially what this is doing is making sure on every request we make sure we reauthenticate
11:06
that user and that's just really useful for next year server side as it stops it being cached and not authenticating them
11:13
correctly so you do need that line there as I said luckily that documentation has that all set up for us the last bit that
11:19
we need to do is outside of everything here you need to then create a new file called middleware dots so this is the
11:25
actual nextjs middleware file so this is going to be at your root level and you only allow one of these per nextjs
11:31
application but again this is essentially the nextjs middleware file and this is the bit that tells nextjs on every request to go ahead and call our
11:38
super base function so again we can copy that code and paste that in and you'll see here that our middleware function is
11:44
literally returning just the away of the update update session function that we just created in that superbase
11:50
middleware file the next important thing to note is this matcher here at the moment for the attaching the cookie
11:57
we're essentially making sure that there can be an authentic indicated user or at least that the user cookie is available
12:02
on every single page you can change this for your needs but essentially what this is doing is ignoring however the files
12:08
such as the favon and then various image files as we don't need it on there and as I said it explains it here what it's
12:14
doing it's saying match everything except static files image files and the favon you can modify this however you
12:19
need for our purposes we do not need to modify this so now that we've done that the last thing I'm going to want to do
12:25
is remember that super base file that we downloaded earlier we go ahead and Dr drag this into a folder called types
12:31
you'll see that we now have types and then we have superbase .ts and you'll see as I said you can generate this from the command line or use the download as
12:38
I said as we know we're not changing it we're going to be using the download but what you'll see in here is it has all of the types script that we need for our
12:44
super base database now what I'm going to do is go ahead and commit everything that we've just changed there as step one super
12:51
base setup so you can follow along with the GitHub commits and the chapters next bit we're going to move on to is how we
Email Login/Signup (Step 2)
12:57
can actually set up the email sign up and the email login and then we'll follow that on with setting up o login
13:02
and we're going to be using GitHub but you could use things like Google discord and a number of others so for setting up email signin
13:10
what we can do is we can stay in this same documentation page on superbase and you'll see I actually have a section to
13:16
create your login page we've already done that in this example app that I have if we go into app login you'll see
13:21
that we have a page here now what I'm going to do is I'm just going to run the dev server real quick so we can see some
13:26
of our changes pull through as we go so what you'll see is we have this page on slash login here so if I click the
13:33
sign up button and once that's logged in we have this login page here and at the moment the form obviously isn't going to
13:38
be working even if we fill this out as we don't have it hooked up to anything yet let's go back to the documentation
13:44
and see what it recommends us to do the first thing is we need an app login actions. TS as I said since we're using
13:52
next year server actions this is going to be the recommended method to do this so you're going to do actions. TS now
13:59
now if you're calling any actions from a client component essentially what you need to do is have a separate file with
14:04
this use server directive if you're using server components you can actually inline the
14:10
function and then put use server at the top line of that function I generally recommend and prefer just having all of
14:16
our server functions or server actions in a separate folder or file called actions. TS and I also prefer to locate
14:22
this essentially next to all of the pages that are going to be using it now that we've done that we can actually go ahead and copy and paste the code in
14:28
this actions. TS login I'm going to change a few things about this but just to go through it essentially what we
14:34
have is when we have a login function and I'm just going to quickly change this to email login as well so we can have it clear between our o login when
14:41
we have that later what we do is using a server action we send through some form data so for us that form data is going
14:48
to be email and password and that's based on the name of the input fields that I have set up here so when we
14:54
submit that it's going to have email and password and it's just going to run off and do formdata doget so it comes in as
15:00
this form data object which react has once we do that we do form data. getet just to check the emails there now this
15:06
can actually be string or null so or well as it says there it can be form data entry value or null we're going to
15:12
typ cast this as they say here in practice you should probably be validating this with a library such as Zod so you'd use something on your form
15:19
such as react hook form library and then Zod and validate that schema and then also do Zod dop pass on this side just
15:25
to check that everything matches up since this is a really simple form I'm pretty happy with just typ casting this
15:31
at the moment as I said if you're doing some more complex database stuff maybe consider looking into some form
15:36
validation methods next bit here is it then goes off and says a super base. or sign in with password just passing
15:43
through our email and password there all we're doing is using object destructuring here to get an error there
15:48
is also a data object on this but we don't need that as essentially we don't have to do anything with the Passback
15:53
data from signing with password we do however have to check if there's an error with logging them in or something
15:59
so that could even be just let's say a wrong password now the way they do it is they recommend pushing them to a slash
16:05
error page for essentially easier sake on doing this tutorial what I'm going to
16:11
do is instead of sending them to an error page I'm going to send them back to the login page but I'm going to add a
16:16
message using search params and that's for me is just going to be could not
16:21
authenticate user so if there is an error with logging them in it goes back
16:27
to this login page but it adds a search par which we'll then use later and I'll show you that the next bit that's really
16:32
important is this revalidate path so this is revalidating the path slash at the layout level essentially what this
16:38
is doing is just clearing the cach for everything so it purges all of the cash data on demand for pretty much
16:44
everything as we're using that slash and that layout there and that just makes sure that when we do sign in all of the cach is cleared because now we need to
16:50
get new um cash entries with the user being authenticated and you can also add this redirect here once that locked in
16:57
for us we're going to change this redirect so when I logged in it goes straight to that todos page same thing
17:03
with the sign up here you'll see we have that same structure essentially the only difference here is we're loading up the sign up function here from superbase now
17:10
an important thing to note is every time you use superbase you use this create client function this create client function is actually coming from the
17:16
superbase server file we set up earlier down here lastly again with this message
17:22
bit here I'm going to change this again to the login page and then I'm going to add a search PR and I'm just going to do
17:28
let's say error signing up and then again with the redirect here
17:35
you can change where you want to redirect this to if they hit login I'm going to again redirect it to just the/
17:41
login page so if they do hit sign up they don't go back to the start page they stay here because they may need to go ahead and confirm that email and then
17:48
they can come back to this page here to log in once that step is complete so now that we have both of these functions set
17:54
up we can go ahead and add them but another thing that we're going to want to do is when they hit the sign up Up Button as I mentioned it's going to go
18:00
ahead and call off a different function which essentially sends them an email with confirm email to do that what we
18:06
actually need to do is firstly go back to our superbase documentation here and you'll see there's a step on changing
18:13
the or confirmation path what it says here is go to the or templates dashboard page um take your confirm sign up and
18:19
change this confirmation URL to this string here go ahead and copy this string here and then what I'm going to
18:25
do is we're going to go back to the superbase dashboard you're going to go to to authentication you're going to go to emo templates and then where it says
18:32
confirm sign up you're going to change this bit here where it has those curly brackets and Confirmation URL and you're
18:38
going to paste in that string there what this is doing is the confirmation email is now going to have a link to or/
18:43
confirm and we're going to go ahead and have to set up that route in our nextjs application so essentially when it gets
18:49
back a code it gets that and then it exchanges that for a session token so that's how we can authenticate the
18:55
users's email so let's go back to our code now as I said the next step we need is an
19:01
appor SLC confirm folder now in this appor SLC confirm folder you're going to
19:06
want to create a real root. TS file go back to the documentation here and
19:13
you'll see we have the code that we need for that so we can go ahead and copy that so what this is doing is as I said
19:19
it takes in that code so that token hash that we're going to get back from the confirm email and it goes ahead and it
19:25
verifies that email with that onetime password that's been sent back and and then you can also redirect them if
19:30
there's an error with authenticating them as I said for me and the login I
19:35
don't want an error page I'm just going to redirect them to the login and then as I say there I'm going to add a
19:40
message that says could not verify onetime password so I said we're going to be using that search params later and you'll see that in the page. TSX another
19:48
thing we can do as well is sometimes with emails you'll have that next link so where they're going to go next we're going to change this to SL todos by
19:55
default or it will use the next search param instead but as I said for us we're just going to be using SL toos here so
20:01
when they do sign up with that onetime password and then they go back to the page they're going to be redirected to/
20:07
todos once they are confirmed in so there we go we have everything ready for the email signup form so now
20:13
we actually need to go ahead and Link the form itself so in login and page. TSX what we do is you'll see we have our
20:20
two inputs here and we have a form since we have a form we can use our form actions on our buttons down here the
20:27
first one we have is we're going to have the login button to change this all we're going to have to do is form action
20:33
so on a button now you have a available prop called form action what essentially this is saying is it's going to treat
20:39
the button essentially like a submit button but it's going to change what we do with that form data based on this
20:45
form action prop instead so that means we can have a login and sign up button that do different things based on
20:51
whether they're clicked with the same form data uh data here we're going to add email login for that login page and
20:58
then for sign up button down here I have this button which is just a clickable one sign up for this we're going to add
21:04
form action and that for me is just going to be the sign up function that we created from actions so there you go you
21:10
should have the form action with email login form action with sign up there and that should allow us now to actually use
21:16
this correctly so what I'm going to do is I'm going to use a test email and then I'm going to add a password and I'm
21:22
going to hit login First and this should fail and you'll see we get that message back in the search params up here could
21:28
not authenticate user so instead I'm going to click sign up now once I've clicked sign up you'll see that it's
21:34
redirected us to the login page here but essentially what's happened is an email has been sent to that email address just
21:39
to make sure we can verify our email so what I'm going to do is I'm going to go ahead and load up my emails and make
21:45
sure we've got that one so I have received that email now and essentially what I'm going to do is I'm going to paste in that confirm email link and
21:51
you'll see we have that at type sign up we have a code and what you'll notice is it goes to that Local Host 3000 page
21:57
with or/ confirm there going to go ahead and click enter on that and what you'll see is we get redirected to the todos
22:03
page as we have been logged in however how do we know the user thel is logged in obviously we could call and get that
22:08
Todo but what I do want to change in this step is just change the header to have the username of the user and change
22:14
the sign-in button to a sign out button to do that first though we do need that server action for sign out so I'm going
22:20
to go inead in here and underneath email login and email sign up what we're going
22:25
to do is we're going to do export async function and we're just going to call this sign out like so the first line is
22:34
going to have to be superbase so we're going to use the same that we used everything else where you're doing that con superbase create client the next
22:41
line is going to be AWA superbase do or. sign out like so and then what we can do
22:47
is we can redirect them to wherever you want if someone signs out I'm going to want to redirect them to the SL login
22:52
page so that should be everything that you need for the sign out function but now what we need to do is pull through
22:57
the username and then attach whether they are signed in or signed out and change the button based on that to do
23:03
that let's go into our header I'm just going to collapse everything to make this a bit clearer let's click header. TSX and you'll see that we have a server
23:11
component here with the header since this is a server component what you want to do is firstly make sure it's async as
23:16
we're now going to be using some awaits in here but as I said since it's a server component we can actually use some of our database functions from
23:23
within this so the first line there is going to be con superbase equals await create client like so create client
23:30
again being imported from the file we made from util superbase SLS server the
23:35
next line in here is we're going to then try and get the user for this we're going to do const and then we're going
23:40
to use object destructuring and it's actually going to be data and then we're going to destructure that object again
23:45
to get the user from it and then all of this is going to be equal to away super
23:51
base sorry superbase do.get
23:57
user this one one here like so so now user should either be a user or null so
24:04
what we can do with this is we can go down here and underneath our button step here we can say in here we can say if
24:11
user isn't null so that's going to be the first step and then we can make a turn out of
24:17
this so if the user isn't null the first thing that we're going to want to do is return a P tag with that username in it
24:24
so I'm just going to wrap this all into div quickly like so and then the first bit as I said is I'm going to add that
24:31
paragraph tag here and inside this paragraph tag I'm going to use user. email like so and then also at the end
24:38
of this turnery just going to delete this curly bracket as I want to return this sign up or signin button if they
24:43
aren't if there isn't a user so as I said it's doing if the user isn't null show their email address otherwise show
24:49
the sign in but now we also need that sign up or sign out button to do that I'm just going to come under here and do
24:55
button and then on button what I'm going to do is just change this to a sign out button
25:01
like so so you'll see we have that sign out button just going to add some styling up here as well to the class
25:06
name so let's make that Flex item Center like so and then maybe let's give it a
25:13
gap of four or two let's give it a gap of two like that just to make sure there's a bit of spacing there now with
25:19
the button obviously as this is a server component and we need the button to be essentially we could need it to be a
25:24
client component if we wanted to call that sign out function what you could do is move the button to a separate file
25:30
but another thing and another pattern that I've seen in nextjs is we can actually still keep this all within the
25:35
server by essentially adding a form that is just a button so to do this what we can do is we can actually change our div
25:41
up here if I change this to a form and then obviously change the closing tag to a form we can add an action to this form
25:47
that is just going to be run whenever we click that button so we do action here what we can do is we can say sign out is
25:53
obviously the function we imported from our component up here so from login SL actions so what's going to happen now is
26:00
if I hit that button it's going to go ahead and essentially send off for this form completion so it's going to go ahead and run the sign out function for
26:07
us so if we click sign out now what you should see is it signs us out and we go back to that login page and now another
26:13
thing to note though is if we go click on todos here what you'll see is we can still get to the to-do rout and at the moment the twoos is just a static array
26:19
list so this shouldn't be related to the user but what we do want to do is actually protect some of our Pages now
26:25
so we can go ahead and protect our Pages based on whether user is logged in or logged out to do that let's go to our
26:31
todos page and then go to page. TSX as I said again this is a server component
26:36
which means we can use our super base call within here so to do that we're going to do cons super base and that's
26:41
just going to equal AWA create client we're going to import create client from again our superbase server file now in
26:49
here what we can do is we can do the same thing to go ahead and get the user so as you said there it's that const
26:54
data and then we destructure the user and what we can do here is add one line that's quite important and this line
27:00
here is just going to be if there isn't a user simply return a redirect to SL
27:07
login like so and then redirect is going to be imported from next navigation and
27:13
there we go now if we click on our todos page you'll see we're not able to get there since we're logged in the other
27:19
thing I do like to do is if we go back to the login page scroll up to the top
27:24
we can actually add essentially the same code here so I'm going to go ahead and copy and paste these lines here and we
27:29
go into page. TSX we're going to copy it but we're going to make one change so in our login page here instead we obviously
27:36
want the non-authenticated user to be able to go to our login page so what I like to say is if there is a user go to
27:42
todos essentially just stopping an authenticated user from getting to the login page is that's probably not what
27:47
they want as they they're already logged in make sure we import everything correctly there and again make sure this
27:54
function up here is async so so essentially as I said what I've
27:59
done is I've made sure if they are logged in so let's go ahead and log in this user and check everything is
28:06
working now that they're logged in if I tried to go to the slash login page so
28:11
let's go slash login it would just redirect them to the todos page and again if I sign out now and try to go to
28:17
the todos page they can't get there because they're not authenticated and we've essentially protected that route there and that's using all of that
28:23
middleware stuff that we implemented earlier so now I'm going to go ahead and commit all of this as step two email
28:30
login so let's just call this as said step two email sign up and
28:36
login like so now that we've got that we can move on to how we can actually log in with an oo provider now and as I said
Add OAuth Providers (Step 3)
28:43
I'm going to be using gith Hub in my example but that documentation should help you through everything and the setup that I'm actually using you can
28:49
use any provider with the only setep that's different is the step where we actually go to GitHub and sell our oo
28:55
application so to get started with that let's go back to our superbase dashboard in our superbase dashboard you're going
29:01
to want to go to configurations and providers as you'll see here you'll see an absolute limit of the amount of
29:07
providers you'll have so you can use Facebook figma GitHub you can use so many different providers here as I said
29:13
the one we're going to be using is GitHub I'm going to take this click for GitHub Ena and you'll see it has a
29:18
coolback URL for us we're going to go ahead and copy this coolback URL next you're going to want to go to GitHub
29:24
setting developers when you're logged in and you should see a page like this and then you're going to want to click o or apps here register a new application
29:33
we're going to give this a name that's just going to be super doodo give it a homepage URL for us we're going to use
29:38
Local Host as I'm not actually hosting this anywhere but you want to change this to essentially your domain name and
29:44
then the authorization callback URL is the URL that we just copy and pasted
29:49
from superbase there register the application once you've registered that go ahead and copy over this client ID
29:56
back to superbase copy that back to super base here and then what we also need is a client secret here so you're
30:02
going to want to click generate a new client secret once you've generated a new client secret as you'll see here
30:08
you'll get one that you can copy and paste over again these are all secret values that shouldn't be shared with anyone but since I know I'm going to
30:14
delete all of these after this tutorial I'm okay showing them on screen we're going to go ahead and click save here
30:20
and what you should see eventually is it will check that and it will say enabled there for GitHub next thing we're going
30:25
to want to do is go to that documentation as I said that mentation is so good and then we can copy and paste some of our code samples from here
30:32
as well so what we have with an ooff provider is essentially it's going to go off to GitHub check that the user has a
30:39
valid GitHub account and then it's going to go ahead and return us to this orth coolback routts so it's going to return
30:45
them to your domain name or/ coolback with a code attached to it so we can go ahead and essentially turn that GitHub
30:52
validated code into a session on our side so to do that we're going to go into or now not in the confirm folder
30:59
but outside of the confirm folder we're going to create a new folder called coolback like so and again just make
31:05
sure that's outside of that or folder like that so you should have two separate like this and then inside of
31:10
this we're going to create a root. TS going to go ahead and copy and paste this code from that site here as I said
31:16
it's just taking in a code from that search params that GitHub is going to return and then it's going to essentially go ahead and set the cookie
31:22
for US based on validating them there what we do have here as well is is you
31:28
can return the user to an error page here since it says here if there is an authentication error you can go ahead
31:33
and redirect them and say there was an error again for us we're just going to change this to login and then say let's
31:39
say message um let's say could not log in
31:46
with provider like that so again we're changing that you may want to actually leave in an error page that has some
31:52
more details on how they could possibly get through these errors and now that we have that redirect URL up here as well
31:59
very similar to how we did it in the orth confirm route we're going to want to change this to/ toos this is so that
32:04
when they do log in with GitHub it's going to redirect them to this page instead so it's just a nice user flow so
32:10
when they log in they just get straight to their dashboard essentially now that we've got that we need to add our
32:15
buttons for the actual oor providers as I said that step is pretty much the only bit that will change was that GitHub
32:21
step that we did everything else should be the same from here on out unless there's something very specific to the
32:27
oo provider but I believe most of them should follow this setup here so the next step as I said we need to add our
32:33
oo providers so we need to add a button underneath here that says login with GitHub to do that what I'm going to do
32:39
is I'm actually going to create a component in my login folder here I'm going to create a component called
32:45
oor o or- signin TSX and then in here
32:51
what I'm going to do is create some typescript types so the first typescript type we're going to create is we're
32:56
going to do type and and this is going to be essentially a helper type so that if we do add multiple um providers we
33:02
can use it from this so this is going to be called oo provider and that's going to be equal to an object now first we're going to have
33:08
a name and the name is actually going to use the type Provider from @ superbase superbas JS now this is essentially just
33:15
checking that the string is one of super base's valid providers and you can also probably see the string that you'll have
33:20
to use here as it might be slightly different as you'll notice here for LinkedIn it's LinkedIn
33:26
oidc but for it's just going to be GitHub next thing we're going to want to do is just add a display name so display
33:33
name is just how we're going to show it in the button so we may not want to show GitHub lowercase so we want to add a display name and the next bit we're
33:39
going to add as well is a optional icon and this is going to be a jsx do element so if we do want to show an icon in our
33:46
button we have the option to do that this allows us to use an array in our function essentially so that we can have
33:51
a load of different buttons and we only have to set it up in one place so let's do this now so we're going to do export
33:58
function and then we're going to call this o or I'm going to call this buttons
34:04
and then in o or buttons what we can do in here is we can say const oor providers so we're going to set up an
34:10
array of providers and that's going to be off type oor provider and then an array of that type that's going to equal
34:16
to a new array and then in that new array we're going to set up our first one as I said which for us is GitHub and
34:22
then we're going to have that friendly name or display name here be GitHub and then for Icon here I'm going to actually
34:28
use a GitHub icon which I can get from Lucid react and then I'm just going to add some class names onto that quickly
34:35
just to make sure that it looks good so we're going to add width uh let's say size of five like
34:41
so so now as I said you could add in as many providers into this array as you
34:46
want and now we can just map over that providers to add all of our login buttons for us so now we can simply do a
34:52
return of fragment and then inside of this we can do oor providers map and
34:58
then as it's even correcting for me there we can then do provider and then we can say equals and
35:04
then inside of here we're just going to return a button for me I'm going to be using a Shad CM button what we're going
35:10
to do is we're going to do login with and then we'll do provider. name or
35:15
display name that we used earlier I'm going to go ahead and make sure I've imported this button correctly
35:22
there I'm then also going to give this some styling so I'm going to use the variant of ghost or
35:29
outline like so make sure I just make this easier so it's on one line so yeah
35:34
there we go we have a variant of outline make sure I spell this correctly
35:40
and then also on this we're going to add the class names just to make sure that the actual icons look good so that's
35:46
going to be item Center justify Center and then a gap of two go ahead and save
35:52
all of that now we see there is an error here at the moment as our jsx fragment isn't properly return make sure we do
35:59
that with the curly brackets so essentially you should have something looking like this as I said this is just going to be mapping over our buttons
36:05
let's go ahead and add this component to our page. TSX and then we'll actually link up the logic behind it so
36:11
underneath for me underneath form what I'm going to do is going to add o buttons like so and I'm going to save
36:16
that you'll see now we have a button that says login with GitHub let's go up and fix some of that styling up here so
36:22
we can say width is full like that and then in page. TSX as well I just need to
36:28
change the styling so this form up here is or this card content here if I give this a class name of flex flexco and
36:35
then Gap das4 as it's even suggested for me there and then I can change this margin top four down here as well to get
36:41
rid of some of that and there we go we have our login with GitHub and as I said if you have a load of different buttons or login with Google and various other
36:48
things you can change that there as well inside of here as well I also want to use that provider do icon there we go we
36:54
have a nice icon and it says login with GitHub obviously you can change the text however you want but now we do actually
36:59
need to link this up to how we actually sign the user in with this oo to do that
37:04
what we're going to do is we're going to go into our same actions. TS route and we're actually going to create a new function in here now for the O signin so
37:12
we're going to do export async function that's going to be oof sign in and then
37:20
we're going to take in a provider and that provider is simply going to be again from that super base
37:26
type that we imported in the other component just to make sure it's type safe there and then what we can also do
37:32
if just say if there isn't a provider we can return an error so we can just let's say return redirect again we can log to
37:41
that slash login and then we can attach to that search param again so if there is no provider we first want to error
37:46
out obviously you may not need this check as we should know there's a provider as this is type safe but I'm just showing you the example there so
37:53
once we've checked that there is a provider what we can do is we first set up our super basic client like so so the
37:58
same way we have in all of our other functions we then also want to set up a redirect URL what the redirect URL here
38:05
is is essentially what we pass to GitHub and whichever other provider we're using to say this is where we want the user to
38:11
come back to so for this I'm actually using a get URL function that I have created in my utils slh helper file so
38:20
essentially what this does is it just checks a load of environment variables to check for the site URL so it's going
38:26
to be the next public site URL which essentially you can set to say this is the domain name where everyone should be going back to worst case if that fails
38:34
to get that AK you haven't set that it's going to use the Vel URL so if you're hosting with the forel you're going to use that and then again if that isn't
38:40
set it's going to go back to Local Host 3000 so if you are hosting somewhere else other than Vel you may want to
38:46
change this essentially just change add a environment variable in your. .lo to
38:51
next public site URL and then change that to Local Host 3000 and then when you're live change it to your domain
38:57
name that you're going to be using to host it as I said this essentially just a fancy way to get what the base domain
39:02
name is and if you're using my example repo it's already there for you now inside of this what we do need to do is
39:08
send them to/ or/ callback so we're telling GitHub to go ahead and Link them to whatever the base domain name here is
39:15
sl/ callback as that with the route that we set up earlier now once we have all of that and that redirect URL what we
39:22
can then do is we can say const and then we can do error like so
39:27
and then we can equal this and then we're going to use a super base function so we're going to do super base then
39:32
we're going to do do or and then we're going to do sign in with oor like so and
39:38
then in oor we're going to pass this an object inside of this function we're going to add provider and that is just
39:43
going to be the provider itself so we can shorthand that and then we're going to add options here now this options bit
39:48
is where we want to add that redirect to and that redirect 2 is going to be redirect URL like so now again similar
39:56
to how we've done it with everything else we need to check if error and if there is an error let's go ahead and then reply with that login and then
40:02
slash message and then however if there isn't an error what we can now do is we can say
40:08
redirect and now what we actually need here is instead of error up here we need data and error and the reason for that
40:14
is essentially once super base goes off and checks we're using the GitHub provider what we need to do is then get
40:20
the DAT the URL that the data returns as this is actually the URL that's then going to redirect the user to GitHub to
40:27
sign in there and then that's going to come back to our application to sign them in with GitHub in our application
40:33
so data. URL as I said is what's going to send them off to Google or whatever you're using as your provider so there
40:38
we go we actually have the action set up now we can go back to our page. TSX go into our oor sign in we now need to
40:45
change this to a use client as we're going to have the buttons have an on click in here we could use the form hack
40:51
as well that I showed you before but let's use an on click in here now what we can do is we can do an onclick on our
40:56
button and then on our bottom what we're going to do is we're actually going to make this function async like so and
41:02
then with that async function which simply going to have it do
41:07
await o or signin which is coming from that function that we just set up in the
41:13
other file and then we're going to pass through the provider do name like so
41:18
there we go so now everything should be set up to allow us to sign in with GitHub or whichever other provider that you've utilized so let's go ahead and
41:24
test it on the right here so if I hit with GitHub here what you should see is it should send off to GitHub and it just
41:31
say I need to authorize since this is the first time just to allow this application to use my personal user data
41:37
so I'm going to go ahead and click authorize now that it's authorized as I said it's even sent back to our page
41:43
here through GitHub as we passed it that redirect URL and now we've gone to the todos page and it's loaded in our GitHub
41:49
username here now there's a bit of a styling issue here on mobile which we can fix later since a tutorial I'm not
41:54
going to bother with that at the moment but as you'll see we can hit hit sign out as well and that all works nicely and if we hit log in with GitHub again
42:00
what you'll notice is we don't even call off to the GitHub page or at least it doesn't seem like we do as it's already been authenticated behind the scenes we
42:07
can essentially now sign in nice and easy there using the GitHub provider as well so that's how you can set up any
42:13
number of oo providers all you have to do now is set them up on the superbase dashboard go into your oo signin and
42:19
then just add the provider to this array here so you can set up any number let's go ahead now and commit all of this as
42:25
step three add oo so I've committed all of that now the next thing that we need to do is tackle
Create and Read (Step 4)
42:31
how we now essentially handle the crud side of our application which is create read update and delete so we've set up
42:37
all of the user authentication stuff so all we need to do now is now we have all of that user authentication stuff is add
42:43
some todos to the database and then be able to read them delete them and do various other things to them so let's
42:48
get started with that and we're going to start off with reading so if we go into our Pages here what you'll see is we can
42:55
close down that login page I'm just going to collapse thing again to keep this nice and clean we go into app now todos and page. TSX what you'll notice
43:02
is this is where we have that this is a Todo at the moment it's just an array a string array we actually want to change
43:08
that to be something different to do that firstly what we're going to want to do is we're going to want to load in all
43:13
of the todos from the database instead of being this URL here so to do that as I said we're in this page here what we
43:20
can do is now that we check to User it's authenticated we even have our superbase client set up from earlier we can change
43:26
two do to now equal a away and what we'll do is we'll do super base and then we'll do from and then from you're going
43:33
to want to use your table name for us that was toos then we're going to do select as I said we can select all now
43:39
because we're using that row level security so it's only going to select anything related to that user anyway so we don't even have to check on that user
43:46
ID but one thing I do want to do is I want to order everything I'm going to order it by the date it was created at
43:51
so that's going to be inserted at and then I'm going to change this to be ascending false as well so it's going to
43:59
be ascending false so that's going to order it by a specific way which is just that inserted at date now what you see
44:06
is it says todos do map is not a function what we do actually need to do is change this because every superbase function essentially just returns some
44:12
data but now on that data we're just going to rename that to todos instead so we're using object D structuring there
44:18
to get from our superbase function the toos which comes back as data but we're just going to Ren rename that to toos
44:25
now at the moment we're not getting any errors when we actually should be as two do down here is expecting a string array
44:30
whereas this shouldn't be a string array as you'll notice this isn't any array what we do actually need to do now is change where we set up our superbase
44:37
server if you remember earlier we did put in that superbase dots type we go down now to server dots we can actually
44:43
change this so where it says create client if you change this and then add some brackets here or let's type it what
44:50
we can do is we can do type with database and then make sure we import that from at types SL super base that we
44:57
created earlier what this is doing is essentially telling that create client what the database structure is using our
45:03
types there so now when we go back to todos what you'll notice is it shows us everything we have on that and it's nicely set up for typescript and now
45:10
we're getting some errors as we are using todos separately elsewhere another thing I like to do is go into types and
45:16
what we'll do is we'll do new file we'll do custom. TS inside of this custom. TS
45:22
what I'm going to do is I'm going to export a type and I'm just going to call this too as I said since we have that
45:27
database we can load in our todos but doing this everywhere is quite cumbersome so we do SLU like that or and
45:35
then on public what we're going to do is we're going to get the tables so it's going to look like that then on here we're going to get twoos and then on
45:41
here we're going to get a row as that's the bit that we're worried so what you'll see here is there's various different types insert is just all of
45:47
the data that you need to inser insert so you don't actually need an ID you don't need inserted at and you don't
45:52
need is complete technically all you need is that user ID for row it's just going to make sure everything's returned
45:57
from the database the reason as I said that I'm doing this is if we go back to that type there is this is going to be
46:04
quite long to write everywhere so it's just nice to add in sort of custom ones so you can export that type too and then
46:09
we can just write too everywhere we want that type let's go into our todos list now and then let's change that array of
46:15
string to be an array of Todo like so and then again with Todo item we can
46:21
come in here and change it from instead of just being a single string to be a 2do and then we can change it down here
46:27
as well this is going to start erring out as it doesn't know what to-do technically is we need to do too.
46:32
task and again change this one here just changing it from string that we set up earlier and now we can have too. task
46:40
there for our card let's go back to two. list and you'll notice the key is also erroring out let's make this too. ID as
46:47
well so now we're set up to literally pull through any any of our todos that we've added from our database but
46:53
obviously there's a problem we need to actually add some so to do that we need to link up the form for creating them so
47:00
to do this let's go into our to-do form here and you'll notice we have two components here now I've actually
47:05
separated out the form content from the form and you'll see why later this is about using form status but for now
47:11
essentially follow this structure so to actually link up our form so that when we hit this submit button here we get
47:18
some creation what we need to do is create some more actions similar to how we did for the login so we're going to
47:23
create a new file within this actions page and we're going to call this actions TS now this actions. TS as I
47:29
said is going to be every ow that we're going to handle our server actions so we're going to do use server at the top and this is going to be every ow we
47:34
handle our server actions related to the todos themselves so the first one is going to be export async function add
47:41
Todo and then in here we're going to do form data and then form data which is a type
47:48
we can import like so and then on on that what we're going to do is we're going to do super base
47:53
equals create a client like we have elsewhere and just make sure we import import that create client from that superbase util file and then in here
48:01
what we're going to do is we do text so firstly we're going to get the text from the form data as I said the way we do
48:06
that is we use form data. getet now for me I called the text area input too like
48:12
so and then again what we can do is we can actually typ cast that to string or null as I said earlier if you you'll
48:19
probably want to add a more experienced form validation Library onto this but for now we can do string or null and
48:25
then I can simply do a quick check that just says if text is null obviously what we can do is we can then throw a new
48:31
error so I'll throw a new error which just says text is
48:37
required like so and then you'd actually handle this from an error page as well using error. TSX and next JS but for
48:44
this example we're just going to skip over that bit for now the next step is we want to make sure the user is
48:50
authenticated so we can actually get that ID to insert so what we do is do data and then user like so and that's
48:57
just going to equal away superbase do.get user like that so underneath that
49:03
what we can now do is we can say if there is no user throw a new error saying the user is not logged in like
49:08
that and then finally what we can do is we can say const and then is we don't need the data return from the actual
49:14
sign in or for the add function we're just going to get if there's an error on it instead and now what we can do is
49:19
finally add the entry to our database so we can do AWA superbase do from and then
49:26
we'll do todos like so and then do insert and then we'll insert a new to-do
49:31
object so inside of here all we actually need to insert something is the task itself which is just going to come from
49:38
text and then all we need is the user ID as well which is just going to come from user. ID like that and there we go that
49:45
will actually insert it into our function now again what we can do is check that there wasn't an error
49:50
inserting that into our database if there is we can just throw another new error
49:56
uh and that can say error adding
50:02
task and then once all of that's done the last thing we need to do is actually revalidate our paths so with r
50:08
revalidate path we need to revalidate essentially anywhere that the data from
50:14
inserting this should be updated so for us that's that SL todos page so when we go ahead and add something it's going to
50:20
revalidate the cache to make sure that the essentially Todo list isn't cached and it's going to revalidate it to add
50:25
our new entry and you should see that update nicely so now that that's done what we need to do is link up our form
50:30
so when we actually submit it it calls this server action to do that what we're going to do is go back to our Todo form here at the top of this now what I'm
50:37
actually going to do is change this to a client component and the reason for that is we want the form to clear its values
50:43
once it's been submitted and to do that we need to use a form ref so come down here and firstly we'll do that bit we'll
50:49
do const form ref equals use ref from react and that's going to be HTML form
50:55
element ref like so and we'll make that null by default but then on the form here we'll just pass through a ref and
51:01
that's going to equal that form ref there that we just set up like so now
51:06
what we need to do is set up the actual action for when we submit this form so when we hit this button here what happens when we submit it for that what
51:13
we're going to do is we're going to use on the form it has that action prop inside of this action prop we're going
51:18
to make it an async function which just going to take data and then inside of
51:23
this function here what we're going to do is we're going to obviously go ahead and do await add too which we just
51:29
created from our server actions file pass it through all of the form data as that's what it's expecting then
51:35
underneath this what we can now do is do form ref. current and then if that exists we can do do
51:41
reset as as I said what this is doing is once the to-do is added it's going to go ahead and clear the form for us so now
51:48
what we should see is if we add a first to-do let's call this hello world like
51:53
now submit that what you should see is it goes off it runs that server action that we set up it inserts it into the
51:59
database and it revalidates the path for us so there we go we've handled the creating and reading of todos it's a
52:05
really good time to go ahead and finish this Todo as well which is subscribe so go ahead and tick that off and hit
52:11
subscribe down below now what we need to do is handle the updating and deletion so I'm going to go ahead and save all of
52:17
this however as this is going to be step four create and read and now we can go ahead and link up
Update and Delete (Step 5)
52:25
how we actually make sure that this ticking off the checkbox is handling that on the server side to add changing
52:30
it in the database and making sure we can actually delete some of these as well so for delete and update what we
52:37
actually need to do is go back to our actions and add in some server actions for the those functionalities as well so
52:43
in here what we do is we do export async function and this one here is going to
52:48
be delete 2o on this I'm actually going to take in an ID which is going to be a number as that's the ID that we use for
52:55
our toos again we can do that check for if there isn't an ID but what I'm going to do is I'm going to do const super
53:00
base create client and then in here what I'm going to do is do const and then we're going to do data and again we're
53:05
checking on that user again so we can do that away superbase doget user like that
53:11
now once we have all of that we can again check if there isn't a user so if there is no user throw a new error that
53:17
the user isn't logged in and now we can finally go ahead and try the delete and we'll do the same thing we've done
53:23
before where we don't need the data object we just need whether there's been an error with actually doing our function and now we can do
53:30
superbase from and then todos like it's suggesting there and then on all of this
53:35
we can do do delete and do delete doesn't actually take anything in so if we do do delete like this what we need
53:41
to do is then do a do match and then this do match is essentially how we tell it what we're matching against to delete
53:48
for that we're going to be matching against the user ID so user ID and that's just going to be equal to user do
53:54
ID and then underneath this as well we're going to be matching on ID that we passed through and that's going to be ID
54:00
like so so as I said what this is doing is we take in the ID of the Todo we want to delete from the database and then it
54:06
goes off and makes sure that we're deleting the one which is related to the user with that ID there so now we can
54:12
obviously do our if error it's the same as we've done loads of before we can say Throw new error error deleting task and
54:19
then finally we do the same thing we did with ad which is we revalidate the path which we're concerned with and for us
54:25
that's SL toos now we need to do something very similar for update too so let's go ahead and
54:31
create that one now since we're in this file you can do export async
54:37
function and then we'll call this update too now you could obviously change these functions to be essentially a bit more
54:44
um minimal so let's say at the moment I'm just doing update Todo which is just going to take in a to-do itself you
54:50
could just take in for example the text or the checked and you can make these functions a bit more minimal but for
54:56
this we're just going to need to do it this way we're going to do const super basic equals create client and then again we're going to get user to make
55:02
sure we're checking against that user as before go ahead and do if there isn't a user throw new error and then finally we
55:09
can do our super base functionality again so what we can do is we can say const and then we can do that error bit
55:17
error like so that's going to equal to away super base and then on this we're
55:23
going to do superbase fromom similar to the once before do todos do update and
55:29
then we can actually just give it the whole Todo object here and then we also need to do do match now you'd think we
55:35
could give it the whole to-do here but I've actually had problems doing that so if we just match this on userid is user.
55:41
ID and again the ID is too. ID and then finally we can do the same thing we've
55:46
done again which is if there's an error throw a new error and just say error updating task and then finally
55:52
revalidate path SL2 there we go make sure we've imported our type that we created from at types
55:59
custom and you'll see we have our two functions we have that delete one so this is the bit that's actually handling
56:04
the delete it's saying from our todos database or from our todos table go ahead and delete anything that matches
56:10
this and then the same for update it's going to go go ahead and update with the values to update so as I said we're
56:15
passing through a whole to-do so we'll just change something on the original object it's just going to go ahead and update that based on whichever what this
56:22
is again similar to delete and both times there validating the path SL toos
56:28
so let's go ahead and hook this up so the first one we're going to hook up is the delete as obviously we can now check that really easily so to do that we're
56:35
going to go to to-do item and you'll see we have a button for the delete here now we just need to add in our actual server
56:42
component for that or server action for that again what we're going to do since this is now nested in a form we can use
56:47
on the button we can use a form action so now we can do form action inside of this form action what
56:54
we can now do is we're going to do async brackets data so let's do async brackets
57:00
data like so that's going to equal to a new function and this function here is
57:06
just going to be a wait delete Todo which we just created and then from there we're going to do too. ID which we
57:13
can get from the props so there we go our Todo of delete should actually start working but what we do need to do is add
57:20
use client at the top here so let's do use client at the top there and now that that's refreshed what we should see is
57:26
if we hit delete on something it goes ahead goes off to the database and that works really nice now we have our
57:32
deletion step working so you see there we can delete something so that's now deleting from the database correctly
57:38
next bit we need to do is handle the updating so see if we click the checkbox how it goes off and then sends that to
57:43
the server so for that what I'm going to do is I have my check box here which is actually using shads n's checkbox I'm
57:49
going to change the checked value on this to be a Boolean I'm just going to wrap this in a Boolean of Todo do is
57:56
complete this is essentially just making sure that if it's null obviously it converts it to a Boolean as well so now
58:02
that we've got that what I can do is add an oncheck change so that's how I handle it for this checkbox yours might be
58:07
slightly different but what I'll do is on check change what I can do is I can say async and then Val so that's going
58:14
to be the value of the checkbox and then we're going to do a function in here and what I'll do is firstly for checkboxes
58:21
with radex UI or Shad CM we need to check that it's not intermediate so so
58:26
I'm going to check that the value isn't intermediate so if it is intermediate we'll just return null so let's just
58:31
change that there and now what we can do is we can say a wait update Todo like so and then
58:39
we'll pass that the to-do object so it's just going to be Tod do but then we'll change isore complete to the value like
58:45
that and there we go that will now change it on the database side of things so if I go ahead and tick subscribe like
58:50
you should and then refresh the page what you'll see is it's pulling in that checkbox value from the database and if
58:56
we went to our table we would see that is complete is ticked so there we go we've actually handled the update and
59:01
delete step in there now now there is one thing that you may notice is when we click that checkbox there's a bit of a delay that can feel slow to the user so
59:08
if I go ahead and let's say I add in a delay onto our actions so if I go to update too now you don't need to do this
59:15
bit I'm going to add a fake 3 second delay and you'll see when I click that now there's a 3se second delay between
59:21
it actually showing the user so the next bit that I'm going to handle is how we can add some stuff using some new react
59:27
hooks so that's going to be use form State and use or use optimistic to essentially show the user whether
59:34
something's pending so something's happening on the server side or with use optimistic how we can make it an
59:39
optimistic update so it instantly changes on that screen but it might take a while on the server but as we said
59:44
we're optimistically updating it let's move on to that now so I'm going to go ahead and commit all of this as step
59:50
five update and delete okay so the first method that we're going to be using is using the use form status hook so for
useFormStatus (Step 6)
59:58
that what we can do is we can go to firstly our to-do form so when we submit this form let's make sure that the
1:00:04
fields disable for when it's actually adding and sending off so they don't add another one or click or spam the send
1:00:10
button for example so to do that this is why I have actually separated out form content because to use this hook of use
1:00:17
form status it has to be within a form context and to do that it obviously has to be a Char component of form so we
1:00:24
couldn't set it up here as that's in this same component so now what we do is we come on to form content here we can
1:00:30
say const and then we can do an object D structure here and just say pending and pending is going to equal to use form
1:00:36
status which comes from react Dom so that comes from react itself now all we
1:00:42
have using that is we can now say disabled on the text area equals pending and on the button as well we can add
1:00:48
disabled and that's going to equal two pending as well that's actually our first usage of that used form status
1:00:54
hook so now we went ahead and said hello world like this what you'll see quickly is it Grays out there while it's waiting
1:01:00
for the server to complete and confirm that that action actually occurred that way they can't spam that button so we
1:01:06
said spam button here and I tried to spam this you'll see that it gets disabled there and then finally once the
1:01:12
server is complete it resets the form and we're ready to add a new one we can actually go ahead and add that to the
1:01:17
to-do item to show the same thing for a deletion event as well so if we now go to to-do item you'll see this is
1:01:24
actually why I separated it out like this you may have looked at this earlier and thought that was a bit weird that I wasn't wrapping this component but this
1:01:30
is why we handled it there so now what we can do is we can do the same thing here we say const and then pending and
1:01:36
that's going to equal to use form status here like so and now we can go ahead and
1:01:41
use that so what I'm going to use that for is firstly I'm going to change the opacity to some of the entire card based
1:01:47
on whether it's pending status so what I can do is say pending and then opacity 50 if that is pending and I can also go
1:01:54
ahead and disable the check box for example if it is pending and then disable the button as well if it's
1:02:01
pending like so now that I've done that well you'll see if I delete something it Grays out for a bit there until it's
1:02:07
confirmed deleted there we go so there we go that's all nicely hooked up but what you'll notice is the checkbox
1:02:14
doesn't actually work there I'm going to show an alternative method at the end of the video that would get the checkbox to work for this but what I actually want
1:02:20
to show you now is the use optimistic hook which I think is a way better usage of this checkbox and that way we can see
1:02:27
when we delete something or add something it immediately updates the UI for the user and then we can actually go
1:02:33
ahead behind the scenes and if there was an error adding it we could then come back to the user and say error adding this and then remove it most of the time
1:02:40
there won't be an error which is why optimistic uis are great as it just makes a application look really Snappy
1:02:45
so let's move on to that I'm going to go ahead and Commit This at a very small step step six use form status so this
useOptimistic (Step 7)
1:02:53
next hook as I said is use optimistic is another new one one in react so it's going to be in react 19 but we can use
1:02:58
it already using nextjs as they use next Canary builds so what we're going to do is we're going to go to our Todo list
1:03:05
now at the moment this is quite simple as it takes in that todos that we get from the server from our page. TSX what
1:03:10
we're going to want to do in here is we're going to want to change this to use client and then we're going to use optimistic as we can start using that
1:03:16
hook so up here let's change this to use client now that we have used client here
1:03:22
what we want to do is set up a reducer first so the first thing we can to do is we're going to do export type action and
1:03:28
this is going to be a type that's just going to define the actions that we want to perform on our optimistic list so for
1:03:33
me that's going to be delete update and then create as well like so now we're going to use that
1:03:41
in a function that we're essentially going to call a reducer so that's what the optimistic um hook takes in so to do
1:03:48
that and this will be a bit clearer once we start writing this function what we do is we do export function and I'm
1:03:53
going to call this Todo reducer like so this 2do reducer is going to take in
1:03:58
state and that state is just going to be an array of 2do like so let's make sure
1:04:04
we type correctly using that Todo type that we imported or created from our custom
1:04:09
types earlier and then the actual next prop is going to be a object and that
1:04:15
object is going to have to have an action on it and a too and then we're going to type that as well as obviously
1:04:20
action is going to be from our action type that we just created and then our Todo again is going to be a to-do
1:04:26
like so now that we have that function what do we do inside of that so now we need to perform essentially Val change
1:04:33
the state input based on whatever the action is so as you'll see there it's pretty much recommending what we need to
1:04:39
do but what we're going to do is we're going to do switch on the action So based on the action perform something
1:04:44
else so in the case of a delete on the case of a delete let's do
1:04:51
return and we'll just do state do filter and then inside of the filter we'll just filter based on ID from that too and
1:04:59
then we'll say essentially if ID isn't equal to too. ID and there we go that
1:05:05
will go ahead and delete that ID for US based on that make sure I wrap this
1:05:10
correctly in Brackets here so we go ahead and wrap that in Brackets that should clear that
1:05:16
arror there as we're using object D structuring so as I said our first one is we take in the state so this is essentially think of this as your to-do
1:05:22
list this is essentially the master list and if the that we've passed in is delete and the the two do we've passed
1:05:29
in we essentially return the state list just filtered to exclude that deleted ID
1:05:35
so the next one we need to do is we need to do in the case of an update so in the case of an update what we can do is we
1:05:41
can do return state do map so we're going to map over all of our states and
1:05:47
then we're just going to do essentially a t like so so that's going to represent our too we're going to say if t. ID
1:05:54
equals to equals equals 2 too. ID so if the map value we're
1:05:59
mapping over is the one that we actually want to change let's change it to whatever we've passed through as the
1:06:05
data to update otherwise let's just leave it untouched like so so it's really simple one line to essentially
1:06:11
say if the to-do ID is passed through with this just change it to whatever we've passed through otherwise return
1:06:17
what was originally there so that's how we handle the update now the final one we need to do is create and this one is
1:06:24
really easy as well so all of these are pretty simple here now all we need to do with this is simp return the array but
1:06:30
with our new to-do at the top of it now you might want to change where the 2do is based on how you're filtering this as
1:06:35
I said since I'm filtering by new should be appear first I'm going to have the 2do at the start of the array you may
1:06:41
want to start it at the bottom of the array but there we go so for create essentially all we do is just add our new to-do to the array and then finally
1:06:48
we can add a default case as well and in the default case I'm just going to return the entire array again just going
1:06:54
to return St like so so there we go we have our 2D reducer and we have that action so how do we set that up well one
1:07:01
of the first things I want to do is since we passing this to use optimistic you'll see we're going to pass it down
1:07:06
to some various props I'm going to go ahead and create a type for this so we're going to do export type and then
1:07:12
that's going to be to-do optimistic optimistic update like so that's going
1:07:18
to equal to a function so that function is going to be an action and that action
1:07:24
here is going to have action action so that's going to be from the type we created earlier and then on
1:07:30
that we're also going to have a 2do and that 2do is going to be A2 like so and then all of this is just going to be a
1:07:36
function that returns void essentially what you'll see is we use this type later just to make sure that we don't
1:07:41
have to have really complex types like this copy and pasted into all of our functions we can now simply just use
1:07:47
this one type here now let's get on to actually using the use optimistic hook as that's what we're here for so what we
1:07:55
do is firstly we do const and then what we're going to say is optimistic
1:08:00
optimistic like this toos and then we also going to do a another the second
1:08:06
side of the array is the updat function so that's going to be optimistic todos update so
1:08:11
optimistic make sure I spell everything correctly update like so and all of this finally is going to equal use optimistic
1:08:18
like so and then in that use optimistic we pass it our todos list that we get as a prop from the function as I said the
1:08:24
orig the ACT ual real 2dos list is what's passed through to this component but then also on the second half of this
1:08:31
we pass through the 2do reducer that we just created this is what your component should look like now so we have this
1:08:37
optimistic todu again making sure I spell everything correctly here it's getting quite long you may want to
1:08:42
rename this function and then we have our optimistic todos update so we change this todos down here to our optimistic
1:08:49
Tod and there you go you're seeing that nothing's actually changed there but essentially now what this is using is
1:08:54
instead of the actual real list from our server it's using the use optimistic list which is populated from our server
1:09:00
list but then we can also make changes to it that occur immediately and then when this todos gets updated it then
1:09:06
resets the list to the actual server list itself so how do we go ahead and start using this the first one that
1:09:12
we're going to want to do is using it in the to-do form so for that what I'm going to do is I'm going to say
1:09:17
optimistic update like so I'm just going to set that equal to the optimistic todos update function now this is going
1:09:24
to error out we actually don't have this prop on our to-do form yet so we go back to our Todo form let's now add a prop to
1:09:31
this so the prop is going to be optimistic update there and as I said the type of that is going to be that
1:09:36
type that we created earlier which is that 2do optimistic update type so so
1:09:43
there we go now we can actually optimistically update our form when we submit that value so what you'll see is
1:09:49
we have the action here with the AWA too like so so what we need to do is we need to add to our create a new too item and
1:09:56
we're actually going to fake some of the data for this so to do this what we're going to do is if we come into our action we can now say optimistic update
1:10:04
and then the optimistic update as we said is expecting an action so we create an object inside of here we put the
1:10:11
action prop the action here is going to be create since we're in our to-do form then it's also going to need a whole
1:10:16
to-do for that to-do let's actually create an object before this which is going to be const new too like so I'm
1:10:25
I'm going to map that to the Todo type so that we get nice type completion there like so and then make sure I
1:10:31
import that from Custom and then on this what I'm going to do is I'm going to say the ID is equal to minus1 now as I said
1:10:38
since this is an optimistic update this isn't actually on the server and the server is going to go in later and refresh it once it's added and change it
1:10:45
so essentially what I'm doing here is I'm adding some fake data same thing with inserted out I'm actually just going to change that to an empty string
1:10:52
and the same thing with the user ID as all of this is happening on the client side I don't actually need to check that there's a user ID related as I know it's
1:10:58
just essentially that client and as I said later on once the server verifies that two do is been added all of this is
1:11:05
going to get refreshed so this data will be populated correctly but all I need to do then is say task and that's going to
1:11:10
equal to my f data. getet and then we need to get my Todo task on that which I
1:11:15
believe was from the field Todo and I'm going to typ cast that to string so that's coming from this task up here
1:11:22
which is the name 2u so that's just loading in the value so we have the ID the inserted at and is there anything
1:11:28
else that I'm missing on this let's check our to-do type so we've got the ID inserted at and then yeah also is
1:11:34
complete let's set that to falce so there we go we have our new to-do so let's now put that in the object here
1:11:40
and finally what you'll see is so now what we're doing is when we submit this submit form it goes off and it calls the
1:11:46
action it creates essentially a fake to-do that just has our data and this is only going to be used to update the UI
1:11:52
instantly and the second it's been added to the server it's going to go ahead and change this value to have the correct user ID in the correct ID values but
1:11:59
since we don't know the ID when we optimistically update we can just set this to minus one setting this to minus one is quite helpful as if you want to
1:12:05
run checks later on you'll see we'll add some checks into to-do item such as if we click delete and the ID is minus one
1:12:11
don't run it as we know that's not going to exist yet next what we do is we do that optimistic update function we pass
1:12:17
it the action we want so this is going to go ahead and run our reducer function with create and it's going to go ahead
1:12:22
and add that new too so what this means is if I go ahead and say hello world again up here what you'll notice is
1:12:28
that's going to go ahead and immediately update it however there is a problem here which is optimistic update isn't a
1:12:34
function that's because I haven't saved my to-do list here but let's go ahead and save my actual to-do list functionality there and let's try that
1:12:41
one again so let's do hello world and you'll notice this will immediately appear down below so really Snappy there
1:12:47
and if you remember when we set up use form State you notice this only disables when the actual State hasn't been
1:12:52
deleted so let's go to our actions just to show you that so if I go to add Todo action what I'm going to do is I'm going
1:12:58
to go ahead and add that 3 second delay that I showed you earlier and then if I come in here and I say hello again what
1:13:04
you'll notice is it will be grayed out as it's disabled but that hello was added long before the server confirmed
1:13:09
that it was actually added and that's what essentially an optimistic update is so now that we've done that on the form
1:13:15
let's go ahead and add a deletion optimistic update as well so to do that let's go to our to-do item in here or
1:13:22
let's first go to our to-do list then on Todo item we're going to have to pass it that optimistic to-do update again I'm
1:13:27
going to go ahead and copy and paste what we've got down here so on the 2do item we then need to pass it a prop that
1:13:33
says optimistic update that's going to be optimistic 2do is update now inside of the 2do item again what we're going
1:13:38
to have to do is change it to have that new prop of optimistic update and again that's going to equal to our type which
1:13:46
is Todo optimistic update let's just change this down here
1:13:52
we should then have optimistic update and that's Todo optimistic update there
1:13:58
and make sure we import that correctly there we go now again since we have this nested component we need to go ahead and
1:14:05
pass all of this through again which is a little bit annoying but we could probably move this to a context if we
1:14:10
have seal nested components for the tutorial I'm not going to bother doing that but now let's go ahead and change
1:14:16
our to-do card as well to have that optimistic update I'm going to go ahead and copy and paste this so I don't make a typer and then let's change the type
1:14:23
as well to obviously make sure we have that reducer function there we go now we're ready to
1:14:28
start using the optimistic update function within our actual to-do card here so again same as before we have
1:14:35
that form action and when we click delete what you'll notice is here we have that await delete too but just
1:14:40
before that what we can now go ahead and do is we can say optimistic update we pass it an object again which is going
1:14:46
to have that action and the action type now is going to be delete and we can just pass it through our entire to-do is
1:14:51
it's just going to go ahead and get the ID from that now if I click the delete button Buton you'll notice it is instant
1:14:57
we notice that it's deleting immediately when we click that now the last thing we need to do is make sure that when we
1:15:02
have our checkbox that that is also optimistic as I said at the moment there's a bit of a delay with that and it feels a bit weird as a user now for
1:15:09
that what we're going to do is we're going to change our checkbox here for this what I actually recommend is not
1:15:15
really using the optimistic update function and I'll explain why in a bit and I'll show you an alternate method
1:15:20
where we can actually use that optimistic update functionality but I find it a bit weird and a bit hacky so
1:15:25
the way I recommend doing optimistic update on this is simply just using State as we normally would in pretty
1:15:31
much any other component so what we'll do is we'll do state checked set checked we'll make this use State like so and
1:15:39
then we'll change this to too do is complete just making sure I import UST state from react there and then on UST
1:15:45
State what I'm going to do is we'll just change the oncheck changed here to just say set checked and then the value there
1:15:52
we go so what we're doing essentially is we're just setting state to whether the to-do is complete and you'll notice now
1:15:57
that this will start being immediate as long as we change this Boolean here to actually use our checked value there so
1:16:03
let's change this to use our checked value and you might also have to wrap this in a Boolean as well as it can't
1:16:09
convert null there so let's wrap checked in aulan and now you'll notice if we click this it's instant and it's not
1:16:14
necessarily happening behind the scenes instantly but it's showing to the user instantly now that is essentially how we
1:16:20
use use optimistic to create update and delete what I'm going to go ahead and show you just after this is a real quick
1:16:26
way that we can actually change this checkbox to use a form action and also use that optimistic hook you're not
1:16:32
actually allowed to use the optimistic hook or you're not recommended it comes up with an error if you're not using a form action which is why we do it this
1:16:38
way I'm going to show you another alternate way which I personally don't like which is why I've left it out of this bit but let's commit this now as
1:16:46
the last step there which is Step seven use optimistic so as I just mentioned we're going to change this to quickly
Checkbox form action (Step 8)
1:16:51
make sure that the checkbox is actually using the optimistic value what I'm going to do firstly is delete these
1:16:56
pending bits here as we're not going to be using them for this section as we don't want it to gray out once they
1:17:01
click the complete as this is what's going to happen is before what you may have seen is when we clicked the check boox it wasn't doing the gray out that
1:17:07
the delete was that's cuz it's not using a form action now that it is we do want to make sure that it's not flashing for
1:17:12
the user so we're going to change this there to Todo do is complete and get rid of essentially what we just did in the
1:17:18
last step now what I'm going to do on here is I'm going to change the type of this checkbox to submit and this is
1:17:24
where it's sort of feels a bit hacky as we're changing the type of the checkbox to submit as form actions only work if
1:17:30
the type is submit or if the type isn't there at all now what we can do is we can change our on check change to
1:17:35
essentially let's change this to form action and then on this form action we actually don't need the value here as we
1:17:42
don't need to check this is intermediate what we can do instead is we can change is complete to be the opposite of what
1:17:47
the current 2do value is so to do do is complete and go ahead and save that and what you'll notice is as I said there
1:17:54
it's graying out the buttons when we click and this is now using a form action but obviously we can change this
1:17:59
to add our optimistic update before it as well and for that what we can do is we can do action and then that's going
1:18:06
to be update and then we're just going to do the Todo and the to-do is just going to be equal to do do do too and
1:18:12
then is complete or isore complete as I said it's just going to be the opposite of too do isore complete finally let's
1:18:20
go ahead and save all of that and now you'll notice we are using an optimistic update so it's immediately update and as
1:18:25
I said at the currently moment it's graying out the second we click it and that's because we're using that form status here so I recommend you go ahead
1:18:31
and get rid of that if you're using the optimistic method that we just set up there so let's go ahead and delete that
1:18:37
and we should see that it starts being nice and optimistic for us using that user optimistic Hook from react so there
1:18:43
we go we can spam that and it immediately updates for the user as I said that was essentially an extra step
Outro
1:18:49
and I don't really like this method I'm kind of preferring it to do it in state there but we're still learning about this if you know a better method do let
1:18:55
me know down in the comments below as always please subscribe to Jolly coding and if you have any questions do check
1:19:00
them out on the GitHub repo or leave a comment down below and if you want to see more tutorials let me know down below what else you would like to add
1:19:07
and as always thank you very much for watching


https://youtu.be/A6-56miVA_0?si=asF6JgRtQHEtouZO