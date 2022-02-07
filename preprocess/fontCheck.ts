import WebFont from "webfontloader";
import { FONT_FILES_MISSING_WEB } from "./errorMessages";
import { EasyEyesError } from "./errorMessages";

export const webFontChecker = async (
  requestedFontListWeb: string[]
): Promise<any> => {
  const errorList: any[] = [];
  for (let i = 0; i < requestedFontListWeb.length; i++) {
    const response = await fetchWebFont(
      requestedFontListWeb[i].replace(/\s/g, "+").replace(/(\r\n|\n|\r)/gm, "")
    );
    if (!response) {
      errorList.push(requestedFontListWeb[i]);
    }
  }

  if (errorList.length > 0)
    return FONT_FILES_MISSING_WEB("targetFont", errorList);
  else return errorList;
};

const fetchWebFont = async (font: string) => {
  const url: string = `https://fonts.googleapis.com/css?family=${font}`;
  console.log(url);
  return await fetch(url)
    .then((response) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
