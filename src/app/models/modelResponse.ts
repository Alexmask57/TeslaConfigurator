export class ModelResponse {
  code!: string;
  description!: string;
  colors!: {
    code: string,
    description: string,
    price: number
  }[]
}
