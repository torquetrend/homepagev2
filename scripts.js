"use strict";

// Debounce function to improve search performance
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Enhanced search function with debouncing and input sanitization
function searchFunction() {
    const query = sanitizeInput(document.getElementById("search-bar").value.toLowerCase());
    const resultsContainer = document.getElementById("search-results");

    if (resultsContainer) {
        resultsContainer.innerHTML = `Searching for "${query}"... (Feature in development)`;
    }
}

// Debounced version of the search function
const debouncedSearch = debounce(searchFunction, 300);

// Sidebar and Hamburger Menu Toggle
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const hamburgerMenu = document.querySelector(".hamburger-menu");

    // Toggle 'active' class on both sidebar and hamburger menu
    const isActive = sidebar.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");

    // Update ARIA attributes for accessibility
    hamburgerMenu.setAttribute("aria-expanded", isActive);
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input) {
    const temp = document.createElement("div");
    temp.textContent = input;
    return temp.innerHTML;
}

// Event listener to toggle the sidebar and hamburger menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', toggleSidebar);
}

// Performance enhancements: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const loadImage = (image) => {
        image.setAttribute("src", image.getAttribute("data-src"));
        image.onload = () => image.removeAttribute("data-src");
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach((image) => {
        imageObserver.observe(image);
    });
}

document.addEventListener("DOMContentLoaded", lazyLoadImages);
