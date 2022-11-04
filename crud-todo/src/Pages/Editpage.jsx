import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getCountries, updateCountry } from "../Redux/action";

export const Editpage = () => {
  const {id} = useParams();
  const countries = useSelector(state => state.countries);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [population, setPopulation] = useState("");
  const navigate = useNavigate()

  
  const updateCountries = () => {
    const payload = {
      city: city,
      population: population,
    };
    dispatch(updateCountry(id, payload)).then(() => {
      dispatch(getCountries());
      navigate("/")
    })
  }

  useEffect(() => {
    if(countries.length === 0){
      dispatch(getCountries());
    }
  }, [countries.length, id])

  useEffect(() => {
    if(id) {
      const countriesById = countries.find((countries) => countries.id === Number(id));
      countriesById && setCity(countriesById.city);
      countriesById && setPopulation(countriesById.population);
    }
  }, [countries, id])
 
 

  return (
    <Box>
      <Heading>Edit Page</Heading>
      <Box>
        <Text>Capital City</Text>
        <Input 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        />
      </Box>
      <Box>
        <Text>Population</Text>
        <Input 
        value={population}
        onChange={(e) => setPopulation(e.target.value)}
        />
      </Box>
      <Button onClick={updateCountries}>Update</Button>
    </Box>
  );
};

export default Editpage;
