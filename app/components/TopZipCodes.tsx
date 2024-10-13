import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

interface ZipCodeData {
  ZIPCODE: string;
  ZIPCITY: string;
  SchoolRating: number;
  NumHospitals: number;
  AvgHomePrice: number;
  Population: number;
  UnitsAvailable: number;
}

interface Filters {
  schoolRating: number;
  numHospitals: number;
  avgHomePrice: number;
  population: number;
  unitsAvailable: number;
}

interface TopZipCodesProps {
  schoolRating: number;
  numHospitals: number;
  avgHomePrice: number;
  population: number;
  unitsAvailable: number;
  onTopZipCodesChange: (topZipCodes: ZipCodeData[]) => void;
}

const zipcodeData: ZipCodeData[] = [
  {
    ZIPCODE: "20190",
    ZIPCITY: "RESTON",
    SchoolRating: 4,
    NumHospitals: 3,
    AvgHomePrice: 641842,
    Population: 58404,
    UnitsAvailable: 1234,
  },
  {
    ZIPCODE: "22101",
    ZIPCITY: "MCLEAN",
    SchoolRating: 8,
    NumHospitals: 3,
    AvgHomePrice: 1567004,
    Population: 30267,
    UnitsAvailable: 567,
  },
  {
    ZIPCODE: "20124",
    ZIPCITY: "CLIFTON",
    SchoolRating: 5.33,
    NumHospitals: 0,
    AvgHomePrice: 967277,
    Population: 19844,
    UnitsAvailable: 321,
  },
  {
    ZIPCODE: "22308",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 6,
    NumHospitals: 0,
    AvgHomePrice: 930298,
    Population: 15832,
    UnitsAvailable: 456,
  },
  {
    ZIPCODE: "20170",
    ZIPCITY: "HERNDON",
    SchoolRating: 3.17,
    NumHospitals: 2,
    AvgHomePrice: 685473,
    Population: 40513,
    UnitsAvailable: 789,
  },
  {
    ZIPCODE: "22183",
    ZIPCITY: "VIENNA",
    SchoolRating: 7.5,
    NumHospitals: 1,
    AvgHomePrice: 825000,
    Population: 16253,
    UnitsAvailable: 234,
  },
  {
    ZIPCODE: "22079",
    ZIPCITY: "LORTON",
    SchoolRating: 6.4,
    NumHospitals: 2,
    AvgHomePrice: 685596,
    Population: 34010,
    UnitsAvailable: 567,
  },
  {
    ZIPCODE: "22153",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 6.67,
    NumHospitals: 0,
    AvgHomePrice: 728121,
    Population: 30470,
    UnitsAvailable: 432,
  },
  {
    ZIPCODE: "22041",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 4.5,
    NumHospitals: 1,
    AvgHomePrice: 717801,
    Population: 33163,
    UnitsAvailable: 678,
  },
  {
    ZIPCODE: "20171",
    ZIPCITY: "HERNDON",
    SchoolRating: 6.43,
    NumHospitals: 1,
    AvgHomePrice: 822035,
    Population: 37021,
    UnitsAvailable: 543,
  },
  {
    ZIPCODE: "22312",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 4.33,
    NumHospitals: 2,
    AvgHomePrice: 660354,
    Population: 27898,
    UnitsAvailable: 765,
  },
  {
    ZIPCODE: "22042",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 2.86,
    NumHospitals: 2,
    AvgHomePrice: 744770,
    Population: 25518,
    UnitsAvailable: 432,
  },
  {
    ZIPCODE: "22150",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 3.57,
    NumHospitals: 2,
    AvgHomePrice: 647498,
    Population: 29953,
    UnitsAvailable: 654,
  },
  {
    ZIPCODE: "22199",
    ZIPCITY: "LORTON",
    SchoolRating: 5.8,
    NumHospitals: 1,
    AvgHomePrice: 720000,
    Population: 18765,
    UnitsAvailable: 321,
  },
  {
    ZIPCODE: "22306",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 2.6,
    NumHospitals: 2,
    AvgHomePrice: 647840,
    Population: 32812,
    UnitsAvailable: 543,
  },
  {
    ZIPCODE: "20172",
    ZIPCITY: "HERNDON",
    SchoolRating: 5.5,
    NumHospitals: 1,
    AvgHomePrice: 750000,
    Population: 15432,
    UnitsAvailable: 234,
  },
  {
    ZIPCODE: "22205",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 7.2,
    NumHospitals: 1,
    AvgHomePrice: 950000,
    Population: 11234,
    UnitsAvailable: 187,
  },
  {
    ZIPCODE: "22181",
    ZIPCITY: "VIENNA",
    SchoolRating: 6.67,
    NumHospitals: 0,
    AvgHomePrice: 1091317,
    Population: 16543,
    UnitsAvailable: 321,
  },
  {
    ZIPCODE: "20120",
    ZIPCITY: "CENTREVILLE",
    SchoolRating: 5.17,
    NumHospitals: 0,
    AvgHomePrice: 680825,
    Population: 48543,
    UnitsAvailable: 765,
  },
  {
    ZIPCODE: "22307",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 3.33,
    NumHospitals: 0,
    AvgHomePrice: 893868,
    Population: 14321,
    UnitsAvailable: 234,
  },
  {
    ZIPCODE: "20153",
    ZIPCITY: "CHANTILLY",
    SchoolRating: 6.8,
    NumHospitals: 1,
    AvgHomePrice: 710000,
    Population: 23456,
    UnitsAvailable: 432,
  },
  {
    ZIPCODE: "22003",
    ZIPCITY: "ANNANDALE",
    SchoolRating: 3.88,
    NumHospitals: 2,
    AvgHomePrice: 772319,
    Population: 41008,
    UnitsAvailable: 654,
  },
  {
    ZIPCODE: "22037",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 5.5,
    NumHospitals: 1,
    AvgHomePrice: 800000,
    Population: 12345,
    UnitsAvailable: 187,
  },
  {
    ZIPCODE: "20196",
    ZIPCITY: "RESTON",
    SchoolRating: 6.2,
    NumHospitals: 1,
    AvgHomePrice: 780000,
    Population: 9876,
    UnitsAvailable: 154,
  },
  {
    ZIPCODE: "22124",
    ZIPCITY: "OAKTON",
    SchoolRating: 6,
    NumHospitals: 1,
    AvgHomePrice: 1096304,
    Population: 34567,
    UnitsAvailable: 543,
  },
  {
    ZIPCODE: "22161",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 5.7,
    NumHospitals: 1,
    AvgHomePrice: 690000,
    Population: 21098,
    UnitsAvailable: 321,
  },
  {
    ZIPCODE: "22044",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 2.67,
    NumHospitals: 2,
    AvgHomePrice: 912718,
    Population: 18765,
    UnitsAvailable: 432,
  },
  {
    ZIPCODE: "22027",
    ZIPCITY: "DUNN LORING",
    SchoolRating: 7.5,
    NumHospitals: 1,
    AvgHomePrice: 1266305,
    Population: 8765,
    UnitsAvailable: 123,
  },
  {
    ZIPCODE: "22304",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 4.8,
    NumHospitals: 2,
    AvgHomePrice: 850000,
    Population: 54321,
    UnitsAvailable: 876,
  },
  {
    ZIPCODE: "20191",
    ZIPCITY: "RESTON",
    SchoolRating: 5.5,
    NumHospitals: 0,
    AvgHomePrice: 693659,
    Population: 29876,
    UnitsAvailable: 543,
  },
  {
    ZIPCODE: "22309",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 3.17,
    NumHospitals: 0,
    AvgHomePrice: 647553,
    Population: 32109,
    UnitsAvailable: 654,
  },
  {
    ZIPCODE: "20194",
    ZIPCITY: "RESTON",
    SchoolRating: 5,
    NumHospitals: 1,
    AvgHomePrice: 825345,
    Population: 17654,
    UnitsAvailable: 321,
  },
  {
    ZIPCODE: "22015",
    ZIPCITY: "BURKE",
    SchoolRating: 7.25,
    NumHospitals: 1,
    AvgHomePrice: 723959,
    Population: 41234,
    UnitsAvailable: 765,
  },
  {
    ZIPCODE: "22311",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 3.9,
    NumHospitals: 1,
    AvgHomePrice: 620000,
    Population: 19876,
    UnitsAvailable: 432,
  },
  {
    ZIPCODE: "22033",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 6.25,
    NumHospitals: 2,
    AvgHomePrice: 730874,
    Population: 52345,
    UnitsAvailable: 876,
  },
  {
    ZIPCODE: "20121",
    ZIPCITY: "CENTREVILLE",
    SchoolRating: 3.25,
    NumHospitals: 2,
    AvgHomePrice: 553514,
    Population: 48765,
    UnitsAvailable: 765,
  },
  {
    ZIPCODE: "22180",
    ZIPCITY: "VIENNA",
    SchoolRating: 6,
    NumHospitals: 1,
    AvgHomePrice: 1009784,
    Population: 16543,
    UnitsAvailable: 321,
  },
  {
    ZIPCODE: "20166",
    ZIPCITY: "STERLING",
    SchoolRating: 6.8,
    NumHospitals: 1,
    AvgHomePrice: 680000,
    Population: 31098,
    UnitsAvailable: 543,
  },
  {
    ZIPCODE: "20192",
    ZIPCITY: "HERNDON",
    SchoolRating: 5.5,
    NumHospitals: 1,
    AvgHomePrice: 750000,
    Population: 12345,
    UnitsAvailable: 234,
  },
  {
    ZIPCODE: "22185",
    ZIPCITY: "VIENNA",
    SchoolRating: 7.2,
    NumHospitals: 1,
    AvgHomePrice: 980000,
    Population: 9876,
    UnitsAvailable: 187,
  },
  {
    ZIPCODE: "22121",
    ZIPCITY: "MOUNT VERNON",
    SchoolRating: 4.5,
    NumHospitals: 1,
    AvgHomePrice: 620000,
    Population: 15432,
    UnitsAvailable: 321,
  },
  {
    ZIPCODE: "22043",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 6.17,
    NumHospitals: 0,
    AvgHomePrice: 935117,
    Population: 23456,
    UnitsAvailable: 432,
  },
  {
    ZIPCODE: "22032",
    ZIPCITY: "FAIRFAX",
    SchoolRating: 6.25,
    NumHospitals: 0,
    AvgHomePrice: 811524,
    Population: 34567,
    UnitsAvailable: 654,
  },
  {
    ZIPCODE: "20195",
    ZIPCITY: "RESTON",
    SchoolRating: 5.8,
    NumHospitals: 1,
    AvgHomePrice: 760000,
    Population: 11234,
    UnitsAvailable: 234,
  },
  {
    ZIPCODE: "22315",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 6,
    NumHospitals: 1,
    AvgHomePrice: 674559,
    Population: 28765,
    UnitsAvailable: 543,
  },
  {
    ZIPCODE: "22203",
    ZIPCITY: "ARLINGTON",
    SchoolRating: 6.5,
    NumHospitals: 1,
    AvgHomePrice: 890000,
    Population: 22345,
    UnitsAvailable: 432,
  },
  {
    ZIPCODE: "22310",
    ZIPCITY: "ALEXANDRIA",
    SchoolRating: 5,
    NumHospitals: 1,
    AvgHomePrice: 671898,
    Population: 32109,
    UnitsAvailable: 654,
  },
  {
    ZIPCODE: "22046",
    ZIPCITY: "FALLS CHURCH",
    SchoolRating: 5,
    NumHospitals: 2,
    AvgHomePrice: 850000,
    Population: 14321,
    UnitsAvailable: 321,
  },
  {
    ZIPCODE: "22102",
    ZIPCITY: "MCLEAN",
    SchoolRating: 9,
    NumHospitals: 1,
    AvgHomePrice: 1485962,
    Population: 0,
    UnitsAvailable: 0,
  },
  {
    ZIPCODE: "22152",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 6.75,
    NumHospitals: 1,
    AvgHomePrice: 711027,
    Population: 0,
    UnitsAvailable: 0,
  },
  {
    ZIPCODE: "22182",
    ZIPCITY: "VIENNA",
    SchoolRating: 7,
    NumHospitals: 2,
    AvgHomePrice: 1174442,
    Population: 0,
    UnitsAvailable: 0,
  },
  {
    ZIPCODE: "22039",
    ZIPCITY: "FAIRFAX STATION",
    SchoolRating: 6.67,
    NumHospitals: 0,
    AvgHomePrice: 1118263,
    Population: 0,
    UnitsAvailable: 0,
  },
  {
    ZIPCODE: "22151",
    ZIPCITY: "SPRINGFIELD",
    SchoolRating: 4.8,
    NumHospitals: 1,
    AvgHomePrice: 687715,
    Population: 0,
    UnitsAvailable: 0,
  },
  {
    ZIPCODE: "22060",
    ZIPCITY: "FORT BELVOIR",
    SchoolRating: 4,
    NumHospitals: 1,
    AvgHomePrice: 771827,
    Population: 0,
    UnitsAvailable: 0,
  },
  {
    ZIPCODE: "22082",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 7,
    NumHospitals: 0,
    AvgHomePrice: 698150,
    Population: 0,
    UnitsAvailable: 0,
  },
  {
    ZIPCODE: "22116",
    ZIPCITY: "MERRIFIELD",
    SchoolRating: 3,
    NumHospitals: 3,
    AvgHomePrice: 813112,
    Population: 0,
    UnitsAvailable: 0,
  },
  {
    ZIPCODE: "20152",
    ZIPCITY: "CHANTILLY",
    SchoolRating: 9,
    NumHospitals: 2,
    AvgHomePrice: 286667,
    Population: 0,
    UnitsAvailable: 0,
  },
];

