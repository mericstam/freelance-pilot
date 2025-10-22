'use client'

import { useState, useEffect } from 'react'
import { formatCurrency, formatDate } from '@/app/lib/utils'
import { 
  calculateSwedishSalary, 
  calculateRequiredInvoiceAmount,
  MUNICIPALITY_TAX_RATES,
  TAX_CONSTANTS
} from '@/app/lib/tax-calculations'
import { Calculator, Info, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

export default function SalaryContent() {
  // Calculator inputs
  const [grossSalary, setGrossSalary] = useState('50000')
  const [municipality, setMunicipality] = useState('Stockholm')
  const [pensionPercentage, setPensionPercentage] = useState('4.5')
  
  // Target net salary calculator
  const [targetNetSalary, setTargetNetSalary] = useState('35000')
  
  const calculation = calculateSwedishSalary(
    parseFloat(grossSalary) || 0,
    municipality,
    (parseFloat(pensionPercentage) || 0) / 100
  )
  
  const requiredInvoice = calculateRequiredInvoiceAmount(
    parseFloat(targetNetSalary) || 0,
    municipality,
    (parseFloat(pensionPercentage) || 0) / 100
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Salary Calculator</h2>
        <p className="text-gray-600">Calculate Swedish taxes and employer contributions for F-skatt freelancers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Calculator */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Calculator className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Gross to Net Calculator</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gross Monthly Salary (SEK)
              </label>
              <input
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Municipality</label>
              <select
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {Object.keys(MUNICIPALITY_TAX_RATES).map((mun) => (
                  <option key={mun} value={mun}>
                    {mun} ({(MUNICIPALITY_TAX_RATES[mun] * 100).toFixed(2)}%)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pension Contribution (%)
              </label>
              <input
                type="number"
                value={pensionPercentage}
                onChange={(e) => setPensionPercentage(e.target.value)}
                min="0"
                max="35"
                step="0.5"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Standard: 4.5% of gross salary</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Gross Salary</span>
              <span className="text-sm font-medium">{formatCurrency(calculation.grossSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Income Tax</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(calculation.incomeTax)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Pension Contribution</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(calculation.pensionContribution)}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="font-medium">Net Salary</span>
              <span className="font-medium text-green-600">
                {formatCurrency(calculation.netSalary)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Effective Tax Rate</span>
              <span>{(calculation.effectiveTaxRate * 100).toFixed(1)}%</span>
            </div>
          </div>

          {/* Employer costs breakdown */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Total Employer Cost</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Gross Salary</span>
                <span className="text-blue-900">{formatCurrency(calculation.grossSalary)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Employer Contributions (31.42%)</span>
                <span className="text-blue-900">{formatCurrency(calculation.employerContributions)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Pension Contribution</span>
                <span className="text-blue-900">{formatCurrency(calculation.pensionContribution)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Pension Tax (24.26%)</span>
                <span className="text-blue-900">{formatCurrency(calculation.pensionTax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-200">
                <span className="font-medium text-blue-900">Total Cost</span>
                <span className="font-medium text-blue-900">
                  {formatCurrency(calculation.totalCost)}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-blue-700">
              This is the minimum amount you need to invoice to cover this salary
            </p>
          </div>
        </div>

        {/* Target Net Salary Calculator */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Target Net Calculator</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Desired Net Monthly Salary (SEK)
              </label>
              <input
                type="number"
                value={targetNetSalary}
                onChange={(e) => setTargetNetSalary(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                The amount you want to receive after all taxes and deductions
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="text-sm font-medium text-green-900 mb-2">Required Invoice Amount</h4>
            <div className="text-3xl font-bold text-green-900">
              {formatCurrency(requiredInvoice)}
            </div>
            <p className="mt-2 text-sm text-green-700">
              You need to invoice at least this amount monthly to achieve your target net salary of {formatCurrency(parseFloat(targetNetSalary) || 0)}
            </p>
            <div className="mt-4 p-3 bg-green-100 rounded">
              <p className="text-xs text-green-800">
                <strong>Hourly rate needed:</strong><br />
                160h/month: {formatCurrency(requiredInvoice / 160)}/h<br />
                140h/month: {formatCurrency(requiredInvoice / 140)}/h<br />
                120h/month: {formatCurrency(requiredInvoice / 120)}/h
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important Considerations:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>These calculations are estimates based on 2024 tax rates</li>
                  <li>Remember to save for vacation and sick days</li>
                  <li>Consider additional business expenses</li>
                  <li>Consult with an accountant for precise calculations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Info className="h-6 w-6 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Swedish Tax Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900 mb-2">Employer Contributions</h4>
            <p className="text-sm text-gray-600">
              <span className="font-medium">31.42%</span> of gross salary<br />
              Covers social insurance, parental benefits, and more
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900 mb-2">Pension Tax</h4>
            <p className="text-sm text-gray-600">
              <span className="font-medium">24.26%</span> on pension contributions<br />
              Special payroll tax for pension savings
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900 mb-2">State Income Tax</h4>
            <p className="text-sm text-gray-600">
              <span className="font-medium">20%</span> on income above {formatCurrency(TAX_CONSTANTS.STATE_TAX_THRESHOLD_YEARLY)}/year<br />
              Additional tax for high earners
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900 mb-2">F-skatt Status</h4>
            <p className="text-sm text-gray-600">
              As an F-skatt holder, you're responsible for paying your own taxes and social fees
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900 mb-2">VAT (Moms)</h4>
            <p className="text-sm text-gray-600">
              Standard rate: <span className="font-medium">25%</span><br />
              Remember to add VAT to your invoices if applicable
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900 mb-2">Basic Deduction</h4>
            <p className="text-sm text-gray-600">
              Automatic tax-free amount<br />
              Varies based on income level
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}