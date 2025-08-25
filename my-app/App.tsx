import React from "react";
import { HomeDrawerNavigation } from "./src/Routes/Home.Routes";
import {NavigationContainer, } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <HomeDrawerNavigation/>
      </NavigationContainer>
    </>
  );
}
