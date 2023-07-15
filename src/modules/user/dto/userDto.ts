export class UserInfoDto {
  readonly userId: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly birthday_date?: Date;
  readonly country?: string;
  readonly gender?: string;
  readonly city?: string;
  readonly languages?: string;
}
