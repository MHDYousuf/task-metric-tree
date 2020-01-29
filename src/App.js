import React from "react";
import "./App.css";
function App() {
  let inclusions = [];
  let exclusions = [];
  let highlight = fetch("./data/highlight.json")
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err));
  let data_file = fetch("./data/data_file.json")
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err));
  data_file.then(data => {
    highlight.then(highlighted => {
      let annotations = highlighted.map(item => {
        return item.annotations.annotations;
      });
      for (const [key, value] of annotations.entries()) {
        inclusions.push(value.encounters.inclusion); // added elements to the inclusion variable
        exclusions.push(value.encounters.exclusion);
      }

      inclusions = [].concat.apply([], inclusions);
      exclusions = [].concat.apply([], exclusions); // merged arrays of arrays into single array
      inclusions = [...new Set(inclusions)]; //removed duplicates from inclusion
      exclusions = [...new Set(exclusions)]; //removed duplicates from exclusion

      console.log(data);
      console.log(inclusions);
      for (let value of Object.values(data.deIdentifiedFile)) {
        if (inclusions.indexOf(value) >= 0) console.log(value);
      }
    });
  });
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
