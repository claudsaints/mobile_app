import React from "react";
import { HomeStackNavigation } from "./src/Routes/Home.Routes";
import {NavigationContainer, } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <HomeStackNavigation/>
      </NavigationContainer>
    </>
  );
}
