<p align="center">
  <a href="https://househackers.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">House Hackers</h3>
  </a>
</p>

<p align="center">A web application designed to help first-time homebuyers find the best neighborhoods in Fairfax based on personalized criteria.</p>

<br/>

## Introduction

House Hackers is a web application designed to help first-time homebuyers find the best neighborhoods based on personalized criteria. Users can adjust sliders to filter ZIP codes by factors such as school ratings, number of hospitals, average home prices, population, and available housing units. The app dynamically ranks and displays the top five ZIP codes that match the selected preferences. An interactive Mapbox map visually highlights these top ZIP codes with color-coded indicators, providing both detailed rankings and geographical context to support informed home-buying decisions.

## Inspiration

The Fannie Mae challenge inspired us to create an application for first-time homebuyers.

## Features

- Personalized ZIP code rankings based on selected criteria
- Interactive Mapbox map with color-coded ZIP codes
- Filters including school ratings, hospital count, home prices, population, and available housing units

## Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Python, FastAPI
- **Mapping**: Mapbox GL

## Challenges

Finding extensive and reliable ZIP code-specific datasets to analyze was challenging. Additionally, formatting our data in an appealing way and fixing bugs took considerable effort.

## Accomplishments

We're proud of implementing a color-coded heat map according to ZIP code rankings, which provides a visually intuitive way to understand the data.

## What We Learned

Starting with a concrete idea before development always helps avoid confusion and accelerates the development process.

## What's Next for House Hackers

We hope to scale House Hackers for the entire country, incorporating more comprehensive datasets and adding additional filtering criteria to provide even more personalized results.

## Demo

Check out our application here: [househackers.vercel.app](https://househackers.vercel.app)

## Deploy Your Own

You can clone & deploy it to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdigitros%2Fnextjs-fastapi%2Ftree%2Fmain)

## Developing Locally

You can clone this repo with the following command:

```bash
npx create-next-app househackers --example "https://github.com/digitros/nextjs-fastapi"
