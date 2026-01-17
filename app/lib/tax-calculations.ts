// Swedish tax calculation utilities for freelancers with F-skatt

// 2026 Swedish tax table (Skattetabell)
// Format: [fromSalary, toSalary, taxAmount or taxPercentage]
// Tax amounts are in SEK for salaries up to 80,000 kr
// Tax percentages apply for salaries above 80,000 kr
const TAX_TABLE_2026: Array<[number, number, number]> = [
  [1, 2000, 0],
  [2001, 2100, 150],
  [2101, 2200, 152],
  [2201, 2300, 162],
  [2301, 2400, 173],
  [2401, 2500, 183],
  [2501, 2600, 194],
  [2601, 2700, 204],
  [2701, 2800, 215],
  [2801, 2900, 217],
  [2901, 3000, 227],
  [3001, 3100, 238],
  [3101, 3200, 248],
  [3201, 3300, 259],
  [3301, 3400, 269],
  [3401, 3500, 272],
  [3501, 3600, 282],
  [3601, 3700, 293],
  [3701, 3800, 303],
  [3801, 3900, 314],
  [3901, 4000, 324],
  [4001, 4100, 326],
  [4101, 4200, 337],
  [4201, 4300, 347],
  [4301, 4400, 358],
  [4401, 4500, 368],
  [4501, 4600, 379],
  [4601, 4700, 381],
  [4701, 4800, 391],
  [4801, 4900, 402],
  [4901, 5000, 412],
  [5001, 5100, 422],
  [5101, 5200, 432],
  [5201, 5300, 442],
  [5301, 5400, 444],
  [5401, 5500, 454],
  [5501, 5600, 464],
  [5601, 5700, 474],
  [5701, 5800, 484],
  [5801, 5900, 494],
  [5901, 6000, 496],
  [6001, 6100, 506],
  [6101, 6200, 516],
  [6201, 6300, 526],
  [6301, 6400, 536],
  [6401, 6500, 546],
  [6501, 6600, 548],
  [6601, 6700, 558],
  [6701, 6800, 568],
  [6801, 6900, 578],
  [6901, 7000, 588],
  [7001, 7100, 598],
  [7101, 7200, 619],
  [7201, 7300, 639],
  [7301, 7400, 660],
  [7401, 7500, 681],
  [7501, 7600, 701],
  [7601, 7700, 722],
  [7701, 7800, 743],
  [7801, 7900, 763],
  [7901, 8000, 784],
  [8001, 8100, 804],
  [8101, 8200, 825],
  [8201, 8300, 846],
  [8301, 8400, 866],
  [8401, 8500, 887],
  [8501, 8600, 908],
  [8601, 8700, 928],
  [8701, 8800, 949],
  [8801, 8900, 970],
  [8901, 9000, 990],
  [9001, 9100, 1011],
  [9101, 9200, 1032],
  [9201, 9300, 1052],
  [9301, 9400, 1073],
  [9401, 9500, 1093],
  [9501, 9600, 1114],
  [9601, 9700, 1135],
  [9701, 9800, 1155],
  [9801, 9900, 1176],
  [9901, 10000, 1196],
  [10001, 10100, 1217],
  [10101, 10200, 1238],
  [10201, 10300, 1258],
  [10301, 10400, 1279],
  [10401, 10500, 1300],
  [10501, 10600, 1320],
  [10601, 10700, 1341],
  [10701, 10800, 1362],
  [10801, 10900, 1382],
  [10901, 11000, 1403],
  [11001, 11100, 1423],
  [11101, 11200, 1444],
  [11201, 11300, 1465],
  [11301, 11400, 1485],
  [11401, 11500, 1506],
  [11501, 11600, 1527],
  [11601, 11700, 1547],
  [11701, 11800, 1568],
  [11801, 11900, 1589],
  [11901, 12000, 1609],
  [12001, 12100, 1630],
  [12101, 12200, 1650],
  [12201, 12300, 1671],
  [12301, 12400, 1692],
  [12401, 12500, 1712],
  [12501, 12600, 1733],
  [12601, 12700, 1754],
  [12701, 12800, 1774],
  [12801, 12900, 1795],
  [12901, 13000, 1815],
  [13001, 13100, 1836],
  [13101, 13200, 1857],
  [13201, 13300, 1877],
  [13301, 13400, 1898],
  [13401, 13500, 1919],
  [13501, 13600, 1940],
  [13601, 13700, 1960],
  [13701, 13800, 1980],
  [13801, 13900, 2000],
  [13901, 14000, 2020],
  [14001, 14100, 2040],
  [14101, 14200, 2060],
  [14201, 14300, 2080],
  [14301, 14400, 2100],
  [14401, 14500, 2120],
  [14501, 14600, 2140],
  [14601, 14700, 2159],
  [14701, 14800, 2179],
  [14801, 14900, 2199],
  [14901, 15000, 2219],
  [15001, 15100, 2239],
  [15101, 15200, 2259],
  [15201, 15300, 2279],
  [15301, 15400, 2299],
  [15401, 15500, 2319],
  [15501, 15600, 2339],
  [15601, 15700, 2359],
  [15701, 15800, 2379],
  [15801, 15900, 2399],
  [15901, 16000, 2419],
  [16001, 16100, 2443],
  [16101, 16200, 2467],
  [16201, 16300, 2492],
  [16301, 16400, 2516],
  [16401, 16500, 2540],
  [16501, 16600, 2565],
  [16601, 16700, 2589],
  [16701, 16800, 2613],
  [16801, 16900, 2637],
  [16901, 17000, 2662],
  [17001, 17100, 2686],
  [17101, 17200, 2710],
  [17201, 17300, 2735],
  [17301, 17400, 2759],
  [17401, 17500, 2783],
  [17501, 17600, 2808],
  [17601, 17700, 2832],
  [17701, 17800, 2856],
  [17801, 17900, 2880],
  [17901, 18000, 2905],
  [18001, 18100, 2929],
  [18101, 18200, 2953],
  [18201, 18300, 2978],
  [18301, 18400, 3002],
  [18401, 18500, 3026],
  [18501, 18600, 3051],
  [18601, 18700, 3075],
  [18701, 18800, 3099],
  [18801, 18900, 3123],
  [18901, 19000, 3148],
  [19001, 19100, 3172],
  [19101, 19200, 3196],
  [19201, 19300, 3221],
  [19301, 19400, 3245],
  [19401, 19500, 3269],
  [19501, 19600, 3294],
  [19601, 19700, 3318],
  [19701, 19800, 3342],
  [19801, 19900, 3366],
  [19901, 20000, 3391],
  [20001, 20200, 3439],
  [20201, 20400, 3488],
  [20401, 20600, 3537],
  [20601, 20800, 3585],
  [20801, 21000, 3634],
  [21001, 21200, 3682],
  [21201, 21400, 3731],
  [21401, 21600, 3780],
  [21601, 21800, 3828],
  [21801, 22000, 3877],
  [22001, 22200, 3925],
  [22201, 22400, 3974],
  [22401, 22600, 4023],
  [22601, 22800, 4071],
  [22801, 23000, 4120],
  [23001, 23200, 4170],
  [23201, 23400, 4220],
  [23401, 23600, 4270],
  [23601, 23800, 4320],
  [23801, 24000, 4371],
  [24001, 24200, 4421],
  [24201, 24400, 4471],
  [24401, 24600, 4521],
  [24601, 24800, 4572],
  [24801, 25000, 4622],
  [25001, 25200, 4672],
  [25201, 25400, 4722],
  [25401, 25600, 4773],
  [25601, 25800, 4823],
  [25801, 26000, 4873],
  [26001, 26200, 4923],
  [26201, 26400, 4974],
  [26401, 26600, 5024],
  [26601, 26800, 5074],
  [26801, 27000, 5124],
  [27001, 27200, 5175],
  [27201, 27400, 5225],
  [27401, 27600, 5275],
  [27601, 27800, 5325],
  [27801, 28000, 5376],
  [28001, 28200, 5426],
  [28201, 28400, 5476],
  [28401, 28600, 5526],
  [28601, 28800, 5577],
  [28801, 29000, 5627],
  [29001, 29200, 5677],
  [29201, 29400, 5727],
  [29401, 29600, 5778],
  [29601, 29800, 5828],
  [29801, 30000, 5878],
  [30001, 30200, 5928],
  [30201, 30400, 5979],
  [30401, 30600, 6029],
  [30601, 30800, 6079],
  [30801, 31000, 6129],
  [31001, 31200, 6180],
  [31201, 31400, 6230],
  [31401, 31600, 6280],
  [31601, 31800, 6330],
  [31801, 32000, 6381],
  [32001, 32200, 6431],
  [32201, 32400, 6481],
  [32401, 32600, 6531],
  [32601, 32800, 6582],
  [32801, 33000, 6632],
  [33001, 33200, 6682],
  [33201, 33400, 6732],
  [33401, 33600, 6783],
  [33601, 33800, 6833],
  [33801, 34000, 6883],
  [34001, 34200, 6933],
  [34201, 34400, 6984],
  [34401, 34600, 7034],
  [34601, 34800, 7084],
  [34801, 35000, 7134],
  [35001, 35200, 7185],
  [35201, 35400, 7235],
  [35401, 35600, 7285],
  [35601, 35800, 7335],
  [35801, 36000, 7386],
  [36001, 36200, 7436],
  [36201, 36400, 7486],
  [36401, 36600, 7536],
  [36601, 36800, 7587],
  [36801, 37000, 7637],
  [37001, 37200, 7687],
  [37201, 37400, 7737],
  [37401, 37600, 7788],
  [37601, 37800, 7838],
  [37801, 38000, 7888],
  [38001, 38200, 7938],
  [38201, 38400, 7989],
  [38401, 38600, 8039],
  [38601, 38800, 8089],
  [38801, 39000, 8139],
  [39001, 39200, 8189],
  [39201, 39400, 8239],
  [39401, 39600, 8289],
  [39601, 39800, 8339],
  [39801, 40000, 8402],
  [40001, 40200, 8468],
  [40201, 40400, 8534],
  [40401, 40600, 8600],
  [40601, 40800, 8666],
  [40801, 41000, 8732],
  [41001, 41200, 8798],
  [41201, 41400, 8864],
  [41401, 41600, 8930],
  [41601, 41800, 8996],
  [41801, 42000, 9062],
  [42001, 42200, 9128],
  [42201, 42400, 9194],
  [42401, 42600, 9260],
  [42601, 42800, 9326],
  [42801, 43000, 9392],
  [43001, 43200, 9458],
  [43201, 43400, 9524],
  [43401, 43600, 9590],
  [43601, 43800, 9656],
  [43801, 44000, 9722],
  [44001, 44200, 9788],
  [44201, 44400, 9854],
  [44401, 44600, 9920],
  [44601, 44800, 9986],
  [44801, 45000, 10052],
  [45001, 45200, 10118],
  [45201, 45400, 10184],
  [45401, 45600, 10250],
  [45601, 45800, 10316],
  [45801, 46000, 10382],
  [46001, 46200, 10448],
  [46201, 46400, 10514],
  [46401, 46600, 10580],
  [46601, 46800, 10646],
  [46801, 47000, 10712],
  [47001, 47200, 10778],
  [47201, 47400, 10844],
  [47401, 47600, 10910],
  [47601, 47800, 10976],
  [47801, 48000, 11042],
  [48001, 48200, 11108],
  [48201, 48400, 11174],
  [48401, 48600, 11240],
  [48601, 48800, 11306],
  [48801, 49000, 11372],
  [49001, 49200, 11438],
  [49201, 49400, 11504],
  [49401, 49600, 11570],
  [49601, 49800, 11636],
  [49801, 50000, 11702],
  [50001, 50200, 11768],
  [50201, 50400, 11834],
  [50401, 50600, 11900],
  [50601, 50800, 11966],
  [50801, 51000, 12032],
  [51001, 51200, 12098],
  [51201, 51400, 12164],
  [51401, 51600, 12230],
  [51601, 51800, 12296],
  [51801, 52000, 12362],
  [52001, 52200, 12428],
  [52201, 52400, 12494],
  [52401, 52600, 12560],
  [52601, 52800, 12626],
  [52801, 53000, 12692],
  [53001, 53200, 12758],
  [53201, 53400, 12824],
  [53401, 53600, 12890],
  [53601, 53800, 12956],
  [53801, 54000, 13022],
  [54001, 54200, 13088],
  [54201, 54400, 13154],
  [54401, 54600, 13220],
  [54601, 54800, 13286],
  [54801, 55000, 13352],
  [55001, 55200, 13451],
  [55201, 55400, 13557],
  [55401, 55600, 13663],
  [55601, 55800, 13769],
  [55801, 56000, 13875],
  [56001, 56200, 13981],
  [56201, 56400, 14087],
  [56401, 56600, 14193],
  [56601, 56800, 14299],
  [56801, 57000, 14405],
  [57001, 57200, 14511],
  [57201, 57400, 14617],
  [57401, 57600, 14723],
  [57601, 57800, 14829],
  [57801, 58000, 14935],
  [58001, 58200, 15041],
  [58201, 58400, 15147],
  [58401, 58600, 15253],
  [58601, 58800, 15359],
  [58801, 59000, 15465],
  [59001, 59200, 15571],
  [59201, 59400, 15677],
  [59401, 59600, 15783],
  [59601, 59800, 15889],
  [59801, 60000, 15995],
  [60001, 60200, 16101],
  [60201, 60400, 16207],
  [60401, 60600, 16313],
  [60601, 60800, 16419],
  [60801, 61000, 16525],
  [61001, 61200, 16631],
  [61201, 61400, 16737],
  [61401, 61600, 16843],
  [61601, 61800, 16949],
  [61801, 62000, 17055],
  [62001, 62200, 17161],
  [62201, 62400, 17267],
  [62401, 62600, 17373],
  [62601, 62800, 17479],
  [62801, 63000, 17585],
  [63001, 63200, 17691],
  [63201, 63400, 17797],
  [63401, 63600, 17903],
  [63601, 63800, 18009],
  [63801, 64000, 18115],
  [64001, 64200, 18221],
  [64201, 64400, 18327],
  [64401, 64600, 18433],
  [64601, 64800, 18539],
  [64801, 65000, 18645],
  [65001, 65200, 18751],
  [65201, 65400, 18857],
  [65401, 65600, 18963],
  [65601, 65800, 19069],
  [65801, 66000, 19175],
  [66001, 66200, 19281],
  [66201, 66400, 19387],
  [66401, 66600, 19493],
  [66601, 66800, 19599],
  [66801, 67000, 19705],
  [67001, 67200, 19811],
  [67201, 67400, 19917],
  [67401, 67600, 20023],
  [67601, 67800, 20129],
  [67801, 68000, 20235],
  [68001, 68200, 20341],
  [68201, 68400, 20447],
  [68401, 68600, 20553],
  [68601, 68800, 20659],
  [68801, 69000, 20765],
  [69001, 69200, 20871],
  [69201, 69400, 20977],
  [69401, 69600, 21083],
  [69601, 69800, 21189],
  [69801, 70000, 21295],
  [70001, 70200, 21401],
  [70201, 70400, 21507],
  [70401, 70600, 21613],
  [70601, 70800, 21719],
  [70801, 71000, 21825],
  [71001, 71200, 21931],
  [71201, 71400, 22037],
  [71401, 71600, 22143],
  [71601, 71800, 22249],
  [71801, 72000, 22355],
  [72001, 72200, 22461],
  [72201, 72400, 22567],
  [72401, 72600, 22673],
  [72601, 72800, 22779],
  [72801, 73000, 22885],
  [73001, 73200, 22991],
  [73201, 73400, 23097],
  [73401, 73600, 23203],
  [73601, 73800, 23309],
  [73801, 74000, 23415],
  [74001, 74200, 23521],
  [74201, 74400, 23627],
  [74401, 74600, 23733],
  [74601, 74800, 23839],
  [74801, 75000, 23945],
  [75001, 75200, 24051],
  [75201, 75400, 24157],
  [75401, 75600, 24263],
  [75601, 75800, 24369],
  [75801, 76000, 24475],
  [76001, 76200, 24581],
  [76201, 76400, 24687],
  [76401, 76600, 24793],
  [76601, 76800, 24899],
  [76801, 77000, 25005],
  [77001, 77200, 25111],
  [77201, 77400, 25217],
  [77401, 77600, 25323],
  [77601, 77800, 25429],
  [77801, 78000, 25535],
  [78001, 78200, 25641],
  [78201, 78400, 25747],
  [78401, 78600, 25853],
  [78601, 78800, 25959],
  [78801, 79000, 26065],
  [79001, 79200, 26171],
  [79201, 79400, 26277],
  [79401, 79600, 26383],
  [79601, 79800, 26489],
  [79801, 80000, 26595],
]

