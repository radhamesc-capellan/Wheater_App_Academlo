import React, { useState, useEffect } from "react";
import axios from "axios";
//import { geoLocation } from "./geoLocation";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import {
  TbHaze,
  TbTemperatureCelsius,
  TbTemperatureFahrenheit,
} from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import "./App.css";

//?3bd67b6b35b61e2ce5670e6792ece028
//?https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const APIKey = "3bd67b6b35b61e2ce5670e6792ece028";

//geoLocation.then(lngLat => location({'setGeoLocation', lngLat}))

const App = () => {
  //initial states
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Lima");
  const [inputValue, setInputValue] = useState("");
  const [isCelcius, setIsCelcius] = useState(true)
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  //!console.log(inputValue);

  const handleSubmit = (e) => {
    //!console.log(inputValue);

    if (inputValue !== "") {
      // set location
      setLocation(inputValue);
    }

    //select input
    const input = document.querySelector("input");

    //if input value is empty
    if (input.value === "") {
      //set animate true
      setAnimate(true);
      //after 500ms set animate to false
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    //clear input
    input.value = "";

    e.preventDefault();
  };

  //fetch data

  useEffect(() => {
    //set loading to true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}`;

    axios
      .get(url)
      .then((res) => {
        //set data after 1500 ms
        setTimeout(() => {
          setData(res.data);
          // set loading to false
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  {/*unit converter*/}
  
  const changeUnits = () => {
    setIsCelcius(!isCelcius);
  }

  //!console.log(data)

  //error Message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    //clear timer
    return () => clearTimeout(timer);
  }, [errorMsg]);

  //if data is FALSE show spinner loader
  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  //set weather icons
  let icon;
  //console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]"/>;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]"/>;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]"/>;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  //date object
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#EB455F] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md text-center">{`${errorMsg.response.data.message}`}</div>
      )}
      {/*form*/}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-semibold pl-6 h-full"
            type="text"
            placeholder="Search by City or Country"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#ADA2FF] hover:bg-[#A555EC] w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            {" "}
            <IoMdSearch className="text-2xl text-white" />{" "}
          </button>
        </div>
      </form>
      {/*card*/}
      <div className="w-full max-w-[450px] bg-black/30 min-h-[500px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/*card top*/}
            <div className="flex items-center gap-x-5 text-sm font-semibold">
              {/*icon*/}
              <div className="text-[87px]">{icon}</div>
              <div>
                {/*country name*/}
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                {/*date*/}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/*card body*/}
            <div className="my-15">
              <div className="flex justify-center items-center">
                {/*temperature*/}
                <div className="text-[144px] leading-none font-light">
                  {isCelcius ? Math.round((data.main.temp)-273) : Math.round((((data.main.temp)-273)*9/5)+32)}
                </div>
                {/*temp unit icon*/}
                <div className="text-4xl">
                  {isCelcius ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit/>}
                </div>
              </div>
              {/*weather description*/}
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
              {/* unit converte buttom*/}
              <div className="text-center">
                <button onClick={changeUnits} className=" bg-[#A555EC] hover:bg-[#ADA2FF] w-30 h-10 rounded-lg p-1 items-center">C ° / F °</button>
              </div>
            </div>
            {/*card bottom*/}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/*icon*/}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility: {""}
                    <span className="ml-2">{data.visibility / 1000} Km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/*icon*/}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels Like:
                    <div className="flex items-center ml-2">
                      {isCelcius ? Math.floor((data.main.feels_like)-273) : Math.round((((data.main.feels_like)-273)*9/5)+32)}
                      {isCelcius ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit/>}
                    </div>
                  </div>
                </div>
              </div>
              {/* mark*/}
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/*icon*/}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity:
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/*icon*/}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind: <span className="ml-2 ">{data.wind.speed} m/s </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
