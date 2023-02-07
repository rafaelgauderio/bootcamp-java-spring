import { hasSomeRoles } from "util/auth";

describe ("hasSomeRoles tests", () => {

    it('hasSomeRoles should return true when given empty list', () => {
        const result = hasSomeRoles([]);
        expect(result).toEqual(true);
        expect(result).not.toEqual(false);
    })

});