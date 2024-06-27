export function useClientValidation() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const rules = {
    name: [
      (value: any) => {
        if (value) return true

        return 'O campo nome é obrigatorio'
      }
    ],
    email: [
      (value: any) => {
        if (value) return true

        return 'O campo e-mail é obrigatorio'
      },
      (value: any) => {
        const isValid = emailRegex.test(value)

        if (isValid) return true

        return 'O e-mail informado não é valido'
      }
    ]
  }

  return { rules }
}
