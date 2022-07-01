import { useEffect } from "react";
import { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import sunny from '../sunny.jpg'
import snowy from '../snowy.jpg'
import { ArrowDown } from 'react-bootstrap-icons';
import { ArrowUp } from 'react-bootstrap-icons';

const Search = () => {
    const [search, setSearch] = useState("");
    const [details, setDetails] = useState([]);

  /*   useEffect(() => {
        fetchWeather("berlin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 */
    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=079045f2fbbdb941bef49889f122240f`
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setDetails(data);
                console.log(details);
            } else {
                console.log("ERROR!!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-bar mb-3"
                            placeholder="Search a City!"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <button onClick={fetchWeather}>Search</button>
                    </div>
                    </Row>
                
                { details.main && (
                
                    <div className="result mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <Card className="bg-light text-dark text-center card">
                                <Card.Img src={details.main.temp > 291 ?{sunny} : {snowy}} style={{height: "500px"}} alt="..." className="bg-image"/>
                                    <Card.ImgOverlay>
                                        <Card.Title><p className="city-name">{details.name}</p></Card.Title>
                                        <Card.Text className="temp">
                                        {(details.main.temp - 273.15).toFixed(0)} ºC
                                        </Card.Text>
                                        <Card.Text className="type">{details.weather[0].main}</Card.Text>
                                        <Row className="max-min">
                                            <Col md={6}><ArrowUp/>{Math.floor(details.main.temp_max - 273.15)}ºC</Col>
                                            <Col md={6}><ArrowDown/>{Math.floor(details.main.temp_min - 273.15)}ºC</Col>
                                        </Row>
                                    </Card.ImgOverlay>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            
        </Container>
    );
};

export default Search;