// High income tax brackets (percentage-based) for 2026
const HIGH_INCOME_TAX_BRACKETS_2026: Array<[number, number, number]> = [
  [80001, 81000, 0.33],
  [81001, 85400, 0.34],
  [85401, 90200, 0.35],
  [90201, 95600, 0.36],
  [95601, 102600, 0.37],
  [102601, 109600, 0.38],
  [109601, 117000, 0.39],
  [117001, 127400, 0.40],
  [127401, 138400, 0.41],
  [138401, 151600, 0.42],
  [151601, 167600, 0.43],
  [167601, 187400, 0.44],
  [187401, 212400, 0.45],
  [212401, 245000, 0.46],
  [245001, 289600, 0.47],
  [289601, 354000, 0.48],
  [354001, 455200, 0.49],
  [455201, 637200, 0.50],
  [637201, 1062000, 0.51],
  [1062001, Infinity, 0.52],
]

// Look up tax from the 2026 tax table
export function getTaxFromTable2026(grossMonthlySalary: number): number {
  if (grossMonthlySalary <= 0) return 0
  
  // Check fixed amount table first (up to 80,000 kr)
  for (const [from, to, tax] of TAX_TABLE_2026) {
    if (grossMonthlySalary >= from && grossMonthlySalary <= to) {
      return tax
    }
  }
  
  // For high incomes, use percentage brackets
  for (const [from, to, rate] of HIGH_INCOME_TAX_BRACKETS_2026) {
    if (grossMonthlySalary >= from && grossMonthlySalary <= to) {
      return Math.round(grossMonthlySalary * rate)
    }
  }
  
  // Fallback for very high incomes
  return Math.round(grossMonthlySalary * 0.52)
}

