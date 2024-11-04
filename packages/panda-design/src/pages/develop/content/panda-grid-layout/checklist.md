1. List all panels in an array and process them [DONE]
2. create column calculation logic for static and dynamic column size (responsive) [DONE]
3. position all panels in the grid with respect to their size [DONE]
4. enable dragging panels to new position [WIP]
5. Create placeholder that indicates new panel position
6. allow panels to be pinned (immovable, fixed size)
7. allow panels to be resized by dragging resize handles
8. create collision and protrusion detection for panels
9. add support for resize for panels so that they reposition colliding panels
10. add support for resize of grid/window
11. testing

// Save the original fetch function
const originalFetch = window.fetch;

// Create a mock fetch function
function mockFetch(response) {
  return function(url, options) {
    return new Promise((resolve) => {
      resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(response),
        text: () => Promise.resolve(JSON.stringify(response)),
      });
    });
  };
}

// Function to restore the original fetch
function restoreFetch() {
  window.fetch = originalFetch;
}