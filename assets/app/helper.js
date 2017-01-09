'use strict';

/* ====================================================================================================================================

 ======================================================================================================================================= */
 var HELPER_countryPhoneCode = [
 {
     "name": "--Select your country--",
     "dial_code": "0",
     "code": "0"
 },
  {
    "name": "Afghanistan",
    "dial_code": "+93",
    "code": "AF"
  },
  {
    "name": "Albania",
    "dial_code": "+355",
    "code": "AL"
  },
  {
    "name": "Algeria",
    "dial_code": "+213",
    "code": "DZ"
  },
  {
    "name": "American Samoa",
    "dial_code": "+1 684",
    "code": "AS"
  },
  {
    "name": "Andorra",
    "dial_code": "+376",
    "code": "AD"
  },
  {
    "name": "Angola",
    "dial_code": "+244",
    "code": "AO"
  },
  {
    "name": "Anguilla",
    "dial_code": "+1 264",
    "code": "AI"
  },
  {
    "name": "Antartica",
    "dial_code": "+672",
    "code": "AQ"
  },
  {
    "name": "Antigua and Barbuda",
    "dial_code": "+1 268",
    "code": "AG"
  },
  {
    "name": "Argentina",
    "dial_code": "+54",
    "code": "AR"
  },
  {
    "name": "Armenia",
    "dial_code": "+374",
    "code": "AM"
  },
  {
    "name": "Aruba",
    "dial_code": "+297",
    "code": "AW"
  },
  {
    "name": "Australia",
    "dial_code": "+61",
    "code": "AU"
  },
  {
    "name": "Austria",
    "dial_code": "+43",
    "code": "AT"
  },
  {
    "name": "Azerbaijan",
    "dial_code": "+994",
    "code": "AZ"
  },
  {
    "name": "Bahamas",
    "dial_code": "+1 242",
    "code": "BS"
  },
  {
    "name": "Bahrain",
    "dial_code": "+973",
    "code": "BH"
  },
  {
    "name": "Bangladesh",
    "dial_code": "+880",
    "code": "BD"
  },
  {
    "name": "Barbados",
    "dial_code": "+1 246",
    "code": "BB"
  },
  {
    "name": "Belarus",
    "dial_code": "+375",
    "code": "BY"
  },
  {
    "name": "Belgium",
    "dial_code": "+32",
    "code": "BE"
  },
  {
    "name": "Belize",
    "dial_code": "+501",
    "code": "BZ"
  },
  {
    "name": "Benin",
    "dial_code": "+229",
    "code": "BJ"
  },
  {
    "name": "Bermuda",
    "dial_code": "+1 441",
    "code": "BM"
  },
  {
    "name": "Bhutan",
    "dial_code": "+975",
    "code": "BT"
  },
  {
    "name": "Bolivia",
    "dial_code": "+591",
    "code": "BO"
  },
  {
    "name": "Bosnia and Herzegovina",
    "dial_code": "+387",
    "code": "BA"
  },
  {
    "name": "Botswana",
    "dial_code": "+267",
    "code": "BW"
  },
  {
    "name": "Brazil",
    "dial_code": "+55",
    "code": "BR"
  },
  {
    "name": "British Indian Ocean Territory",
    "dial_code": "+246",
    "code": "IO"
  },
  {
    "name": "British Virgin Islands",
    "dial_code": "+1 284",
    "code": "VG"
  },
  {
    "name": "Brunei",
    "dial_code": "+673",
    "code": "BR"
  },
  {
    "name": "Bulgaria",
    "dial_code": "+359",
    "code": "BG"
  },
  {
    "name": "Burkina Faso",
    "dial_code": "+226",
    "code": "BF"
  },
  {
    "name": "Burundi",
    "dial_code": "+257",
    "code": "BI"
  },
  {
    "name": "Cambodia",
    "dial_code": "+855",
    "code": "KH"
  },
  {
    "name": "Cameroon",
    "dial_code": "+237",
    "code": "CM"
  },
  {
    "name": "Canada",
    "dial_code": "+1",
    "code": "CA"
  },
  {
    "name": "Cape Verde",
    "dial_code": "+238",
    "code": "CV"
  },
  {
    "name": "Cayman Islands",
    "dial_code": "+1 345",
    "code": "KY"
  },
  {
    "name": "Central African Republic",
    "dial_code": "+236",
    "code": "CF"
  },
  {
    "name": "Chad",
    "dial_code": "+235",
    "code": "TD"
  },
  {
    "name": "Chile",
    "dial_code": "+56",
    "code": "CL"
  },
  {
    "name": "China",
    "dial_code": "+86",
    "code": "CN"
  },
  {
    "name": "Christmas Island",
    "dial_code": "+61",
    "code": "CX"
  },
  {
    "name": "Cocos Islands",
    "dial_code": "+61",
    "code": "CC"
  },
  {
    "name": "Colombia",
    "dial_code": "+57",
    "code": "CO"
  },
  {
    "name": "Comoros",
    "dial_code": "+269",
    "code": "KM"
  },
  {
    "name": "Cook Islands",
    "dial_code": "+682",
    "code": "CK"
  },
  {
    "name": "Costa Rica",
    "dial_code": "+506",
    "code": "CR"
  },
  {
    "name": "Croatia",
    "dial_code": "+385",
    "code": "HR"
  },
  {
    "name": "Cuba",
    "dial_code": "+53",
    "code": "CU"
  },
  {
    "name": "Curacao",
    "dial_code": "+599",
    "code": "CW"
  },
  {
    "name": "Cyprus",
    "dial_code": "+537",
    "code": "CY"
  },
  {
    "name": "Czech Republic",
    "dial_code": "+420",
    "code": "CZ"
  },
  {
    "name": "Democratic Republic of the Congo",
    "dial_code": "+243",
    "code": "CD"
  },
  {
    "name": "Denmark",
    "dial_code": "+45",
    "code": "DK"
  },
  {
    "name": "Djibouti",
    "dial_code": "+253",
    "code": "DJ"
  },
  {
    "name": "Dominica",
    "dial_code": "+1 767",
    "code": "DM"
  },
  {
    "name": "Dominican Republic",
    "dial_code": "+1 849",
    "code": "DO"
  },
  {
    "name": "East Timor",
    "dial_code": "+670",
    "code": "TL"
  },
  {
    "name": "Ecuador",
    "dial_code": "+593",
    "code": "EC"
  },
  {
    "name": "Egypt",
    "dial_code": "+20",
    "code": "EG"
  },
  {
    "name": "El Salvador",
    "dial_code": "+503",
    "code": "SV"
  },
  {
    "name": "Equatorial Guinea",
    "dial_code": "+240",
    "code": "GQ"
  },
  {
    "name": "Eritrea",
    "dial_code": "+291",
    "code": "ER"
  },
  {
    "name": "Estonia",
    "dial_code": "+372",
    "code": "EE"
  },
  {
    "name": "Ethiopia",
    "dial_code": "+251",
    "code": "ET"
  },
  {
    "name": "Falkland Islands",
    "dial_code": "+500",
    "code": "FK"
  },
  {
    "name": "Faroe Islands",
    "dial_code": "+298",
    "code": "FO"
  },
  {
    "name": "Fiji",
    "dial_code": "+679",
    "code": "FJ"
  },
  {
    "name": "Finland",
    "dial_code": "+358",
    "code": "FI"
  },
  {
    "name": "France",
    "dial_code": "+33",
    "code": "FR"
  },
  {
    "name": "French Guiana",
    "dial_code": "+594",
    "code": "GF"
  },
  {
    "name": "French Polynesia",
    "dial_code": "+689",
    "code": "PF"
  },
  {
    "name": "Gabon",
    "dial_code": "+241",
    "code": "GA"
  },
  {
    "name": "Gambia",
    "dial_code": "+220",
    "code": "GM"
  },
  {
    "name": "Georgia",
    "dial_code": "+995",
    "code": "GE"
  },
  {
    "name": "Germany",
    "dial_code": "+49",
    "code": "DE"
  },
  {
    "name": "Ghana",
    "dial_code": "+233",
    "code": "GH"
  },
  {
    "name": "Gibraltar",
    "dial_code": "+350",
    "code": "GI"
  },
  {
    "name": "Greece",
    "dial_code": "+30",
    "code": "GR"
  },
  {
    "name": "Greenland",
    "dial_code": "+299",
    "code": "GL"
  },
  {
    "name": "Grenada",
    "dial_code": "+1 473",
    "code": "GD"
  },
  {
    "name": "Guadeloupe",
    "dial_code": "+590",
    "code": "GP"
  },
  {
    "name": "Guam",
    "dial_code": "+1 671",
    "code": "GU"
  },
  {
    "name": "Guatemala",
    "dial_code": "+502",
    "code": "GT"
  },
  {
    "name": "Guernsey",
    "dial_code": "+44 1481",
    "code": "GG"
  },
  {
    "name": "Guinea",
    "dial_code": "+224",
    "code": "GN"
  },
  {
    "name": "Guinea-Bissau",
    "dial_code": "+245",
    "code": "GW"
  },
  {
    "name": "Guyana",
    "dial_code": "+592",
    "code": "GY"
  },
  {
    "name": "Haiti",
    "dial_code": "+509",
    "code": "HT"
  },
  {
    "name": "Honduras",
    "dial_code": "+504",
    "code": "HN"
  },
  {
    "name": "Hong Kong",
    "dial_code": "+852",
    "code": "HK"
  },
  {
    "name": "Hungary",
    "dial_code": "+36",
    "code": "HU"
  },
  {
    "name": "Iceland",
    "dial_code": "+354",
    "code": "IS"
  },
  {
    "name": "India",
    "dial_code": "+91",
    "code": "IN"
  },
  {
    "name": "Indonesia",
    "dial_code": "+62",
    "code": "ID"
  },
  {
    "name": "Iran",
    "dial_code": "+98",
    "code": "IR"
  },
  {
    "name": "Iraq",
    "dial_code": "+964",
    "code": "IQ"
  },
  {
    "name": "Ireland",
    "dial_code": "+353",
    "code": "IE"
  },
  {
    "name": "Isle of Man",
    "dial_code": "+44 1624",
    "code": "IM"
  },
  {
    "name": "Israel",
    "dial_code": "+972",
    "code": "IL"
  },
  {
    "name": "Italy",
    "dial_code": "+39",
    "code": "IT"
  },
  {
    "name": "Ivory Coast",
    "dial_code": "+225",
    "code": "CI"
  },
  {
    "name": "Jamaica",
    "dial_code": "+1 876",
    "code": "JM"
  },
  {
    "name": "Japan",
    "dial_code": "+81",
    "code": "JP"
  },
  {
    "name": "Jersey",
    "dial_code": "+44 1534",
    "code": "JE"
  },
  {
    "name": "Jordan",
    "dial_code": "+962",
    "code": "JO"
  },
  {
    "name": "Kazakhstan",
    "dial_code": "+7",
    "code": "KZ"
  },
  {
    "name": "Kenya",
    "dial_code": "+254",
    "code": "KE"
  },
  {
    "name": "Kiribati",
    "dial_code": "+686",
    "code": "KI"
  },
  {
    "name": "Kosovo",
    "dial_code": "+383",
    "code": "KW"
  },
  {
    "name": "Kuwait",
    "dial_code": "+965",
    "code": "KW"
  },
  {
    "name": "Kyrgyzstan",
    "dial_code": "+996",
    "code": "KG"
  },
  {
    "name": "Laos",
    "dial_code": "+856",
    "code": "LA"
  },
  {
    "name": "Latvia",
    "dial_code": "+371",
    "code": "LV"
  },
  {
    "name": "Lebanon",
    "dial_code": "+961",
    "code": "LB"
  },
  {
    "name": "Lesotho",
    "dial_code": "+266",
    "code": "LS"
  },
  {
    "name": "Liberia",
    "dial_code": "+231",
    "code": "LR"
  },
  {
    "name": "Libya",
    "dial_code": "+218",
    "code": "LY"
  },
  {
    "name": "Liechtenstein",
    "dial_code": "+423",
    "code": "LI"
  },
  {
    "name": "Lithuania",
    "dial_code": "+370",
    "code": "LT"
  },
  {
    "name": "Luxembourg",
    "dial_code": "+352",
    "code": "LU"
  },
  {
    "name": "Macao",
    "dial_code": "+853",
    "code": "MO"
  },
  {
    "name": "Macedonia",
    "dial_code": "+389",
    "code": "MK"
  },
  {
    "name": "Madagascar",
    "dial_code": "+261",
    "code": "MG"
  },
  {
    "name": "Malawi",
    "dial_code": "+265",
    "code": "MW"
  },
  {
    "name": "Malaysia",
    "dial_code": "+60",
    "code": "MY"
  },
  {
    "name": "Maldives",
    "dial_code": "+960",
    "code": "MV"
  },
  {
    "name": "Mali",
    "dial_code": "+223",
    "code": "ML"
  },
  {
    "name": "Malta",
    "dial_code": "+356",
    "code": "MT"
  },
  {
    "name": "Marshall Islands",
    "dial_code": "+692",
    "code": "MH"
  },
  {
    "name": "Martinique",
    "dial_code": "+596",
    "code": "MQ"
  },
  {
    "name": "Mauritania",
    "dial_code": "+222",
    "code": "MR"
  },
  {
    "name": "Mauritius",
    "dial_code": "+230",
    "code": "MU"
  },
  {
    "name": "Mayotte",
    "dial_code": "+262",
    "code": "YT"
  },
  {
    "name": "Mexico",
    "dial_code": "+52",
    "code": "MX"
  },
  {
    "name": "Micronesia",
    "dial_code": "+691",
    "code": "FM"
  },
  {
    "name": "Moldova",
    "dial_code": "+373",
    "code": "MD"
  },
  {
    "name": "Monaco",
    "dial_code": "+377",
    "code": "MC"
  },
  {
    "name": "Mongolia",
    "dial_code": "+976",
    "code": "MN"
  },
  {
    "name": "Montenegro",
    "dial_code": "+382",
    "code": "ME"
  },
  {
    "name": "Montserrat",
    "dial_code": "+1 664",
    "code": "MS"
  },
  {
    "name": "Morocco",
    "dial_code": "+212",
    "code": "MA"
  },
  {
    "name": "Mozambique",
    "dial_code": "+258",
    "code": "MZ"
  },
  {
    "name": "Myanmar",
    "dial_code": "+95",
    "code": "MM"
  },
  {
    "name": "Namibia",
    "dial_code": "+264",
    "code": "NA"
  },
  {
    "name": "Nauru",
    "dial_code": "+674",
    "code": "NR"
  },
  {
    "name": "Nepal",
    "dial_code": "+977",
    "code": "NP"
  },
  {
    "name": "Netherlands",
    "dial_code": "+31",
    "code": "NL"
  },
  {
    "name": "Netherlands Antilles",
    "dial_code": "+599",
    "code": "AN"
  },
  {
    "name": "New Caledonia",
    "dial_code": "+687",
    "code": "NC"
  },
  {
    "name": "New Zealand",
    "dial_code": "+64",
    "code": "NZ"
  },
  {
    "name": "Nicaragua",
    "dial_code": "+505",
    "code": "NI"
  },
  {
    "name": "Niger",
    "dial_code": "+227",
    "code": "NE"
  },
  {
    "name": "Nigeria",
    "dial_code": "+234",
    "code": "NG"
  },
  {
    "name": "Niue",
    "dial_code": "+683",
    "code": "NU"
  },
  {
    "name": "North Korea",
    "dial_code": "+850",
    "code": "KP"
  },
  {
    "name": "Norfolk Island",
    "dial_code": "+672",
    "code": "NF"
  },
  {
    "name": "Northern Mariana Islands",
    "dial_code": "+1 670",
    "code": "MP"
  },
  {
    "name": "Norway",
    "dial_code": "+47",
    "code": "NO"
  },
  {
    "name": "Oman",
    "dial_code": "+968",
    "code": "OM"
  },
  {
    "name": "Pakistan",
    "dial_code": "+92",
    "code": "PK"
  },
  {
    "name": "Palau",
    "dial_code": "+680",
    "code": "PW"
  },
  {
    "name": "Palestine",
    "dial_code": "+970",
    "code": "PS"
  },
  {
    "name": "Panama",
    "dial_code": "+507",
    "code": "PA"
  },
  {
    "name": "Papua New Guinea",
    "dial_code": "+675",
    "code": "PG"
  },
  {
    "name": "Paraguay",
    "dial_code": "+595",
    "code": "PY"
  },
  {
    "name": "Peru",
    "dial_code": "+51",
    "code": "PE"
  },
  {
    "name": "Philippines",
    "dial_code": "+63",
    "code": "PH"
  },
  {
    "name": "Pitcairn",
    "dial_code": "+64",
    "code": "PN"
  },
  {
    "name": "Poland",
    "dial_code": "+48",
    "code": "PL"
  },
  {
    "name": "Portugal",
    "dial_code": "+351",
    "code": "PT"
  },
  {
    "name": "Puerto Rico",
    "dial_code": "+1 939",
    "code": "PR"
  },
  {
    "name": "Qatar",
    "dial_code": "+974",
    "code": "QA"
  },
  {
    "name": "Republic of the Congo",
    "dial_code": "+242",
    "code": "CG"
  },
  {
    "name": "Reunion",
    "dial_code": "+262",
    "code": "RE"
  },
  {
    "name": "Romania",
    "dial_code": "+40",
    "code": "RO"
  },
  {
    "name": "Russia",
    "dial_code": "+7",
    "code": "RU"
  },
  {
    "name": "Rwanda",
    "dial_code": "+250",
    "code": "RW"
  },
  {
    "name": "Saint Barthelemy",
    "dial_code": "+590",
    "code": "BL"
  },
  {
    "name": "Saint Helena",
    "dial_code": "+290",
    "code": "SH"
  },
  {
    "name": "Saint Kitts and Nevis",
    "dial_code": "+1 869",
    "code": "KN"
  },
  {
    "name": "Saint Lucia",
    "dial_code": "+1 785",
    "code": "LC"
  },
  {
    "name": "Saint Martin",
    "dial_code": "+590",
    "code": "MF"
  },
  {
    "name": "Saint Pierre and Miquelon",
    "dial_code": "+508",
    "code": "PM"
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "dial_code": "+1 784",
    "code": "VC"
  },
  {
    "name": "Samoa",
    "dial_code": "+685",
    "code": "WS"
  },
  {
    "name": "San Marino",
    "dial_code": "+378",
    "code": "SM"
  },
  {
    "name": "Sao Tome and Principe",
    "dial_code": "+239",
    "code": "ST"
  },
  {
    "name": "Saudi Arabia",
    "dial_code": "+966",
    "code": "SA"
  },
  {
    "name": "Senegal",
    "dial_code": "+221",
    "code": "SN"
  },
  {
    "name": "Serbia",
    "dial_code": "+381",
    "code": "RS"
  },
  {
    "name": "Seychelles",
    "dial_code": "+248",
    "code": "SC"
  },
  {
    "name": "Sierra Leone",
    "dial_code": "+232",
    "code": "SL"
  },
  {
    "name": "Singapore",
    "dial_code": "+65",
    "code": "SG"
  },
  {
    "name": "Sint Maarten",
    "dial_code": "+1 721",
    "code": "SX"
  },
  {
    "name": "Slovakia",
    "dial_code": "+421",
    "code": "SK"
  },
  {
    "name": "Slovenia",
    "dial_code": "+386",
    "code": "SI"
  },
  {
    "name": "Solomon Islands",
    "dial_code": "+677",
    "code": "SB"
  },
  {
    "name": "Somalia",
    "dial_code": "+252",
    "code": "SO"
  },
  {
    "name": "South Africa",
    "dial_code": "+27",
    "code": "ZA"
  },
  {
    "name": "South Korea",
    "dial_code": "+82",
    "code": "KR"
  },
  {
    "name": "South Sudan",
    "dial_code": "+211",
    "code": "SS"
  },
  {
    "name": "South Georgia and the South Sandwich Islands",
    "dial_code": "+500",
    "code": "GS"
  },
  {
    "name": "Spain",
    "dial_code": "+34",
    "code": "ES"
  },
  {
    "name": "Sri Lanka",
    "dial_code": "+94",
    "code": "LK"
  },
  {
    "name": "Sudan",
    "dial_code": "+249",
    "code": "SD"
  },
  {
    "name": "Suriname",
    "dial_code": "+597",
    "code": "SR"
  },
  {
    "name": "Svalbard and Jan Mayen",
    "dial_code": "+47",
    "code": "SJ"
  },
  {
    "name": "Swaziland",
    "dial_code": "+268",
    "code": "SZ"
  },
  {
    "name": "Sweden",
    "dial_code": "+46",
    "code": "SE"
  },
  {
    "name": "Switzerland",
    "dial_code": "+41",
    "code": "CH"
  },
  {
    "name": "Syria",
    "dial_code": "+963",
    "code": "SY"
  },
  {
    "name": "Taiwan",
    "dial_code": "+886",
    "code": "TW"
  },
  {
    "name": "Tajikistan",
    "dial_code": "+992",
    "code": "TJ"
  },
  {
    "name": "Tanzania",
    "dial_code": "+255",
    "code": "TZ"
  },
  {
    "name": "Thailand",
    "dial_code": "+66",
    "code": "TH"
  },
  {
    "name": "Togo",
    "dial_code": "+228",
    "code": "TG"
  },
  {
    "name": "Tokelau",
    "dial_code": "+690",
    "code": "TK"
  },
  {
    "name": "Tonga",
    "dial_code": "+676",
    "code": "TO"
  },
  {
    "name": "Trinidad and Tobago",
    "dial_code": "+1 868",
    "code": "TT"
  },
  {
    "name": "Tunisia",
    "dial_code": "+216",
    "code": "TN"
  },
  {
    "name": "Turkey",
    "dial_code": "+90",
    "code": "TR"
  },
  {
    "name": "Turkmenistan",
    "dial_code": "+993",
    "code": "TM"
  },
  {
    "name": "Turks and Caicos Islands",
    "dial_code": "+1 649",
    "code": "TC"
  },
  {
    "name": "Tuvalu",
    "dial_code": "+688",
    "code": "TV"
  },
  {
    "name": "U.S. Virgin Islands",
    "dial_code": "+1 340",
    "code": "VI"
  },
  {
    "name": "Uganda",
    "dial_code": "+256",
    "code": "UG"
  },
  {
    "name": "Ukraine",
    "dial_code": "+380",
    "code": "UA"
  },
  {
    "name": "United Arab Emirates",
    "dial_code": "+971",
    "code": "AE"
  },
  {
    "name": "United Kingdom",
    "dial_code": "+44",
    "code": "GB"
  },
  {
    "name": "United States",
    "dial_code": "+1",
    "code": "US"
  },
  {
    "name": "Uruguay",
    "dial_code": "+598",
    "code": "UY"
  },
  {
    "name": "Uzbekistan",
    "dial_code": "+998",
    "code": "UZ"
  },
  {
    "name": "Vanuatu",
    "dial_code": "+678",
    "code": "VU"
  },
  {
    "name": "Vatican",
    "dial_code": "+379",
    "code": "VA"
  },
  {
    "name": "Venezuela",
    "dial_code": "+58",
    "code": "VE"
  },
  {
    "name": "Vietnam",
    "dial_code": "+84",
    "code": "VN"
  },
  {
    "name": "Wallis and Futuna",
    "dial_code": "+681",
    "code": "WF"
  },
  {
    "name": "Western Sahara",
    "dial_code": "+212",
    "code": "EH"
  },
  {
    "name": "Yemen",
    "dial_code": "+967",
    "code": "YE"
  },
  {
    "name": "Zambia",
    "dial_code": "+260",
    "code": "ZM"
  },
  {
    "name": "Zimbabwe",
    "dial_code": "+263",
    "code": "ZW"
  }
];

