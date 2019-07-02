// Defined in dbhelper.js
/* global DBHelper */
// Define global for Leaflet
/* global L */
/* eslint-disable valid-jsdoc */

// eslint-disable-next-line init-declarations
var newMap;

/**
 * Create review HTML and add it to the webpage.
 */
const createReviewHTML = (review) => {
  const name = document.createElement('h3');

  name.innerHTML = review.name;
  name.classList.add('review-name');

  const date = document.createElement('p');

  date.innerHTML = review.date;
  date.classList.add('review-date');

  const nameDate = document.createElement('div');

  nameDate.classList.add('review-name-date');
  nameDate.appendChild(name);
  nameDate.appendChild(date);

  const rating = document.createElement('p');

  rating.innerHTML = `Rating: ${review.rating}`;
  rating.classList.add('review-rating');

  const comments = document.createElement('p');

  comments.innerHTML = review.comments;
  comments.classList.add('review-comments');

  const ratingComments = document.createElement('div');

  ratingComments.classList.add('review-rating-comments');
  ratingComments.appendChild(rating);
  ratingComments.appendChild(comments);

  const li = document.createElement('li');

  li.classList.add('review-container');
  li.appendChild(nameDate);
  li.appendChild(ratingComments);

  return li;
};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
const fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.querySelector('.restaurant-hours');

  for (const key in operatingHours) {
    if ({}.hasOwnProperty.call(operatingHours, key)) {
      const row = document.createElement('tr');
      const day = document.createElement('td');

      day.innerHTML = key;
      row.appendChild(day);

      const time = document.createElement('td');

      time.innerHTML = operatingHours[key];
      row.appendChild(time);

      hours.appendChild(row);
    }
  }
};

/**
 * Create all reviews HTML and add them to the webpage.
 */
const fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.querySelector('.reviews-container');
  const title = document.createElement('h2');

  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');

    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);

    return;
  }
  const ul = document.querySelector('.reviews-list');

  reviews.forEach((review) => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
};

/**
 * Create restaurant HTML and add it to the webpage
 */
const fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.querySelector('.restaurant-name');
  const address = document.querySelector('.restaurant-address');
  const cuisine = document.querySelector('.restaurant-cuisine');
  const image = document.querySelector('.restaurant-img');

  name.innerHTML = restaurant.name;
  address.innerHTML = restaurant.address;
  cuisine.innerHTML = restaurant.cuisine_type;
  image.src = DBHelper.imageUrlForRestaurant(restaurant);

  // Fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // Fill reviews
  fillReviewsHTML();
};

/**
 * Get a parameter by name from page URL.
 */
const getParameterByName = (name, url) => {
  const theUrl = url ? url : window.location.href;
  const theName = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${theName}(=([^&#]*)|&|#|$)`),
    results = regex.exec(theUrl);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Get current restaurant from page URL.
 */
const fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) {
    // Restaurant already fetched!
    callback(null, self.restaurant);

    return;
  }
  const id = getParameterByName('id');

  if (id) {
    DBHelper.fetchRestaurantById(parseInt(id, 10), (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);

        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant);
    });
  } else {
    // Mo id found in URL
    const error = 'No restaurant id in URL';

    callback(error, null);
  }
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
const fillBreadcrumb = (restaurant = self.restaurant) => {
  const breadcrumb = document.querySelector('.breadcrumb');
  const li = document.createElement('li');

  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
};

/**
 * Initialize leaflet map
 */
const initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) {
      console.error(error);
    } else {
      self.newMap = L.map('map', {
        'center': [restaurant.latlng.lat, restaurant.latlng.lng],
        'zoom': 16,
        'scrollWheelZoom': false
      });
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}',
        {
          'mapboxToken': '<your MAPBOX API KEY HERE>',
          'maxZoom': 18,
          'attribution': 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          'id': 'mapbox.streets'
          }).addTo(newMap);
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
};

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  initMap();
});
