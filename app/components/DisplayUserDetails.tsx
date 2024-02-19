 "use client";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { UserState, fetchUser } from "../store/userSlice";
import { User } from "../Utils/user";
import { Flex, Grid, Loader } from "@mantine/core";

const DisplayUserDetails: FC = () => {
  // Select user data from the Redux store
  const userData = useSelector((state: UserState) => state.user.userData);
  
  // Initialize useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Fetch user data from an external API when component mounts
  useEffect(() => {
    fetchData();
    console.log("useEffect called");
  }, []);

  // Function to fetch user data
  const fetchData = async () => {
    try {
      // Fetch user data from the API
      const data = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await data.json();
      
      // Dispatch action to store fetched user data in Redux store
      dispatch(fetchUser(json));
    } catch (error) {
      // Log error if fetching fails
      console.log("Failed to Fetch");
    }
  };

  return (
    <div style={{ padding: "15px" }}>
      {userData.length > 0 ? ( // If user data is available, display user cards
        <Grid>
          {userData.map((user: User) => (
            <Grid.Col span={3} key={user.id}>
              <UserCard userDetails={user} />
            </Grid.Col>
          ))}
        </Grid>
      ) : ( // If user data is not available, display loader
        <Flex justify="center" align="center">
          <Loader color="blue" type="dots" size="50" />
        </Flex>
      )}
    </div>
  );
};

export default DisplayUserDetails;