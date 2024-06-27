export function useOrderValidation() {
  const rules = {
    client_id: [
      (value: any) => {
        if (value) return true

        return 'O campo cliente é obrigatorio'
      }
    ],
    date: [
      (value: any) => {
        if (value) return true

        return 'O campo data é obrigatorio'
      }
    ]
  }

  return { rules }
}
