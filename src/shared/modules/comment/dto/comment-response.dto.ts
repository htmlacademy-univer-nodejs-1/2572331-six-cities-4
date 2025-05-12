export class CommentResponseDto {
  public id!: string;
  public text!: string;
  public rating!: number;
  public postDate!: Date;
  public user!: {
    name: string;
    email: string;
    avatarPath: string;
  };
}
