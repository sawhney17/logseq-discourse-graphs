import { getDateForPage } from "logseq-dateutils";
import Sherlock from "sherlockjs";
import { persistUUID } from "./insertUUID";

import axios from "axios";
import { editNetworkRequest } from "./insertTemplatedBlock";
import { BlockEntity, PageEntity, PageIdentity } from "@logseq/libs/dist/LSPlugin";
// set APIKEY to be equal to the api key from github secrets
async function parseRandomly(pageName: string) {
  pageName.toLowerCase();
  let query = `[:find (pull ?b [*])
  :where
  [?b :block/path-refs [:block/name "${pageName.toLowerCase()}"]]]`;

  let results = await logseq.DB.datascriptQuery(query);
  let flattenedResults = results.map((mappedQuery) => ({
    uuid: mappedQuery[0].uuid["$uuid$"],
  }));

  let index = Math.floor(Math.random() * flattenedResults.length);
  persistUUID(flattenedResults[index].uuid);
  return `((${flattenedResults[index].uuid}))`;
}

// function parseWeather(data, format) {
//   let emojiArray = {
//       Clear: "🔆",
//       Clouds: "🌥",
//       Atmosphere: "🌫",
//       Snow: "❄️",
//       Rain: "🌧",
//       Drizzle: "🌧",
//       Thunderstorm: "⛈",
//     }
//   let temperature;
//   if (format == "f") {
//     temperature = (data.main.temp - 273.15) * 9/5 + 32
//     temperature = Math.round((temperature + Number.EPSILON) * 100) / 100
//   } else {
//     temperature = data.main.temp - 273.15
//     temperature = Math.round((temperature + Number.EPSILON) * 100) / 100
//   }
//   return `${temperature}°${emojiArray[data.weather[0].main]}`;
// }
// function parseConditional(condition: string, value: number) {
//   switch (condition) {
//     case "dayofweek":
//       if (new Date().getDay() == value) {
//         return "Success";
//       } else if (new Date().getDay() == 0 && value == 7) {
//         return "Success";
//       } else {
//         return "Error";
//       }
//     case "dayofmonth":
//       if (new Date().getDate() == value) {
//         return "Success";
//       } else {
//         return "Error";
//       }
//     case "month":
//       if (new Date().getMonth() == value) {
//         return "Success";
//       } else {
//         return "Error";
//       }
//     case "dayofyear":
//       if (new Date().getDate() == value) {
//         return "Success";
//       } else {
//         return "Error";
//       }
//     default:
//       return "Error";
//   }
// }

// export function parseVariablesOne(template) {}
export async function parseDynamically(blockContent: String) {

  const userConfigs = await logseq.App.getUserConfigs();
  const preferredDateFormat = userConfigs.preferredDateFormat;
  let currentTime = new Date();
  let ifParsing = /(i+f)/gi;
  let pageBlock = /currentpage/;
  let randomParsing = /randomblock/;
  let shouldNotEncodeURL = true
  let weatherQuery = /weather/;
  let parsedInput;
  if (blockContent.match("<%%")){
    parsedInput = blockContent.slice(3, -2);
    shouldNotEncodeURL = false;
  }
  else {
    parsedInput = blockContent.slice(2, -2);
  }
  // if (blockContent.match(ifParsing)) {
  //   let input = parsedInput.split(":");
  //   let spaceParsedInput = input[0].replace(/\s+/g, "");
  //   let input1 = spaceParsedInput.split("||");
  //   let tempStorageArray = [];
  //   for (const x in input1) {
  //     let input2 = input1[x].split("if");
  //     let input3 = input2[1].split("=");
  //     //@ts-expect-error
  //     tempStorageArray.push(parseConditional(input3[0], input3[1]));
  //   }
  //   if (tempStorageArray.includes("Success")) {
  //     return input[1];
  //   } else {
  //     return "";
  //   }
  // }
  // if (blockContent.match(weatherQuery)) {
  //     try {
        
  //       let spacedSplit = parsedInput.split(" ");
  //       let weatherLocation = spacedSplit[1];
  //       let weatherFormat = spacedSplit[0].split("weather")[1];
  //       try {
  //         editNetworkRequest(true);
  //         let url = `http://api.openweathermap.org/geo/1.0/direct?q=${weatherLocation}&limit=1&appid=${APIKEY}`;
  //         let locationLongLat = await axios.get(url);
  //         let lon = locationLongLat.data[0].lon;
  //         let lat = locationLongLat.data[0].lat;

  //         let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;

  //         let weatherData = await axios.get(url2);
  //         return parseWeather(weatherData.data, weatherFormat);
  //       } catch(error) {
  //         console.log(error)
  //         return "Oops, unable to reach servers";
          
  //       }
  //     } catch {
  //       return "Oops, no location provided";
  //     }
  // 
  // }
  if (blockContent.toLowerCase().match(pageBlock)) {

    let currentp3age = await logseq.Editor.getCurrentPage();
    if (currentp3age == null){
      currentp3age = await logseq.Editor.getPage(getDateForPage(currentTime, preferredDateFormat))
    }
    console.log(shouldNotEncodeURL)
    const inputSplit = parsedInput.split(":")
    console.log(inputSplit)
    console.log(currentp3age)
    if (inputSplit.length > 1) {
      return shouldNotEncodeURL? parseProperties((inputSplit[1]), currentp3age): encodeURIComponent(parseProperties((inputSplit[1]), currentp3age))
    }
    else{
    if (currentp3age != null) {
      return shouldNotEncodeURL? currentp3age.name: encodeURIComponent(currentp3age.name);
    } else {
      return shouldNotEncodeURL? getDateForPage(currentTime, preferredDateFormat): encodeURIComponent(getDateForPage(currentTime, preferredDateFormat));
    }}
  }
  if (blockContent.match(randomParsing)) {
    // let spaceParsedInput = parsedInput.replace(/\s+/g, '');
    let input2 = parsedInput.split("randomblock");
    let input3 = input2[1].replace(" ", "");
    return shouldNotEncodeURL? await parseRandomly(input3): encodeURIComponent(await parseRandomly(input3));
  }

  // Implement time parsing
  if (
    blockContent.toLowerCase() == "<%currentTime%>" ||
    blockContent.toLowerCase() == "<%time%>" ||
    blockContent.toLowerCase() == "<%current time%>"
  ) {
    let formattedTime;
    if (currentTime.getMinutes() < 10) {
      formattedTime =
        currentTime.getHours() + ":" + "0" + currentTime.getMinutes();
    } else {
      formattedTime = currentTime.getHours() + ":" + currentTime.getMinutes();
    }
    return shouldNotEncodeURL ? formattedTime : encodeURIComponent(formattedTime);
  }
  // Implement if parsing
  const parsedBlock = await Sherlock.parse(blockContent);
  // Destructure
  const { startDate } = parsedBlock;

  if (startDate == null) {
    return blockContent;
  }
  return shouldNotEncodeURL ? getDateForPage(startDate, preferredDateFormat): encodeURIComponent(getDateForPage(startDate, preferredDateFormat));
}

function parseProperties(text: String,  currentPage: PageIdentity) {
  const updatedText = text.replace(" ", "")
  console.log(updatedText)
  console.log(currentPage);
  //@ts-expect-error
  const propertyList = currentPage.properties[updatedText]
  if (propertyList != undefined ){
    return propertyList.toString()
  }
  else {
    return `No property exists for key ${updatedText}`
  }
}