// Municipality tax rates for 2024 (examples - should be updated annually)
export const MUNICIPALITY_TAX_RATES: Record<string, number> = {
  'Stockholm': 0.2912,
  'Göteborg': 0.3235,
  'Malmö': 0.3224,
  'Uppsala': 0.3319,
  'Linköping': 0.3215,
  'Örebro': 0.3335,
  'Västerås': 0.3206,
  'Helsingborg': 0.3108,
  'Norrköping': 0.3265,
  'Jönköping': 0.3374,
  'Umeå': 0.3380,
  'Lund': 0.3184,
  'Växjö': 0.3219,
  'Kristianstad': 0.3225,
  'Karlstad': 0.3345,
  'Halmstad': 0.3103,
  'Sundsvall': 0.3399,
  'Gävle': 0.3373,
  'Borås': 0.3276,
  'Södertälje': 0.3213,
}

// Swedish tax constants for 2024
export const TAX_CONSTANTS = {
  // Employer social contributions (arbetsgivaravgift)
  EMPLOYER_SOCIAL_CONTRIBUTION_RATE: 0.3142,
  
  // Special payroll tax on pension contributions
  PENSION_TAX_RATE: 0.2426,
  
  // Standard pension contribution percentage
  STANDARD_PENSION_RATE: 0.045, // 4.5% of gross salary
  
  // State income tax threshold (statlig inkomstskatt)
  STATE_TAX_THRESHOLD_YEARLY: 598500, // SEK per year for 2024
  STATE_TAX_RATE: 0.20, // 20% on income above threshold
  
  // Basic deduction (grundavdrag) - simplified calculation
  BASIC_DEDUCTION_LOW: 16900,
  BASIC_DEDUCTION_HIGH: 38000,
  
  // VAT rate
  VAT_RATE: 0.25,
}

