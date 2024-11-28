0:00
hi guys I'm om back with another video on nextjs 15 in this video I want to talk about very important topic that is
0:07
routings and layouts in nextjs if you have an experience in react and want to switch to nextjs and want to build an
0:15
application in nextjs then routing is the first step you can start off with if you are a beginner if you have never
0:21
worked in nextjs then this video is for you guys and if you have an experience in nextjs there is a chance that you
0:28
might not aware of some Advanced routing Concepts that I'm going to talk about in this particular video and if you are
0:35
already aware of react then I think nextjs routings and layouts covers 50 to
0:41
60% of the topics in nextjs and then you can straight away start off building your web applications after routings and
0:48
layouts there are few more topics that you need to learn in order to have a good understanding of nextjs and by the
0:56
end of this video I'm going to tell you what are the other four five videos that you must watch in order to understand
1:03
how to create components what are server side components what are client side components what are server actions so
1:09
the point I'm trying to make here that routings and layouts are the most important topic for you to Kickstart
1:15
working and building your web application so this video is both for beginners as well as the experienced
1:22
nexj developers because I'm going to be covering the basic routing Concepts as well as the advanced routing Concepts in
1:28
next js5 so while explaining you routings I don't want to spend or waste time in designing stuff setting up
1:36
layout navbar content text sizes background color writing CSS or Tailwind
1:42
CSS in fact I only want to focus on routings what are the different types of
1:47
routing so I have already set up these Links at the Navar and against these
1:53
links I've already set up this text which are going to be visible below it so I only want to spend time explaining
2:00
you guys so that you can understand routings and layouts fully since this video is for beginners as well so I want
2:07
to start off with creating a new nextjs project who are just switching from react and want to learn nextjs so first
2:15
of all let me share with you my node waran this is the waran I'm using and
2:21
this is the npm Varian which I am using so after installing node and npm in vs
2:27
code we can open up any folder that we have created in our system so I have
2:33
created next 15 routings in the terminal I can write this command npx create next
2:39
app at and since at the time of recording this video this nexts verion
2:46
15 is in beta mod it is not stable yet so for installing and creating the next
2:52
15 project I need to write RC after that but when you are watching this video
2:57
when next js15 is already stable then you can simply write latest over here
3:02
and it will create a new nextjs 15 project at this time if I write latest it will create next 14 project because
3:10
at this time which when I'm recording this video it is not stable so I need to create next 15 project since I need to
3:17
write RC over here and then I will be simply writing dot dot means that I don't want to create a new folder within
3:23
this folder in fact directly create all of the files of nextjs and make the fold
3:29
older name as a project name automatically okay so I will hit enter now it is going to ask me questions I
3:36
want to go with the typescript I want to go with es lint yes for Tailwind CSS no
3:42
for Source directory I can choose Source but uh usually I don't want to build my
3:48
projects using Source directory but it's up to you guys then I want to start off with the app router which is recommended
3:56
in nextjs 13 14 and 15 let's go with the that for now we don't need turbo pack so
4:02
let's click no no for import Alias as well so this is going to create a new
4:07
NEX js15 project now this was just to explain you how to create a nextjs 15
4:13
project I want to start off with this template which I have already set up in order to explain you guys about all
4:20
kinds of routings and layouts so this is the next Just5 project which I'm already
4:25
running and set up and I've already shown you how it is looking like currently so initially when this will be
4:31
created you will not see this components folder I've created this components folder separately and it contains the
4:37
navb bar. TSX file over here and you will see that I'm using this link class
4:42
from the next link and it is just navigating to different pages and this is the text which is being visible over
4:49
here and along with that I'm just setting up some styles using Tailwind CSS and it contains nothing much and
4:57
this is how you are looking like the Navar over here and then we have this app folder it will be created when you
5:04
will have the next project set up first of all let's open up the package.json file you can see that I'm running this
5:11
project by running this command next Dev by running npm run Dev command and it contains these dependencies nextjs 15
5:18
Varian which is built on top of the react Varian 19 both are in the beta mod
5:24
right now so initially you will see this app folder if I open this up you will not see any of these fold ERS when you
5:30
create a new nextjs project and it is going to contain this fonts folder in
5:35
nextjs 15 previous versions were not having this fonts folder automatically created so this app folder initially is
5:43
going to contain this page. TSX file this refers to the Home Route we cannot
5:48
change the name of this file it is predefined in nextjs directly within the app folder okay so when the page. TSX
5:56
file exist directly within the app folder it automatically set as a home
6:02
route and this is containing this simple div with text 2XL and the landing page
6:07
text and this is how you are looking at this is the Home Route Local Host column 3000 and this is what it is showing
6:14
landing page over here all right and then this particular folder app is going
6:20
to contain this file layout. TSX and this file works as a high order
6:26
component in nextjs and you can see it contains HTM and body element and it
6:31
contains I've I've set up this these divs myself okay to set up some layout
6:37
adding some margin paddings and these things uh so but we are not going to focus on the designing in this video
6:43
just focus on the routes and here you can see that I have added this Navar it is going to be visible above these
6:50
children children are the props which are coming in as a react node so the
6:56
main layout. TSX file within the app folder is going to to receive everything
7:01
of our application um it can be the other child routes other routes the
7:06
content coming in from the other files or components so it is going to be received over here so only the content
7:13
which is being received in the child component is going to be changed whenever we change the route if I click
7:18
on home you can see the content is going to be changed but the Navar is going to stay over here because this is not the
7:25
part of the children only the children content which refers to the separate seate routing components are going to be
7:32
affected and being visible over here all right so you can go through pause the video you can go through the styling if
7:38
you want but I have just already set up because I didn't want to spend time on writing these Tailwind CSS classes other
7:45
than this when you create a new project this app folder is going to take this favicon icon automatically and then
7:52
there's a fourth file this is going to contain this globals do CSS it contains
7:58
some default styling for the body and configuration for the Tailwind CSS so
8:03
again this page. TSX file works as a home landing page route and this
8:09
contains this div initially when I created a new project it was containing a lot of elements but I removed those so
8:16
this div is going to be passed this high order component as a children so that's
8:22
why this Navar is going to stay same over here and this children is going to receive the content which is being
8:28
passed from this page. TSX file over here and this is why I've added this
8:34
particular route at the top Landing so that if we are on another route we should be able to navigate back to this
8:41
Home Route Local Host column 3000 so again don't change the names of these files page. TSX file and layout. TSX
8:49
file these are automatically recognized by nextjs so we cannot change its name there are few more files which were not
8:56
automatically created in new nextjs project like not not found loading Global error these are the predefined
9:03
file names as well which I have created just now and I'm going to be talking about these new files in this video now
9:10
if I open up navb bar. TSX file I have created this route one home with this
9:16
particular text and it is going to be visible on the Navar over here so how we can create this new route ignore these
9:24
digits which I've added this is just for my understanding and I've created this for this particular tutorial so that I
9:30
can move along step by step okay so I have created this one home in this
9:36
particular folder one home and inside this one home it contain page. TSX file
9:43
okay we cannot change the name of these files over here so the folder name becomes the part of the URL whatever we
9:50
write directly within this app folder over here so one home means that it is
9:56
going to become Local Host column 3000 slash one home this is the reason I've
10:02
added this slash1 home over here and when we click on this home this content
10:08
is going to be visible over here home route as a part of this children which
10:14
is being passed over here here okay so now let me go to The Lending and if I
10:21
click on home you can see that this content is quickly going to be visible below this nav bar so this is how we can
10:28
create a new route just write the name of that folder which you want to be a part of the URL okay and inside it we
10:37
have to write page. TSX file again we cannot change the name of this file it
10:42
is predefined in nextjs only the folder name reflects the URL next we have other
10:48
route let me see we have this route to about so let's see what we have inside
10:54
it so here we have this about and it contains this page and it will simply
11:00
navigate to slash to about route and the reason I have created this is to show you that if we create any other custom
11:08
component that can behave like a child component to this page. TSX it will not
11:13
affect the routing structure to about so if I go over here if I click on about it
11:18
will work just like this text from that page. TSX file and custom data text is
11:24
coming from this custom component and the reason we can put these kinds of custom components directly in the route
11:30
because if we want these components to be only used by this page. TSX file then
11:36
we can put directly inside it or we can put these components anywhere else we want like we can put it inside this
11:42
components folder or any other folder it depends upon us next we have this nested
11:48
route let's say if we want to enable this nested route sl3 parent SL nestate
11:53
or whatever the folder name we add obviously we are going to create another folder inside the parent fold folder and
12:00
we are going to create the page. TSX file within the nested child folder so this is the content it needs to be
12:06
visible on the UI and we can navigate to that by clicking on this nested link
12:11
over here so here I can click on that and you can see in the URL that it is
12:17
showing sl3 parent SL nested and you can see that I have not created page. TSX
12:23
file directly inside the parent folder sl3 parent so let's see what happens if
12:28
I directly hit three parent so it is going to show custom 404 page this is
12:34
because of this file which I have created not found it is predefined file we cannot change its name if I open it
12:41
up you can see that it is showing custom 404 phage if we want to show custom 404
12:46
message if any route does not exist in our application we can add this file not- found. TSX if we don't add this
12:54
file there is a default 404 page UI by nextjs which automatically gets visible
12:59
on the screen so now let's talk about the dynamic routing I've already created this thing so we have this route slash4
13:06
products let's go over here let's try to click on Dynamic it is currently showing one and two obviously there will be a
13:13
folder so let's open up the four products and inside this folder we have this page. TSX file and it is showing
13:20
one and two okay so now if we have this particular route and each product can
13:26
have its ID the products can range from one up to 1 million numbers let's say 2
13:31
3 1 2 3 all of these values we can put after that we cannot create all of these
13:37
different folders it will fill up our directory structure we need to create a kind of folder that should receive all
13:44
of these Dynamic values after the first four products slash1 23/ th000 so let's
13:52
create a dynamic folder that is going to receive uh these different values and it
13:57
can be the numbers alpha numeric are the only alphabets so inside this page we
14:03
have this folder with Name ID which is wrapped inside the square brackets okay
14:09
square brackets make this particular folder dynamic means we can have any
14:15
value inside it we can pass any alpha numeric numbers or alphabets passed to
14:20
it so in the main page. TSX file which is directly inside four products contain
14:26
one and two clicking on one is going to take us SL 4 product SL1 sl4 product SL2
14:33
and we can have more links as well like slash4 product sl3 slash4 and we have
14:41
not created all of these one two three folders inside this four products we
14:46
have only one ID folder inside the square bracket so inside this page. TSX
14:53
so first of all let's click on One clicking on one you can see that it is showing a uh this URL for products
15:01
SL1 if I go back let's click on two you can see that the URL is changed with two
15:08
and three is going to change the url with three so it means that we can pass any value to it it cannot be the number
15:15
only but uh the product ID are representing number so that's why I've added the number but we can pass any
15:21
kind of value inside it so let's open up this page. TSX file this page. TSX file
15:27
inside this ID for folder which is wrapped in square brackets is showing the content inside it the product three
15:35
and this three is being fetched from the URL I'm also going to show you how we can fetch the URL so in nextjs we have
15:42
this params prop automatically available whenever the page. TSX file is added
15:48
inside this Dynamic folder so params can contain this ID which is the name of
15:55
this particular folder whatever we write inside the square brackets we have to receive its value by entering the same
16:02
folder name and this is how I'm finding the ID from the URL and this is where I'm printing it so this particular route
16:09
page. TSX file is handling all of the multiple Dynamic routes which is coming
16:15
from the URL now let's talk about nested Dynamic routings let's say we have this route sl5 products and we have this
16:23
folder /5 products and it contains this page. DSX file product one two just like
16:30
the previous folder for products so let's first of all open this up what do I mean by nested Dynamic routing if I
16:37
click on Dynamic nested link you can see that it has navigated to/ five products
16:43
it is showing product one and two we can add more products if we want let's click on one okay so I have navigated to slash
16:51
Five products so this product have id1 and product one can have multiple
16:56
comments inside it so I have added this comments link over here if I click on it
17:01
you can see that it has navigated to slash5 products slash1 SL comments so
17:08
product one can have multiple comments now we can have multiple comments uh
17:14
inside it so we have two comments currently let's click on two so now you
17:19
can see that product two having two comments and we are managing the route
17:26
accordingly product slash2 two belongs to the product ID slash comments and
17:32
slash2 this two belongs to the comment and the comments belongs to the product two two is the ID of this product So
17:40
currently we have two nested Dynamic routes it can contain any value for the
17:45
products it can contain any value for the comments so let's see what we have in the folder structure we have this
17:53
particular page directly inside the five products folder we have one and two
17:58
which is n navigating us to the five products one and two just like before so let's open this up so currently you can
18:04
see that/ ID Within These square brackets and it has this page. TSX this
18:11
page. TSX is receiving an ID just like before and this ID is showing uh the ID
18:17
of product over here okay and then we have this comments link over here inside
18:24
each of the product inside the each of the dynamic ID of the product okay so it
18:30
is taking us to the slash Five products slash ID which is the ID of the product
18:35
slash comments and this comments should be existing inside the ID folder so I've
18:42
already added the comments folder directly inside this ID folder let's open that up and clicking on comments is
18:48
going to take me to this page. TSX file which belongs to this comments folder so
18:55
let's click on that so here you can see that this is Will show the comments uh
19:00
text and this is going to show these particular links which we can generate dynamically if we want uh and this links
19:09
are going to take us to the comment one comment two and the comment One belongs
19:14
to the product one comment two belongs to the product two we can have comment 100 belongs to the product one we can
19:21
have comment a BC belongs to the product 50 uh so these values are going to be
19:27
dynamic so let's open open up the comment ID now okay make sure that the
19:33
uh folder name for the dynamic nested routes are not same if we put ID over
19:39
here and ID over here it will throw an error because this Dynamic route belongs
19:44
to comment this uh Dynamic route ID belongs to the products and the reason
19:50
we add different folder names for even the dynamic route so that in the nested Dynamic route page. TSX we will have to
19:58
receive the values coming from the URL and if we add the same name for the
20:04
dynamic folders We will not be able to detect that if this ID belongs to the products or if this ID belongs to the
20:11
comment so we have to separately name it so this ID from the params we are
20:16
receiving and this comment ID belongs to the folder name so we have fetched both of these things from the params and then
20:23
we have this product ID and the comment ID coming from the URL so this is how we have implemented the nested Dynamic
20:30
routing which can receive any values for the products and the comments so let's talk about how we can receive multiple
20:37
segments in the URL so let me first show you what do I mean by that let me bring it down uh so I'm going to click on this
20:44
all segments and it is showing the no segment because I've not passed any segment after that because I've
20:51
implemented the optional segments as well which I'm going to explain just now so let's say we have this segment I'm
20:56
going to add ABC and then I'm going to add 1 2 3 I'm going to add any number
21:02
slash any number so I have added a lot of stuff over here and I'm going to hit
21:08
enter So currently you can see that it is not showing not found page which I have added over here uh custom 404 page
21:16
this particular URL still exists so in nextjs we can receive the unlimited
21:22
number of the segments in the URL if we want and this is just the visual
21:27
representation which which I'm showing inside the comment and we can add more things I can show it up to here I can
21:34
show it up to here as well okay and I should be also able to not showing
21:41
anything okay so let's see how it is implemented so I'm going to go over here
21:48
all segments and inside it I have created this particular folder within the two
21:54
square brackets and then I have added the segments name for this folder
22:00
including the dot dot dot before this and inside it I am receiving all the
22:05
segments params params and then the segments which is the name of this folder this is of type string array okay
22:14
and then I'm fetching the segments from this param because this was the prop of this particular type and this is just
22:21
the typescript thing I'm just giving the type for it okay and this segment I'm just joining all of these segments with
22:28
this SL Dash and I'm just printing it on the screen and it is also optional and
22:33
the the thing that is making it optional are the two square brackets if we add
22:38
one square brackets around this folder it will not be optional and let me
22:43
quickly do that let me show you so here I'm just putting it up like this now it
22:51
is no more optional now if I try to hit this particular URL you can see that it
22:56
is showing custom 404 page because because it is expecting at least one segment okay and uh if we want to add uh
23:04
optional we can again change it to two square brackets just like I added before
23:11
and the only thing that is making it receiving multiple segments is the dot dot dot before this folder name okay now
23:18
it should receive uh the this no segment after this URL and this is how we can
23:26
Implement multiple segments URL in next JS now I want to talk about this protected folder it is starting off with
23:32
underscore 7 components and inside it we have page. TSX so whenever if we create
23:38
any folder starting off with the underscore it will not become the part of the URL it will not become a route
23:44
even if we add the page. TSX file inside it so let's see if we try to trigger
23:49
this underscore folder let's refresh and you will see that it is showing custom 404 page from not found because this
23:56
route does not exist even even with the page. TSX file and if we try to open up
24:02
underscore 7 components SL myy route and this particular folder does not have the
24:08
underscore before it and it contains the page. TSX file so let's see what happens
24:14
if we try to trigger this slashy route after that it will not become the part
24:19
of the URL as well so it means if we add underscore before this parent folder so
24:27
this will not be become the part of URL including all of its child folder as well even if we add the page. TSX files
24:35
in any of these folders so we can create such kind of folder starting off with the underscore if we want to create some
24:41
custom components to be used by other routes just like I've added this components folder and I have put this
24:48
nav bar and we can create underscore folders inside the other routes as well so if I add this underscore folder
24:55
directly inside one home one home will be the URL but this seven components will not become the second or the nested
25:02
route for this one home folder so before moving forward let me show you that I have created a lot of other videos as
25:08
well including JavaScript jury Tech tutorials react chat gbt web scrapping
25:13
node Express mongodb angular and most importantly if I open up this next 14
25:19
folder I've created a lot of videos on nextjs for you guys to become a good nextjs developer and it covers pretty
25:26
much every topic starting off with authentication building blog e-commerce application protecting routes for
25:33
example if user is logged in or not logged in we want user to be not to be able to navigate to that particular
25:40
route in four different ways types scripting theming uh these cicd Dockers
25:47
and all of these different topics I have covered and created videos on it so you can see I'm putting up a lot of effort
25:53
building these videos for you guys so do subscribe my channel and like my videos as well well and if you want any kind of
25:59
development services from me you can contact me on LinkedIn I have given the link of my profile in the description of
26:06
this video so now let's talk about the grouped routings so group routing means that if we have an application that
26:13
contains multiple categories let's say we have static Pages like privacy policy page context us about us page all of
26:20
these static pages may require five different pages and we have a dashboard page dashboard page can have its own uh
26:27
routing structure for example settings analytics profile so all of these routes belongs to the dashboard and we can have
26:35
the authentication Pages as well let's say the login page register page uh forget password reset password so all of
26:42
these routes if we combine all of these routes it can become the 50 different folders that we need to create within
26:48
the app folder for organization purpose for the development perspective it will be hard to manage and to open up any
26:56
folder that which folder exists uh inside this app folder okay but there
27:02
should be a way to organize all of the authenticated routes within a folder there should be a way to organize all of
27:08
the static routes within a particular folder but that folder should not become
27:13
a part of the URL so there is a way to do that so I have created this particular folder within the parentheses
27:19
8 oore layout and inside it I have two different folders login and then the
27:25
register you can see that login and register contains the page. TSX with the
27:30
login and register contains page. TSX uh with the register text ignore this l.
27:36
TSX for now okay U so if I try to trigger the URL Local Host column 3000
27:44
SL login Local Host column 3000 SL register it should work well because we
27:50
have put this parentheses around this main folder and when we put parenthesis
27:56
around a folder it does not become the part of the URL but all of its child folders becomes the part of the URL if
28:03
child folder contains the page. TSX files inside it and this is the difference between the underscore folder
28:09
and the parenthesis folder that underscore folders uh does not become the part of the URL including all of its
28:16
child folders but this parentheses uh make itself out of outside the URL
28:22
structure but all of its child folders becomes the part of the URL so let's test this out ignore this layout. TSX uh
28:30
file for now so I'm going to hit login ignore this thing this is coming
28:37
from the layout file and this is the login all right and this text is coming from the login route and in the URL this
28:44
is the main point you can see that URL is not requiring to enter the name of the parent folder because this is just
28:50
for organization folder for us to manage over code okay this is this is not uh to
28:56
the user and who is using over application and similar to this we can trigger register route as well and this
29:02
text is coming from the URL and again this parent folder is not becoming the
29:08
part of the URL we have just created it to organize over all authentication
29:13
routes in our application and just like this underscore folder we can also create this grouped folder inside any of
29:20
the main route as well if we want to group any of the nested routes inside the main routing folder as well so now
29:27
let's talk talk about this layout file which I've added inside this group folder before this let's quickly recap
29:34
what we discussed at the start of this video about this main layout. TSX file as I explained you that this layout file
29:42
contains the content of all of the routes which exists parallel to this layout. TSX file inside this app
29:48
directory and all of the content of these folders including the nested routes becomes the part of this children
29:56
so whatever we are returning from any of these routes are going to be received
30:02
inside this children as a part of this property react. react node so
30:08
irrespective of which content or which route is getting triggered anything outside this children will become Static
30:16
and will be visible in all the routes so any route that gets triggered this
30:21
layout file is going to be triggered as well so this main layout file becomes
30:26
the parent high order component for all of these different routes and just like
30:31
this layout file if we want to have a separate layout for any of the page for
30:36
example dashboard can have a sidebar but the landing page cannot have a sidebar
30:42
uh Au Pages cannot have a sidebar so we can have a separate layout inside the dashboard folder as well so just like
30:49
the o o can have a separate nav bar as well and if I open up this o I've added
30:55
this layout this Main layout file is going to be visible because this exist
31:01
inside the main layout file okay and if any of uh if you want this nav bar to
31:08
not to be visible on half of the routes you can simply remove the nav bar from here and separately put uh these
31:16
different Navar components in different folders to have a different kinds of Navar on each of these different routes
31:23
it UPS to us it's up to the design of our application so this layout file
31:28
contains this text login or register which is being visible it means that
31:33
this layout file contains the children so it means that this layout file is parallel to this login and register
31:40
folder so whatever the content being returned from login and register folder will be received inside this particular
31:46
children and rest of the content will remain same in both of these routes
31:51
within this particular folder aore layout okay so that's why this text and
31:59
this uh input box is visible in both register and the login page okay only
32:06
this content is being changed and this is not being changed because this is the nested layout file of this grouped
32:13
folder 8 oore layout and we can create this layout file in any of other folders
32:20
uh to become the separate layout file for all of the routes that exist inside that folder and the content which is
32:27
added in the layout other than the children prop will become visible in all
32:32
of the child routes of that particular folder so I'm working on a project that
32:38
have different routes and there is no nav bar that has to be visible in all of
32:43
these different routes I have created one grouped folder for the Au pages one
32:49
group folder for the dashboard and one group folder for the static Pages there are only three group folder in that
32:56
project and I have not put this nav bar inside the main layout file just like
33:02
this I have created three different nav bars and created three different layout files in three different uh folders the
33:09
group folders and each of these different nav bars is being used in the
33:15
separate layout file of these group folders so that one parent Navar just
33:21
like over here should not be visible in every page or every route that we have
33:27
in our whole application only the relevant Navar for the Au relevant Navar
33:33
for the dashboard relevant Navar for the static pages should be visible so this is the benefit of this layout file a
33:41
nested layout file inside this group folder or any the main folder for that
33:47
particular page or the nested routes for that particular route so there is a very
33:52
important concept that I want to discuss here the difference between a layout file and there is a file called
33:59
template. TSX and this is not used much but it's good to know and have a
34:05
knowledge about it both Works same ways but there is a different so let's say
34:11
this particular layout file contains the same code login or register this template file contains the same code and
34:19
uh this template folder group folder contains this blog page it contains the blog and it contains the chat text and
34:27
uh I have had to rename this so let's say blog and chat it does not make any
34:34
difference just for our understanding so both are doing same things so let's try to trigger this login register blog and
34:41
chat routes from the UI and I've already added these links over here on the top right corner you can see uh if I show
34:48
you over here you you can see that I have this chat blog uh I've not set a
34:55
proper UI and I hope that you can see chat blog and login routes so if I click on login it is going to show the login
35:01
if I click on register it's going to show the register chat is going to show this chat and blog is showing this blog
35:10
and for chat and blog this is coming from that template file this one blog
35:16
and chat and this input box and for the login register this input text box and
35:22
this text is coming from the layout file so both are coming from the different uh
35:28
group folder okay so now what is the difference between template and the
35:33
layout so let me open up this chat and let's write something a b CDE e inside
35:40
the input box okay and now I'm going to navigate to the blog page if I click on
35:47
blog you will see that it is going to become empty and this is coming from the template. TSX file and when I change the
35:56
route after entering some something inside this text box it is going to render everything and rendering actually
36:03
reset all the state variables and making this particular empty but if I go to the
36:09
login and register this input text box is coming from the layout. TSX file now
36:15
if I write something over here this is the login page and now if I try to navigate to the register you will see
36:22
that I'm navigating back from register to login this input text box is not getting empty it means that the layout
36:30
file does not reender the whole layout including all of its child routes but
36:35
the template file actually rerenders everything even if we are within the
36:41
same grouped folder okay obviously if we are navigating to something else that it
36:46
is hiding this input deex box completely okay obviously it is going to get unmounted but if we are within the same
36:54
layout same template then uh this is going to be visible because it's coming from the layout or the template file and
37:01
the template is going to rerender the whole layout but the layout file is not
37:07
going to rerender the whole layout so this is the difference and we have to uh
37:12
choose one of these depending upon our requirement and how the UI is built so
37:18
now let's talk about this particular part sl10 nested not found/ 101 this is
37:24
the link which I have created in the nav bar and I've already talked about this not found file which gets triggered when
37:31
any of the route does not exist parallel to this particular not found including
37:37
all of its child routing segments okay so now this particular folder does not
37:43
contain page. TSX file if I try to trigger only 10 nested not found without
37:50
this 101 or any other number this is going to show the custom 404 page which I have added over here which I've
37:56
already uh talked about okay so now these two folders are files actually
38:02
page. TSX not found. TSX file exist inside this uh Dynamic ID folder okay so
38:09
let's see what we have here currently the page. TSX file contains this code it
38:14
is showing the product and the ID obviously ID is coming from the perams of type ID and this is how it is looking
38:22
and I'm just logging this out now here is an if condition which I have added so
38:27
I have added that if the ID which is coming from the URL is greater than 100
38:32
then I'm simply triggering this function which is provided by nextjs not found
38:37
and what it's going to do is it's going to check if any of the not found file
38:44
not- found. TSX file exist parallel to this page. TSX file or not and it's
38:50
going to move to its parent folder it is going to find the not found file in the parent folder and where wherever it is
38:58
going to find this not- found. TSX file it is going to show the content of that
39:05
particular not found file rather than showing the content of the parent the
39:10
main not found. TSX file okay if you want to have a separate not found UI or
39:17
custom UI you can have this not found. TSX file inside any folder inside these
39:23
grouped folders as well okay So eventually it is going to find the not
39:29
found file at the nearest possible place so currently if I go over here and if I
39:35
click on nested not found let's click on that you can see that it is showing
39:41
items above 100 not found it is not showing the content from this not found.
39:47
TSX file okay um and let's pass the
39:52
value below 100 so let's pass it 10 and if I pass it 10 it is not going to
40:00
throw any error because this if condition is not going to get true and
40:05
this function is not going to get triggered and this is not going to get triggered it means that this content is
40:11
going to be visible over here all right so the nearest file uh have more
40:17
priority in order to show the message for not found now I want to talk about errors but before that let me quickly
40:24
tell you about this loading. TSX file so so we can create this loading. TSX file
40:29
inside the app folder and we can put any JF or the loading circle inside it
40:35
currently I just placed this character with this Tailwind CSS classes animate spin so this o character is going to be
40:42
spinning around uh around the radius or a center point so this is not optimal
40:48
way but um we can customize this and design it in our own way so whenever we
40:54
refresh our page first time someone is uh open over website and it is not
40:59
cached in the browser then the loading bar is going to be visible in and
41:04
loading bar can be visible if the Internet is slow or because of other reasons as well so but it I'm already
41:11
opened up this particular website uh and it is already cached and I don't think it is going to gets visible on my end so
41:19
if I click on that yeah it was visible you saw that if I open this up yeah you
41:24
can see that there was a o correct quickly visible before the complete
41:30
rendering of that particular route so this was about the loading. TSX file now
41:36
let's come to the topic we have this particular Global error Global error
41:41
gets triggered whenever any of the child routes or a main routes all the routes
41:47
within the app folder throw any exception and this particular file or a
41:53
code I've got it from the nextjs documentation for this particular file Global D error. TSX file and any route
42:02
that is going to throw any exception is going to be received inside This Global D error. TSX file and this error is
42:09
going to receive the error message we can show it in the UI like error.
42:14
message and then this gives us this reset function and we can show this try
42:21
again text and this reset function we can keep on clicking on it sometimes the exception can occur because because of
42:28
unknown reason we are not sure that from which route this exception was triggered
42:33
so we cannot have our on link or on button that this route uh throwed an exception uh so we need to uh
42:41
reload that particular route in fact reset is automatically going to detect
42:46
that which route actually throw an exception so reset is going to reload
42:52
that particular route okay so error do message is going to give us a message
42:57
and uh this is going to trigger that particular route again or reload that particular page and one thing that we
43:05
need to wrap the global error. TSX file the content the TSX part inside the HTML
43:11
and the body because this particular file does not take the HTML or a body TX
43:17
from the layout. TSX file okay so now this is going to take the global error
43:24
exceptions but we can have a separate error messages uh if any of the
43:30
particular folder or a grouped folder uh throw an exception or including all of
43:35
its child routes okay so let's open this up 11 error and if I show you this
43:41
navbar I've already added this 11 error over here it will take us to this
43:46
particular route okay and this particular folder contains this error. TSX file error. TSX file is nearest to
43:54
this page. TSX file if this page do TSX file is going to throw an exception it
43:59
is first going to check what is the nearest error file exist other than this
44:04
Global error file so nearest file is this error. TSX file and this is going to receive an exception rather than the
44:11
global error file okay so any of any folder any child folder child route any
44:17
group folder uh does not contain error. TSX file then the exception is
44:22
eventually going to be received by global error but if the error file exist
44:27
within any folder it will actually receive that error message so currently to show you guys I have created and
44:35
thrown this particular error I'm just checking uh by generating the random number if the random number is equals to
44:43
one then I'm going to throw an error okay and otherwise it is going to show
44:49
that no error found if the error is not thrown if there is an error it is going to be received by error. TSX file and it
44:56
is just like the global error okay and it contains the error and reset just
45:02
like the global error file and here uh I'm simply showing the something went
45:07
wrong error. message and try again this is going to retry and reload that
45:12
particular page and it might be a chance that when it is going to reload that particular page this is going to render
45:19
and it is going to give me a number which is not equals to one and eventually it is going to show me no
45:25
error found by reloading that particular page okay I hope you have got an idea
45:30
and one more thing uh we don't have to wrap this div inside the HTML or the
45:36
body tags only we have to wrap Global error file and we have to start off with
45:41
the use client if you are new to nextjs then all of the components all of the
45:47
files are rendered from the server site you might have heard the server side rendering in angular react or any other
45:54
framework of JavaScript so all of the components in nextjs are by default rendered from the server side if we need
46:00
to render something from the client side then you have to write use client at the
46:05
top of this file and for both of these files Global D error. TSX and error. TSX
46:11
file it is compulsory to add use client to make these components rendered from the client side otherwise it is not
46:17
going to work well if you want to learn more about the client side server side components uh check out my recent video
46:26
uh it's a about uh next js15 cache and CSR SSR ISR SSG this is the title of the
46:34
video and you can learn about that and for the errors that's pretty much it so
46:40
let me show you how it looks like on the UI so let me click on the error you can
46:45
see that the random number was not equals to one that's why it is printing no error found from the same page. TSX
46:52
file okay now let's refresh it again and again let's click on the error let's
46:58
refresh yeah so now the random number was equals to one and it is showing something went wrong random number error
47:06
and if I click on that you can see that uh it is going to show this particular
47:12
message and it is being received by this file it is not being received by the main Global error file all right so now
47:20
uh if I refresh this particular Page by
47:26
clicking on on this reset so let's click on retry and now it retried that and
47:32
refresh that particular page and this actually made the random number to not
47:39
to be equals to one that's why it is showing over here and this is simply the uh exception that is being thrown from
47:47
our code so now let's talk about the parallel routes I've already created the link over here if I click on that I'm
47:53
already navigating to that you can see that it is showing the site Side Bar rout and the model and it is making the
48:00
UI for the dashboard dashboard can have a sidebar with different links which we can click on and it's going to update
48:06
the content on the right side where we can show some kind of models some kind of graphs and these kinds of UI and we
48:13
can build the UI for these kinds of dashboard uh using the custom components that can have a sidebar component and
48:20
sidebar component can iterate through multiple child components as well like the sidebar item uh that we can Click on
48:27
each item to update the content on the right side and on the right side we can have a custom child components as well
48:33
one for the card one for the models one for the graphs one for the analytics and
48:39
all these different things so using the custom components using the layouts
48:44
using the child components child routes uh using the dynamic child routing
48:50
mechanism which I've already explained you we can build such kind of UI but sometimes the UI is so complex
48:57
uh for example a page can have multiple sections not just one sidebar it can
49:02
have sidebar it can have footer it can have links on the right side it can have links on the Navar it can have links on
49:09
the different sections of the page if we scroll down um then these kinds of UI
49:15
and clicking on each link to update the content within the same page okay then this kind of UI becomes so messy in
49:23
terms of managing files and folders in our code okay and uh this becomes easy when we
49:31
use parallel routes the benefit of parallel route is that we don't need to create a custom routes custom components
49:37
for that we can load the content of the routing files which is the page. TSX
49:43
file and we can place and combine multiple routing files and show it in
49:49
one URL 12 parallel okay so this sidebar
49:55
is the content of one page. TSX and this model is the content of another page.
50:01
TSX so I have combined the content of multiple routes into one URL let me show
50:09
you so here I have this particular folder 11 parallel okay and uh it
50:16
contains two uh different folders so let me first of all show you page. TSX file
50:22
and it is showing simple title this one okay and this tile title is uh it is
50:28
showing this title and this title is coming from this title. TSX file and
50:35
again I'm just showing you guys that uh we can use the underscore folder over here to create multiple custom
50:41
components it means that these custom components within the underscore folder is being used by only uh this particular
50:49
folder or Route 12 parallel or any of the child uh folder this is just for organizational purpose the architecture
50:56
which I'm using in this particular uh folder uh we could write this title. TSX
51:03
file inside this components folder at the root level but this would mimic that
51:09
um uh this particular title. TSX file might be used by all of these multiple
51:14
places all of these different routes uh so this is one of the benefit of underscore components folder so now
51:20
let's come back to this So currently if we write at model at sidebar we can
51:27
receive the content of its page. TSX file at model have page. TSX
51:34
file and at sidebar have the page. TSX file as well so if we open up the
51:40
layout. TSX file of uh this main folder 12 parallel we can see that we are
51:48
receiving these folders with the same name excluding the AD Sign model and
51:54
sidebar as a props along with the children Run Okay so model is being received and we have to give the type
52:00
react do react node and react. react node for both model and side bar and we are not showing the content using the
52:07
custom component we are showing the content of these routes file the page.
52:13
TSX file over here for both sidebar and then the model okay and another benefit
52:19
of these parallel uh folders as well that we can have a separate loader for that particular section which is being
52:26
shown in the main layout file means uh there can be a loader for this particular section as well there can be
52:32
a loader for this particular section as well so uh other content can be shown
52:38
quickly and this can show the loader and show the content meanwhile when the when the things are fetched okay so this
52:45
parallel routing can uh work uh as the content as you have seen and now if I
52:53
open up this sidebar first of all let's open up this uh page so we have this
53:00
title and we have this sidebar and inside the sidebar along with the page we have another layout okay let me
53:06
uncomment it all right so I've uncommented it now
53:12
this is going to take me to this URL so this parallel folder can have further
53:18
child routes as well I have created two child routes first and second and each of these contains the page Okay so
53:26
sidebar first and sidebar second okay uh so the
53:33
content from here can replace the content which is uh visible on the uh on
53:42
on this the main page. TSX file sidebar root over here okay so if we navigate to
53:50
sl12 parallel SL first which is over here and slash uh second which is over
53:58
here it is going to replace the content of the main page. TSX with the content
54:04
which contains Within These child routes we can call it a child routes for our
54:09
understanding at the moment uh but uh this these uh folder names are ignored
54:15
from the URL okay so now if I click on the first and it is currently navigated to
54:24
the first and you can see that it is replaced with the sidebar first which is the part of this first folder and if I
54:30
click on second you will see that it is navigated to the second but if I refresh
54:36
this page let's see what happens if I refresh this page you will see that it is going to show the custom 404 error
54:44
even though we are in the same route let's see another time so if I click on
54:49
the second we can see the content is replaced of the parent parallel route
54:54
with the child second route okay and if we refresh this page so one benefit of
55:01
parallel route is to have a different user experience for multiple people for
55:07
the person who is actually navigating from one route to another route and for
55:13
someone who is directly opening up that particular route okay so this is one of
55:20
the benefit to have a different user experience for the one who has directly opening the route which is currently not
55:26
working which I'm going to show you how to make it work and for someone who is just navigating and or clicking it up
55:33
and to make the user experience smooth okay and to make it smooth I have
55:38
another folder for this particular fix
55:43
if I show you this sidebar it has this layout it is
55:49
commented let's uncomment it and now it contains and it is navigating to the
55:55
this particular route 1 parallel defaults slash first and slash second
56:00
okay now this particular route first link and second link are going to work
56:05
on refresh as well I'm going to show you how but first of all let's quickly go on
56:11
that parallel defaults and currently you can see over here I can click on first you can see that it is being changed by
56:17
first if I click on second you can see that it is being replaced by second and now let's refresh it I'm refreshing it
56:25
and it is not throwing any error so both the user experience one is who is navigating from one page to another page
56:33
clicking on links and the one user who is directly opening up that particular route is also being uh shown the same UI
56:41
along with that we can have further uh sections and make the navigation and
56:47
loading up the content of multiple routes within the same lay layout can become easier using parallel routes now
56:54
let's see how is it working there is a buil-in file called default. TSX okay
57:02
default TSX should be added on all of those different URLs including the main
57:10
parent route uh who does not have the child routes which are performing the
57:17
navigation okay so currently the sidebar contains this layout which is performing
57:23
the navigation any child route of the parallel route parallel folder uh who is
57:29
itself performing the navigation should not have or does not require the default
57:35
folder but including the parent folder as well as the other model parallel
57:41
route folder should include the default you can see that I have not made any change it contains my model uh my page.
57:49
TSX contains my model okay so to make the user experience smooth for both the
57:55
user who is first time opening the link who is who is navigating from one link
58:00
to another link or opening up different sections within one layout as well um
58:06
this is going to make things work so model have default for the default the
58:12
main parallel defaults have this default as well so default file is actually uh
58:19
containing the same UI as it is in the its parallel page. TSX file okay so this
58:25
default def file is making the refresh work as well all right so that's about
58:31
parallel routing parallel route defaults next topic is also very important let's
58:36
talk about intercepting routes so I have this folder intercept routes and inside
58:43
it we have this page. TSX file and it has this text and it has this link it is
58:48
going to take me to the login let me show you the UI which I have built you will have a better understanding of it
58:53
the idea behind is uh it is pretty much same to have a different user experience
59:00
for the ones who are navigating to any particular URL and different user
59:06
experience for the one who are refreshing the page okay so now I'm going to click on login from here you
59:13
can see that it is giving us a different UI it is kind of a model and you can see that the URL is changed but the content
59:20
behind this is same you can see it is simply showing the model and there is a
59:26
Content behind it and currently it is loading up this particular route sl14
59:33
intercept routes SL login and uh this is the login route this is the nested route
59:40
it contains page. TSX and this login is being fetched from this components
59:46
folder okay this is simply add email and password and uh this is this does not
59:51
contain much but this is just for elaboration okay and uh now you might be
59:58
thinking that when I am going to click on this login this content is being
1:00:06
shown from this nested login route this page. TSX but this is not the case this
1:00:13
is being intercepted by another folder login and before this I've added this
1:00:20
parenthesis and I've added this one dot and one dot means that intercept the
1:00:26
login route which is parallel to this particular folder and the folder name
1:00:32
should be same and it is going to check if there is any login route folder exist
1:00:38
parallel to this this is the login and rather than showing this page. TSX this
1:00:45
login folder is going to intercept the other login the main route folder rather
1:00:51
it is going to show this its own page. TSX file and currently you can see that
1:00:57
this login page contains only the login the that particular text and diffs but
1:01:03
this particular page contains that backdrop blur as well uh the background
1:01:09
G gray color opacity 90 and this is the reason you are looking at the opacity
1:01:14
backdrop colors this is one user experience who is first time clicking on this link okay but there is a different
1:01:23
user experience for someone who is refreshing refreshing the page or who is first time opening the page maybe we can
1:01:29
share this link with someone who is first time opening up the page then this particular route is not going to be
1:01:36
intercepted in fact this is going to let the original login route to show the
1:01:42
content so let's refresh it all right so you can see that after refreshing it is letting the original
1:01:49
login route to show its content now this is one level intercepting there is
1:01:55
another level intersecting as well so currently um we you can see that it
1:02:02
contains uh this page. TSX file over
1:02:07
here uh this thing uh this is for Let's ignore this thing for now so this first
1:02:14
link is going to take us home route and this is going to show navigate us to the
1:02:20
one home and one home is going to show this page you can see that Home Route
1:02:25
okay okay so you might be thinking that if we click on this particular link Home
1:02:31
Route let me navigate to that yeah so this is the first link and uh you can
1:02:38
see that it is going to take us to the slash1 Home Route but SL1 Home Route
1:02:43
contains Home Route so let's click on that Home Route you can see that it is
1:02:48
not showing the text coming from here it is being intercepted it is being intercepted by this particular
1:02:57
folder so page. TSX file intercepted Home Route but if I refresh this page it
1:03:03
is going to show the original content so this particular interception called the
1:03:09
root level interception means that it is going to intercept all the routes which
1:03:14
exist directly inside the app folder not parallel to this particular folder okay
1:03:21
the folder name obviously needs to match in the previous folder one level interception means that it was parallel
1:03:27
to this but three dot means that it is going to go at the root of the
1:03:32
application and it is going to intercept that particular route all right and now
1:03:39
if I go over here we can H move one level up to intercept this first of all
1:03:47
let's go to the page and currently this link move to one level up trigger and
1:03:52
this is going to take us this particular route and and this is going to Tre open up navigate us to this okay this
1:04:01
particular route and this contains another page. TSX
1:04:06
file and this page. TSX file is giving us this link this link is taking us to
1:04:13
the 15 intercept level Route One Step intercept okay so currently uh there are
1:04:20
two folders with one step intercept one is directly inside the main folder and
1:04:25
one is over here okay so what we want is we want to intercept that original route
1:04:32
the content of that original route with the content of this intercepted route so
1:04:37
it is not parallel to that it is one level down within the child folder so to intercept to one level up we had to
1:04:45
write two dot within the parenthesis okay so currently you will see that intercepted onestep component will be
1:04:52
shown first of all and when we refresh the page it is going to show the onestep
1:04:58
component so let's see now you can see currently uh I have
1:05:03
to click on that because uh this is this is again navigating to that okay so
1:05:09
click on that now you can see that it is showing the same URL but it is showing
1:05:15
the intercepted onestep component but if I refresh this page it is going to show the content from the original route yes
1:05:23
you can see that now it is showing the content from the original route so this is called the different levels of the
1:05:29
interception there is another level of interception for example Dot and then
1:05:36
dot sometimes it doesn't work that this is the reason I have not actually
1:05:41
covered this up in this particular video but you can try that out maybe uh I
1:05:47
didn't got a any practical reason practical requirement where I need that
1:05:53
particular uh interception all right so I think I have covered all kinds of
1:05:59
routings in nextjs 15 and as I've told you guys at the start of this video that
1:06:04
the difference between react and nextjs the biggest difference is the how the routing is handled in nextjs and there
1:06:12
are minor other differences as well but if you know routings of nextjs then you
1:06:18
have understood almost 60 to 70% of nextjs provided you already know react
1:06:24
and after understanding the rout ings in nextjs you can straight away start building the web applications in nextjs
1:06:30
because you have done and you have completed the main part of learning of nextjs and other videos which I wanted
1:06:38
to show you let me show my YouTube playlist of nextjs which I recommend you
1:06:43
guys so the next video I would recommend you guys is this one nextjs 15 caching
1:06:49
explained with server side rendering client side rendering server side uh
1:06:54
static side generation in incremental static rendering uh this is very important topic for improving the
1:07:00
performance for properly build your web applications after that uh you obviously
1:07:05
would like to protect your routes because you would need to implement authentication this video is recommended
1:07:11
for you guys other than this all these videos are very important and give you
1:07:16
some extra knowledge in nextjs so you can watch these videos so do subscribe
1:07:22
my channel guys I hope that you have learned something new from this video so thank you so much for watching I'll be
1:07:28
coming back with some more cool videos on nextjs so do subscribe my channel and hit the Bell icon to get the
1:07:34
notification whenever I upload new videos and comment below if you have any questions so guys thank you so much for
1:07:40
watching guys so that's all for this particular video

https://youtu.be/AKVwmtHjoeo?si=SvtHFNfhTosDCfp8