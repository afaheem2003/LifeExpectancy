function createMap(value, bool) {
  let slider_steps = [];
  let frames = [];
  let output;


  let n = 0;
  let year = 1987;
  let measure = value;
  while (n < 23) {
    let zvalues = [];
    let years = [];
    let states = [];
    let fipscodes = [];
    let counties = [];

    for (let i = n; i < output.length; i += 23) {
      zvalues.push(parseInt(output[i][measure]));

      years.push(output[i].Year);
      states.push(output[i].State);
      counties.push(output[i].County);
      if (output[i].fips.length < 5) {

        fipscodes.push("0" + output[i].fips);
      } else {
        fipscodes.push(output[i].fips);
      }
    }
    frames[n] = {
      data: [{
        z: zvalues,
        locations: fipscodes,
        text: counties
      }],
      name: year.toString()
    };

    slider_steps.push({
      label: year.toString(),
      method: "animate",
      args: [
        [year], {
          mode: "immediate",
          transition: {
            duration: 1000
          },
          frame: {
            duration: 1000
          }
        }
      ]
    });
    n++;
    year++;
  }

  let data = [];
  if (bool === true) {
    data = [{
      type: "choroplethmapbox",
      locations: frames[0].data[0].locations,
      z: frames[0].data[0].z,
      text: frames[0].data[0].text,
      geojson: "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json",
      zmin: 54,
      zmax: 88,
      colorbar: {
            title: 'Life<br>Expectancy',
        }
    }];
  } else {
    data = [{
      type: "choroplethmapbox",
      locations: frames[0].data[0].locations,
      z: frames[0].data[0].z,
      text: frames[0].data[0].text,
      geojson: "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json"
    }];
  }


  let layout = {};
  if (bool === true) {
    layout = {
      paper_bgcolor: "rgba(0,0,0,0)",
      mapbox: {
        center: {
          lon: -98.5795,
          lat: 39.8283
        },
        zoom: 3.2
      },
      width: 1400,
      height: 800,
      title: value,
      updatemenus: [{
        x: 0.1,
        y: 0,
        yanchor: "top",
        xanchor: "right",
        showactive: false,
        direction: "left",
        type: "buttons",
        pad: {
          "t": 87,
          "r": 10
        },
        buttons: [{
          method: "animate",
          args: [null, {
            fromcurrent: true,
            transition: {
              duration: 1000,
            },
            frame: {
              duration: 1000
            }
          }],
          label: "Play"
        }, {
          method: "animate",
          args: [
            [null],
            {
              mode: "immediate",
              transition: {
                duration: 0
              },
              frame: {
                duration: 0
              }
            }
          ],
          label: "Pause"
        }]
      }],
      sliders: [{
        active: 0,
        steps: slider_steps,
        x: 0.1,
        len: 0.9,
        xanchor: "left",
        y: 0,
        yanchor: "top",
        pad: {
          t: 50,
          b: 10
        },
        currentvalue: {
          visible: true,
          prefix: "Year:",
          xanchor: "right",
          font: {
            size: 20,
            color: "#666"
          }
        },
        transition: {
          duration: 1000,
          easing: "cubic-in-out"
        }
      }],
    };
  } else {
    layout = {
      paper_bgcolor: "rgba(0,0,0,0)",
      mapbox: {
        center: {
          lon: -98.5795,
          lat: 39.8283
        },
        zoom: 3.2
      },
      width: 1400,
      height: 800,
      title: value
    };
  }
}



createMap("Male life expectancy (years)", true);

function switchMap(phrase) {
  if (phrase.includes("change")) {
    createMap(phrase, false);
  } else {
    createMap(phrase, true);
  }
}

switchMap();
