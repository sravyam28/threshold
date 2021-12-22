/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
// Initialize dataframe-js module
import { DataFrame } from "dataframe-js";
import { GLOSSARY } from "../parameters/glossary";

/**
 * get requested consentForm and debreifForms
 * @param {Papa.ParseResult<string[]>} parsed
 * @returns {consentForm: string, debreifForm: string}
 */
export const getFormNames = (parsed: any): any => {
  let consentFormRow: string[] = [];
  let debriefFormRow: string[] = [];

  for (let i = 0; i < parsed.data.length; i++) {
    if (parsed.data[i][0] == "_consentForm") {
      consentFormRow = parsed.data[i];
    } else if (parsed.data[i][0] == "_debriefForm") {
      debriefFormRow = parsed.data[i];
    }
  }

  const formData: any = {};
  if (consentFormRow[1]) formData["consentForm"] = consentFormRow[1];
  if (debriefFormRow[1]) formData["debriefForm"] = debriefFormRow[1];

  return formData;
};

/**
 * get list of fonts required with given font source
 * @param {Papa.ParseResult<string[]>} parsed
 * @param {string} fontSource
 * @returns {string[]}
 */
export const getFontNameListBySource = (
  parsed: any,
  fontSource: string
): string[] => {
  const fontList: string[] = [];
  let targetFontRow: string[] = [];
  let targetFontSourceRow: string[] = [];
  let foundTargetFontSourceRow = false;

  for (let i = 0; i < parsed.data.length; i++) {
    if (parsed.data[i][0] == "targetFont") {
      targetFontRow = parsed.data[i];
    } else if (parsed.data[i][0] == "targetFontSource") {
      targetFontSourceRow = parsed.data[i];
      foundTargetFontSourceRow = true;
    }
  }

  // read default value if it is absent
  if (!foundTargetFontSourceRow) {
    let defaultValue = GLOSSARY["targetFontSource"].default;
    if (Array.isArray(defaultValue)) defaultValue = defaultValue[0];
    for (let i = 0; i < targetFontRow.length; i++)
      targetFontSourceRow[i] = defaultValue;
    targetFontSourceRow[0] = "";
  }

  for (let i = 0; i < targetFontRow.length; i++) {
    if (
      targetFontSourceRow[i].trim() == fontSource &&
      !fontList.includes(targetFontRow[i])
    )
      fontList.push(targetFontRow[i]);
  }

  return fontList;
};

/**
 * Return a transposed copy of a 2D table.
 * CREDIT https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
 * @param {*[][]} nestedArray A 2D array (array of arrays of primitives)
 * @returns {*[][]} transposed Transposed transformation of nestedArray
 */
export const transpose = (nestedArray: any[]): any => {
  const transposed = nestedArray[0].map((_: any, colIndex: number) =>
    nestedArray.map((row) => row[colIndex])
  );
  return transposed;
};

/**
 * Check whether an array of file objects contains one with the name of the value of targetFileName
 * @param {File[]} fileList
 * @param {String} targetFileName
 * @returns {Boolean}
 */
export const fileListContainsFileOfName = (
  fileList: File[],
  targetFileName: string
): any => {
  const isFileOfTargetName = (candidateFile: File) =>
    candidateFile.name == targetFileName;
  return fileList.filter(isFileOfTargetName).length > 0;
};

/**
 * Given the content returned by PapaParse on our csv file, provide a dfjs Dataframe
 * @param {Object} parsedContent .csv file as parsed by PapaParse
 * @returns {dfjs.DataFrame}
 */
export const dataframeFromPapaParsed = (parsedContent: any): any => {
  const parsedData = parsedContent.data;
  // Transpose, to get from Denis's row-major convention to the usual column-major
  const transposed = parsedData[0].map((_: any, colIndex: number) =>
    parsedData.map((row: any) => row[colIndex])
  );

  // Separate out the column names from rows of values
  const data = transposed.slice(1); // Rows
  const columns = transposed[0]; // Header
  // Create and return the DataFrame
  return new DataFrame(data, columns);
};

/**
 * Damerau–Levenshtein of two strings
 * @see https://stackoverflow.com/questions/11919065/sort-an-array-by-the-levenshtein-distance-with-best-performance-in-javascript
 * @author James Westgate (https://stackoverflow.com/users/305319/james-westgate)
 * @param {String} s
 * @param {String} t
 * @returns
 */
export const levDist = (s: any, t: any): any => {
  const d: any = []; //2d matrix

  // Step 1
  const n = s.length;
  const m = t.length;

  if (n == 0) return m;
  if (m == 0) return n;

  //Create an array of arrays in javascript (a descending loop is quicker)
  for (let i = n; i >= 0; i--) d[i] = [];

  // Step 2
  for (let i = n; i >= 0; i--) d[i][0] = i;
  for (let j = m; j >= 0; j--) d[0][j] = j;

  // Step 3
  for (let i: any = 1; i <= n; i++) {
    const s_i = s.charAt(i - 1);

    // Step 4
    for (let j: any = 1; j <= m; j++) {
      //Check the jagged ld total so far
      if (i == j && d[i][j] > 4) return n;

      const t_j = t.charAt(j - 1);
      const cost = s_i == t_j ? 0 : 1; // Step 5

      //Calculate the minimum
      let mi = d[i - 1][j] + 1;
      const b = d[i][j - 1] + 1;
      const c = d[i - 1][j - 1] + cost;

      if (b < mi) mi = b;
      if (c < mi) mi = c;

      d[i][j] = mi; // Step 6

      //Damerau transposition
      if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
      }
    }
  }

  // Step 7
  return d[n][m];
};

export const addUniqueLabelsToDf = (df: any): any => {
  if (!df.listColumns().includes("block")) {
    console.error(
      "Experiment will fail. 'block' parameter not provided. Do not run experiment in this state."
    );
    return df;
  }
  const blocks = df.select("block").toArray();
  const blockCounts: any = {};
  const labels: string[] = [];
  blocks.forEach((nestedBlock: number[]) => {
    const block = nestedBlock[0];
    if (blockCounts.hasOwnProperty(block)) {
      blockCounts[block] += 1;
    } else {
      blockCounts[block] = 1;
    }
    labels.push(String(block) + "_" + String(blockCounts[block]));
  });
  df = df.withColumn("label", (row: any, index: number) => labels[index]);
  return df;
};

/**
 * @see https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
 * @author Dan [https://stackoverflow.com/users/17121/dan]
 * @param str
 * @returns
 */
export const isNumeric = (str: string): boolean => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

/**
 * Element-wise check of whether two arrays are equal
 * @see https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript/16430730
 * @param {any[]} a
 * @param {any[]} b
 * @returns {boolean}
 */
export const arraysEqual = <T>(a: T[], b: T[]): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export const verballyEnumerate = (individuals: string[]): string => {
  if (individuals.length === 1) return individuals[0];
  let enumeratedString = "";
  for (let i = 0; i < individuals.length; i++) {
    if (i !== individuals.length - 1) {
      // Not last individual
      enumeratedString += String(individuals[i]) + ", ";
    } else {
      // Last individual
      enumeratedString += "and " + String(individuals[i]);
    }
  }
  return enumeratedString;
};

export const getNumericalSuffix = (n: number): string => {
  switch (Math.abs(Number(n))) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

/**
 * Robust check for whether a file is a CSV file
 * https://developer.mozilla.org/en-US/docs/Web/API/File
 * @param {File} file File object to be checked
 * @returns {Boolean}
 */
export const isCsvFile = (file: File): boolean => {
  return file.name.includes("xlsx") || file.name.includes("csv");
};
