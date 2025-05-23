import React from "react";
import "./MapPageCSS.css";
import "./Map.css";
import JsonData from './soilData.json';
import { useState, useEffect } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import { Chart } from "react-google-charts";
import { FaChevronDown, FaChevronUp, FaSearch, FaEnvelope, FaArrowRight } from 'react-icons/fa';

function Map() {
    // State for collapsible sections
    const [isMapCollapsed, setIsMapCollapsed] = useState(false);
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);
    const [isChartsCollapsed, setIsChartsCollapsed] = useState(false);

    //table data collection
    const [sarc, setSarc] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [row1, setRow1] = useState(0);
    const [row, setRow] = useState(0);

    const [x, setX] = useState(25.3176);
    const [y, setY] = useState(82.9739);

    const handleSearch = () => {
        const results = JsonData.filter((info) => info.District.toLowerCase().includes(sarc.toLowerCase()));
        setSearchResults(results);
        setRow1(0);
        setRow(1);

        if (results.length > 0 && results[0].Lat !== "" && results[0].Long !== "") {
            setX(results[0].Lat);
            setY(results[0].Long);
        }
    }

    //map data collection
    const [pushedPins, setPushedPins] = useState([]);

    useEffect(() => {
        let size = JsonData.filter(no => no.Lat).length;
        for (let i = 0; i < size; i++) {
            let obj = { "location": [Number(JsonData.filter(info => info.Lat)[i].Lat), Number(JsonData.filter(info => info.Long)[i].Long)] };
            setPushedPins((e) => [...e, obj]);
        }
    }, [])

    //charts data
    const increment = () => {
        if (searchResults.length === 1) {
            setRow1(0);
        }
        else if ((row1) < (searchResults.length - 1))
            setRow1(row1 + 1);

        if (searchResults.length > 0 && row <= searchResults.length - 1)
            setRow(row + 1);

        setX(searchResults[row1].Lat);
        setY(searchResults[row1].Long);
    }

    const [data, setData] = useState([["Grain", "Grain-Size"], ["Clay", 0], ["Silt", 0], ["Sand", 0], ["Gravel", 0]]);
    const [length, setLength] = useState(0);
    const [data1, setData1] = useState([
        ["Percentages", "PI", "PL", "LL"],
        ["Water Content", 0, 0, 0]
    ]);

    useEffect(() => {
        if (searchResults.length > 0) {
            setData([
                ["Grain", "Grain-Size"],
                ["Clay", searchResults[row1].Clay],
                ["Silt", searchResults[row1].Silt],
                ["Sand", searchResults[row1].Sand],
                ["Gravel", searchResults[row1].Gravel]]);

            setLength(searchResults.length);

            setData1([
                ["Percentages", "PI", "PL", "LL"],
                ["Water Content", searchResults[row1].PI + "%", searchResults[row1].PL + "%", searchResults[row1].LL + "%"]
            ]);
        }
    }, [searchResults, row1]);

    const options = {
        is3D: true,
        backgroundColor: 'transparent',
        legend: { textStyle: { color: '#333', fontSize: 12 } },
        chartArea: { width: '80%', height: '80%' }
    };

    const barChartOptions = {
        backgroundColor: 'transparent',
        chartArea: { width: '80%', height: '70%' },
        hAxis: { textStyle: { color: '#333' } },
        vAxis: { textStyle: { color: '#333' } },
        legend: { textStyle: { color: '#333', fontSize: 12 } }
    };

    return (
        <div className="layout">
            <div className="headerMap">
                <h1>GEO-Map</h1>
            </div>

            <div className="search">
                <div className="search_map">
                    <h1>Enter District Name</h1>
                    <div className="search-input-container">
                        <input 
                            type="text" 
                            id="wow" 
                            onChange={(e) => { setSarc(e.target.value) }} 
                            value={sarc}
                            placeholder="Search by district..."
                        />
                        <button type="button" onClick={handleSearch} className="search-button">
                            <FaSearch /> Search
                        </button>
                    </div>

                    <div className="contact-section">
                        <p>Connect with us to add more data: </p>
                        <form action="mailto:ayush.6678@gmail.com" method="post" encType="text/plain">
                            <button type="submit" className="contact-button">
                                <FaEnvelope /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="section-header" onClick={() => setIsMapCollapsed(!isMapCollapsed)}>
                <h2>Map View</h2>
                {isMapCollapsed ? <FaChevronDown /> : <FaChevronUp />}
            </div>

            {!isMapCollapsed && (
                <div className="mapView">
                    <ReactBingmaps className="bingo"
                        bingmapKey="AgaRhISouVb1XQzV92toHCqtyha3x9Otm-I4JYjKfWqdE_B4_2_h3M1SXd0XSY0x"
                        center={[x, y]}
                        zoom={15}
                        mapTypeId={"aerial"}
                        pushPins={pushedPins}
                    >
                    </ReactBingmaps>
                </div>
            )}

            <div className="section-header" onClick={() => setIsTableCollapsed(!isTableCollapsed)}>
                <h2>Data Table</h2>
                {isTableCollapsed ? <FaChevronDown /> : <FaChevronUp />}
            </div>

            {!isTableCollapsed && (
                <div className="tableView">
                    <div className="table-controls">
                        <p>Row {row} of {length}</p>
                        <button type="button" onClick={() => increment()} className="next-button">
                            Next <FaArrowRight />
                        </button>
                    </div>

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
                            <tbody>
                                {searchResults.map((info, index) => (
                                    <tr key={index}>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="section-header" onClick={() => setIsChartsCollapsed(!isChartsCollapsed)}>
                <h2>Data Visualization</h2>
                {isChartsCollapsed ? <FaChevronDown /> : <FaChevronUp />}
            </div>

            {!isChartsCollapsed && (
                <div className="charts-container">
                    <div className="chartsView1">
                        <h3>Water Content Analysis</h3>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="400px"
                            data={data1}
                            options={barChartOptions}
                        />
                    </div>

                    <div className="chartsView2">
                        <h3>Soil Composition</h3>
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Map;