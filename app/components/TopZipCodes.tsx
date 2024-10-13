import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

interface ZipCodeData {
  ZIPCODE: string;
  ZIPCITY: string;
  SchoolRating: number;
  NumHospitals: number;
  AvgHomePrice: number;
}

interface Filters {
  schoolRating: number;
  numHospitals: number;
  avgHomePrice: number;
}

interface TopZipCodesProps {
  schoolRating: number;
  numHospitals: number;
  avgHomePrice: number;
  onTopZipCodesChange: (topZipCodes: ZipCodeData[]) => void;
}

const zipcodeData: ZipCodeData[] = [
  {
    ZIPCODE: "20190",
    ZIPCITY: "RESTON",
    SchoolRating: 4,
    NumHospitals: 3,
    AvgHomePrice: 641842,
  },
  {
    ZIPCODE: "22101",
    ZIPCITY: "MCLEAN",
    SchoolRating: 8,
    NumHospitals: 3,
    AvgHomePrice: 1567004,
  },
  {
    ZIPCODE: "20124",
    ZIPCITY: "CLIFTON",
    SchoolRating: 5.33,
    NumHospitals: 0,
    AvgHomePrice: 967277,
  },
  {
    ZIPCODE: "22308",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 6,
    NumHospitals: 0,
    AvgHomePrice: 930298,
  },
  {
    ZIPCODE: "20170",
    ZIPCITY: "HERNDON",
    SchoolRating: 3.17,
    NumHospitals: 2,
    AvgHomePrice: 685473,
  },
  {
    ZIPCODE: "22183",
    ZIPCITY: "VIENNA",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22079",
    ZIPCITY: "LORTON",
    SchoolRating: 6.4,
    NumHospitals: 2,
    AvgHomePrice: 685596,
  },
  {
    ZIPCODE: "22153",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 6.67,
    NumHospitals: 0,
    AvgHomePrice: 728121,
  },
  {
    ZIPCODE: "22041",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 4.5,
    NumHospitals: 1,
    AvgHomePrice: 717801,
  },
  {
    ZIPCODE: "20171",
    ZIPCITY: "HERNDON",
    SchoolRating: 6.43,
    NumHospitals: 1,
    AvgHomePrice: 822035,
  },
  {
    ZIPCODE: "22312",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 4.33,
    NumHospitals: 2,
    AvgHomePrice: 660354,
  },
  {
    ZIPCODE: "22042",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 2.86,
    NumHospitals: 2,
    AvgHomePrice: 744770,
  },
  {
    ZIPCODE: "22150",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 3.57,
    NumHospitals: 2,
    AvgHomePrice: 647498,
  },
  {
    ZIPCODE: "22199",
    ZIPCITY: "LORTON",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22306",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 2.6,
    NumHospitals: 2,
    AvgHomePrice: 647840,
  },
  {
    ZIPCODE: "20172",
    ZIPCITY: "HERNDON",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22205",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 0,
    NumHospitals: 1,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22181",
    ZIPCITY: "VIENNA",
    SchoolRating: 6.67,
    NumHospitals: 0,
    AvgHomePrice: 1091317,
  },
  {
    ZIPCODE: "20120",
    ZIPCITY: "CENTREVILLE",
    SchoolRating: 5.17,
    NumHospitals: 0,
    AvgHomePrice: 680825,
  },
  {
    ZIPCODE: "22307",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 3.33,
    NumHospitals: 0,
    AvgHomePrice: 893868,
  },
  {
    ZIPCODE: "20153",
    ZIPCITY: "CHANTILLY",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22003",
    ZIPCITY: "ANNANDALE",
    SchoolRating: 3.88,
    NumHospitals: 2,
    AvgHomePrice: 772319,
  },
  {
    ZIPCODE: "22037",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "20196",
    ZIPCITY: "RESTON",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22124",
    ZIPCITY: "OAKTON",
    SchoolRating: 6,
    NumHospitals: 1,
    AvgHomePrice: 1096304,
  },
  {
    ZIPCODE: "22161",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22044",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 2.67,
    NumHospitals: 2,
    AvgHomePrice: 912718,
  },
  {
    ZIPCODE: "22027",
    ZIPCITY: "DUNN LORING",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 1266305,
  },
  {
    ZIPCODE: "22304",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 0,
    NumHospitals: 2,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "20191",
    ZIPCITY: "RESTON",
    SchoolRating: 5.5,
    NumHospitals: 0,
    AvgHomePrice: 693659,
  },
  {
    ZIPCODE: "22309",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 3.17,
    NumHospitals: 0,
    AvgHomePrice: 647553,
  },
  {
    ZIPCODE: "20194",
    ZIPCITY: "RESTON",
    SchoolRating: 5,
    NumHospitals: 1,
    AvgHomePrice: 825345,
  },
  {
    ZIPCODE: "22015",
    ZIPCITY: "BURKE",
    SchoolRating: 7.25,
    NumHospitals: 1,
    AvgHomePrice: 723959,
  },
  {
    ZIPCODE: "22311",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22033",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 6.25,
    NumHospitals: 2,
    AvgHomePrice: 730874,
  },
  {
    ZIPCODE: "20121",
    ZIPCITY: "CENTREVILLE",
    SchoolRating: 3.25,
    NumHospitals: 2,
    AvgHomePrice: 553514,
  },
  {
    ZIPCODE: "22180",
    ZIPCITY: "VIENNA",
    SchoolRating: 6,
    NumHospitals: 1,
    AvgHomePrice: 1009784,
  },
  {
    ZIPCODE: "20166",
    ZIPCITY: "STERLING",
    SchoolRating: 0,
    NumHospitals: 1,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "20192",
    ZIPCITY: "HERNDON",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22185",
    ZIPCITY: "VIENNA",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22121",
    ZIPCITY: "MOUNT VERNON",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22043",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 6.17,
    NumHospitals: 0,
    AvgHomePrice: 935117,
  },
  {
    ZIPCODE: "22032",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 6.25,
    NumHospitals: 0,
    AvgHomePrice: 811524,
  },
  {
    ZIPCODE: "20195",
    ZIPCITY: "RESTON",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22315",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 6,
    NumHospitals: 1,
    AvgHomePrice: 674559,
  },
  {
    ZIPCODE: "22203",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 0,
    NumHospitals: 1,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22310",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 5,
    NumHospitals: 1,
    AvgHomePrice: 671898,
  },
  {
    ZIPCODE: "22046",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 5,
    NumHospitals: 2,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22102",
    ZIPCITY: "MCLEAN",
    SchoolRating: 9,
    NumHospitals: 1,
    AvgHomePrice: 1485962,
  },
  {
    ZIPCODE: "22213",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22035",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22152",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 6.75,
    NumHospitals: 1,
    AvgHomePrice: 711027,
  },
  {
    ZIPCODE: "22182",
    ZIPCITY: "VIENNA",
    SchoolRating: 7,
    NumHospitals: 2,
    AvgHomePrice: 1174442,
  },
  {
    ZIPCODE: "22302",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 0,
    NumHospitals: 1,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22039",
    ZIPCITY: "FAIRFAX STATION",
    SchoolRating: 6.67,
    NumHospitals: 0,
    AvgHomePrice: 1118263,
  },
  {
    ZIPCODE: "22207",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 0,
    NumHospitals: 2,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22151",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 4.8,
    NumHospitals: 1,
    AvgHomePrice: 687715,
  },
  {
    ZIPCODE: "22060",
    ZIPCITY: "FORT BELVOIR",
    SchoolRating: 4,
    NumHospitals: 1,
    AvgHomePrice: 771827,
  },
  {
    ZIPCODE: "22160",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22158",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22159",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22019",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22018",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22081",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 0,
    NumHospitals: 0,
    AvgHomePrice: 0,
  },
  {
    ZIPCODE: "22082",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 7,
    NumHospitals: 0,
    AvgHomePrice: 698150,
  },
  {
    ZIPCODE: "22116",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 3,
    NumHospitals: 3,
    AvgHomePrice: 813112,
  },
  {
    ZIPCODE: "20152",
    ZIPCITY: "CHANTILLY",
    SchoolRating: 9,
    NumHospitals: 2,
    AvgHomePrice: 286667,
  },
];

