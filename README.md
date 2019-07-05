# Restaurant Reviews App

Udacity Front-End Web Developer Nanodegree Project 7

## Table of Contents <!-- omit in toc -->

- [Project Overview](#Project-Overview)
- [Specifications](#Specifications)
- [Submission Requirements](#Submission-Requirements)
- [Getting Started](#Getting-Started)
- [Resources](#Resources)
- [Contributing](#Contributing)

## Project Overview

For this project, we are required to incrementally convert a static webpage to a mobile-ready web application.

- Make the app responsive on different sized displays
- Make the app accessible for screen reader use
- Convert to a Progressive Web Application by caching some assets for offline use

## Specifications

Most of the provided code in the starter repository has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future-proofing JavaScript code. Maintain use of ES6 in any additional JavaScript written.

### Make the provided site fully responsive <!-- omit in toc -->

- Bootstrap and other CSS frameworks should not be used; all responsiveness should be done with CSS.
- Use appropriate document type declaration and viewport tags
- Create a responsive grid-based layout using CSS
- Use media queries that provide fluid breakpoints across different screen sizes
- Use responsive images that adjust for the dimensions and resolution of any mobile device

### Make the site accessible <!-- omit in toc -->

- Ensure that `alt` attributes are present and descriptive for images
- Add screen-reader-only attributes when appropriate to add useful supplementary text
- Use semantic markup where possible, and aria attributes when semantic markup is not feasible

### Cache the static site for offline use <!-- omit in toc -->

- Using Cache API and a ServiceWorker, cache the data for the website so that any page (including images) that has been visited is accessible offline
- Only caching needs to be implemented, no other ServiceWorker features

## Submission Requirements

### Project Rubric <!-- omit in toc -->

The project must meet all criteria in the [Restaurant Reviews project rubric](https://review.udacity.com/#!/rubrics/1090/view).

### Style Guidelines <!-- omit in toc -->

The project must adhere to HTML, CSS, JavaScript, and Git style guidelines.

- [HTML Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
- [CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
- [JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
- [Git Style Guide](https://udacity.github.io/git-styleguide/)

## Getting Started

### Download the Starter Code <!-- omit in toc -->

Fork or clone the starter code from [Udacity's "Mobile Web Specialist Restaurant Reviews App: Stage 1" repository](https://github.com/udacity/mws-restaurant-stage-1)

- The `master` branch uses [Mapbox](https://www.mapbox.com/) and will require a [MapBox API key](https://www.mapbox.com/install/)
- The `google-maps` branch uses [Google Maps](https://maps.google.com/) and will require a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

The code in this repository serves as baseline to begin development.

### Install Python <!-- omit in toc -->

If Python is not installed, download from [Python's website](https://www.python.org/) and install the software.

If Python is already installed, check the version: `python -V`

### Spin up a Local Server <!-- omit in toc -->

From inside the local copy of the repository, start up an HTTP client server to serve up the site files on the local computer.

- Python 2.x: `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use)
- Python 3.x: `python -m http.server 8000`

With the server running, visit the site at <http://localhost:8000>, and look around for a bit to see what the current experience looks like.

## Resources

[Color Contrast Analyzer](https://dequeuniversity.com/rules/axe/3.2/color-contrast)

## Contributing

This repository is for a project for the Front-End Web Developer NanoDegree program at Udacity. Therefore, pull requests will not be accepted.
