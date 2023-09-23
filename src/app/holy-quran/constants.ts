
const SHADDA_FATHA = 1611;
const FATHATAN = 1613;// Tanween fatha
const FATHA = 1614;
const DAMMA = 1615;
const KASRA = 1616;
const SHADDA = 1617;
const SUKUN = 1618;
const SMALL_ALEF = 1648;
const GWAZ_ALWASL_ALWAQF = 1754;// ۚ
const GWAZ_ALWASL = 1750;// ۖ
const HAMZAT_WASL = 1649;//ٱ
const TashkeelRegex = /[\u064B-\u0653]|[\u06E2]|[\u06DF-\u06ED]/g; //  /[\u064B-\u0652]/g
const HAMZATWASL = /[\u0671]/g;
const SMALLALEF = /[\u0670]/g;
const searchURL = "assets/jsonData/searchJson.json";
const ARABIC_CHARS_REG = /[\u0621-\u064A\s]+/g;
const regex = /([\u0600-\u06FF])ِى/g; // to replace any arabic character followed by this char ِ and (ى) with (ي) 
                                    // for example replace this (فِى سَبِيلِى)  with this (في سَبِيلي)  
