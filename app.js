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
                                    .paddingOuter(5);
            
            // Run sum method on the hierarchy - this traverses the tree and sets .value on each node to the sum of its children
            rootNode.sum((d) => d.value);

            // call treemapLayout and pass in hierachy object
            treemapLayout(rootNode);

            // Define width and height dimensions for SVG element
            const width = 1000;
            const height = 800;

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
              .attr("data-name", (d) => d.data.name)
              .attr("data-category", (d) => d.data.category)
              .attr("data-value", (d) => d.data.value)
              // Color code each rect element according to category
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

              // LEGEND
              let legend = d3.select('.container')
                             .append('svg')
                             .attr('width', 1300)
                             .attr('height', 600)
                             .attr('id', 'legend');

                  // Create rect elements for legend
                  // Row 1
                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr("class", "legend-item")
                        .style('fill', 'orange');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 70)
                        .attr('y', 30)
                        .text('Wii');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 0)
                        .attr('y', 50)
                        .attr("class", "legend-item")
                        .style('fill', 'purple');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 70)
                        .attr('y', 80)
                        .text('NES');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 0)
                        .attr('y', 100)
                        .attr("class", "legend-item")
                        .style('fill', 'lightgreen');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 70)
                        .attr('y', 130)
                        .text('X360');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 0)
                        .attr('y', 150)
                        .attr("class", "legend-item")
                        .style('fill', 'gray');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 70)
                        .attr('y', 180)
                        .text('PS3');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 0)
                        .attr('y', 200)
                        .attr("class", "legend-item")
                        .style('fill', 'pink');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 70)
                        .attr('y', 230)
                        .text('GB');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 0)
                        .attr('y', 250)
                        .attr("class", "legend-item")
                        .style('fill', 'red');
                        
                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 70)
                        .attr('y', 280)
                        .text('DS');
                
                // Row 2        
                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 300)
                        .attr('y', 0)
                        .attr("class", "legend-item")
                        .style('fill', 'navy');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 370)
                        .attr('y', 30)
                        .text('PS2');
                
                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 300)
                        .attr('y', 50)
                        .attr("class", "legend-item")
                        .style('fill', 'blue');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 370)
                        .attr('y', 80)
                        .text('PS4');
                        
                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 300)
                        .attr('y', 100)
                        .attr("class", "legend-item")
                        .style('fill', 'darkorange');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 370)
                        .attr('y', 130)
                        .text('3DS');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 300)
                        .attr('y', 150)
                        .attr("class", "legend-item")
                        .style('fill', 'violet');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 370)
                        .attr('y', 180)
                        .text('SNES');
                        
                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 300)
                        .attr('y', 200)
                        .attr("class", "legend-item")
                        .style('fill', 'gold');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 370)
                        .attr('y', 230)
                        .text('GBA');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 300)
                        .attr('y', 250)
                        .attr("class", "legend-item")
                        .style('fill', 'aquamarine');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 370)
                        .attr('y', 280)
                        .text('N64');

                // Row 3
                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 600)
                        .attr('y', 0)
                        .attr("class", "legend-item")
                        .style('fill', 'aqua');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 670)
                        .attr('y', 30)
                        .text('PS');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 600)
                        .attr('y', 50)
                        .attr("class", "legend-item")
                        .style('fill', 'green');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 670)
                        .attr('y', 80)
                        .text('XB');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 600)
                        .attr('y', 100)
                        .attr("class", "legend-item")
                        .style('fill', 'darkred');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 670)
                        .attr('y', 130)
                        .text('PSP');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 600)
                        .attr('y', 150)
                        .attr("class", "legend-item")
                        .style('fill', 'brown');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 670)
                        .attr('y', 180)
                        .text('PC');

                  legend.append('rect')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', 600)
                        .attr('y', 200)
                        .attr("class", "legend-item")
                        .style('fill', 'darkgray');

                  legend.append('text')
                        .attr('width', 200)
                        .attr('height', 50)
                        .attr('x', 670)
                        .attr('y', 230)
                        .text('XOne');
        });
}

