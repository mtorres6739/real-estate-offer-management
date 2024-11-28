0:03
I'm going to show you how to properly add
0:05
cookie-based
0:06
authentication to an existing
0:07
Next.js app. We're going to use this
0:09
email client example that we've been
0:11
working on for a few
0:12
videos. There's a link to the full
0:13
playlist in the description,
0:14
but for this video we're going
0:16
to focus on all things authentication,
0:18
why you need cookies, and how
0:19
you can use the new Supabase
0:20
SSR package to handle all the tricky
0:23
bits. This is an updated version of this
0:26
video because I said
0:27
to do something that you probably
0:28
shouldn't do with the Next.js app router,
0:31
but more on that later.
0:32
Let's get into it. So here I have our
0:34
email client. It has folders
0:36
on the left, a list of emails in
0:38
that folder, and then if we click on one
0:39
of these emails we can see
0:41
its contents. But it doesn't
0:42
really make sense for us to see anything
Add Authentication with Next.js Server Actions and Supabase
0:44
on this page if the user is
0:46
not currently signed in. So
0:47
if we click this login button we'll see
0:49
our authentication page
0:50
and we have this button
0:51
to log in with GitHub. The code for this
0:53
page looks something like
0:54
this. We have a form with
0:56
a submit button and the GitHub logo. When
0:58
we click it that submits
0:59
this form to this sign-in action
1:01
which is declared above. So this is a
1:03
server action and right now
1:04
we're just console logging
1:05
out, sign-in with GitHub. And if we open
1:07
up the console for our dev
1:08
server we can see that message
1:10
from when we clicked earlier. So we can
1:11
get rid of that console log
1:12
now and we just need to create
1:14
a new Supabase client. So we can do that
1:16
by saying const
1:17
supabase is equal to calling the
1:19
create client function which comes in
1:21
from ./utils/supabase
1:23
And if we have a
1:25
look at that one it's just wrapping a
1:27
call to the create client function that
1:29
comes in from Supabase-js
1:30
just so we don't need to copy and paste
1:32
these environment variables
1:33
or any other configuration
1:35
that we might add as part of this video.
1:37
So if we go back to our
1:38
login page we now have our
1:39
Supabase client and so to sign in with
1:42
GitHub we can await a call to
1:44
supabase.auth.signinwithOAuth
1:47
and this takes a configuration
1:49
object with the key
1:51
provider set to the string GitHub.
1:53
Now I configured GitHub as an
1:54
authentication provider in between these
1:56
videos so if you need
1:57
to do that for your project check out the
1:59
guide linked in the
1:59
description for setting up an OAuth
2:01
app with GitHub. So when we call this
2:03
sign in with OAuth method it
2:05
will give us back a couple of
2:06
things. It will give us back an error if
2:08
something went wrong or the data if
2:10
everything was all good.
2:11
So if we do get back an error then we
2:14
probably want to be kind to
2:15
our future selves and console
2:16
log it out. Otherwise we want to return a
2:20
redirect which is a function
2:21
that comes in from next/navigation
2:23
and then we just need to give
2:25
this one a path that we want
2:27
to redirect to. So in this case
2:28
that will be data.url. So this is a URL
2:32
that we get back from
2:33
initiating this sign in with OAuth
2:35
method. So this will send us off to
2:37
GitHub to authenticate but
2:38
then after that's finished
2:39
we still need to redirect the user back
2:41
to our landing page and
2:42
so we do that by passing an
2:43
additional parameter for options which is
2:45
set to an object with the
2:47
key redirect to set to our
2:50
origin. And so we can get our origin
2:52
above by calling the
2:53
headers function which should come
2:55
in from next/headers so we can just
2:58
import that manually. So we
2:59
want to say import headers
3:00
from next/headers and then calling
3:03
this headers function will
3:05
give us back a list of all
3:06
of the headers. So we want to call get
3:08
and pass it the string origin
3:09
and this is complaining that
3:11
null is not assignable to type string or
3:13
undefined. So we can just make this a
3:15
string by using back
3:16
ticks and then dollar sign open curly and
3:18
then closed curly after it
3:20
and back ticks. Don't worry
3:21
we need to do this for the next step
3:22
anyway. So when we click
3:23
that GitHub logo we call this
3:25
sign in with OAuth function which gives
3:27
us back a URL which we
3:29
redirect to to kick off that
3:31
authentication flow with GitHub and then
3:33
when that completes we want
3:34
to redirect to the landing page
3:36
and now back in our application if we
3:38
click here to sign in with GitHub it'll
3:40
step us through that
3:41
OAuth flow with GitHub and eventually
3:43
we'll end up back on the
3:44
landing page of our application.
3:46
Okay cool now that we have authentication
3:48
let's make the rest of our
3:50
app protected so you need
3:51
to be signed in to be able to see any of
Implement Protected Routes by Redirecting Unauthenticated Users
3:53
those emails. If we have a
3:55
look at our next.config.js
3:57
file we'll see this has a redirect set up
4:00
from the landing page of
4:01
our application to slash f
4:03
slash inbox so that's going to take us to
4:06
this f route and then this
4:07
is a dynamic route so this
4:09
part of the URL will come in as this name
4:12
variable and this
4:13
page.tsx server component will
4:16
be mounted for that route so we want this
4:18
one to require
4:19
authentication and we also want this new
4:21
route to require authentication so since
4:24
these both exist within the same sub
Using a Layout to protect a collection of routes
4:26
route of slash f slash
4:28
whatever the folder name is we can create
4:30
a new file for layout.tsx
4:33
which will be loaded for any
4:34
routes within this folder so this server
4:36
component and also this server
4:37
component so this is a pretty
4:39
simple layout component it takes some
4:41
children as a prop and then
4:43
returns those children again
4:44
so we're not rendering anything
4:45
additional but any logic we add before
4:47
this return statement
4:48
is going to be run for any of the child
4:51
routes of this component so
4:52
let's create a new superbase
4:54
client by calling the create client
4:57
function again that comes in from our
4:59
utils folder we then want
5:00
to check whether we have an authenticated
5:02
user so we can say const the
5:05
data that comes back and we
5:06
want to destructure the user object we
5:09
get this by awaiting a call to
5:11
supabase.auth.getUser and
5:14
so this user object will either be a user
5:17
or null so if we don't have a
5:19
user then we want to redirect
5:22
which again is a function that comes in
5:24
from next slash navigation
5:25
and the path we want to navigate
5:27
unauthenticated users to is slash login
5:30
otherwise if we do have a
5:31
user then we just continue on to
5:33
render the children so let's step through
5:34
this process in our
5:35
application so we click the sign
5:37
in with github button and it doesn't work
5:39
hang on what's going on
5:41
here are we not redirecting
5:42
correctly to the landing page well let's
5:44
add the best damn debugging
5:46
tool there is out there the
5:47
console.log here statement and let's go
5:51
back to our application and
5:52
sign in with github again we
5:54
can see something's going on that little
5:56
bar is pulsing when we
5:57
click this so let's open up the
5:58
console of our development server and we
6:00
can see here here here so we
6:03
definitely got here so let's
6:04
move this under our get user statement
6:06
and check what is our user set to and
6:10
again let's click the
6:11
button and open up our console and we see
6:13
user is null okay you got
Use the @supabase/ssr package to configure cookie-based auth
6:16
me i knew this was going to
6:17
happen but i wanted you to experience it
6:18
with me the problem is that
6:20
by default superbase.js stores
6:22
the user session in local storage so we
6:24
can see it is getting set
6:26
correctly but local storage
6:28
doesn't exist on the server and guess
6:29
where server components
6:31
and server actions run
6:33
on the server therefore we need to use
6:35
cookies to store the user
6:37
session rather than local storage
6:39
thankfully we've developed a super handy
6:40
package called ssr for this
6:42
exact problem let's use pnpm
6:44
to install or i the at superbase slash
6:48
ssr package we also need at
6:50
superbase slash superbase.js
6:52
but since we already have this installed
6:54
in our project we just need the ssr
6:56
package and now that
6:57
that's done we can run our development
6:59
server again and then open
7:00
up this helper function for
7:02
create client and we want to change this
7:04
import to the create server client
7:07
function which means
7:08
we can get rid of this alias and this one
7:10
comes in from the ssr
7:11
package we can then copy and paste
7:14
this one and then this is lit up red
7:15
because we need to pass these two
7:17
environment variables but
7:18
then we also need an additional
7:20
configuration object called options so we
7:22
can pass that one so
7:23
i'm just going to paste this one in and
7:25
this is just declaring how
7:27
to get set and remove a cookie
7:30
in nextjs so we need an instance of our
7:33
cookie store so we can
7:34
declare that above which means
7:35
we need to refactor this slightly to
7:37
actually have a body of our function and
7:39
then we want to return
7:41
this big create server client blob so if
7:44
we paste that one here then
7:45
above that return statement we
7:47
can declare a new variable for cookie
7:49
store which is the result of
7:51
calling the cookies function
7:53
that comes in from next slash headers and
7:55
so this cookie store can
7:56
now be used to interact
7:58
with the cookie headers on our request so
8:00
we can call cookie store dot
8:02
get pass it a name and then
8:03
if we get a cookie back then we want to
8:05
return its value and then we
8:06
also declare how to set and also
8:08
remove a cookie we also need to import
8:10
this cookie options type which it's not
8:12
nicely inferring but
8:14
this comes in as a type from the ssr
8:16
package so we can say we want the create
8:18
server client function
8:19
and also the type for cookie options and
8:22
so this adds quite a bit to the
8:23
configuration when we're
8:24
creating our superbase client but
8:26
anywhere we're calling this
8:28
create client function can remain
8:30
exactly as it is as well as how we're
8:32
using that client to do
8:33
things like get our user or over in
8:36
our db actions dot ts file where we're
8:38
using our superbase client
8:40
to perform mutations or in our
8:42
queries dot ts file that has all of our
8:44
data fetching logic thankfully we also
8:46
have this awesome nextjs
8:48
auth guide which will be linked in the
8:49
description that steps through all of
8:52
this with some nice copy
8:53
and pastable code snippets so you don't
8:55
need to pause the video and type out
8:57
every single character
8:58
sorry if you already did that there's
9:01
also a sneaky way to
9:02
generate all of this so you don't
9:03
have to type any of it but we'll talk
9:05
about that at the end of the
9:06
video there are just two more
Configure Proof Key for Code Exchange (PKCE) route
9:08
bits we need to configure the first one
9:09
is in our login page after we've
9:11
authenticated with github
9:13
we want to redirect to our origin so this
9:16
will either be localhost
9:17
over port 3000 or whatever
9:18
our production url is but then we want to
9:21
navigate to slash auth slash
9:23
callback and then we need to
9:24
declare this new route so under the app
9:27
folder let's create a new
9:28
file at auth slash callback
9:30
slash route dot ts so this will be a
9:33
route handler and again i'm just gonna
9:35
paste in this big blob
9:36
so this is listening to get requests on
9:38
this route it's then getting the code
9:40
from the search params
9:41
which will be automatically sent to this
9:43
route by github during that
9:44
authentication flow so then
9:46
we're creating a superbase client to
9:48
exchange that unique code for the user's
9:51
session and then we're
9:52
just redirecting the user again back to
9:54
that origin so this will
9:55
just navigate back to the
9:56
landing page so this pattern is called
9:58
the proof key for code
10:00
exchange pattern or pixie which is
10:02
just a more secure way of doing oauth so
10:05
when github is happy that
10:06
our user is who they say
10:07
they are it redirects them to our slash
10:09
auth slash callback route with this
10:12
unique code which we
10:13
exchange for the user's session and so
10:15
all of that redirection stuff happens
10:17
automatically by telling
10:18
github where to redirect the user to
10:20
after completing that
10:21
authentication process and we
10:23
can test this whole authentication flow
10:25
in the browser by going to the
10:26
authentication page and
10:27
clicking sign in with github and you can
10:29
see we've been successfully
10:30
redirected to the landing page
10:32
and we can see my github avatar and also
10:34
my github username and if
10:35
we open up the console and go
10:37
over to application we can see our
10:39
superbase session has been
10:40
correctly set under cookies so
10:42
our user is now authenticated but there's
10:45
a bug when the session expires and
10:47
superbase attempts to
10:48
refresh a new sesh the user will be
10:53
unexpectedly signed out and if we have a
10:55
look under application
10:56
and cookies they're gone where are my
10:58
cookies the reason this is
11:00
happening is because server
11:02
components only get read access to
11:04
cookies so when we call
11:05
superbase dot auth dot get user
11:07
this will automatically refresh expired
11:09
sessions before returning
11:11
that user object but because
11:12
this layout is a server component it
11:14
can't update that cookie with our new
11:17
session and so the browser
11:18
just automatically removes the expired
11:20
one therefore we need to
11:21
use a route handler server
11:23
action or middleware to refresh this
11:25
session before it hits our server
Use Middleware to refresh expired sessions
11:27
component route so let's create
11:28
another helpful little helper under utils
11:31
slash superbase so this is
11:32
going to be a new file called
11:34
middleware dot t s and this is going to
11:37
export out this big scary
11:38
blob no it's not really that
11:41
scary it's just a quite verbose way of
11:44
again getting setting and
11:46
then removing a cookie the
11:48
difference is in middleware we need to
11:50
change the cookies on both
11:51
the request and the response so
11:53
it looks just a little bit more
11:55
intimidating again you can get that one
11:57
from the docs linked
11:58
in the description or just wait just a
12:00
little bit longer and i'll
12:01
show you that single command that
12:03
does all of this for you so now we just
12:05
need our actual middleware dot t s file
12:07
so we want to create
12:08
that at the rootmost point of our project
12:11
so again middleware dot t s
12:12
and we're going to paste this
12:14
one in here so this one uses our
12:16
middleware helper to create a superbase
12:18
client it passes in the
12:20
request so we can modify the cookies on
12:22
that request and gives us
12:23
back a modified response
12:25
and also our superbase client then we're
12:27
calling superbase dot auth
12:28
dot get user and we're not
12:29
actually doing anything with the user
12:31
we're just throwing it away but again
12:32
this get user function
12:34
attempts to refresh expired sessions and
12:37
then because middleware
12:38
has read and write access to
12:40
those cookies it can update the cookies
12:42
on the request and the
12:43
response before returning this
12:44
response which will load our server
12:46
component route that the user
12:48
requested so again this just
12:49
ensures that we have a fresh session
12:51
before we reach the server
12:53
component because the server
12:54
component only has read access to these
12:56
cookies to determine whether
12:58
this user is authenticated or
12:59
not and the last little part of this
13:01
middleware file is exporting a config
13:03
containing a matcher
13:04
and so this is a big scary regex or reg
13:07
ex pattern that excludes a
13:10
bunch of stuff so static files
13:11
favicons all these different image types
13:14
things that we don't want
13:15
to run this middleware logic
13:17
because they're just assets for our
13:19
application rather than server
13:20
component routes which is all
13:22
we really need to run this for and now
13:23
our user can go on happily using this
13:25
application and reading
13:27
all of their unread emails and when their
13:29
session is ready to
13:30
expire it will be automatically
13:32
refreshed in the background as they're
13:34
going through using the
13:35
application and right here
13:36
is where i made a little bit of a boo boo
13:38
in the previous version of
13:39
this video and how i've been
13:41
building apps generally with the nextjs
13:43
app router turns out using a
13:45
layout for protecting pages
13:47
is not a safe or reliable way to do it
13:49
you can click that card
13:50
above if you want to go deeper on
13:52
why that's the case but the recommended
13:53
path from the nextjs team and the most
13:55
performant and secure
13:56
option for protecting pages is to do
Move Protected Route logic to Middleware
13:59
these checks in middleware so
14:01
let's take this logic from our
14:02
layout.tsx file where we're getting a
14:04
user from superbase and then
14:06
if there isn't a user we're
14:07
redirecting and let's instead put that in
14:09
our middleware.ts file so
14:11
we're already doing part
14:12
of this logic where we're getting the
14:14
user from superbase but
14:15
instead of just throwing that user
14:16
away we now want that user object and if
14:19
there is no user then we
14:20
want to return a next response
14:23
dot redirect and next response comes in
14:26
from next slash server and
14:28
then we just need to refactor
14:29
this redirect slightly to pass it a new
14:31
url of that slash login
14:33
path and then as a second
14:35
parameter the request dot url and we can
14:38
now delete this layout.tsx so
14:41
if we open up our project make
14:42
sure that's the one under f slash name
14:44
and not our rootmost layout so let's
14:47
delete this one and now
14:48
we have our middleware protecting all of
14:50
our pages and making
14:52
sure we have a user before
14:53
returning a response but since middleware
14:55
runs on every single route
14:57
and the login page is one of
14:59
those routes we end up in an infinite
15:01
loop so we just need to
15:02
check if we don't have a user and
15:04
the current route is not the login page
15:07
which we can get by saying
15:08
request dot next url dot path
15:10
name dot starts with and then the path
15:13
slash login then we want
15:15
to redirect the user to the
15:17
login page so if we have a user then
15:19
we'll just return the
15:20
response or render the page they're
15:21
looking for if we don't have a user and
15:24
we're trying to load the
15:25
route slash f slash inbox
15:26
for example then that does not start with
15:29
login so we redirect to the
15:30
login page if we don't have
15:32
a user but we are navigating to the slash
15:34
login page then we skip
15:36
this redirect and return the
15:37
response which happens to be the login
15:39
page but there's no infinite
15:41
loop but that's quite a bit
Use the `with-supabase` template to skip this whole configuration
15:43
of manual configuration if you want to
15:45
skip all of that i recommend you check
15:46
out this video right
15:47
here we use a special super base template
15:50
that's built right into the
15:51
create next app cli tool to
15:52
configure all of this server-side cookie
15:54
stuff so you don't even need
15:56
to think about it but until
15:57
next time keep building cool stuff