export interface SalaryCalculation {
  grossSalary: number
  employerContributions: number
  pensionContribution: number
  pensionTax: number
  incomeTax: number
  netSalary: number
  totalCost: number
  effectiveTaxRate: number
}

// Calculate basic deduction (grundavdrag)
export function calculateBasicDeduction(yearlyIncome: number): number {
  if (yearlyIncome <= 0) return 0
  
  // Simplified calculation - actual calculation is more complex
  if (yearlyIncome < 100000) {
    return TAX_CONSTANTS.BASIC_DEDUCTION_HIGH
  } else if (yearlyIncome < 200000) {
    return TAX_CONSTANTS.BASIC_DEDUCTION_HIGH - 
           ((yearlyIncome - 100000) / 100000) * 
           (TAX_CONSTANTS.BASIC_DEDUCTION_HIGH - TAX_CONSTANTS.BASIC_DEDUCTION_LOW)
  } else if (yearlyIncome < 500000) {
    return TAX_CONSTANTS.BASIC_DEDUCTION_LOW + 
           Math.max(0, 200000 - yearlyIncome) / 200000 * 5000
  }
  return TAX_CONSTANTS.BASIC_DEDUCTION_LOW
}

// Calculate municipality tax
export function calculateMunicipalityTax(
  yearlyIncome: number,
  municipality: string = 'Stockholm'
): number {
  const taxRate = MUNICIPALITY_TAX_RATES[municipality] || MUNICIPALITY_TAX_RATES['Stockholm']
  const basicDeduction = calculateBasicDeduction(yearlyIncome)
  const taxableIncome = Math.max(0, yearlyIncome - basicDeduction)
  
  return taxableIncome * taxRate
}

