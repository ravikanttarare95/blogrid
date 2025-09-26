import React, { useEffect, useState } from "react";
import Logo from "./../../public/logo.png";
import { useParams } from "react-router";
import axios from "axios";

function ReadBlog() {
  return (
    <>
      <div className="bg-amber-50">
        <img src={Logo} alt="Blog Image" className="w-100 mx-auto" />
      </div>
    </>
  );
}

export default ReadBlog;
