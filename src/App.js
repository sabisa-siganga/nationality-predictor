import "./App.css";
import Container from "react-bootstrap/Container";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useRef, useEffect } from "react";

// Creating a app that predicts the nationality of a user given a username

function App() {
  // setting states
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const inputRef = useRef();

  /**
   * fetching county id and probability data from nationalize.io API using the fetch function
   * @param {string} event
   */
  const onSubmit = async (event) => {
    // preventing default browser from reloading
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.nationalize.io?name=${username}`
      );

      // converting data to a json object
      const json = await response.json();

      // accessing the  first object from the country array
      const country = json.country[0];
      // updating the data state
      setData(country);

      // error handling
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // auto-focusing input field
    inputRef.current.focus();
  }, []);

  // storing value that is typed by the user
  const onChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Container className="app-container mb-5 mt-5">
      {/* Title of the web app */}
      <h1 className="mb-5 pt-5 pb-3">Nationality predictor</h1>
      <div className="form-field mb-3">
        {/* form containing input field and submit button */}
        <form onSubmit={onSubmit}>
          <InputGroup className="mb-3 input-field">
            {/* input field */}
            <Form.Control
              ref={inputRef}
              placeholder="Please enter your name"
              value={username}
              onChange={onChange}
            />
            {/* submit button */}
            <Button type="submit" className="btn btn-dark">
              Submit
            </Button>
          </InputGroup>
        </form>
      </div>

      <div>
        {/* displaying country id and probability */}
        <p>Country id: {data.country_id} </p>
        <p>Probability: {data.probability} </p>
      </div>
    </Container>
  );
}

export default App;
