// get the JSON data from URL using fetch request method
fetch('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json')
    .then((response) => response.json())
    .then(
        (data) => {
            const root = d3.hierarchy(data);
            console.log(root)
        });