/* ======================================================================================================================================
    Get Miles in Landing Page
 ========================================================================================================================================= */
var HELPER_commonMilesArray = [
                            {"hideValue" : 0, "displayValue" : "--Select within miles--"},
                            {"hideValue" : 5, "displayValue" : "Within 5 miles (8 KM)"},
                            {"hideValue" : 10, "displayValue" : "Within 10 miles (16 km)"},
                            {"hideValue" : 20, "displayValue" : "Within 20 miles (32 km)"},
                            {"hideValue" : 30, "displayValue" : "Within 30 miles (48 km)"},
                            {"hideValue" : 40, "displayValue" : "Within 40 miles (64 km)"},
                            {"hideValue" : 50, "displayValue" : "Within 50 miles (80 km)"},
                            {"hideValue" : 60, "displayValue" : "Within 60 miles (97 km)"},
                            {"hideValue" : 70, "displayValue" : "Within 70 miles (113 km)"},
                            {"hideValue" : 80, "displayValue" : "Within 80 miles (129 km)"},
                            {"hideValue" : 90, "displayValue" : "Within 90 miles (145 km)"},
                            {"hideValue" : 100, "displayValue" : "Within 100 miles (161 km)"},
                            {"hideValue" : 150, "displayValue" : "Within 150 miles (241 km)"},
                            {"hideValue" : 200, "displayValue" : "Within 200 miles (322 km)"},
                            {"hideValue" : 300, "displayValue" : "Within 300 miles (483 km)"},
                            {"hideValue" : 400, "displayValue" : "Within 400 miles (644 km)"},
                            {"hideValue" : 500, "displayValue" : "Within 500 miles (805 km)"},
                            {"hideValue" : 1000, "displayValue" : "Within 1000 miles (1609 km)"},
                            {"hideValue" : "countrywide", "displayValue" : "Country-wide"}
                        ];
