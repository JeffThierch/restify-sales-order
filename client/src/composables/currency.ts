interface UseCurrencyInterface {
  formatCurrency(value: number): string
}

export function useCurrency(): UseCurrencyInterface {
  function formatCurrency(value: number) {
    return (
      value?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }) ?? 'R$ 0.00'
    )
  }

  return { formatCurrency }
}
