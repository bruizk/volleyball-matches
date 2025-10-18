import csvFile from "../assets/data/percentajes.csv";
import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function useCSV() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(csvFile)
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const clean = results.data.map((row) => ({
              ...row,
              "TOTAL ACCIONES": Number(row["TOTAL ACCIONES"]),
              "% DOBLE POSITIVA (+2)": parseFloat(row["% DOBLE POSITIVA (+2)"].replace(",", ".")),
              "% POSITIVA (+1)": parseFloat(row["% POSITIVA (+1)"].replace(",", ".")),
              "% NEGATIVA (-1)": parseFloat(row["% NEGATIVA (-1)"].replace(",", ".")),
              "% DOBLE NEGATIVA (-2)": parseFloat(row["% DOBLE NEGATIVA (-2)"].replace(",", ".")),
            }));
            setData(clean);
          },
        });
      });
  }, []);

  return data;
}
