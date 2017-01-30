angular.module('service',['ngMaterial'])
.factory('appServices', function($mdDialog,$http,localStorageService,$templateCache,$mdDialog,$mdToast){
	var service={};

	service.milesList = function(){
		var miles = [
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
	    return miles;
	}

	service.phoneCodeArray = function(){
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
		return HELPER_countryPhoneCode;
	}
	

service.alert =function(alert){

				$mdToast.show(
				$mdToast.simple()
				.textContent(alert)
				.position('top right')
				.hideDelay(6000)
				);

		};
	service.modal=function(template, controller,ev,data)
	{
		
		var modal;
		modal=
		{
			controller: controller,
			templateUrl:template ,
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:false,
			disableParentScroll:true
		};

		if(data)
		{

			modal=
			{	
				controller: controller,
				templateUrl:template ,
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:false,
				disableParentScroll:true,
				locals: { data:data }
			}
		}
	
		$mdDialog.show(modal).then(function(answer) {
         // $scope.status = 'You said the information was "' + answer + '".';
     }, function() {
         // $scope.status = 'You cancelled the dialog.';
     });
	};


	service.post=function(url,data, callback)
	{	

		var $request={
			method:'POST',
			url:url,
			data:data
		};

		var token;
		
		if(sessionStorage['ls.user'])
		{
			token=JSON.parse(sessionStorage['ls.user']).token;
		}
		if(localStorage['ls.user'])
		{
			token=JSON.parse(localStorage['ls.user']).token;
		}
		if(token)
		{
		    $http.defaults.headers.common['user-token'] = token;
	        $http.defaults.headers.common['user-role'] = "user";
        }
        
		$http($request).then(success, error);

		function success(response){
			callback(response.data);
		};

		function error(response){
			callback(response);
		};


	};
	service.checkStorage= function(key){
		if (localStorageService.get(key,"sessionStorage")){
			return localStorageService.get(key,"sessionStorage");
		}
		else if (localStorageService.get(key,"localStorage")){
			return localStorageService.get(key,"localStorage");
		}
		else
			return false;
	};
	service.sessionStorage=function(key,data){
		
		localStorageService.set(key, data, "localStorage");
	};
	service.getSessionStorage=function(key){
		
		localStorageService.get(key,"localStorage");
	};
	service.logout=function(key)
	{
		
		Object.keys(sessionStorage).filter(function(key){
				sessionStorage.removeItem(key)
		});
		Object.keys(localStorage).filter(function(key){
			localStorage.removeItem(key)
		});

		return true;
	};

	
	service.getCountry= function(callback){

		var $request={
			method:'GET',
			url:local_api_url+'country.json',
			cache:$templateCache
		
		};

		$http($request).then(success);
		function success(reponse)
		{
			callback(reponse.data);
		}

	};
	service.openAlertBox= function(title,message,theme){
	
     var alert=$mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(false)
        .title(title)
        .htmlContent(message)
        .ariaLabel('Alert Dialog')
        .ok('Ok')
        .theme(theme);

  $mdDialog.show(alert);

  }

  service.confirmAlert= function(title,message,theme,btnyes, btnno){
	
		var confirm = $mdDialog.confirm()
		  .title(title)
          .textContent(message)
          .ariaLabel('confirm')
          .ok(btnyes)
          .cancel(btnno);

          return confirm;


  };
    service.loader= function(message){
	
		var loader = $mdDialog.alert()
          .textContent(message)
          .ariaLabel('loader')
          .ok("ok")
          .theme('loader')

           $mdDialog.show(loader);


  }
  service.removeNull= function(data)
  {

  	if(data)
  	{
  		angular.forEach(data,function(value, key){

  			if(value==null || value=='null' || value=="" || value=='undefined')
  			{
  				delete data[key];
  			}
  		});

  			return data;
  	}

  }

	return service;
});





function getAge(dateString)
{

  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = (today.getMonth()+1)-(birthDate.getMonth()+1);
  var data={};
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
  {
      age--;
      m=12-1;
  }
  data["age"]=age;

  if(m!=0)
  {
    data["month"]=m;
  }

  return data;
}

function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }

function getDateStr(date)
 {	
	var d2={};
 	if(date)
 	{
 		var d=new Date(date);
 		d2['day']=d.getDate().toString();
 		d2['month']=(d.getMonth()+1).toString();
 		d2['year']=d.getFullYear().toString();
		return d2;
	}
}

function getFormateddate(date)
{
	console.log("sdkjfsdjk")
	var d=new Date(date);
	 console.log(d)
	return d
}
function strToDate(yy,mm,dd)
{	

	var date=new Date();
	date.setDate(dd);
	date.setMonth(mm-1);
	date.setFullYear(yy);
	return date;	

}

//create address node


function strToAddress(country,streetAddress,extendedAddress,state,city,postal,location)
{

var data={};

if(country)
{
  data["country"]=country;
}
if(state)
{
  data["state"]=state;
}
if(city)
{
  data["city"]=city;
}
if(postal)
{
  data["zipcode"]=postal;
}

if(streetAddress)
{
  data["streetAddress"]=streetAddress;
}
if(extendedAddress)
{
  data["extendedAddress"]=extendedAddress;
}
if(location)
{	
	if(location.lat )
	{
		data["latitude"]=parseFloat(location.lat);
	}
	if(location.latitude){
		data["latitude"]=parseFloat(location.latitude);
	}
	if(location.longitude){
		data["longitude"]=parseFloat(location.longitude);
	}
	if(location.lat)
	{
  		data["longitude"]=parseFloat(location.lng);
  	}
}

return data;
}

function setJsonData(data, node){
	if(node)
	{
		angular.forEach(node, function(value, key){
			data[key]=value;
		});
		return data;
	}
}
