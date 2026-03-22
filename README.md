# Frontend Mentor - E-commerce product page solution

This is a solution to the E-commerce product page challenge on Frontend Mentor.  
This project helped me practice building a responsive product page with interactive UI components such as an image gallery, cart functionality, and a lightbox viewer.

## Table of contents

- [Frontend Mentor - E-commerce product page solution](#frontend-mentor---e-commerce-product-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![Design preview for the E-commerce product page coding challenge](./Screenshot-project.png)

### Links

- Solution URL: [GitHub Repository](https://github.com/Mugisho-dev-metasploit/-E-commerce-Product-Page-challeger-Frontend-Mentor)
- Live Site URL: [Live Site Demo](https://mugisho-dev-metasploit.github.io/-E-commerce-Product-Page-challeger-Frontend-Mentor/)

## My process

### Built with

- Semantic HTML5
- CSS3
- Flexbox
- CSS Grid
- Mobile-first responsive design
- Vanilla JavaScript
- Accessibility best practices

### What I learned

During this project, I improved my skills in responsive web design and interactive UI development using Vanilla JavaScript.
Specifically, I implemented a dynamic product image gallery with thumbnails and a lightbox viewer for desktop users.

I also practiced writing clean logic for state management, such as cart interactions, item counting, and dynamic updates to the DOM.

Here is an example of the image switching logic:

```js
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    // Remove active class from all thumbnails
    thumbnails.forEach((t) => t.classList.remove("active"));

    // Add active class to clicked thumbnail
    this.classList.add("active");

    // Update main image source
    const newImageSrc = this.getAttribute("data-image");
    mainImage.src = newImageSrc;
  });
});
```

## Author

- Name - mugisho ntashara
- GitHub - [@Mugisho-dev-metasploit](https://github.com/Mugisho-dev-metasploit)