/* ======================================================================================================================================
    Get Height for users in seeking and edit search pages
 ========================================================================================================================================= */

var HELPER_heightData= [
                              {id:1,"value":"4.00,","name":"Under 4 feet"},
                              {id:2,"value":"4.01,(124cm)","name":"4'01\" (124cm)"},
                              {id:3,"value":"4.02,(127cm)","name":"4'02\" (127cm)"},
                              {id:4,"value":"4.03,(129cm)","name":"4'03\" (129cm)"},
                              {id:5,"value":"4.04,(132cm)","name":"4'04\" (132cm)"},
                              {id:6,"value":"4.05,(134cm)","name":"4'05\" (134cm)"},
                              {id:7,"value":"4.06,(137cm)","name":"4'06\" (137cm)"},
                              {id:8,"value":"4.07,(139cm)","name":"4'07\" (139cm)"},
                              {id:9,"value":"4.08,(142cm)","name":"4'08\" (142cm)"},
                              {id:10,"value":"4.09,(144cm)","name":"4'09\" (144cm)"},
                              {id:11,"value":"4.10,(147cm)","name":"4'10\" (147cm)"},
                              {id:12,"value":"4.11,(149cm)","name":"4'11\" (149cm)"},
                              {id:13,"value":"5.00,(152cm)","name":"5'00\" (152cm)"},
                              {id:14,"value":"5.01,(154cm)","name":"5'01\" (154cm)"},
                              {id:15,"value":"5.02,(157cm)","name":"5'02\" (157cm)"},
                              {id:16,"value":"5.03,(160cm)","name":"5'03\" (160cm)"},
                              {id:17,"value":"5.04,(162cm)","name":"5'04\" (162cm)"},
                              {id:18,"value":"5.05,(165cm)","name":"5'05\" (165cm)"},
                              {id:19,"value":"5.06,(167cm)","name":"5'06\" (167cm)"},
                              {id:20,"value":"5.07,(170cm)","name":"5'07\" (170cm)"},
                              {id:21,"value":"5.08,(172cm)","name":"5'08\" (172cm)"},
                              {id:22,"value":"5.09,(175cm)","name":"5'09\" (175cm)"},
                              {id:23,"value":"5.10,(177cm)","name":"5'10\" (177cm)"},
                              {id:24,"value":"5.11,(180cm)","name":"5'11\" (180cm)"},
                              {id:25,"value":"6.00,(182cm)","name":"6'00\" (182cm)"},
                              {id:26,"value":"6.01,(185cm)","name":"6'01\" (185cm)"},
                              {id:27,"value":"6.02,(187cm)","name":"6'02\" (187cm)"},
                              {id:28,"value":"6.03,(190cm)","name":"6'03\" (190cm)"},
                              {id:29,"value":"6.04,(193cm)","name":"6'04\" (193cm)"},
                              {id:30,"value":"6.05,(195cm)","name":"6'05\" (195cm)"},
                              {id:31,"value":"6.06,(198cm)","name":"6'06\" (198cm)"},
                              {id:32,"value":"6.07,(200cm)","name":"6'07\" (200cm)"},
                              {id:33,"value":"6.08,(203cm)","name":"6'08\" (203cm)"},
                              {id:34,"value":"6.09,(205cm)","name":"6'09\" (205cm)"},
                              {id:35,"value":"6.10,(207cm)","name":"6'10\" (207cm)"}

                        ];


