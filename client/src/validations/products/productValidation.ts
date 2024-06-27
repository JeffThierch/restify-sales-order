export function useProductValidation() {
  const rules = {
    name: [
      (value: any) => {
        if (value?.trim()) return true

        return 'O campo nome é obrigatorio'
      }
    ],
    price: [
      (value: any) => {
        if (value === 0 || value) return true

        return 'O campo preço é obrigatorio'
      }
    ]
  }

  return { rules }
}
