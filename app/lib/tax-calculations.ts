// Swedish tax calculation utilities for freelancers with F-skatt

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

// Main salary calculation function
export function calculateSwedishSalary(
  grossMonthlySalary: number,
  municipality: string = 'Stockholm',
  pensionPercentage: number = TAX_CONSTANTS.STANDARD_PENSION_RATE
): SalaryCalculation {
  const grossYearlySalary = grossMonthlySalary * 12
  
  // Employer contributions (arbetsgivaravgift)
  const employerContributions = grossMonthlySalary * TAX_CONSTANTS.EMPLOYER_SOCIAL_CONTRIBUTION_RATE
  
  // Pension contribution
  const pensionContribution = grossMonthlySalary * pensionPercentage
  
  // Special payroll tax on pension
  const pensionTax = pensionContribution * TAX_CONSTANTS.PENSION_TAX_RATE
  
  // Income tax (municipality + state)
  const municipalityTax = calculateMunicipalityTax(grossYearlySalary, municipality) / 12
  const stateTax = calculateStateTax(grossYearlySalary) / 12
  const incomeTax = municipalityTax + stateTax
  
  // Net salary (after income tax but before pension deduction in this model)
  const netSalary = grossMonthlySalary - incomeTax - pensionContribution
  
  // Total cost for employer
  const totalCost = grossMonthlySalary + employerContributions + pensionContribution + pensionTax
  
  // Effective tax rate
  const effectiveTaxRate = (incomeTax + pensionContribution) / grossMonthlySalary
  
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
  // This is an approximation - iterate to find the gross that gives the target net
  let gross = targetNetMonthlySalary * 1.5 // Initial guess
  let iteration = 0
  let lastDiff = Infinity
  
  while (iteration < 50) {
    const calc = calculateSwedishSalary(gross, municipality, pensionPercentage)
    const diff = Math.abs(calc.netSalary - targetNetMonthlySalary)
    
    if (diff < 1) { // Within 1 SEK
      return calc.totalCost
    }
    
    if (diff > lastDiff) {
      // Getting worse, use smaller steps
      gross += (targetNetMonthlySalary - calc.netSalary) * 0.5
    } else {
      gross += (targetNetMonthlySalary - calc.netSalary) * 1.2
    }
    
    lastDiff = diff
    iteration++
  }
  
  return gross * 1.5 // Fallback
}