/* ======================================================================================================================================
    Get current Date and Time
 ========================================================================================================================================= */
var HELPER_monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
var HELPER_now                  = new Date();
var HELPER_currentDate          =  HELPER_now.getDate();
var HELPER_currentMonth         =  HELPER_monthNames[HELPER_now.getMonth()];
var HELPER_currentMonthNumber   =  HELPER_now.getMonth()+ 1;
var HELPER_currentYear          =  HELPER_now.getFullYear();
var HELPER_currentHour          =  HELPER_now.getHours();
var HELPER_currentMinute        =  HELPER_now.getMinutes();
var HELPER_currentSecond        =  HELPER_now.getSeconds();
if(HELPER_currentDate<10) {
    HELPER_currentDate= '0'+HELPER_currentDate;
}
if(HELPER_currentMonthNumber<10) {
    HELPER_currentMonthNumber = '0'+HELPER_currentMonthNumber;
}
if(HELPER_currentHour<10) {
    HELPER_currentHour = '0'+HELPER_currentHour;
}
if(HELPER_currentMinute<10) {
    HELPER_currentMinute = '0'+HELPER_currentMinute;
}
if(HELPER_currentSecond<10) {
    HELPER_currentSecond = '0'+HELPER_currentSecond;
}

var HELPER_DATE_TIME_HYPHON         = HELPER_currentYear+"-"+HELPER_currentMonthNumber+"-"+HELPER_currentDate+" "+HELPER_currentHour+":"+HELPER_currentMinute+":"+HELPER_currentSecond;
var HELPER_DATE_SLASH_D_M_Y         = HELPER_currentDate+"/"+HELPER_currentMonthNumber+"/"+HELPER_currentYear;
var HELPER_DATE_SLASH_M_D_Y         = HELPER_currentMonthNumber+"/"+HELPER_currentDate+"/"+HELPER_currentYear;
console.log("HELPER -=====================>>>>>>>>>>>>>>>>>>>>");
console.log(HELPER_currentDate+"_"+HELPER_currentMonth+"_"+HELPER_currentYear+"_"+HELPER_currentHour+"_"+HELPER_currentMinute+"_"+HELPER_currentSecond);
console.log("HELPER -=====================>>>>>>>>>>>>>>>>>>>>");






/* ======================================================================================================================================
    Get current Clientside Time zone("<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js"></script>")
 ========================================================================================================================================= */
// var helper_tz = jstz.determine(); // Determines the time zone of the browser client
// var HELPER_CURRENT_CLIENT_TIMEZONE_NAME = helper_tz.name(); //'Asia/Kolhata' for Indian Time.
// //console.log(HELPER_CURRENT_CLIENT_TIMEZONE_NAME);
// var HELPER_SERVER_TIMEZONE_NAME  = 'America/New_York';
// var HELPER_DEFAULT_ZONE_FILE     = ['asia', 'backward', 'northamerica', 'southamerica'];





