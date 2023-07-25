import { UserRoleAssociationDTO } from "../../domain/dtos/user/userRoleAssociationDTO";

export default interface AddRolesToUsers {
    execute(userRoleAssociations: UserRoleAssociationDTO[]): Promise<void>;
}
