# Next.js and Supabase: How to Store and Serve Images

This guide provides an overview of how to upload and retrieve images using Supabase Storage with Next.js. We will cover a step-by-step process to get you hands-on experience.

## Table of Contents

- [Introduction](#introduction)
- [What is Supabase Storage](#what-is-supabase-storage)
- [Benefits of Supabase Storage](#benefits-of-supabase-storage)
- [Usage with Next.js](#usage-with-nextjs)
- [Bootstrapping Next.js](#bootstrapping-nextjs)
- [Supabase Utilities: Connecting with Supabase Client](#supabase-utilities-connecting-with-supabase-client)
- [Setting up Supabase Storage](#setting-up-supabase-storage)
- [Create an Input File and Image Component](#create-an-input-file-and-image-component)
- [What to Take Note Of](#what-to-take-note-of)
- [Wrap Up](#wrap-up)

## Introduction

To build powerful applications, you may need to store your data on cloud storage providers, including Microsoft Azure, AWS buckets, and many more. In this guide, we will look into one of the popular storage solutions, Supabase Storage. We will build a simple profile form to upload a profile picture, covering every step you need to get started with Supabase Storage.

### Prerequisites

Before we begin, ensure you have the following:

- Node.js installed
- A basic understanding of Next.js
- A Supabase account. You can [create it here](https://supabase.com) if you don’t have one.

With all these set, we are ready to go.

### Highlights

Here are some of the key points you will learn:

- What Supabase Storage is and the benefits of using it.
- How to use Supabase Storage with Next.js.
- A step-by-step guide to uploading and retrieving images.

## What is Supabase Storage

Supabase is an open-source Firebase alternative that provides a variety of backend services, including a powerful storage solution. It is part of the Supabase suite, allowing you to store and serve any type of files, including images, videos, and documents. It is a simple and scalable solution for handling file storage in web applications.

## Benefits of Supabase Storage

- **Easy to Use**: Supabase has a simple API for file uploads and downloads.
- **Secure**: It offers access control and permission settings to keep your data safe.
- **Scalable**: Built with scalability in mind to handle growing amounts of data efficiently.

## Usage with Next.js

We’ll walk through the process of integrating Supabase Storage with a Next.js application. This will include setting up the project, connecting to Supabase, and implementing file upload and retrieval functionality. We will perform a simple image upload and retrieval, but you’ll learn a lot along the way.

## Bootstrapping Next.js

First, create a Supabase project on the [dashboard](https://supabase.com) and fill in the required details. Wait until it launches.

Next, obtain the project URL and anon key from the API settings:

- Head to the [API Settings](https://supabase.com) page in the Dashboard.
- Find your project URL, anon, and service_role keys on this page.

### Initializing our Next.js Project

Set up a new Next.js project using TypeScript. Open the command line and run the following commands:

```bash
npx create-next-app@latest --ts --use-npm <project-name-here>
cd <project-name>


- During setup, you will be prompted with several questions. Choose 'Yes' for all to scaffold the project structure with Tailwind for styling and the app directory.

Next, install the Supabase client library:
npm install @supabase/supabase-js

-Environment Variables
Create a .env.local file to store your keys obtained earlier, including the API URL and the anon key. Replace with your actual keys:
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

##Supabase Utilities: Connecting with Supabase Client
Supabase provides two types of clients to access its services:

Client Component Client: Used to access Supabase from Client Components, which run in the browser.
Server Component Client: Used to access Supabase from Server Components, Server Actions, and Route Handlers, which run exclusively on the server.
We will create utility files, a recommended way, and set up these clients. Organize them within the utils/supabase directory at the root of your project.

For our case, we will go with the Client Component Client. In the client.ts file, add the following code:
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

Note: If your project doesn't have the ssr module, please check the Supabase documentation to install it.


## Setting up Supabase Storage

First, create a storage bucket in Supabase. Name it image_upload_kodaschool or any name you prefer. You can choose to make it public if you like. You can also adjust settings such as permissions, creating policies, and making the bucket public.

You can upload images manually by dragging and dropping them into the bucket. Organize your storage by creating different folders to categorize and manage your files.

## Create an Input File and Image Component
At this point, we’re all set up for development. We’ve set everything we need to get started with Supabase Storage. We will create an input field for file uploads and an image component to display the uploaded image.
'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>('');

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 text-gray-200 p-24">
      <h1 className="text-5xl font-bold">Next.js & Supabase Storage</h1>
      <div className="mt-5">
        <input
          type="file"
          onChange={uploadImage}
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>
      <div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={300}
            height={300}
            className="rounded-lg border border-gray-300"
          />
        )}
      </div>
    </main>
  );
}


https://kodaschool.com/blog/next-js-and-supabase-how-to-store-and-serve-images