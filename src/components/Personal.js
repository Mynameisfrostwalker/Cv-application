import React from "react";
import Inputs from "./Inputs";
import personal from "../styles/personal.module.css";

const Personal = () => (
  <form className={personal.formstyle}>
    <Inputs hfor="photo" kind="file" acc="image/" />
    <Inputs hfor="title" name="" type="select" />
    <Inputs hfor="firstName" kind="text" name="First Name*" req />
    <Inputs hfor="lastName" kind="text" name="Last Name*" req />
    <Inputs hfor="mail" kind="email" name="Email*" req />
    <Inputs hfor="num" kind="tel" name="Phone Number*" req />
    <Inputs hfor="address" type="textarea" name="Home Address*" req />
  </form>
);

export default Personal;
