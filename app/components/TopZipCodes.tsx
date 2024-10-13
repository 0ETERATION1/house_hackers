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
    SchoolRating: 3,
    NumHospitals: 1,
    AvgHomePrice: 548081,
  },
  {
    ZIPCODE: "22101",
    ZIPCITY: "MCLEAN",
    SchoolRating: 6,
    NumHospitals: 2,
    AvgHomePrice: 848460,
  },
  {
    ZIPCODE: "20124",
    ZIPCITY: "CLIFTON",
    SchoolRating: 2,
    NumHospitals: 0,
    AvgHomePrice: 415275,
  },
  {
    ZIPCODE: "22308",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 9,
    NumHospitals: 1,
    AvgHomePrice: 942046,
  },
  {
    ZIPCODE: "20170",
    ZIPCITY: "HERNDON",
    SchoolRating: 9,
    NumHospitals: 1,
    AvgHomePrice: 435788,
  },
  {
    ZIPCODE: "22183",
    ZIPCITY: "VIENNA",
    SchoolRating: 3,
    NumHospitals: 1,
    AvgHomePrice: 858755,
  },
  {
    ZIPCODE: "22079",
    ZIPCITY: "LORTON",
    SchoolRating: 2,
    NumHospitals: 4,
    AvgHomePrice: 285744,
  },
  {
    ZIPCODE: "22153",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 6,
    NumHospitals: 3,
    AvgHomePrice: 864303,
  },
  {
    ZIPCODE: "22041",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 6,
    NumHospitals: 4,
    AvgHomePrice: 838733,
  },
  {
    ZIPCODE: "20171",
    ZIPCITY: "HERNDON",
    SchoolRating: 10,
    NumHospitals: 3,
    AvgHomePrice: 509091,
  },
  {
    ZIPCODE: "22312",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 7,
    NumHospitals: 1,
    AvgHomePrice: 412056,
  },
  {
    ZIPCODE: "22042",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 5,
    NumHospitals: 4,
    AvgHomePrice: 633539,
  },
  {
    ZIPCODE: "22150",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 5,
    NumHospitals: 3,
    AvgHomePrice: 510574,
  },
  {
    ZIPCODE: "22199",
    ZIPCITY: "LORTON",
    SchoolRating: 8,
    NumHospitals: 1,
    AvgHomePrice: 856799,
  },
  {
    ZIPCODE: "22306",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 2,
    NumHospitals: 2,
    AvgHomePrice: 863361,
  },
  {
    ZIPCODE: "20172",
    ZIPCITY: "HERNDON",
    SchoolRating: 9,
    NumHospitals: 4,
    AvgHomePrice: 760689,
  },
  {
    ZIPCODE: "22205",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 7,
    NumHospitals: 5,
    AvgHomePrice: 650624,
  },
  {
    ZIPCODE: "22181",
    ZIPCITY: "VIENNA",
    SchoolRating: 5,
    NumHospitals: 4,
    AvgHomePrice: 583025,
  },
  {
    ZIPCODE: "20120",
    ZIPCITY: "CENTREVILLE",
    SchoolRating: 7,
    NumHospitals: 4,
    AvgHomePrice: 822713,
  },
  {
    ZIPCODE: "22307",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 4,
    NumHospitals: 2,
    AvgHomePrice: 802570,
  },
  {
    ZIPCODE: "20153",
    ZIPCITY: "CHANTILLY",
    SchoolRating: 10,
    NumHospitals: 1,
    AvgHomePrice: 666051,
  },
  {
    ZIPCODE: "22003",
    ZIPCITY: "ANNANDALE",
    SchoolRating: 6,
    NumHospitals: 4,
    AvgHomePrice: 641515,
  },
  {
    ZIPCODE: "22037",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 9,
    NumHospitals: 3,
    AvgHomePrice: 243068,
  },
  {
    ZIPCODE: "20196",
    ZIPCITY: "RESTON",
    SchoolRating: 3,
    NumHospitals: 2,
    AvgHomePrice: 271691,
  },
  {
    ZIPCODE: "22124",
    ZIPCITY: "OAKTON",
    SchoolRating: 4,
    NumHospitals: 1,
    AvgHomePrice: 364436,
  },
  {
    ZIPCODE: "22161",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 7,
    NumHospitals: 0,
    AvgHomePrice: 635908,
  },
  {
    ZIPCODE: "22044",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 9,
    NumHospitals: 3,
    AvgHomePrice: 213760,
  },
  {
    ZIPCODE: "22027",
    ZIPCITY: "DUNN LORING",
    SchoolRating: 2,
    NumHospitals: 3,
    AvgHomePrice: 474320,
  },
  {
    ZIPCODE: "22304",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 8,
    NumHospitals: 3,
    AvgHomePrice: 926296,
  },
  {
    ZIPCODE: "20191",
    ZIPCITY: "RESTON",
    SchoolRating: 1,
    NumHospitals: 3,
    AvgHomePrice: 472800,
  },
  {
    ZIPCODE: "22309",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 10,
    NumHospitals: 1,
    AvgHomePrice: 791411,
  },
  {
    ZIPCODE: "20194",
    ZIPCITY: "RESTON",
    SchoolRating: 8,
    NumHospitals: 0,
    AvgHomePrice: 225342,
  },
  {
    ZIPCODE: "22015",
    ZIPCITY: "BURKE",
    SchoolRating: 4,
    NumHospitals: 5,
    AvgHomePrice: 479797,
  },
  {
    ZIPCODE: "22311",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 10,
    NumHospitals: 0,
    AvgHomePrice: 809778,
  },
  {
    ZIPCODE: "22033",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 4,
    NumHospitals: 1,
    AvgHomePrice: 205151,
  },
  {
    ZIPCODE: "20121",
    ZIPCITY: "CENTREVILLE",
    SchoolRating: 2,
    NumHospitals: 1,
    AvgHomePrice: 598859,
  },
  {
    ZIPCODE: "22180",
    ZIPCITY: "VIENNA",
    SchoolRating: 1,
    NumHospitals: 5,
    AvgHomePrice: 628248,
  },
  {
    ZIPCODE: "20166",
    ZIPCITY: "STERLING",
    SchoolRating: 5,
    NumHospitals: 2,
    AvgHomePrice: 206613,
  },
  {
    ZIPCODE: "20192",
    ZIPCITY: "HERNDON",
    SchoolRating: 7,
    NumHospitals: 1,
    AvgHomePrice: 556248,
  },
  {
    ZIPCODE: "22185",
    ZIPCITY: "VIENNA",
    SchoolRating: 10,
    NumHospitals: 3,
    AvgHomePrice: 783006,
  },
  {
    ZIPCODE: "22121",
    ZIPCITY: "MOUNT VERNON",
    SchoolRating: 2,
    NumHospitals: 3,
    AvgHomePrice: 633966,
  },
  {
    ZIPCODE: "22043",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 5,
    NumHospitals: 5,
    AvgHomePrice: 495175,
  },
  {
    ZIPCODE: "22032",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 8,
    NumHospitals: 3,
    AvgHomePrice: 691284,
  },
  {
    ZIPCODE: "20195",
    ZIPCITY: "RESTON",
    SchoolRating: 9,
    NumHospitals: 4,
    AvgHomePrice: 318456,
  },
  {
    ZIPCODE: "22315",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 6,
    NumHospitals: 5,
    AvgHomePrice: 733480,
  },
  {
    ZIPCODE: "22203",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 3,
    NumHospitals: 4,
    AvgHomePrice: 801179,
  },
  {
    ZIPCODE: "22310",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 4,
    NumHospitals: 1,
    AvgHomePrice: 663505,
  },
  {
    ZIPCODE: "22046",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 3,
    NumHospitals: 3,
    AvgHomePrice: 335044,
  },
  {
    ZIPCODE: "22102",
    ZIPCITY: "MCLEAN",
    SchoolRating: 9,
    NumHospitals: 1,
    AvgHomePrice: 559083,
  },
  {
    ZIPCODE: "22213",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 3,
    NumHospitals: 3,
    AvgHomePrice: 830838,
  },
  {
    ZIPCODE: "22035",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 6,
    NumHospitals: 3,
    AvgHomePrice: 413338,
  },
  {
    ZIPCODE: "22152",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 10,
    NumHospitals: 2,
    AvgHomePrice: 349369,
  },
  {
    ZIPCODE: "22182",
    ZIPCITY: "VIENNA",
    SchoolRating: 9,
    NumHospitals: 3,
    AvgHomePrice: 274246,
  },
  {
    ZIPCODE: "22302",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 2,
    NumHospitals: 5,
    AvgHomePrice: 316476,
  },
  {
    ZIPCODE: "22039",
    ZIPCITY: "FAIRFAX STATION",
    SchoolRating: 6,
    NumHospitals: 5,
    AvgHomePrice: 289969,
  },
  {
    ZIPCODE: "22207",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 7,
    NumHospitals: 5,
    AvgHomePrice: 735825,
  },
  {
    ZIPCODE: "22151",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 4,
    NumHospitals: 4,
    AvgHomePrice: 277055,
  },
  {
    ZIPCODE: "22060",
    ZIPCITY: "FORT BELVOIR",
    SchoolRating: 2,
    NumHospitals: 0,
    AvgHomePrice: 268497,
  },
  {
    ZIPCODE: "22160",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 6,
    NumHospitals: 2,
    AvgHomePrice: 759644,
  },
  {
    ZIPCODE: "22158",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 10,
    NumHospitals: 2,
    AvgHomePrice: 291470,
  },
  {
    ZIPCODE: "22159",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 7,
    NumHospitals: 2,
    AvgHomePrice: 265661,
  },
  {
    ZIPCODE: "22019",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 2,
    NumHospitals: 1,
    AvgHomePrice: 949033,
  },
  {
    ZIPCODE: "22018",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 4,
    NumHospitals: 5,
    AvgHomePrice: 354757,
  },
  {
    ZIPCODE: "22081",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 4,
    NumHospitals: 5,
    AvgHomePrice: 768012,
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
