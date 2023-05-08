import React from "react";
import "./MapPageCSS.css";
import "./Map.css";
import JsonData from './soilData.json';
import { useState } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import { Chart } from "react-google-charts";


function Map() {

    //table data collection
    const [sarc,setSarc]=useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [row1, setRow1] = useState(0);


    const handleSearch = () => {
        const results = JsonData.filter((info) => info.District.toLowerCase().includes(sarc.toLowerCase()));
        setSearchResults(results);
        // check();
        setRow1(0);
        setRow(1);
        setX(searchResults[row1].Lat);
        setY(searchResults[row1].Long);
    }
    const [row, setRow] = useState(0);



    //map data collection
    const [x, setX] = useState(25.3176);
    const [y, setY] = useState(82.9739);
    // const check = () => {
    //     setX(searchResults[row1].Lat);
    //     setY(searchResults[row1].Long);
    // }

    if (searchResults.length > 0)
        console.log()

    const changer=(event)=>{
        setSarc(event.target.value);
    }    

    const storeValue = () => {
        // sarc = document.getElementById("wow").value;
        handleSearch();
    }

    var pushedPins = [];
    let size = JsonData.filter(no => no.Lat).length;
    for (let i = 0; i < size; i++) {
        var obj = { "location": [Number(JsonData.filter(info => info.Lat)[i].Lat), Number(JsonData.filter(info => info.Long)[i].Long)] };
        pushedPins.push(obj);
    }

    //charts data


    const increment = () => {

        if (searchResults.length === 1) {
            setRow1(0);
        }
        else if ((row1) < (searchResults.length-1))
            setRow1(row1 + 1);

        if (searchResults.length > 0 && row <= searchResults.length - 1)
            setRow(row + 1);

        setX(searchResults[row1].Lat);
        setY(searchResults[row1].Long);
        console.log(row1);
    }

    var data = [["Grain", "Grain-Size"], ["Clay", 0], ["Silt", 0], ["Sand", 0], ["Gravel", 0]];

    if (searchResults.length > 0) {
        data = [
            ["Grain", "Grain-Size"],
            ["Clay", searchResults[row1].Clay],
            ["Silt", searchResults[row1].Silt],
            ["Sand", searchResults[row1].Sand],
            ["Gravel", searchResults[row1].Gravel]]
    }

    // searchResults.map(info => (data = [
    //     ["Grain", "Grain-Size"],
    //     ["Clay", info.Clay],
    //     ["Silt", info.Silt],
    //     ["Sand", info.Sand],
    //     ["Gravel", info.Gravel]]));


    var length = 0;

    if (searchResults.length > 0) {
        length = searchResults.length;
    }


    var data1 = [
        ["Percentages", "PI", "PL", "LL"],
        ["Water Content", 0, 0, 0]
    ];

    if (searchResults.length > 0) {
        data1 = [
            ["Percentages", "PI", "PL", "LL"],
            ["Water Content", searchResults[row1].PI + "%", searchResults[row1].PL + "%", searchResults[row1].LL + "%"]
        ];
    }
    // searchResults.map(info => (data1 = [
    //     ["Percentages", "PI", "PL", "LL"],
    //     ["Water Content", info.PI + "%", info.PL + "%", info.LL + "%"]
    // ]));
    const options = {
        is3D: true,
    };

    return (
        <React.Fragment>
            <section>
                <div className="layout">

                    <div className="headerMap">
                        <h1> GEO-Map</h1>
                    </div>

                    <div className="search">
                        <div className="search_map">
                            <h1>Enter District Name:</h1>
                            <input type="text" id="wow" onChange={changer}/>
                            <button type="button" onClick={storeValue}>Search</button><br /><br />





                            <p>Connect with us to add more data: </p>
                            <form action="mailto:ayush.6678@gmail.com" method="post" enctype="text/plain">
                                <button type="submit" style={{ background: "rgba(008, 190, 90, 0.798)" }}>Send Message</button>
                            </form>
                        </div>

                    </div>

                    <div className="mapView" >
                        <ReactBingmaps className="bingo"
                            bingmapKey="AgaRhISouVb1XQzV92toHCqtyha3x9Otm-I4JYjKfWqdE_B4_2_h3M1SXd0XSY0x"
                            center={[x, y]}
                            zoom={15}
                            mapTypeId={"aerial"}
                            pushPins={pushedPins}
                        >
                        </ReactBingmaps>
                    </div>

                    <div className="tableView">


                        <p>Row {row} of {length}: <button type="button" onClick={() => increment()}>Next</button></p>


                        <div className="table-wrapper">
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Pincode</th>
                                        <th>Village</th>
                                        <th>District</th>
                                        <th>State</th>
                                        <th>Cu</th>
                                        <th>CC</th>
                                        <th>GroupSymbol</th>
                                        <th>OMC</th>
                                        <th>MDD</th>
                                        <th>MIN</th>
                                        <th>MAX</th>
                                        <th>SpecficGravity</th>
                                    </tr>
                                </thead>

                                {searchResults.map(info => (
                                    <tr key={info}>
                                        <td>{info.Pincode}</td>
                                        <td>{info.Village}</td>
                                        <td>{info.District}</td>
                                        <td>{info.State}</td>
                                        <td>{info.Cu}</td>
                                        <td>{info.Cc}</td>
                                        <td>{info.GroupSymbol}</td>
                                        <td>{info.OMC}</td>
                                        <td>{info.MDD}</td>
                                        <td>{info.MIN}</td>
                                        <td>{info.MAX}</td>
                                        <td>{info.SpecficGravity}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>

                    </div>


                    <div className="chartsView1">
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="400px"
                            data={data1}
                        />
                    </div>


                    <div className="chartsView2">
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                        />
                    </div>

                </div>
            </section>
        </React.Fragment>
    )
}

export default Map;