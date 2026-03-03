export interface IBook {
  BookId: string
  BookName: string
  Author: string
  Category: string
  Price: number
  Image: string
}

export class Book {
  constructor(
    public BookId: string = "",
    public BookName: string = "",
    public Author: string = "",
    public Category: string = "",
    public Price: number = 0,
    public Image: string = ""
  ) {}
}