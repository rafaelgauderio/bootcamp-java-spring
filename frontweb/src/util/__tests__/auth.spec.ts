import { hasSomeRoles } from "util/auth";
import * as TokenModule from "../token";//importando arquivo como se fosse um módulo

describe("hasSomeRoles tests", () => {

    it('hasSomeRoles should return true when given empty list', () => {
        const result = hasSomeRoles([]);
        expect(result).toEqual(true);
        expect(result).not.toEqual(false);
    })

    it('hasSomeRoles should return true when user has given Role ADMIN or Role OPERATOR', () => {

        // mockando comportamentos de funçõs com spyOn();
        // simulando função getTokenData retorna um objeto do tipo TokenData
        jest.spyOn(TokenModule, "getTokenData").mockReturnValue( {
            exp: 0,
            user_name: "",
            authorities:["ROLE_OPERATOR", "ROLE_ADMIN"]
        });

        const resulAdmin = hasSomeRoles(["ROLE_ADMIN"]);
        const resultOpe = hasSomeRoles(["ROLE_OPERATOR"]);
        const resultOpeAdmin = hasSomeRoles(["ROLE_OPERATOR","ROLE_ADMIN"]);

        expect(resulAdmin).toEqual(true);
        expect(resultOpe).toEqual(true);
        expect(resultOpeAdmin).toEqual(true);


        

    })

});