const calculateScore = (zipcode: ZipCodeData, filters: Filters) => {
  // Weight factors for first-time home buyers
  const schoolWeight = 0.25;
  const hospitalWeight = 0.15;
  const priceWeight = 0.35;
  const populationWeight = 0.15;
  const unitsAvailableWeight = 0.1;

  // School score (higher is better)
  const schoolScore =
    Math.max(0, 10 - Math.abs(zipcode.SchoolRating - filters.schoolRating)) *
    10;

  // Hospital score (closer to desired number is better)
  const hospitalScore =
    Math.max(0, 5 - Math.abs(zipcode.NumHospitals - filters.numHospitals)) * 20;

  // Price score (lower is better for first-time buyers)
  const priceScore = Math.max(
    0,
    100 - (zipcode.AvgHomePrice / filters.avgHomePrice) * 100
  );

  // Population score (moderate population is better)
  const idealPopulation = 30000; // Assuming this is a good target for first-time buyers
  const populationScore = Math.max(
    0,
    100 - Math.abs(zipcode.Population - idealPopulation) / 300
  );

  // Units available score (more available units is better for first-time buyers)
  const unitsAvailableScore = Math.min(
    100,
    (zipcode.UnitsAvailable / filters.unitsAvailable) * 100
  );

  // Calculate weighted score
  const weightedScore =
    schoolScore * schoolWeight +
    hospitalScore * hospitalWeight +
    priceScore * priceWeight +
    populationScore * populationWeight +
    unitsAvailableScore * unitsAvailableWeight;

  return weightedScore;
};

