# CS5610_Self_Assessment02
Airbnb Listings Mini Project

This is a mini web project that displays the top 50 Airbnb listings in San Francisco using Bootstrap for styling and JavaScript for rendering.
The project demonstrates how to:
Fetch data from a local JSON file
Dynamically generate Bootstrap cards with listing information (image, title, description, price, host, amenities)
Handle broken/missing images with a fallback
Keep the layout consistent using object-fit: cover for images
Add a floating “Back to Top” capsule button for better user experience

Features
📊 Dynamic data loading: Listings are fetched from airbnb_sf_listings_500.json.
🏠 Card layout: Each listing shows its image, name, price per night, short description, host name & thumbnail, and top amenities.
📱 Responsive design: Cards adapt to different screen sizes with Bootstrap grid.
🖼 Image handling: All listing images are cropped to the same height; broken images display a default placeholder.
🔝 Back-to-top button: A capsule-shaped floating button makes navigation easier on long pages.

How to Run
Because fetch() does not work with file://, you must run the project on a local web server:

Option 1: VS Code Live Server
Install the Live Server extension.
Right-click index.html → “Open with Live Server”.
The project opens at http://127.0.0.1:5500/.

Option 2: Python (built-in)
cd project
python3 -m http.server 8080
Then open http://localhost:8080.

Demo Preview
Main page: Shows header, sample intro text, and Airbnb listings in a grid.
Cards: Each includes listing image, title, description, price, amenities, host details.
Back-to-top button: Appears after scrolling 200px, smooth scrolls to top.

Future Improvements
Add filters (by neighborhood, price range, or rating).
Include search functionality.
Display star ratings directly on cards.
Use real API calls instead of static JSON.
