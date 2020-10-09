export class Question{
  key?: string;
  title: string;
  author: string;
  comments: object[];
  date: string;
  text: string;
  category: object[];
  solved: boolean

  constructor(obj) {
    this.key = obj.key;
    this.title = obj.title;
    this.author = obj.author;
    this.comments = obj.comments || [];
    this.date = obj.date;
    this.text = obj.text;
    this.category = obj.category;
    this.solved = obj.solved || false;
  }
}