// Calculate state income tax (statlig inkomstskatt)
export function calculateStateTax(yearlyIncome: number): number {
  const basicDeduction = calculateBasicDeduction(yearlyIncome)
  const taxableIncome = Math.max(0, yearlyIncome - basicDeduction)
  
  if (taxableIncome <= TAX_CONSTANTS.STATE_TAX_THRESHOLD_YEARLY) {
    return 0
  }
  
  return (taxableIncome - TAX_CONSTANTS.STATE_TAX_THRESHOLD_YEARLY) * TAX_CONSTANTS.STATE_TAX_RATE
}

// Main salary calculation function - updated for 2026 tax table
export function calculateSwedishSalary(
  grossMonthlySalary: number,
  _municipality: string = 'Stockholm', // Municipality is now built into the tax table
  pensionPercentage: number = TAX_CONSTANTS.STANDARD_PENSION_RATE
): SalaryCalculation {
  // Employer contributions (arbetsgivaravgift)
  const employerContributions = grossMonthlySalary * TAX_CONSTANTS.EMPLOYER_SOCIAL_CONTRIBUTION_RATE
  
  // Pension contribution
  const pensionContribution = grossMonthlySalary * pensionPercentage
  
  // Special payroll tax on pension
  const pensionTax = pensionContribution * TAX_CONSTANTS.PENSION_TAX_RATE
  
  // Income tax from 2026 tax table (includes municipal and state tax)
  const incomeTax = getTaxFromTable2026(grossMonthlySalary)
  
  // Net salary (after income tax and pension deduction)
  const netSalary = grossMonthlySalary - incomeTax - pensionContribution
  
  // Total cost for employer
  const totalCost = grossMonthlySalary + employerContributions + pensionContribution + pensionTax
  
  // Effective tax rate
  const effectiveTaxRate = grossMonthlySalary > 0 ? (incomeTax + pensionContribution) / grossMonthlySalary : 0
  
  return {
    grossSalary: grossMonthlySalary,
    employerContributions,
    pensionContribution,
    pensionTax,
    incomeTax,
    netSalary,
    totalCost,
    effectiveTaxRate
  }
}

