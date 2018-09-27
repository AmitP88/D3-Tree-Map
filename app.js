const getData = () => {
// get the JSON data from URL using fetch request method
fetch('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json')
    .then((response) => response.json())
    .then(
        (data) => {
            // D3 requires hierarchial data to be in the form of a d3.hierarchy object
            const rootNode = d3.hierarchy(data);

            // Created treemap layout using D3's treemap method
            const treemapLayout = d3.treemap()
                                    .size([400, 200])
                                    .paddingOuter(10);
            
            // Run sum method on the hierarchy - this traverses the tree and sets .value on each node to the sum of its children
            rootNode.sum((d) => d.value);

            // call treemapLayout and pass in hierachy object
            treemapLayout(rootNode);

            d3.select('svg g')
              .selectAll('rect')
              .data(rootNode.descendants())
              .enter()
              .append('rect')
              .attr('x', (d) => d.x0)
              .attr('y', (d) => d.y0)
              .attr('width', (d) => d.x1 - d.x0)
              .attr('height', (d) => d.y1 - d.y0);

            console.log(rootNode);

        });
}