# Next.js App Router Authentication Review

## Current Implementation Review

### What We Have 

1. **Middleware Protection**
   - Using `createMiddlewareClient` from `@supabase/auth-helpers-nextjs`
   - Protected routes pattern with public routes whitelist
   - Role-based redirects
   - Session refresh on each request

2. **Auth Context**
   - Client-side auth state management
   - Sign in/out functionality
   - User profile integration

### What We're Missing 

1. **Auth Callback Route**
   - Need to add `/app/auth/callback/route.ts` to handle auth redirects
   - Important for OAuth and email verification flows

2. **Server-Side Session Handling**
   - Should use `createServerComponentClient` for server components
   - Need to implement proper server-side session validation

3. **Cookie Management**
   - Missing explicit cookie handling for auth state
   - Should implement secure cookie settings

## Recommended Changes

### 1. Add Auth Callback Route

Create `/src/app/auth/callback/route.ts`:

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', request.url))
}
```

### 2. Update Middleware

Update `/src/middleware.ts`:

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if it exists
  const { data: { session } } = await supabase.auth.getSession()

  // Add secure cookie settings
  if (session) {
    res.cookies.set('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### 3. Server Component Auth

For server components, create a utility function:

```typescript
// utils/supabase-server.ts
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export function createClient() {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}
```

Usage in server components:

```typescript
// app/page.tsx
import { createClient } from '@/utils/supabase-server'

export default async function Page() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // Rest of your component
}
```

### 4. Client Component Auth

Update AuthContext to use proper error boundaries and loading states:

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export const AuthContext = createContext<AuthContextType>({})

export function AuthProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
      router.refresh()
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## Security Best Practices

1. **CSRF Protection**
   - Always use CSRF tokens for form submissions
   - Implement proper cookie settings (httpOnly, secure, sameSite)

2. **Session Management**
   - Short session durations
   - Proper session invalidation on sign out
   - Regular session refresh

3. **Error Handling**
   - Never expose sensitive information in error messages
   - Implement proper error boundaries
   - Log security-related events

4. **Rate Limiting**
   - Implement rate limiting for auth endpoints
   - Use Supabase's built-in rate limiting features

## Next Steps

1. Implement the auth callback route for proper OAuth flow
2. Update server components to use `createServerComponentClient`
3. Add proper error boundaries and loading states
4. Implement CSRF protection for forms
5. Add rate limiting to auth endpoints
6. Update cookie settings for better security

These changes will align our auth implementation with Next.js App Router best practices while maintaining security and user experience.

https://youtu.be/v6UvgfSIjQ0?si=vq3ifpu1_lNbAXXq