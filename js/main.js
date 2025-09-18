function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);

  function stripHtml(html = "") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  function truncate(text = "", max = 200) {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const last = cut.lastIndexOf(" ");
    return (last > 0 ? cut.slice(0, last) : cut) + "…";
  }

  function parseAmenities(raw) {
    try {
      return Array.isArray(raw) ? raw : JSON.parse(raw || "[]");
    } catch {
      return [];
    }
  }

  function getListingCode(listing) {
    const img = listing.picture_url || "";
    const url = listing.listing_url || "#";
    const title = listing.name || "Airbnb Listing";
    const desc = truncate(stripHtml(listing.description || ""), 220);
    const price = (listing.price || "").replace(/\.00$/, "");
    const hostName = listing.host_name || "Host";
    const hostThumb = listing.host_thumbnail_url || "";

    const amenities = parseAmenities(listing.amenities);
    const shown = amenities.slice(0, 6);
    const moreCount = Math.max(amenities.length - shown.length, 0);

    return `
  <div class="col-4">
    <div class="listing card h-100 shadow-sm">
      <a href="${url}" class="text-decoration-none" target="_blank" rel="noopener">
        <img src="${img}" 
     class="card-img-top" 
     alt="${title}" 
     loading="lazy"
     onerror="this.onerror=null;this.src='images/placeholder.jpg';">

      </a>

      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-2">${title}</h5>
        <div class="text-muted mb-2">${price ? `${price}/night` : ""}</div>

        <p class="card-text text-muted small mb-3">${desc}</p>

        <!-- Amenities -->
        <div class="d-flex flex-wrap gap-2 mb-3">
          ${shown.map((a) => `<span class="badge text-bg-light border">${a}</span>`).join("")}
          ${moreCount > 0 ? `<span class="badge text-bg-secondary">+${moreCount} more</span>` : ""}
        </div>

        <!-- Host row: name + thumbnail to the right -->
        <div class="small mt-auto pt-2 border-top d-flex align-items-center">
          <span>
            Host: <strong>${hostName}</strong>
            ${hostThumb ? `<img src="${hostThumb}" alt="${hostName} photo" width="28" height="28" class="rounded-circle align-middle ms-2" loading="lazy">` : ""}
          </span>
        </div>
      </div>

      <div class="card-footer bg-white d-flex justify-content-end">
        <a href="${url}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">View</a>
      </div>
    </div>
  </div>`;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  // Show/hide button on scroll
  window.addEventListener("scroll", () => {
    const btn = document.getElementById("backToTopBtn");
    if (document.documentElement.scrollTop > 200) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  // Scroll to top on click
  document.getElementById("backToTopBtn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();

    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();

main.loadData();
