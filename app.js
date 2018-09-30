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
                                    .size([1000, 800])
                                    .paddingOuter(10);
            
            // Run sum method on the hierarchy - this traverses the tree and sets .value on each node to the sum of its children
            rootNode.sum((d) => d.value);

            // call treemapLayout and pass in hierachy object
            treemapLayout(rootNode);

            // Define width and height dimensions for SVG element
            const width = 1000;
            const height = 1000;

            // Create SVG element and append to container element. Pass in height and width variables as attributes
            const svg = d3.select(".container")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

            svg.append('g')
              .selectAll('rect')
              .data(rootNode.descendants())
              .enter()
              .append('rect')
              .attr('x', (d) => d.x0)
              .attr('y', (d) => d.y0)
              .attr('width', (d) => d.x1 - d.x0)
              .attr('height', (d) => d.y1 - d.y0)
              .attr("class", "tile")
              .style("fill", (d) => {
                  switch(d.data.category){
                      case 'Wii':
                        return 'orange';
                        break;
                      case 'NES':
                        return 'purple';
                        break;
                      case 'X360':
                        return 'lightgreen';
                        break;
                      case 'PS3':
                        return 'gray';
                        break;
                      case 'GB':
                        return 'pink';
                        break;
                      case 'DS':
                        return 'red';
                        break;
                      case 'PS2':
                        return 'navy';
                        break;
                      case 'PS4':
                        return 'blue';
                        break;
                      case '3DS':
                        return 'darkorange';
                        break;
                      case 'SNES':
                        return 'violet';
                        break;
                      case 'GBA':
                        return 'gold';
                        break;
                      case 'N64':
                        return 'aquamarine';
                        break;
                      case 'PS':
                        return 'aqua';
                        break;
                      case 'XB':
                        return 'green';
                        break;
                      case 'PSP':
                        return 'darkred';
                        break;
                      case 'PC':
                        return 'brown';
                        break;
                      case 'XOne':
                        return 'darkgray';
                        break;
                    default:
                        return 'none';
                  }
              })

            // Create g elements for holding rect labels
            let nodes = d3.select('svg g')
                          .selectAll('g')
                          .data(rootNode.descendants())
                          .enter()
                          .append('g')
                          .attr('transform', (d) => 'translate(' + [d.x0, d.y0] + ')')

                // Create rect elements within g elements to hold text elements
                nodes
                    .append('rect')
                    .attr('width', (d) => d.x1 - d.x0)
                    .attr('height', (d) => d.y1 - d.y0)
                // Create text elements that render the data names as labels to each rect
                nodes
                    .append('text')
                    .attr('dx', 4)
                    .attr('dy', 14)
                    .text((d) => d.data.name)
                    .attr("class", "node-text");










        });
}

