import {
  Box,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Button, 
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { deleteProduct, getCountries } from "../Redux/action";


const Homepage = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState();
  const location = useLocation();


  useEffect(() => {
    if(location || countries.length === 0){
      const sortBy = searchParams.get("sortBy")
      let getCountriesParams = {
        params: {
          _sort: sortBy && "population",
          _order: sortBy
        }
      }
      // console.log(getCountriesParams)
      dispatch(getCountries(getCountriesParams));
    }
  }, [location.search])

  const handleSort = (e) => {
    setSortBy(e.target.value)
  }

  useEffect(() => {
    if(sortBy){
      let params = {};
      sortBy && (params.sortBy = sortBy)
      console.log(params)
      setSearchParams(params)
    }
  },[sortBy, setSearchParams])

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
    .then(() => {
      dispatch(getCountries());
    })
  }
 
  
  return (
    <Box>
      <Heading align={"center"}>Contries Table</Heading>
      <Flex padding="0 1rem" mb="2rem">
        <Text fontWeight="700" paddingRight="1rem">
          Sort by country population
        </Text>
        <RadioGroup>
          <Stack direction="row" onChange={handleSort}>
            <Radio data-cy="asc" defaultChecked={sortBy === 'asc'} value="asc">Ascending</Radio>
            <Radio data-cy="desc" defaultChecked={sortBy === 'desc'} value="desc" >Descending</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Country</Th>
              <Th>Capital</Th>
              <Th>Population</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* map through the fetched country list, to form table rows */}
            
            {countries.map(item => 
             (
              <Tr id={item.id}>
              <Td>{item.country}</Td>
              <Td>{item.city}</Td>
              <Td>{item.population}</Td>
              <Td>
                <Link to={`/country/${item.id}`}>Edit</Link>
              </Td>
              <Td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </Td>
            </Tr>
             )
            
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Homepage;