const calculateScore = (zipcode: ZipCodeData, filters: Filters) => {
  const schoolScore =
    Math.max(0, 10 - Math.abs(zipcode.SchoolRating - filters.schoolRating)) *
    10;
  const hospitalScore =
    Math.max(0, 5 - Math.abs(zipcode.NumHospitals - filters.numHospitals)) * 20;
  const priceScore = Math.max(
    0,
    100 - Math.abs(zipcode.AvgHomePrice - filters.avgHomePrice) / 10000
  );
  return schoolScore + hospitalScore + priceScore;
};

const TopZipCodes: React.FC<TopZipCodesProps> = ({
  schoolRating,
  numHospitals,
  avgHomePrice,
  onTopZipCodesChange,
}) => {
  const [rankedZipcodes, setRankedZipcodes] = useState<
    (ZipCodeData & { score: number })[]
  >([]);

  useEffect(() => {
    const filters: Filters = { schoolRating, numHospitals, avgHomePrice };
    const scored = zipcodeData.map((zipcode) => ({
      ...zipcode,
      score: calculateScore(zipcode, filters),
    }));
    const ranked = scored.sort((a, b) => b.score - a.score);
    setRankedZipcodes(ranked);

    // Get the top 5 ZIP codes
    const topFiveZipCodes = ranked.slice(0, 5);

    // Pass the top 5 ZIP codes to the parent component
    onTopZipCodesChange(topFiveZipCodes);
  }, [schoolRating, numHospitals, avgHomePrice, onTopZipCodesChange]);

  return (
    <div className={styles.topZipCodes}>
      <h2>Top 5 ZIP Codes</h2>
      <ul>
        {rankedZipcodes.slice(0, 5).map((zipcode, index) => (
          <li key={zipcode.ZIPCODE}>
            {index + 1}. {zipcode.ZIPCODE} - {zipcode.ZIPCITY} (Score:{" "}
            {zipcode.score.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopZipCodes;
