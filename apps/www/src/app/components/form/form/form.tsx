import type { FormProps } from "../types"

const Form = ({ children }: FormProps) => {
  return (
    <form>
      {children}
    </form>
  )
}

export { Form }