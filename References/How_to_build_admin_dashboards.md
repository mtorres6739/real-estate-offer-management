Introduction
0:00
I have built a lot of these things in my day for a long time they were horrible absolutely disgusting super super ugly
0:06
and that's mainly because building an admin dashboard especially for somebody who's not a designer for a developer is
0:11
Pretty Tough there's so many like little tiny things that you need to pay attention to and that's why today we're going to build this dashboard layout and
0:18
not just build it but walk through a whole bunch of different tips for how you can build any dashboard moving forward without slamming your face
0:24
against your keyboard in frustration anyways let's get started so before we get into actually building out this dashboard I just wanted to take a second
Don't reinvent the wheel (inspiration resources)
0:31
to kind of explain how I'm generally thinking about designing different things that I'm working on as somebody
0:36
who's not a great designer and how I get inspiration for those things one website I think a lot of people have already used before is dribble so that's
0:43
dribbble.com that's fantastic another really good one is mob.com this is a little better for specific examples and
0:50
specific flows so you can come on mobin and find like full authentication flows and how those things work from a user
0:55
experience standpoint uh but that is paid so for right now we're just going to stick with dribble generally what I'll do with something like dribble if
1:01
I'm building a dashboard or really anything else for for that matter just come up and I'll look up say dashboard
1:07
or landing page or whatever it is and I'll start finding different examples that I like the very first example we're
1:12
actually taking quite a bit from generally though what I'll try to do is take specific bits that I like from
1:18
different designs and kind of turn those into something that is my own and there's kind of specific pieces to how I
1:25
do that right and the things that I'm actually looking at in what I'm taking so I'm just going to open up a couple random ones you know generally I'd take
1:31
a little bit more time in this maybe I would take all of these different designs and then I would put them in a figma doc or something and make notes on
1:37
them but what I'm generally taking note of is why I like kind of what I'm looking at so that I can take all of
1:42
those things and coales them into something that looks unique and doesn't necessarily look like everyone else's designs so maybe for instance with this
1:48
I like uh maybe I like the colors or maybe I like the fact that it has kind of the separated border card for the
1:54
inner section of the dashboard so I'll take notes of that maybe for let's say
1:59
something like this I like uh one thing that sticks out to me is how they're actually using contrast with these cards
2:04
over here so they have a separated card from this first card that is using a different background color to really
2:10
make it stick out from the other cards in the page so maybe that's something that I can borrow from so long as I'm actually thinking about why they're
2:15
doing what they're doing right so it doesn't just look completely random and I'll go through and I'll do that with a
2:20
bunch of different designs and then again you can kind of pull from things that already work that you know already
2:26
work that are designed by great designers and that really helps you you to build something that doesn't look
2:32
absolutely terrible and doesn't work terrible even though you may not understand why they're using the amounts of padding that they're using for
2:38
instance or the types of font weights or font sizes that they're using so yeah that's pretty much all I want to get out of the way with this one we can go ahead
2:44
and jump into some code now all right so jumping into our code I have a pretty completely Bare Bones nextjs project
Sizing panels
2:49
here I've just kind of you know removed some of the CSS and the basic layout and stuff if you're not using nextjs that's totally fine I'm not even going to be
2:56
using any nextjs specific routers or any stuff like that I want to keep this usable for anybody who's just using
3:02
react so if you are using xjs that's great I'm going to be using the app router if you're not don't worry about it now to start off I just want to make
3:09
the layout so by what I mean by the layout and oops let go back what I mean by the layout is I just want to kind of
3:14
figure out the size of my panels right so we kind of have a sidebar panel in this case for what we're making and then
3:20
we have this other main panel where all of our dashboard lives now really the note that I want to make as we're doing this is just to think about how much
3:27
space you actually want for these panels and it's probably not as much as you think the thing that I generally at
3:33
least myself have done I've seen from example projects that people have sent me is that people will make these panels really big they'll make the text really
3:39
really big they'll bold things more than they need to notice you'll you'll generally see pretty subtle highlighting
3:45
you'll see pretty small font sizes and icon sizes and things like that you do want enough room for you know say if
3:51
someone were to search in the search bar that they can actually see what they're typing you know if somebody has a longer email that they can actually see their
3:57
email but you don't need to have this huge sidebar and like really really big text right like people are going to be
4:03
able to read this completely fine so I'm going to go based off of essentially the same kind of color palette and the same kind of layout so I would like to also
4:09
have a card that looks kind of like this with a background a layout that looks kind of like this so I'm going to come back over to my main project and really
4:16
quick just looking at the code that I have already set up here so whenever I have my bare bones xjs project here I'm
4:21
using tail and CSS I just have this page component that is going to be the entry point for my entire app and then I also
4:27
have my layout component where I've also added two Styles already so I've added a background of stone 100 which is just
4:34
this RGB color right here as well as a text of stone 950 which is this color right here that's going to be the
4:40
background of our page and then we'll have a white card over here on the side inside of my source directory here I'm going to go ahead and make a new folder
4:46
called components and then inside of components I'm going to make two new directories one called
4:53
dashboard and that is not a directory let me try that again new folder dashboard and then one more that I'm
5:00
going to call Sidebar inside of each of these directories I'll just make a component that matches this so I'll say
5:05
sidebar. TSX you can create a basic little scaffold of a component like this
5:11
and for sidebar I'm actually not even going to add anything just yet we can just leave that blank but then whenever I go into dashboard I'll make a
5:18
dashboard. TSX file like this again just scaffold that out like so and this
5:24
dashboard again is going to be that kind of white card on the side so I am going to add a couple of styles for that and
5:29
say a class name here give it a background of white give it some rounded
5:34
borders we'll say rounded LG we'll see why kind of as we go through this but I need a little bit of padding on the
5:40
bottom for how this is actually going to lay out and I also want to give this some Shadow and then this piece is going
5:46
to be temporary but I want to give this a whole bunch of height just so that we can see it kind of fill the screen so I'm going to say height let's say 200
5:53
vport height something like that and now obviously we actually need to lay these out so back over here in my page
5:59
component we can import each of these files we'll say sidebar as well as
6:05
dashboard now we should see our dashboard little text up here at the top and then we have this card in the middle but we actually do still want to lay
6:11
these out and I'm going to lay these out using grid so I'm going to say grid up here at the top I'm going to give this a
6:16
grid gap of four which is I believe 16 pixels that's going to be the gap between this and this kind of the the
6:22
horizontal gap or the vertical Gap rather I'm going to give it a padding of four all around the sides and I'm taking
6:27
note again of these things from this example Le so I have this little bit of padding at the top from the way that they did that I really like how that
6:33
looks with the inset dashboard and then finally I need custom grid columns here so I'm going to say grid calls and then
6:40
I can actually open up square brackets and Define this however I want I want my left panel to be 220 pixels and then I
6:47
want the rest oops 220 pixels and then I want whatever is left to take up the
6:52
size of the screen so we can do something like this and now we should have a layout that is looking pretty good just really quick I'm going to go
6:58
back into my dashboard component I'm just going to remove this text and there we go so closing up some of our other
Sizing text & contrast (account toggle)
7:03
files here I just want to start by focusing on this sidebar and we can kind of go one little component at a time and
7:09
we again are going to do something pretty similar to this so I want to start with a kind of account selector dropdown type thing like up here on the
7:15
left and I also really quick want to make sure that this sidebar is actually sticky so that whenever we actually scroll up and down the page this doesn't
7:22
scroll off of the screen right we're just scrolling the main content so let's start by figuring out how we can do that
7:28
there are going to be two p pieces to our sidebar so first I'm going to create a div like so and inside of here is
7:35
going to be our main sidebar content so it's to do main sidebar content and then
7:41
down here is going to be like a little kind of plan toggle let say plan toggle
7:46
for like changing your subscription essentially a lot of times you'll see this down here at the bottom left it
7:52
could also be a settings menu or something like that but that's kind of what I'm getting at here is that we're going to have more content down here and
7:58
eventually what I'm going to want to be able to do is all of my content that's going to live over here on the left if the screen is too small or we have too
8:04
many options I want that to be scrollable but I always want this kind of plan toggle thing that's going to
8:10
live down here at the bottom to be visible so these will need to be separate panels and to do that I often
8:16
use a little bit of kind of CSS math we'll see we'll kind of here let's just jump into it we can see what we mean so
8:22
up here on this div this first div I'm going to add a couple of class names I'm going to add an overflow y of R I'm
8:30
going to add a position of sticky and I'm going to give this a top of four I want it to actually up set down a little
8:36
bit from the top and that's because we also have some padding up here at the top let's set this to overflow really quick and then I want to set the height
8:43
of this panel now again I want the height of this panel to be the full height of the screen minus what I think
8:50
the size of this plan toggle is going to be as well as to take into account some of the padding up here on the top and the bottom that we're going to have so
8:56
to do that I'm going to set height is equal to square bracket and then I can say Cel now again and now again this is
9:02
going to be based off of 100 viewport height if we come back over to page really quick and look at how much
9:07
padding we have we have 16 pixels that's going to be on the top and the bottom so I can then say 100 V per height minus
9:13
say 16 pixels or actually rather that should be 32 pixels because there's padding on both the top and the bottom
9:20
and then just because I've already done this before I already know how big that bottom element is going to be so I'm going to say minus 48 pixels that's just
9:27
going to take into account again this plan toggle thing that's going to be down here on the bottom left now we should be able to see given I have a
9:33
mouse hooked up that we have a scroll bar popping up here going from up here at the top down here to leave a little
9:38
bit of room down here at the bottom for that plan toggle and as we actually scroll up and down the page we'll notice that this little scroll bar doesn't
9:44
actually go away right so I'm scrolling on the main part of the page and because this main card has a bunch of extra height we can scroll that up and down
9:51
but our card over here on the left where all of our navigation is going to live is not actually scrolling with the main
9:56
part of my content now I think this is a good start but let's go ahead and jump into the account toggle so I'm going to
10:01
create a new file called account toggle. TSX we will SCA that out like so and
10:09
then we can just go ahead and import that where our to-do is here like
10:14
this go ahead and go back into that file and before we actually set up this code I just want to take note of kind of some
10:21
of the specifics of our example over here so let me just zoom in a little bit so we can get a closer look here and
10:26
what I want to note is how they're actually using contract with their text and kind of some of the size of their text that they're doing here a lot of
10:33
times what I'll see people do on kind of newer projects is they'll take you know say something like the email or the text over here they'll make it really really
10:39
big I kind of mentioned this earlier whenever we were talking about these elements on the side that we're going to get to in a minute but you really don't
10:45
need to make this super super Bolden in your face they're doing very very subtle things here to actually kind of denote
10:52
the difference between the name and the email here right so they're using a little bit of difference in font weight as well as a little bit of difference in
10:58
font color and just a little bit of margin between these elements right it's pretty subtle they're not adding some
11:05
you know super super bold black 900 weight text and making it text XL making
11:10
it like 32 pixels and then this is way smaller this is enough to draw your eye to say oh these kind of our two separate
11:16
lines with you know different amounts of weight given to them so I want to copy something very similar to that accidentally exited out of my screen
11:22
there but back over here on my main page we'll remove this account toggle text here and just so this isn't super super
11:28
painstaking I'm going to kind of drop in some of the code that I have here for the markup and we'll walk over it so on
11:33
our wrapping div I'm going to give it a little bit of border on the bottom that is to make up this border right here so
11:40
there's this kind of very slight border again this wrapper is around this whole thing I'm giving it a margin bottom of
11:45
four as well as a padding bottom of four and that's what's going to give me the space in between where my border is as
11:50
well as just a little bit of margin on the top which is just going to set this down a little bit and that's going to make it line up kind of with this little
11:56
tiny border radius here and we're going to need to take note of that later because we actually want to make sure
12:01
we're going to get to this but that this element right here lines up with our main header bar right here this is going
12:08
to be a theme I think through a handful of these sections but just having things line up well and using consistent
12:14
styling like for instance you can tell that this account selector here lines up well with our bar over here little
12:20
things like that really add professionalism and don't take a whole lot of work it's just making sure that you kind of take note of these things
12:26
and have the eye to say okay look at that this text lines up well with this text this line here lines up well with
12:31
this line and we want to make sure that we do that as we go through so that's what we're doing here then finally obviously I just have my border Stone
12:37
here just a border on the bottom and now that we see we have a little bit of border right here that should be enough to get us started inside of our div I'm
12:44
going to add our button element our button element is going to have a handful of class names so a display of
12:49
flex a little tiny bit of padding just around the sides for whenever we hover this background of stone 200 only
12:55
whenever you hover this again this is very subtle remember our background is only Stone 100 so whenever you hover over this it just gives a little bit of
13:02
something to kind of denote that you are in fact hovering over something that can be interacted with then giving it rounded borders transition of colors for
13:09
that hover animation position of relative cuz we're going to have some absolute positioning here in a second you'll see why gap of two between our
13:16
elements with the full and items center now the first element we're going to drop in here is just our little Avatar
13:21
mine is going to look like this and I am just getting a free avatar from Dice bear.com if you check out dice bear.com
13:27
they have a bunch of just place holders you can use the same ones that I'm using but for mine just setting a size of
13:33
eight which is 32 pixel squared rounded borders shrink of zero so that the flex
13:38
doesn't actually kind of shrink this down a background of violet 500 which is going to be our brand color for this
13:44
project as well as just a little bit of Shadow we should now see that pop up here at the top and whenever I start hovering over my button here we should
13:51
see that very very slight animation below my image I want one additional div that's going to hold my text this is
13:58
going to need a class name of text start and then I'm just going to go ahead and
14:03
drop in my text which is going to look like this so we have two spans one for my name and then one for the email and
14:11
again note there's just a tiny little bit of difference between these right so text small versus text extra small I am
14:17
bumping up the font we a little bit and that's pretty much all that we have for the difference between these two pieces of text here you could even possibly
14:23
make this a little bit more subtle and it would be fine you do something like medium or semi bold you can kind of play around with this but again there's a
14:30
handful of different things that you can do to kind of make something stand out from the page it can be color it can be size it can be font weight things like
14:37
that you don't need to slap every single trick in the book on every single element to make it stand out this should
14:42
be plenty to actually denote a difference between these different lines and now finally after this I want to
14:47
import some icons just to put over here on the right and I am using a package called react icons just yarn ad or npm
14:55
install react icons and specifically I'm going to be using the f ey package there's a whole bunch of different
15:00
packages in here with different sets of icons this is just the ones that I am using now one thing that a little bit
15:06
unfortunate with this icon set though is they don't have a Chevron up and down
15:11
kind of selector like you see over here on the right so I need to do both and then I need to kind of position them
15:16
relative to each other so we will see how I ended up pulling that and what I ended up doing is something like this so
15:24
I have both a down icon and an up icon both of these are absolutely positioned over on the right so I'm going right two
15:31
as opposed to you know taking into account the padding then I'm going top of 50% as well as translating it back by
15:38
50% but this little plus4 and minus 4 is what actually gives me the separation so if I save this we should see that that
15:45
looks about correct let me bump up the sides of this a little bit you'll see that looks about correct right there but
15:50
if I remove those little plus and minus fours like what I have right here we'll see that they just overlap directly on
15:56
top of each other so this was my solution obviously there's other ways that might be better or worse on how you
16:02
can actually lay these things out but this worked fine for what I am going for and with all that said and done we now
16:07
have our account toggle so now we can move on to our search experience moving forward from our account toggle I would
Consider your users (cmdk search bar)
16:12
like to get to this little search bar that they have here so I'm going to go ahead and jump back over to my sidebar
16:19
and I'm going to create one more new component that I'm going to call search.
16:25
TSX and for that again we'll just scaffold out a basic little component really cool quick and import that under
16:31
our account toggle right here nice there we go so we'll see that we did take into
16:37
account our spacing between our top bar and where our search bar is going to be and again I know I've already said this
16:42
three or four times but we're going to want to make sure whenever we get to this right panel with our actual dashboard that things are kind of lining
16:48
up uh even down to the small things right so like this bar right here is going to try and line up with the header bar up here and then our search bar is
16:55
going to line up with the top of our actual content beyond that I'm going to go ahead and jump into our search bar
17:01
inside of our search bar we're going to also have a little command menu thing which we're going to get to but because of that I want to have two separate
17:07
components next to each other so I'm going to start with some fragments like this and then the first one can just be a div there's going to be a group with a
17:14
couple of different kind of components in it that make up our search bar here so I'm just going to add some class
17:19
names starting with a background of stone 200 again doesn't need to contrast massively with the massively with the
17:25
background going to have a margin bottom of four for the content underneath it position of relative cuz again I'm going
17:30
to have some absolutely positioned elements inside of this element little bit of rounded borders Flex item Center
17:36
padding X of two padding y of 1.5 and text of small again using our react
17:43
icons package I'm just going to add this little icon right here for our little search icon then after our search icon
17:51
I'm going to add our input which is going to have a type of text a
17:57
placeholder of search and then a set of class names to get rid of this
18:02
background right here so withd full background transparent placeholder text we're going to make a little bit lighter
18:08
than the rest of the text and then we're going to get rid of the little Focus outline that pops up whenever you focus on an input and that should leave us
18:15
with something like this and then finally we just need a little menu uh icon opener thing like they have a
18:21
little slash here I want to use command K and we're going to get to uh how we're actually going to set that up cuz we're
18:27
actually going to create the menu as well here in a sec second but to do that is going to look something like this
18:32
again we're just going to be using react icons so I'm just going to use a span tag a little bit of padding text of
18:38
small Flex a little bit of gap between our elements here item Center tiny
18:43
little bit of Shadow again again I'm not using you know Shadow XL you can be a lot more subtle than I think we think we
18:48
need to be a lot of times background of stone 50 which is Almost White rounded borders position of absolute again
18:55
because it needs to be over here on the right and then a right of 1.5 to inset it a little bit from the right side and
19:00
then just top of 1/2 and then a transla 50% to actually Center it with our element here again you can totally do
19:07
this with you know nested Flex boxes or whatever I just like to use absolute positioning sometimes just saves me one
19:13
extra div I can understand that it can be a little bit confusing though to follow sometimes so you know there's nothing specific about how I'm doing
19:19
this layout that is you know some hard and steady rule just how I laid this out
19:24
but now that we've got this what is kind of the rule that I'm hoping to get to or maybe not the rule but the suggestion as
19:30
you're building dashboards is to just kind of consider your users right so I built the search bar and I think a lot
19:36
of times if you're working on a side project it can be daunting to build search because if you want to build search into every single possible thing
19:42
that can be very very complicated but one thing that is not complicated is just helping users figure out where
19:48
they're going around your site right so if you have something like dashboard accounts cards transactions etc etc kind
19:54
of like this example dashboard there may be you know these eight or 10 different pages but then there can be 20 different
20:00
pages within each one of those and for you as a developer it's pretty obvious that you go from here to here to here to
20:05
here but a common pattern that is you know being used more and more often is to actually use search to help people
20:12
navigate between these different pages in The nested pages so that if a user is trying to say reset their password they
20:18
don't need to try to figure out oh do I go to settings or do I go to preferences or where do I go and we can do that
20:24
pretty easily again with kind of a search now we're going to be using one let me actually pull it up called called command K so if I say CMD K this is the
20:33
package here you can also just open up this site actually no let's go to the
20:38
package and then to the GitHub actually the package is probably fine so essentially all that the command K
20:44
packages is an unstyled set of utilities that you can use to create a menu for
20:52
search essentially so it's going to handle the inputs and then the different commands or the different results and
20:58
actually filtering those out it's going to help you group things together things like that showing empty States handling
21:04
things like that and we are just going to use a basic example based off of this which will then style up for helping our
21:10
user search so actually just staying on this page right here I can just copy everything that I have right here give
21:17
myself some room back over here on the left and I'm going to create one more new file which I am going to
21:22
call command menu. TSX and then we'll just paste in everything that we just
21:28
copyed make sure we actually have everything imported correctly here as well as make
21:33
sure that we are exporting our Command menu right here and given that I am using typescript I'm also going to need
21:39
to add some types to this that they don't have on their example so our event here is just going to be a keyboard event all of this code is essentially
21:45
just adding a event listener to the document for anytime you do command or control K uh to actually open up this
21:52
element now one extra little change that I also want to make though is I want the open and close state to also be
21:57
controllable by click clicking on our input here so I'm going to take this piece of state and I'm going to host it
22:03
hoist it rather up into our search component here make sure that that is imported and then we can remove it from
22:10
within our Command menu component here and instead we can take these in as props like this so just taking in open
22:17
and set open as props again I need to import my types for these like
22:24
this now we should no longer have any errors here and and with this we can go ahead and use our component over here so
22:32
this is again why I use my fragments under my div here I'll add my command menu command menu like so make sure
22:41
we're actually passing in our props to our component right here so our open and set open and because these components
22:48
are using some State we're going to need to remember only if we're using nextjs of course but to come up to the top of
22:53
our file and say use client else we're going to start getting some errors over here to actually trigger this on click
23:01
right here cuz obviously that's not working yet I'm going to come over to my input and I'm going to say on Focus
23:06
we'll just immediately blur that input and set open to true and now we'll see that whenever I click on this component
23:12
because this isn't actually styled yet we just get this little thing down here at the bottom with our examples this can
23:17
also be shown and hidden just by clicking command K or control K on your keyboard now we can move to actually
23:23
styling this up so back over in my command menu clean up my imports that I don't need here anymore we'll start by
23:29
coming under our label on our wrapper dialogue command here and fix that to the screen and set zero give it a
23:35
background of some color now whenever we open this up it's not being put in some really weird random place I also want to
23:41
make sure that whenever we click on this background we actually get rid of our dialogue so onclick of our wrapping
23:47
dialogue set open to false so now if I click on this it goes away and then for the rest of our content I actually want
23:53
to wrap all of this in a div that I can then style up so I'll say div paste all
23:58
of that back in whenever I actually click on this div I don't want it to close my element right because that means that you're clicking on the actual
24:05
modal inside so whenever we click on this we're going to stop the propagation of that click and then we will add our
24:11
styles for this wrapping element so let me wrap those around going to give this a background of white rounded of large
24:17
shadow of XL I can pop this out a little bit more from the screen border of stone 300 with a one pixel border overflow of
24:24
hidden a width of full but a math Max width of 512 pixel pixels oh my gosh and
24:29
a margin of Auto on the x-axis as well as a little bit of margin from the top just to set it in a little bit if we
24:35
open that back up we should now have something like this if I actually click on my modal here it does not go away it
24:40
only goes away if I click the background and from here it's really just a matter of continuing to style everything up so
24:46
I'm going to start with my command input I'm going to give this both a placeholder value as well as some class
24:52
names just to style those up like this we're just taking the full height and setting this input to be kind of the the
24:57
header of this element so now if I type in you know Apple that is not apple apple we get our
25:05
Apple result if we type in something that's not there we get no results found and for our empty State here I would actually like to be able to use the text
25:12
that we have typed in to show in our empty state in order to do that obviously we're going to need to be able to track what the value is that has been
25:19
typed into our input so back up here at the top going to create a new piece of
25:25
state that I'm just going to call Value on our input put down here in order to track that we need to pass in our value
25:31
and then say on value change and we can just directly pass in our set State function like this and now we can
25:36
actually style up our empty state so instead of my no results found right here I'm going to drop in this copy that
25:42
actually highlights what you've typed in that hasn't been found yet so now if I type in banana nothing is found and we
25:48
get some purple text here now as you'll notice you can have different numbers of groups that each have different individual items and you can also just
25:55
have individual items on their own so we have like a group of letters here which we would style under with a bunch of you
26:01
know individual letters and then just individual items that might just be in our case like sign out so you might have
26:06
a group that actually links to one of your side navigation elements as well as an item that just is an overall action
26:13
that the user could take something like that and that essentially is exactly how I'm going to do this so I'm going to go ahead and just remove all of our items
26:20
that we have so far and I'm going to paste in some of our elements sorry if
26:25
that's a lot to paste in at once but we will go over all of this and one thing that I actually missed here is up on our
26:32
list we have to add a little bit of padding that should look a little bit better whenever we type in yep that looks a little bit nicer but for our
26:38
actual group here what I'm saying is I have a group of different actions that you can take for a group called team for
26:44
instance you could invite a new member to your team or you could see the org chart of everyone who's in your team I'm
26:49
not going to go through and make a million of these hopefully you can just kind of see the pattern of what I'm getting at here and how this could
26:54
actually help your users navigate through your site but then beyond that the styling is Rel relatively straightforward so I'm just making the
26:59
actual title text a little bit smaller and a little bit lighter because that's not really as important necessarily as
27:05
these individual actions and then the style for each of these actions are exactly the same so we're essentially
27:10
just giving this Flex pointer and then making the kind of style of whenever you hover over this similar to the style of
27:16
what we had for our account picker toggle right so it's just white background and then whenever you hover over it you get a highlight saying yes
27:23
do you want to click on this action essentially we can of course then go and add more of these so maybe I want
27:28
another grouping for my Integrations for you know helping users find their different integration services and
27:35
different pages within Integrations and then as mentioned you can also just have these items directly separated out on
27:41
their own which I generally use for something like a a sign out or something like that or just a general settings
27:46
page and now again if I type in say contact it's going to just show me those options if I say invite it's going to
27:52
show me those options if I type in something random it's not actually going to show me anything and it does all of that filtering for us under the hood now
27:58
there are some other cool things that you can do with this package that we're not touching here feel free to dig into that for whatever's you know useful for
28:04
your project but for now I think we can go ahead and move on to adding our sidebar items so back over here in my
Slowly add contrast (nav options)
28:10
sidebar I'm going to create one new component that I am going to call let's see rout select. TSX and we'll just
28:19
scaffold that out so that we can go ahead and import it over here under our search component and this is just going
28:25
to house all of our basic kind of dashboard for options for navigating between Pages inside of our route select
28:33
on my basic route class name here just going to say class name and I'm going to
28:38
add the space y utility is just going to add even margin between all of our elements on the Y AIS so for example if
28:46
I just have you know two buttons one that says you know button one and then
28:52
button two or then button three it just automatically well I guess these need to be block elements
28:59
class name block and then I could say you know
29:05
space eight or something that will automatically give me my margin so super super useful little utility for us we
29:10
only just need a tiny little bit of space between them all and then as opposed to just directly adding all of our routes here I'm going to come down
29:17
I'm going to create a new component that I going to call route route can just return a button
29:23
obviously this can return you know a nextjs link component or it could be you know an a tag depending on what you're using just because I don't know you know
29:30
what framework everyone's using we'll just use a button for now and obviously you can go and replace this with an actual link now I want my route to take
29:36
in a couple of different props so I'm going to want it to take in an icon to show over on the left again I'm just
29:42
doing this kind of based off of our example right here so I'm going to want it to take in an icon I'm going to want
29:47
it to take in some text and then I'm going to want it to take in just a Boolean denoting whether or not it is actually been selected so to add those
29:54
again I'm using typescript I'm going to want selected icon and title for our icon we can import icon type from react
30:01
icons just to start seeing all of this come together I'm just going to go ahead and drop in all of our different examples so it's going to look something
30:07
like this for a single route it's going to have an icon only one of them will be selected obviously this can also just be
30:13
based on the route depending on however you want to set it up and then it will just take the title of the actual route
30:18
go ahead and import all of these icons really quick and obviously we aren't showing anything just yet so that's going to go away but now we can go ahead
30:25
and style this up so we'll start by dropping our icon component that we're passing in in here like this as well as
30:32
our title so just right under that we'll add our title and then our class names on our button to actually style
30:38
everything up some of these are going to be conditional so I actually need curly brackets and then some back ticks and we
30:44
can start adding these in there's going to be set that are going to be our base Styles and then another set that are
30:49
going to be our conditional Styles so our base styles are going to look something like this so a display of flex
30:56
item Center justify start put them over on the left a little bit of gap between all of our elements with the full so it
31:01
takes the full size of this containing element rounded borders a little bit of padding on both axes text of small again
31:09
transition added to box Shadow background color and color and then conditionally based on whether or not
31:15
this is selected there's a couple of other things we also want to add so I'm going to add a space right here and we can drop those in if our element is
31:21
actually selected then I want to give it a white background color a lighter text color and a little bit of Shadow to make
31:28
it kind of stick out if it's not selected then we can make give it kind of a hover state but we can also make
31:34
the text a little bit lighter so looking at that that's going to look something like this and I know that I'm kind of
31:39
harping on this and I've talked about it several times but I think the lesson to take from this again is that we should slowly add different contrasting
31:46
elements until we feel like what's really kind of sticking out right maybe you don't feel like this is sticking out enough maybe we can slowly come down and
31:54
say hey maybe our icon should be our brand color or something so that would be something like this right so like
32:00
maybe we want a little Violet background color for this or text color for this but what I see happening so often with
32:07
people who don't really you know aren't taking the time to think about what they're doing is they will really blow things out of proportion they will start
32:13
with you know their highlighted element will be you know purple background and a a thicker font weight and a larger font
32:20
size and it'll have you know a super large amount of Shadow and the shadow is the same you know violet color something
32:26
like that and it really just starts to look Jai so generally what I would start you know the process I would generally
32:31
take is starting with our kind of unhighlighted element and then adding
32:36
more until we feel like we have enough contrast that this actually sticks out as being different from our other
32:42
elements right so I guess just to to kind of summarize that is slowly add contrast right don't add all of your
32:48
contrast start with you know too little contrast and then add elements until you
32:53
kind of subtly get to the point where you can feel like that element is actually sticking out from the page but yeah that's about it so now let's go
33:00
ahead and work on adding the element that's going to go down here which is going to be our subscription plan selector back over here in my sidebar
Account for page growth (plan picker section)
33:07
component we're going to go ahead and replace this to-do here with our new plan component so in our sidebar files
33:13
over here going say plan. TSX and create our new file then make sure that we
33:19
import that over here under our sidebar something like this we should now see
33:26
that popping up down here at the bottom and we've already set our height honestly we've kind of already
33:31
implemented what I'm hoping to be the lesson from this little section of this uh video but we've already set our height of this element to take into
33:38
account the fact that this was going to be here right so my plan component here I want to be 48 pixels tall this 32
33:45
pixels was to take into account the padding around the page and we've already set our over overscroll y here
33:50
but let's go ahead and actually set up our component and then I'll I'll kind of cover why I think it's a good idea to kind of set things up the way that I'm
33:56
setting them up here so in our plan I'm going to go ahead and remove our static text here then on our div I'm going to
34:01
drop in my Styles so this I'm not directly taking from anything I'm actually kind of taking this from the
34:06
Firebase dashboard actually they have a similar pattern where they have content down here on the bottom left a lot of
34:12
times you'll see a settings or something down here or maybe a um like a a fold button or something that lets you squish
34:19
your nav bar Down for Mine I'm just kind of copying this with a uh a plan selector SL support style little button
34:25
thing in the bottom but essentially I will have a display of flex position of sticky and then note that my top here
34:31
because this is a different element from this other one has to actually take into account where this is on the page so
34:37
similar to how I did my kind of calc thing over here because these are separate elements this also has to be
34:43
sticky and its top has to be 100 V per height minus also the padding and the
34:48
size of this actual element so those are where I'm getting those two values from my height here again is set to 48 pixels
34:55
so that's what's coming into account over and over again here I'm giving this a little bit of a border on the top and
35:00
a little bit of padding on the top with that same border color that I'm using up here under my account selector we should
35:07
now see that we have a border it might be a little bit hard to see I can probably zoom in here that we have a border that actually separates this
35:13
section from the scrollable section above it now inside of my div I'm going to add one additional div that's just a
35:19
flex with item Center and justify between to kind of separate our elements out inside of here we're going to have
35:24
some copy that just tells you what plan you're on as well as as the pays here go again I'm just using a tiny little bit
35:30
of contrast both of these are the same size one of them is just bolded and the other one has a lighter font color like
35:36
this to actually denote that they are kind of separate and they should be looked at separately and finally I'm going to add a button for contacting
35:43
support this could also be you know change plan I just use support the first time so we will stick with that and this
35:49
again just uses a tiny little bit of contrast just a slightly different background color with a little hover State similar to our other elements like
35:56
this and that is all for the actual layout of this page now the reason that I'm doing this the way that I'm doing it
36:01
and it it seems kind of convoluted is because I want to make sure that whenever I have a whole bunch of
36:06
elements I can kind of just zoom in to show you what I mean you know for the time being we only have a couple of different Navigation options here but
36:12
you can imagine that if you had you know 50 different Navigation options or sub menus and you know how dashboards can be
36:18
you have like a little menu that has 10 different options Each of which have 10 more I want to make sure that I am actually able to still navigate to those
36:25
elements I'm kind of accounting for growth by the way that I'm building this right So eventually we're going to have
36:31
too many options or it could be you know a smaller screen size or something and I want to still be able to see my
36:37
important little bar down here but I also want to make sure that people can always access all of the options that
36:42
they have within this list thus why these are separate elements only this one is scrollable this one is always
36:48
stuck to the bottom of the screen so that people can always you know see their plan and access support and that's not eventually hidden somewhere way down
36:54
further down the page and I think with that we're kind of done with our sidebar element so I'm going to need a little
36:59
bit more room here as we move forward hopefully it doesn't get too squished here but now we can actually move on to
37:05
our main dashboard over here on the right so we're done now with the sidebar component meaning that we can move
Align everything (top bar)
37:11
forward to the dashboard component which is currently empty so we can actually see everything
37:17
here maybe that hopefully that gives us enough room over here but remember that our dashboard component is just the
37:23
other component that is sitting next to our sidebar component not sure what doesn't like this import but it's
37:29
working fine so we could ignore it but moving into our dashboard component here the first thing that we're going to build is just a little top navigation
37:35
bar I guess not a navigation bar but a little top bar up here uh kind of like I guess similar to what we're seeing over
37:43
here right we're just going to have the name we're going to have the date and then over on the right it obviously doesn't have an example here but over on the right we're going to have like a a
37:49
fake little date picker thing that obviously you can fill out if you would like so inside of dashboard over here in
37:55
my components I'm going to create a new comp component which I am going to call Top bar. TSX we can just go ahead and
38:03
scaffold out that component look something like this that should be fine and then inside of our dashboard we can
38:09
just use that component importing it like so now we should see that up here
38:15
at the top note that we don't have any padding or anything yet on this card that's because I want to be very
38:20
specific with this step that we are aligning all of the padding and everything with this top bar so that it
38:26
kind of fits the same type of height in space as what we're using for uh over here right like I want my line I'm going
38:33
to have an underline under this bar and I want to make sure that that line lines up perfectly with this line and I want
38:39
to make sure that my text and my height of everything is the same height as this over here from my top bar just those
38:44
little things again really make a big difference and I think that's really the lesson to be taken as we build this out
38:50
is that make sure that you're really using your design eye and the fact that you're looking that everything is kind
38:55
of lining up well you don't really need to know every single little thing about
39:00
design to kind of figure out that okay you know if one underline is here and then the next underline is down here
39:06
like in the middle of this it looks a little bit weird right so just try and be specific as you put these types of things together back over here in my top
39:12
bar component I'm going to go ahead and remove this text right here and I'm just going to drop in my wrapping class names
39:19
on this outer wrapping div those will look something like this so I'm really
39:24
taking a lot of this from let's see what did the other component called the account toggle right so this has a
39:31
border bottom we're looking at the same kind of margin padding and the color of the the border and things like that over
39:36
here we are using a lighter border just because there's a lighter background but similar we're going to do padding on the xaxis of four to kind of push all the
39:42
content in a little bit margin bottom of four and a margin top of two just to push it down that's going to line up
39:49
similar to how we're lined up with this content right here padding bottom of four as well and that's what's just
39:54
giving us space between the content and the bar and then and inside of this div we can go ahead and drop one more
40:00
additional div that's going to be the wrapper around all of the content that lives up in this top bar that's going to have a display of flex item Center and
40:06
justify between with just a little bit of extra padding this padding 0.5 also matches this tiny little bit of padding
40:13
that we have over here on our picker right so we still have a little bit of extra padding there the content on the
40:18
left side of this page is going to look something like this or the left side of the bar I'm just going to have up some basic kind of text up here similar to
40:24
our example and again these are being taken similar to the same kind kind of uh font sizes as we're looking at over
40:29
here in our account toggle right so this is using text small font bold text extra small and we can kind of do the same
40:35
thing over here right so text small text extra small this doesn't necessarily I'm not saying every time you have text next
40:41
to each other it needs to be the same size but in this case I just want these things to line up I want to have two rows of text over here similar to what I
40:47
have over here so it helps to kind of think about them the same way have them be the same size that way they line up
40:52
well and it just by default will kind of look a little bit bit better to your eye than having these different sizes
40:58
outside of this div I just want to have some kind of button over here obviously this could be you know your notifications or whatever other types of
41:03
things you want in your dashboard but for mine I'm just going to have a little calendar like a little date picker type
41:09
thing relatively straightforward so it's just going to be a button with a calendar icon and then you know this I'm
41:15
not actually hooking all of this up right this second of course generally you would use kind of an input with a with a date type or some kind of library
41:21
for picking dates but in this case the placeholder is just going to be a button with some basic little styles on it
41:27
that's going to be pushed over here to the right side whenever you hover over this I'm adding you know a different kind of hover state which is just giving
41:33
us this text Violet and a background of violet 100 which is just our brand color
41:38
in this case and with that we should be good for our top bar so now we can go on to the fun part which actually building
41:44
out our cards for our dashboard jumping back over to our main dashboard component we can close our top bar I
Use different types of contrast selectively (stat cards)
41:51
want to add one component below this top bar which is kind of going to house all of the rest of our grid and as I I say
41:57
that we're actually going to call that component grid so I'm just going to say grid. TSX again we'll just scaffold that
42:02
out really quick then we can import that over here under our dashboard like so
42:09
and the reason that I'm calling this grid as I'm sure you can imagine is because we're going to use CSS grid to
42:14
actually lay all of this content out so on my class right here add some class
42:19
names and for those I'm going to give it a padding on the x-axis of four remember we all already have some margin of four
42:25
below on our our top component here so padding on the x-axis of four a display of grid I'm going to give it a gap of
42:32
three between each of my grid items so like each of my individual cards will automatically have a 12 pixel Gap and
42:38
I'm going to give it a grid Columns of 12 this way each of my elements can selectively pick how many of those
42:44
columns they want to take up and we have a lot of room to work with for different sizes of elements now I'm going a little
42:50
bit off of our original example now I'm sure I actually picked this from something else but kind of similar to
42:56
what we're seeing here at the top I want to have a couple of sort of stat cards they're going to look different than the way that this one is set up but I want
43:03
three stat cards up here at the top that are just showing you know the highle stats of whatever this dashboard might
43:08
be talking about and I'm going to actually call those as you could guess stat cards so over here in file we will
43:14
say stat cords. TSX create our components and then import that over
43:22
here stat cards now stat cards is going to have three individual cards and each
43:27
of those I want to be able to lay out using my grid that I've already defined here so as opposed to actually defining
43:33
you know a div I'm just going to return fragments and then each of those fragments can return an individual card
43:40
so we'll say const card down here this of course is going to take in some specific props but for right now we can
43:46
just return we'll just say a div this can just say maybe P4 we'll just do BG
43:52
black just so we can actually see that all of this is coming together we'll add three cards up
43:58
here say one two 3 like this and because we're using a 12 column grid each of
44:04
these should take up four columns so I can say call span four and now we should see that we
44:12
have four elements up here across the screen now I'm not working on making everything responsive in this video
44:18
that's definitely something that you can do if you want to actually extend this and use it for your own projects but of course what this allows us then to do is
44:24
as the screen gets smaller we could say you know call span 12 instead of call span 4 and that will let our card take
44:30
up the full space instead of just oneir of the space gives us a lot of flexibility in all of the different
44:35
widths and the spacing between different elements giving myself a little bit more room now this is probably going to squish as we actually lay all this stuff
44:42
out but I think that's all right as we kind of just go through making this I am going to want my cars to take in a couple of props and those are going to
44:48
look something like this so for each of them I want them to have a title the title is going to be like you know what
44:54
uh the category is that this is representing the value will be like say plus $1,200 if this is uh you know say
45:01
gross revenue or something like that the pill text will be like a percentage I think this example actually has something kind of similar to that so
45:08
yeah so we're going to have like a little pill instead of this little up 3% but that's going to be the idea is this pill text and then the trend the trend
45:14
is either going to be up or down so in this example this is like saying up up 3% the pill text would be 3% the trend
45:21
up would mean to make this green and have an arrow pointing up and then the period will be the time period for which
45:26
this repres presents like this says last month of course we're going to want to actually pass in some props for each of these so I will paste some of those in
45:33
for my first card it'll have a title of gross revenue with a dollar value like this a pill text of some percentage a
45:40
trend of up and then a period of say Jan 1st to Jan 31st I'm just copying those
45:45
down to each of these but then each of the other ones just have something different so an average order with some different value and saying that's
45:51
trending down maybe and then the last one was saying hey here's all of your numbers for the entire trailing year
45:57
here's how much that is and here's where the pill text is we'll say that's trending up for example and with that we can actually close up our main stat
46:03
cards component and now all that we need to worry about is actually laying out this card and what I really want to drive across As We Lay this out is that
46:10
there are many different types of contrast that we can use right like there's space between elements there's
46:15
size of elements I know we've talked about contrast a lot but I really think that these cards are a really really good example of using all of them
46:22
together to display a whole bunch of different types of information in one space so we can use color we can use
46:27
contrast we can use spacing and we can use size and all of these different things when combined together can kind
46:34
of lead your eye to what is important within a grouping of information right now with that said some of these classes
46:39
are not exactly how I want them so I'm going to replace them with what I'm actually expecting here I still want my call span 4 I still want a padding of
46:46
four but then I'm going to add rounded borders uh obviously I want a One pixel border and that border again will be a
46:52
border of stone 300 which is this color so now we should have something that looks a little bit simpler we have these
46:58
basic Little White cards like this and for the top row of these cards I'm going to add one additional div with a display
47:03
of flex a margin bottom of eight this as we kind of see this come together we'll note is how we're going to depict a
47:10
extra little bit of separation between elements right so all of these are grouped together by the fact that they are in the same div that has the same
47:17
kind of closing border but we're adding a little bit of separation between this element and the element that's going to
47:23
come below it by giving it some space right it's not using size necessarily it's using white space between elements
47:29
then again display Flex items start so they're on the left and then justify between or they're at the top rather on
47:35
the left side of this element I'm just going to add our title and our value our title is going to be smaller using the
47:41
and also using the stone 500 so a slightly lighter color we're going to need a little bit more space or this is
47:47
going to end up getting squished but to the right of this div right here I'm going to add a little pill component I'm
47:54
going to need to import these two icons so it's the FI icons trending up and
48:00
trending down and by pill I just mean that this has this little background color and the background color is
48:05
dependent on this trend so if it's going up then it's green if it's going down then it's red so it's conveying
48:11
information with color as opposed to just size this is another way that you can kind of separate your elements from each other and beyond that this just has
48:18
a very small text size display of flex item Center a little bit of gap between our icon and the actual text that is
48:24
being shown which is just the pill text prop a font of medium little bit of padding around and then again just a
48:30
little bit of rounded border around the edges of this element one extra little thing that I'll note in terms of how I'm
48:36
setting these colors up is that what I often see is people have the stronger background color so say the dark green
48:42
as the background and then like a white text or something like that which that really really definitely sticks off the page but if you want something a little
48:48
bit more subtle what is often a good pattern is doing something similar to what we're doing here where the background color is actually a light
48:55
version of whatever the base color is so say green or red in this case and then we just make the text color a darker
49:01
variant of that same color and that gives you something that looks like this which is a little bit more subtle but
49:06
still kind of conveys the information that we're looking for and now that all of this is in the very last thing that
49:11
we need to round out this card if I give myself some space here remembering my margin bottom eight is already being
49:17
added here giving me some space is some extra text just to show the period for which this stat is being pulled from and
49:25
now if we take a look at this card card kind of what I've been harping on we'll notice that each element has its own way of separating kind of how important we
49:31
think it is right so the most important thing in this card is very obviously the large text with the thicker font weight
49:38
next to that is this information right here which is still the second largest piece of text on this page but it's a
49:44
little bit less prominent because it's slightly lighter and it's slightly smaller followed by this information
49:50
over here which is highlighted by kind of what the trend is versus some previous period and then finally the
49:55
smallest piece of text and the lightest piece of text down here at the bottom and with that we can actually move forward to setting up our graphs which
50:02
will come in this next row so closing up my stat card components and coming back over to my grid component we're going to
Don't reinvent the wheel 2 (adding charts)
50:08
have two separate graphs so one I want to show kind of like a line graph uh just showing kind of two different
50:14
things that related with each other and another I'm going to show a radar graph and kind of what I want to get at with
50:20
this is not to reinvent the wheel and both not to reinvent the wheel in the fact that I see a lot of people in
50:25
myself included getting excited about things like you know D3 and trying to make really really complicated bespoke
50:31
uh data visualizations whereas there can be a time in place for that depending on what you're trying to show but but the
50:36
majority of the time you should just go with what the data actually needs so if you don't have complex data you probably
50:42
shouldn't be showing a really complex graph or a really unique specific graph
50:47
and you also really shouldn't be you know trying to build these things yourself right so using something like
50:52
recharts this is probably my favorite uh graphing Library for reacts very very
50:58
simple with a whole lot of really really great basic examples on how you can actually use their graphs together they
51:04
have all kinds of really unique kind of specific things or I guess not unique things but a lot of ways to dial in how
51:10
these graphs look and work and they're very very easy so just jumping over to examples for instance if I want
51:16
something like a line chart we have 50 different examples of different types of line charts that we can use and then we
51:21
can come down and just copy this and drop it directly into our projects and we'll go ahead and see how that works so
51:28
poking back over here to my main graph I'm going to start with my what I'm going to call activity graph so over
51:34
here in my files we can create an activity graph component make sure that
51:41
we scaffold that out and then import that over here in our grid activity
51:46
graph like this and by default I want my activity graph to take up 2/3 of the
51:52
width right so remember we're using a 12 column or a 12 column grid right rather so we can use call span 8 and this will
51:59
take up you know about the same width as or the exact same width as two of my cards up here at the top and then the
52:05
next one will take up the other fraction so we'll see if I save that that now we have our text in here we have a similar
52:10
outline to our other elements like we have up here with a similar amount of Border radius and things and then
52:16
instead of my activity graph here I'm just going to go ahead and give this some kind of title now I'm wrapping this
52:21
inside of an additional div and below this div we're going to have to do you know our graph right here and we can
52:29
keep our heading here for our card you know relatively simple so I'm just using a little H3 tag here keeping it at a
52:35
base font size and just making the font weight a little bit thicker so this sticks out just a little bit from the page now to actually check out one of
52:41
the examples I'm just going to come back over here we're actually going to we'll update this as we go but to start I'm just going to grab one of their examples
52:47
so we can just use this chart I already have this installed so I'll just input or uh import a couple of my elements
52:54
over here we're also going to need need this data from over here this is just basic data grab that paste that in and
53:04
then you'll see how this component is wrapped with a responsive container that's going to be important here in a
53:09
second and pasting that in to see how that looks we actually I think need to add a use client since we're in nextjs
53:16
to this cool there we go and now we have this really really big crazy graph that is growing out of control and that is
53:22
because we actually need to set a size around this container so we're using uh
53:28
or under the hood this is going to be using I believe um HTML canvas and that
53:33
needs to have a specific width fortunately they have this responsive container helper function uh but we
53:38
still need to give this a container to kind of sit in so we'll just wrap this with a div add a class name on that div
53:44
and this can have just some fixed height so we'll say height let's say 64 and
53:49
then we'll add a little bit of padding on each side well PX of four something like that and now we should have a fixed
53:55
size and whenever whenever we actually resize our chart now it should actually handle resizing and doing all of the
54:01
little animations and things automatically now just taking a very simple look kind of at how this works we
54:06
have our basic line chart wrapper component here that takes in our data and then we can kind of just compose
54:12
together all kinds of little uh utilities that they have for actually piecing together these graphs so for
54:17
instance this little cartisian uh grid component in the background is just that little grid that was in the back of our
54:25
graph here we then have our x-axis and y axis that can have you know different font sizes like I can add class names to
54:31
these and say text extra small that'll make the the actual text smaller we can change the colors things like that and
54:37
so on and so forth but probably the most interesting thing or the the thing you'll really need to know uh first and foremost if you actually want to change
54:43
this is that if we look at our lines so we have two individual lines right here
54:48
and we see that these have these this data key attribute right here one is UV and one is PV I wish they used better
54:55
names for this not exactly sure what those are meant to stand for um but we'll also be able to then scroll up and see that in our data each of these
55:02
elements has a UV and a PV amount and we can change this to whatever we want so
55:07
we could change this to say desktop instead of UV and we could change PV to
55:14
let's say mobile and now this is a graph of some kind of usage between desktop
55:20
and mobile and that would look something like this you'll see that updated everywhere so if you wanted a whole bunch of different graphs or you wanted
55:26
a whole bunch of uh different names for different elements is how you would do it you could have a whole bunch of different keys for each of our different
55:32
points and that is how they would all line up obviously you can also change the names of these and those are our AIS
55:38
down here and we'll see that that is defined by this data key down here on our x-axis is name and so on and so
55:45
forth there's all kinds of different customizations that you can make I'm not going to go you know super deep into every possible little tiny thing that
55:51
you can do with these graphs feel free to check out their documentation there's also a million different tutorials on
55:57
how recharts works but for now I'm just going to grab my old example that I've already built out of a NIC looking graph
56:04
and we can go over that really quick with the different changes that I made so I'm just going to replace my example
56:12
right here with a example that I have already built out and that looks like this if it will load oh that's not
56:19
loading because I also need to change the data there we go so here is my example graph and we'll notice that the
56:25
colors I just adjusted a little a little bit more so if I scroll down here you can come to our lines I change the
56:30
stroke and the fill to use colors like my brand color for one and then one of
56:35
the stone colors which I just got uh directly from Tailwind CSS so these are
56:41
just a couple of the Tailwind colors that I'm already using in other places just to make sure that this actually matches the brand of the rest of the
56:47
page I'm also updating kind of some of the font colors and things cleaning up this little tool tip a little bit giving
56:52
it a similar border and some rounded edges as well as updating the X and Y AIS to make them a little bit smaller
56:58
and then giving this a little bit of negative margin on the left sometimes uh if you go to your actual main chart
57:03
component you can pass in margins like this and what you'll notice sometimes it's a little bit offset I'm not really
57:10
sure exactly why that is or if there's a better way to fix it than this but what I generally do is just bump around these
57:16
margins until it seems like it lines up the way that I want it to line up and with that we can now move on to our next
57:22
graph and I'm going to use a very similar pattern for this next one so I'm just going to come up here I'm going to make a new file this one I'm going to
57:28
call usage radar. TSX and this is going to use a radar chart which if you
57:33
haven't seen one of those I will show you in just a second just import this really quick down here and then we can
57:40
come back over to the documentation and look for radar charts so yeah they have
57:46
two of them down here you can click on one of these and see what those look like so they're these kind of graphs I'm sure you've seen these before uh you can
57:52
layer different things on top of each other similar to this which is exactly what we're going to be doing you could just go through and copy everything from
57:59
in here again and play with it from there I already have one built out so I am going to use that so back in my radar
58:05
chart file I'm just or my usage radar file I'm just going to drop in the one that I already have we will fold the
58:10
text so we can actually see it and that should look something like this so as far as colors and things I did a lot of
58:15
the same things right like I'm using brand colors the same way I also added a little Legend down here at the bottom
58:21
and just to walk through this we can kind of look at how I have this set up so remember that we can kind of name different things and use them how we
58:27
want I have mobile and desktop subject maybe a better thing would be like feature or something we can even update
58:34
that if we want we could say feature instead of subject it's probably just from my original copy paste and what
58:39
this is pretending to kind of show is different amounts of usage across mobile and desktop for different features and
58:45
some kind of application at least that's kind of the the basic idea that I'm going for here down here as I mentioned
58:51
I'm using a call span of four here because remember this one is a call span of eight and we have 12 possible columns
58:56
in our grid rounded borders in the same amount of padding the same kind of styling for our heading here as we're
59:02
using for our other card and beyond that it's just the basic graph components with extra styling that I copied
59:08
directly from recharts and with that I think we can move on to our last section which is just putting together a basic
59:13
table now one last time back over in my grid component I am going to make one more final new component which I'm going
Use color purposefully (recent transactions table)
59:21
to call recent transactions if I can spell
59:26
and for this I just want to create a basic grid component or not a basic grid a basic um table component so if you
59:33
were made an HTML table before that will look pretty similar to what we're doing here for our wrapping div we're going to
59:39
use some styles that are going to make this take up the full size remember we're call span 12 again little bit of
59:45
padding a border again rounded using the same kind of styles that we're using for all of our other cards so that this
59:51
matches and again I'm going to copy the same type of styles for the heading row here as what I have over in these so I
1:00:00
have my activity and things like that except for this one I'm also adding this little C all button over here on the
1:00:06
right of course right now this isn't taking you anywhere but you know in your instance maybe this is some kind of link that takes you to somewhere where you
1:00:12
can see all of your transactions below this div we can go ahead and create our table so that can just be a normal table
1:00:18
component setting withth the full and I'm setting table layout to Auto and for
1:00:24
our table head I'm actually going to create a compon so I'm going to call that table head and we'll just make this
1:00:29
in the same file we'll just come right down here say con table head this doesn't need to take in any pams or
1:00:35
anything I just wanted to kind of clean this up a little bit and this is going to return our table head elements with a
1:00:42
single table row and these sets of items so there's nothing fancy going on with
1:00:48
this I'm just you know giving these size a text size of small a base font weight making the text a little bit lighter
1:00:54
than the rest of the text is going to come below below this and then for each of these giving them a little bit of padding making sure they align on the
1:01:00
left side of the column and I do have one additional empty row here that's
1:01:05
because on the right side of each of my items I'm going to have a little ellipses like a a view more type drop
1:01:10
down thing now under our table head we can create a t body for our table
1:01:17
body and similar to what I did with our table head component here I'm going to create a table row component so we'll
1:01:24
say const table Row for right now that can just say
1:01:30
return a table row and we are going to have a number of these and we'll say
1:01:36
this many for now now for each of our table rows obviously we need to pass in whatever parameters are going to match
1:01:41
with all of this content so we're going to need to be able to take in a couple of props which I can go ahead and drop
1:01:48
in really quick to our component here so we need a customer ID a skew which is
1:01:53
just like an identifier for this item the date that this happened the price and then order which order I'm just
1:02:00
going to use this could be like an incrementing ID or something if you're mapping over this it could just be the index but I want to be able to make sure
1:02:06
that every other of my rows has a different background color so we just have like a white background and then a
1:02:12
slightly off-white background just to separate all of our rows a little bit as an example of actually passing all of
1:02:18
these in obviously we need to pass in our props so I'm just going to drop a couple of these in here we need you know
1:02:23
a customer ID which can be anything skew we just say Pro one month versus 3 month
1:02:28
versus annual or something like that the date that it occurred the price that the user paid for it and then the order so
1:02:35
one two again like I said this is just Auto incrementing or not Auto incrementing in this case but just incrementing 1 2 3 4 five and now we can
1:02:43
move on to actually laying this out I'm sure this is not the most interesting part of this tutorial because it's just
1:02:49
basic kind of layout but we can kind of take it one little piece at a time so for our table row as mentioned if this
1:02:56
is an odd element then we can or an even element we can give it a background of stone 100 else it'll just be transparent
1:03:04
or just white in the background and each of them can just have a text size of small this way each other each second
1:03:11
row essentially has this background color giving us this kind of stepped feel and then just going through one
1:03:16
column at a time starting with our customer ID that's going to look something like oops like this so each of
1:03:23
our data cells is just going to have a little bit padding this first one is going to have a link with the customer
1:03:29
ID to presumably go and look at more of this customer's information their previous purchases things like that the
1:03:34
next three items are literally just going to show the text so it's just going to show the skew the date and the price and then finally for my last
1:03:41
element I'm just going to show a little button which is you know presumably going to be some kind of like view more
1:03:47
button like this like what we have over here on the side and we'll see now kind of what I was talking about with the stepped background colors now the only
1:03:53
thing that I really want to call out here is that we're using Color purposefully and meaningfully let me open this up now that we're kind of done
1:04:00
and it's a little bit easier to see what's going on here so we're really only using Color when it makes sense to use color we're not just blowing this
1:04:06
this purple brand color out all over the place because that can make it a little bit harder to look or to find what you're looking for so we're using that
1:04:12
to kind of draw our attention to different elements right so we have like our CL button over here makes it very obvious that this is something that I
1:04:19
can click on you know I'm not doing this and then the next element has some kind of pill or something and then this has
1:04:24
like you know it's also purple and has some kind of date icon or something and then the price is green and it's you
1:04:30
know really blowing itself out of proportion when it doesn't need to be I'm only using color in piece in places
1:04:35
where I want to actually draw somebody's eye which makes it a lot easier to look at this whole table and actually find
1:04:41
what I'm more than likely actually looking for here one last little thing that we can do is over here in our
1:04:47
dashboard component we had this fixed height of 200 vport height we definitely don't need that anymore I was just using
1:04:52
that to kind of show this scroll and now I think we're actually kind of done so let me open this up a little bit maybe I
1:04:58
will close this out and now we can see our full dashboard layout like this
1:05:04
again kind of noting all of the different things we did we have a separate scrollable little element here we have everything really lined up well
1:05:10
I'm actually going to turn my mouse off to get rid of these scroll bars of course you can keep those on it's probably better user experience to keep
1:05:16
your scroll bars on uh you can style them though of course but we have our separate elements over here this side is
1:05:22
already scrollable if we want to get there if we open up our search we allow our users to get down and dig into
1:05:28
whatever feature they're actually looking for very easily without needing to dig through you know maybe a bunch of different pages we're trying to do a
1:05:34
really really good job here of using things like Whit space and color and font size and font weight to actually
1:05:39
give us different amounts of importance to different elements that are on our page and we can continue to run with
1:05:44
this as we build out our entire dashboard and with that I think that's everything I wanted to cover for today if you got anything out of this I would
1:05:50
massively appreciate a like And subscribe I'm also working on a framer motion course that's at blast. dodev if
1:05:56
you're interested in joining the wait list for that you'll get a discount whenever that comes out and you'll be updated on you know all of the progress
1:06:01
I'm making on that as well as hoover. if you're interested in learning more about an UI animations hover is a component
1:06:08
library that I run filled with a bunch of different cool animated UI components specifically for react tail and CSS and
1:06:15
primarily frame or motion so beyond that I hope you learned something today leave a comment if you think there's anything else I missed or any other tips I should
1:06:21
have covered in this video and uh beyond that yeah I'll see you guys next time peace.

https://youtu.be/vdxnBKRD7kU?si=d_VWepk5siov1Cni