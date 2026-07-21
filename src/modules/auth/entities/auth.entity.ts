import { Role } from "src/common/enum/discountType.enum";
import { genderEnum } from "src/common/enum/gender.enum";

export class RegisterAuth {
      UserName!: string;
    
      email!: string;
    
      phoneNumber!: string;
    
      password!: string;
    
      Age!: number;
      gender!:genderEnum;
      role!: Role;
}


