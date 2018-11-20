// import './index.css';

// import numeral from 'numeral';

// const courseValue = numeral(1000).format('$0,0.00');

// console.log(`I would pay ${courseValue} for this awesome course`);
// import $ from 'jquery';

import {getUsers, deleteUser} from './api/userApi';

// main.js

var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
// make Isotope a jQuery plugin
jQueryBridget( 'isotope', Isotope, $ );
// now you can use $().isotope()
$('.grid').isotope({
  itemSelector: '.grid-item',
  masonry: {
    columnWidth: 100
  }
});

// Populate table of users via API call

// external js: isotope.pkgd.js

// $('.grid').isotope({
//   itemSelector: '.grid-item',
//   masonry: {
//     columnWidth: 100
//   }
// });

// $(document).ready(
//   alert('jquery');
// )
// $('#users').css('background', 'blue');

getUsers().then(result => {
  let usersBody = "";
  console.log(result);


  result.forEach(user => {
    usersBody += `<tr>
    <td><a href="#" data-id="${user.id}" class='deleteUser'>Delete</a></td>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.email}</td>
    </tr>
    `
  });
  global.document.getElementById('users').innerHTML = usersBody;

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  // Using array.from to create a real array from a DOM collection
  // getElementsByCalssname only returns an 'arry like' object.

  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
