import React, { useState, useEffect } from "react";
function App() {
  const [datafile, setdatafile] = useState({});
  const [highlightfile, sethighlightfile] = useState([]);
  const [inclusions, setinclusions] = useState([]);
  const [empty, setempty] = useState(true);
  async function fetchingApi() {
    //fetching data_file
    let response1 = await fetch("./data/data_file.json");
    response1 = await response1.json();
    setdatafile(response1);

    //fetching highlight file
    let response2 = await fetch("./data/highlight.json");
    response2 = await response2.json();
    sethighlightfile(response2);
  }
  useEffect(() => {
    fetchingApi();
  }, []);
  console.log(datafile);
  console.log(highlightfile);

  let inclusion = new Set();
  highlightfile.map(item => {
    let { annotations } = item.annotations;
    for (let i of Object.values(annotations)) {
      if (i.inclusion.length !== 0) {
        // console.log(i.inclusion);
        for (let j of i.inclusion) {
          inclusion.add(j);
        }
      }
    }
  });

  return (
    <div className="App">
      <table style={{ width: "100%" }}>
        <thead>
          <tr></tr>
        </thead>
      </table>
    </div>
  );
}

// let highlight = fetch("./data/highlight.json")
//   .then(res => res.json())
//   .then(data => data)
//   .catch(err => console.error(err));

// let data_file = fetch("./data/data_file.json")
//   .then(res => res.json())
//   .then(data => data)
//   .catch(err => console.error(err));

// data_file.then(data => {
//   highlight.then(highlighted => {
//     let annotations = highlighted.map(item => {
//       return item.annotations.annotations;
//     });
//     for (const [key, value] of annotations.entries()) {
//       inclusions.push(value.encounters.inclusion); // added elements to the inclusion variable
//       exclusions.push(value.encounters.exclusion);
//     }

//     inclusions = [].concat.apply([], inclusions);
//     exclusions = [].concat.apply([], exclusions); // merged arrays of arrays into single array
//     inclusions = [...new Set(inclusions)]; //removed duplicates from inclusion
//     exclusions = [...new Set(exclusions)]; //removed duplicates from exclusion

//     console.log(data);
//     console.log(inclusions);
//     console.log(exclusions);
//     // for (let value of Object.values(data.deIdentifiedFile)) {
//     //   if (inclusions.indexOf(value) >= 0) console.log(value);
//     // }
//   });
// });
// const something = data_file.then(data => {
//   let main;
//   for (var key in data.deIdentifiedFile) {
//     // if (data.deIdentifiedFile.hasOwnProperty(key)) {
//     //   while (typeof data.deIdentifiedFile[key] === "object") {
//     //     var files = data.deIdentifiedFile[key];
//     //     for (var key in files) {
//     //       if (files.hasOwnProperty(key)) {
//     //         console.log(key + " -> " + files[key]);
//     //       }
//     //     }
//     //   }
//     // console.log(key + " -> " + data.deIdentifiedFile[key]);
//     heading.push(key);
//   }
//   main = JSON.parse(JSON.stringify(data.deIdentifiedFile.file));
//   return main;
// });
// const [data1, setdata1] = useState();
// useEffect(() => {
//   something.then(data => {
//     setdata1(data);
//   });
//   return () => {};
// }, []);
// console.log(data1);

export default App;