// Calculate invoice amount needed to achieve target net salary
export function calculateRequiredInvoiceAmount(
  targetNetMonthlySalary: number,
  municipality: string = 'Stockholm',
  pensionPercentage: number = TAX_CONSTANTS.STANDARD_PENSION_RATE
): number {
  // Since we have discrete tax brackets, we need to find the exact gross
  // that produces the target net salary
  
  // For each tax bracket, calculate what gross would give target net
  // Net = Gross - Tax - (Gross * pensionPercentage)
  // Net = Gross * (1 - pensionPercentage) - Tax
  // Gross = (Net + Tax) / (1 - pensionPercentage)
  
  const pensionMultiplier = 1 - pensionPercentage
  
  // Check fixed tax brackets
  for (const [from, to, tax] of TAX_TABLE_2026) {
    // Calculate the gross needed for this tax amount
    const neededGross = (targetNetMonthlySalary + tax) / pensionMultiplier
    
    // Check if this gross falls within this bracket
    if (neededGross >= from && neededGross <= to) {
      // Found it! Calculate and return the total cost
      const calc = calculateSwedishSalary(neededGross, municipality, pensionPercentage)
      return calc.totalCost
    }
  }
  
  // Check percentage-based brackets for high incomes
  // Net = Gross - (Gross * taxRate) - (Gross * pensionPercentage)
  // Net = Gross * (1 - taxRate - pensionPercentage)
  // Gross = Net / (1 - taxRate - pensionPercentage)
  for (const [from, to, taxRate] of HIGH_INCOME_TAX_BRACKETS_2026) {
    const divisor = 1 - taxRate - pensionPercentage
    if (divisor <= 0) continue // Would result in negative/infinite gross
    
    const neededGross = targetNetMonthlySalary / divisor
    
    if (neededGross >= from && neededGross <= to) {
      const calc = calculateSwedishSalary(neededGross, municipality, pensionPercentage)
      return calc.totalCost
    }
  }
  
  // Fallback: use the highest tax rate
  const fallbackGross = targetNetMonthlySalary / (1 - 0.52 - pensionPercentage)
  return calculateSwedishSalary(fallbackGross, municipality, pensionPercentage).totalCost
}