// Function to get color based on rank
const getColorByRank = (rank: number): string => {
  const colors = [
    [0, 255, 0], // Green for 1st place
    [173, 255, 47], // GreenYellow for 2nd place
    [255, 255, 0], // Yellow for 3rd place
    [255, 165, 0], // Orange for 4th place
    [255, 0, 0], // Red for 5th place
  ];
  const color = colors[rank] || [255, 255, 255]; // Default to white
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

const TopZipCodes: React.FC<TopZipCodesProps> = ({
  schoolRating,
  numHospitals,
  avgHomePrice,
  population,
  unitsAvailable,
  onTopZipCodesChange,
}) => {
  const [rankedZipcodes, setRankedZipcodes] = useState<
    (ZipCodeData & { score: number })[]
  >([]);

  useEffect(() => {
    const filters: Filters = {
      schoolRating,
      numHospitals,
      avgHomePrice,
      population,
      unitsAvailable,
    };
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
  }, [
    schoolRating,
    numHospitals,
    avgHomePrice,
    population,
    unitsAvailable,
    onTopZipCodesChange,
  ]);

  return (
    <div className={styles.topZipCodes}>
      <h2>Top 5 ZIP Codes</h2>
      <ul className={styles.zipCodeList}>
        {rankedZipcodes.slice(0, 5).map((zipcode, index) => (
          <li
            key={zipcode.ZIPCODE}
            style={{
              backgroundColor: getColorByRank(index),
              color: "#000",
              padding: "5px",
              margin: "5px 0",
              borderRadius: "4px",
            }}
          >
            {index + 1}. {zipcode.ZIPCODE} - {zipcode.ZIPCITY} (Score:{" "}
            {zipcode.score.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopZipCodes;
